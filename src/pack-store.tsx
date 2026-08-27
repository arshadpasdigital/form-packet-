import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react"

import {
  defaultSlots,
  fileTypeMatches,
  type PackCategory,
  type PackSlot,
  type SlotStatus,
} from "@/data"

type PackContextValue = {
  category: PackCategory
  slots: PackSlot[]
  setCategory: (category: PackCategory) => void
  updateRequirement: (
    slotId: string,
    field: keyof PackSlot["requirement"],
    value: string | number
  ) => void
  attachFile: (slotId: string, file: File) => void
  setStatus: (slotId: string, status: SlotStatus) => void
}

const PackContext = createContext<PackContextValue | null>(null)
const packSessionKey = "formpack-pack-v0"

type PersistedPack = Pick<PackContextValue, "category"> & {
  requirements: Record<string, PackSlot["requirement"]>
}

function readPersistedPack(): PersistedPack | null {
  try {
    const raw = sessionStorage.getItem(packSessionKey)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<PersistedPack>
    if (
      !parsed.category ||
      !["government", "job", "visa", "school", "other"].includes(
        parsed.category
      ) ||
      !parsed.requirements
    ) {
      return null
    }
    const requirementsAreValid = defaultSlots.every((slot) => {
      const requirement = parsed.requirements?.[slot.id]
      return (
        requirement &&
        typeof requirement.format === "string" &&
        typeof requirement.maxSizeKb === "number" &&
        typeof requirement.dimensions === "string" &&
        typeof requirement.filename === "string"
      )
    })
    if (!requirementsAreValid) return null
    return parsed as PersistedPack
  } catch {
    return null
  }
}

export function PackProvider({ children }: PropsWithChildren) {
  const [persisted] = useState(readPersistedPack)
  const [category, setCategory] = useState<PackCategory>(
    persisted?.category ?? "government"
  )
  const [slots, setSlots] = useState<PackSlot[]>(() =>
    defaultSlots.map((slot) => ({
      ...slot,
      requirement: persisted?.requirements[slot.id] ?? slot.requirement,
    }))
  )

  useEffect(() => {
    const requirements = Object.fromEntries(
      slots.map((slot) => [slot.id, slot.requirement])
    )
    try {
      sessionStorage.setItem(
        packSessionKey,
        JSON.stringify({ category, requirements } satisfies PersistedPack)
      )
    } catch {
      // The pack remains usable when storage is unavailable or full.
    }
  }, [category, slots])

  const updateRequirement: PackContextValue["updateRequirement"] = (
    slotId,
    field,
    value
  ) => {
    setSlots((current) =>
      current.map((slot) =>
        slot.id === slotId
          ? {
              ...slot,
              requirement: { ...slot.requirement, [field]: value },
            }
          : slot
      )
    )
  }

  const attachFile = (slotId: string, file: File) => {
    setSlots((current) =>
      current.map((slot) => {
        if (slot.id !== slotId) return slot

        const maxBytes = slot.requirement.maxSizeKb * 1024
        const sizeMatches = file.size > 0 && file.size <= maxBytes
        const formatMatches = fileTypeMatches(
          slot.requirement.format,
          file.type
        )

        return {
          ...slot,
          source: { name: file.name, size: file.size, type: file.type },
          status:
            formatMatches && sizeMatches ? "check" : "not-ready",
        }
      })
    )
  }

  const setStatus = (slotId: string, status: SlotStatus) => {
    setSlots((current) =>
      current.map((slot) => (slot.id === slotId ? { ...slot, status } : slot))
    )
  }

  const value = useMemo(
    () => ({
      category,
      slots,
      setCategory,
      updateRequirement,
      attachFile,
      setStatus,
    }),
    [category, slots]
  )

  return <PackContext.Provider value={value}>{children}</PackContext.Provider>
}

export function usePack() {
  const context = useContext(PackContext)
  if (!context) throw new Error("usePack must be used inside PackProvider")
  return context
}
