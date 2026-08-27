import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "@tanstack/react-router"
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileArchive,
  FileWarning,
  LockKeyhole,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react"
import { useState, type ChangeEvent } from "react"

import {
  ActionLink,
  CheckLine,
  ExamplePack,
  PageFrame,
  PrivacyNotice,
  SlotIcon,
  StatusLabel,
} from "@/components"
import {
  categories,
  fileTypeMatches,
  formatBytes,
  quickTools,
  requirementIsComplete,
} from "@/data"
import { usePack } from "@/pack-store"
import { SeoHead, SITE_URL } from "@/seo"
import { getSeoGuide, seoGuides } from "@/seo-data"

export function HomePage() {
  return (
    <>
      <SeoHead
        title="FormPack — Private application file preparation"
        description="Prepare application photos, signatures, and PDFs privately in your browser, then check every upload rule before submission."
        path="/"
      />
      <section className="hero shell-width">
        <div className="hero-copy">
          <h1>Make every file fit the form.</h1>
          <p className="hero-intro">
            Tell FormPack the rules, add your files, and download a private
            package prepared on this device.
          </p>
          <div className="hero-actions">
            <ActionLink to="/prepare">Prepare application files</ActionLink>
            <ActionLink to="/fix" secondary>
              Fix a rejected file
            </ActionLink>
          </div>
          <div className="hero-trust">
            <span>
              <LockKeyhole size={15} aria-hidden="true" /> No account
            </span>
            <span>
              <ShieldCheck size={15} aria-hidden="true" /> No document upload
            </span>
          </div>
        </div>
        <div className="hero-demonstration">
          <ExamplePack />
        </div>
      </section>

      <section className="journey-section">
        <div className="shell-width journey-grid">
          <div className="section-heading">
            <h2>One pack, from rules to ready files.</h2>
            <p>
              FormPack keeps the order clear, shows what can be checked
              reliably, and pauses when your judgment is still needed.
            </p>
          </div>
          <ol className="journey-list">
            {[
              [
                "Tell us the rules",
                "Use a starter pattern or enter the portal instructions.",
              ],
              [
                "Add each file",
                "Choose from your camera, gallery, or device storage.",
              ],
              [
                "Fix what is mechanical",
                "Resize, convert, compress, and rename locally.",
              ],
              [
                "Review what is visual",
                "Check crop, clarity, background, and legibility yourself.",
              ],
              [
                "Download the pack",
                "Keep the files and submission checklist together.",
              ],
            ].map(([title, description], index) => (
              <li key={title}>
                <span className="journey-number">{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="guide-teaser-section shell-width">
        <div className="section-heading">
          <span className="eyebrow">Practical checklists</span>
          <h2>Know the rule before you touch the file.</h2>
          <p>
            Short, plain-language guides for the upload problems that cause
            avoidable rejections.
          </p>
        </div>
        <div className="guide-teaser-grid">
          {seoGuides.slice(0, 3).map((guide) => (
            <Link
              className="guide-teaser-card"
              key={guide.slug}
              to="/guides/$slug"
              params={{ slug: guide.slug }}
            >
              <span>{guide.audience}</span>
              <h3>{guide.title}</h3>
              <p>{guide.summary}</p>
              <span className="text-link">Read the checklist →</span>
            </Link>
          ))}
        </div>
        <Link className="text-link guide-index-link" to="/guides">
          Browse all file guides →
        </Link>
      </section>

      <section className="privacy-section shell-width">
        <PrivacyNotice />
        <div className="privacy-detail">
          <h2>Mechanical checks, clearly separated from human review.</h2>
          <div className="check-columns">
            <div>
              <span className="column-label">FormPack can check</span>
              <ul>
                <CheckLine ready>File format and byte size</CheckLine>
                <CheckLine ready>Dimensions and aspect ratio</CheckLine>
                <CheckLine ready>Filename and PDF page count</CheckLine>
              </ul>
            </div>
            <div>
              <span className="column-label">You still review</span>
              <ul>
                <CheckLine ready={false}>
                  Face position and background
                </CheckLine>
                <CheckLine ready={false}>
                  Signature clarity and legibility
                </CheckLine>
                <CheckLine ready={false}>
                  Portal-specific visual instructions
                </CheckLine>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="shell-width closing-inner">
          <div>
            <h2>Start with the form, not the editing tool.</h2>
            <p>No registration. Your files stay on your device.</p>
          </div>
          <ActionLink to="/prepare">Prepare application files</ActionLink>
        </div>
      </section>
    </>
  )
}

export function CategoryPage() {
  const { category, setCategory } = usePack()
  const presets = useQuery({
    queryKey: ["starter-presets", category],
    queryFn: async () => [
      {
        id: "three-file",
        name: "Photo, signature, and certificate",
        detail: "A common three-file starting point",
      },
      {
        id: "custom",
        name: "Review requirements myself",
        detail: "Use editable starter values for each file",
      },
    ],
    staleTime: Infinity,
  })

  return (
    <PageFrame
      title="What are you applying for?"
      intro="This only changes the starting point. Every file rule stays editable."
      aside={<PrivacyNotice compact />}
    >
      <div className="selection-layout">
        <fieldset className="selection-list">
          <legend>Application category</legend>
          {categories.map((item) => (
            <label className="selection-row" key={item.id}>
              <input
                type="radio"
                name="category"
                value={item.id}
                checked={category === item.id}
                onChange={() => setCategory(item.id)}
              />
              <span className="radio-mark" aria-hidden="true" />
              <span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </label>
          ))}
        </fieldset>

        <div className="preset-panel">
          <div className="panel-heading">
            <span>Starting pattern</span>
            <strong>
              {categories.find((item) => item.id === category)?.label}
            </strong>
          </div>
          <div className="preset-list">
            {presets.isPending ? (
              <p role="status">Loading starting patterns…</p>
            ) : (
              presets.data?.map((preset, index) => (
                <Link
                  to="/prepare/requirements"
                  className="preset-row"
                  key={preset.id}
                >
                  <span className="preset-index">{index + 1}</span>
                  <span>
                    <strong>{preset.name}</strong>
                    <small>{preset.detail}</small>
                  </span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              ))
            )}
          </div>
          <p className="preset-notice">
            Starter patterns are generic. Verify every value against the
            instructions on your official form.
          </p>
        </div>
      </div>
    </PageFrame>
  )
}

export function GuideIndexPage() {
  return (
    <PageFrame
      title="Application file checklists and guides"
      intro="Use these focused checklists to translate a portal's upload rule into measurable checks and a final human review."
    >
      <div className="guide-index-intro">
        <p>
          FormPack is a local, browser-based utility. These guides explain
          common requirements without pretending that a generic preset can
          replace the current instructions from an official portal.
        </p>
      </div>
      <div className="guide-grid">
        {seoGuides.map((guide) => (
          <Link
            className="guide-card"
            key={guide.slug}
            to="/guides/$slug"
            params={{ slug: guide.slug }}
          >
            <span className="guide-card-audience">{guide.audience}</span>
            <h2>{guide.title}</h2>
            <p>{guide.description}</p>
            <span className="text-link">Open guide →</span>
          </Link>
        ))}
      </div>
    </PageFrame>
  )
}

export function GuidePage() {
  const { slug } = useParams({ from: "/guides/$slug" })
  const guide = getSeoGuide(slug)

  if (!guide) return <NotFoundPage />

  const guidePath = `/guides/${guide.slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        url: `${SITE_URL}${guidePath}`,
        isPartOf: { "@type": "WebSite", name: "FormPack", url: SITE_URL },
        about: guide.audience,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guides",
            item: `${SITE_URL}/guides`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.title,
            item: `${SITE_URL}${guidePath}`,
          },
        ],
      },
    ],
  }

  return (
    <PageFrame
      title={guide.title}
      intro={guide.summary}
      seo={{
        title: guide.seoTitle,
        description: guide.description,
        path: guidePath,
        type: "article",
        jsonLd,
      }}
    >
      <article className="guide-article">
        <div className="guide-article-meta">
          <span>{guide.audience}</span>
          <span>Updated for a local-first workflow</span>
        </div>
        <section>
          <h2>Start with the official rule</h2>
          <p>
            Portal requirements change. Copy the latest instruction into your
            own checklist, then use the sections below to separate values a
            browser can measure from details you need to inspect yourself.
          </p>
        </section>
        <section>
          <h2>Checks to record</h2>
          <ul>
            {guide.checks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>A safe preparation sequence</h2>
          <ol>
            {guide.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2>Common avoidable mistakes</h2>
          <ul>
            {guide.mistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </section>
        <section className="guide-cta">
          <h2>Ready to check a file?</h2>
          <p>
            FormPack measures format and size locally, then leaves visual
            judgment with you.
          </p>
          <div className="guide-cta-actions">
            <ActionLink to="/prepare">Prepare an application pack</ActionLink>
            <ActionLink to="/quick-tools" secondary>
              Use a quick tool
            </ActionLink>
          </div>
        </section>
        <nav className="related-guides" aria-label="Related guides">
          <h2>Related checklists</h2>
          <div>
            {guide.relatedSlugs.map((relatedSlug) => {
              const related = getSeoGuide(relatedSlug)
              if (!related) return null
              return (
                <Link
                  key={related.slug}
                  to="/guides/$slug"
                  params={{ slug: related.slug }}
                >
                  {related.title} →
                </Link>
              )
            })}
          </div>
        </nav>
      </article>
    </PageFrame>
  )
}

export function RequirementsPage() {
  const { slots, updateRequirement } = usePack()
  const [selectedId, setSelectedId] = useState(slots[0].id)
  const selected = slots.find((slot) => slot.id === selectedId) ?? slots[0]
  const sizeIsValid = selected.requirement.maxSizeKb > 0
  const dimensionsAreValid = selected.requirement.dimensions.trim().length > 0
  const filenameIsValid = selected.requirement.filename.trim().length > 0
  const allRequirementsAreComplete = slots.every((slot) =>
    requirementIsComplete(slot.requirement)
  )

  return (
    <PageFrame
      title="Set the rule for each file."
      intro="Copy each rule from your form and verify every starting value before continuing."
      aside={
        <div className="count-plate">
          <strong>{slots.length}</strong>
          <span>required files</span>
        </div>
      }
    >
      <div className="workspace-layout">
        <div className="slot-sidebar" aria-label="Required files">
          {slots.map((slot) => (
            <button
              type="button"
              className={
                slot.id === selected.id ? "slot-tab is-active" : "slot-tab"
              }
              onClick={() => setSelectedId(slot.id)}
              key={slot.id}
            >
              <span className="slot-tab-icon">
                <SlotIcon slot={slot} />
              </span>
              <span>
                <strong>{slot.name}</strong>
                <small>{slot.requirement.format}</small>
              </span>
              <StatusLabel status={slot.status} />
            </button>
          ))}
        </div>

        <form
          className="requirements-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="form-head">
            <div>
              <span>File requirement</span>
              <h2>{selected.name}</h2>
            </div>
            <span className="local-chip">
              <LockKeyhole size={14} aria-hidden="true" /> Saved in this tab
            </span>
          </div>
          <div className="field-grid">
            <label>
              <span>Output format</span>
              <select
                value={selected.requirement.format}
                onChange={(event) =>
                  updateRequirement(selected.id, "format", event.target.value)
                }
              >
                <option>JPG</option>
                <option>PNG</option>
                <option>WebP</option>
                <option>PDF</option>
              </select>
            </label>
            <label>
              <span>Maximum file size</span>
              <div className="input-with-unit">
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  aria-invalid={!sizeIsValid}
                  aria-describedby={sizeIsValid ? undefined : "max-size-error"}
                  value={selected.requirement.maxSizeKb}
                  onChange={(event) =>
                    updateRequirement(
                      selected.id,
                      "maxSizeKb",
                      Number(event.target.value)
                    )
                  }
                />
                <span>KB</span>
              </div>
              {!sizeIsValid ? (
                <small className="field-error" id="max-size-error">
                  Enter a limit greater than 0 KB.
                </small>
              ) : null}
            </label>
            <label className="field-wide">
              <span>Dimensions, ratio, or page limit</span>
              <input
                aria-invalid={!dimensionsAreValid}
                value={selected.requirement.dimensions}
                onChange={(event) =>
                  updateRequirement(
                    selected.id,
                    "dimensions",
                    event.target.value
                  )
                }
                placeholder="For example, 600 × 800 px"
              />
              {!dimensionsAreValid ? (
                <small className="field-error">
                  Enter the dimension, ratio, or page rule shown by the portal.
                </small>
              ) : null}
            </label>
            <label className="field-wide">
              <span>Required filename</span>
              <input
                aria-invalid={!filenameIsValid}
                value={selected.requirement.filename}
                onChange={(event) =>
                  updateRequirement(selected.id, "filename", event.target.value)
                }
                placeholder="For example, photo.jpg"
              />
              {!filenameIsValid ? (
                <small className="field-error">
                  Enter the filename required by the portal.
                </small>
              ) : null}
            </label>
          </div>
          <div className="rule-summary">
            <span>Plain-language rule</span>
            <p>
              Make {selected.name.toLowerCase()} a {selected.requirement.format}{" "}
              file under {selected.requirement.maxSizeKb} KB, following “
              {selected.requirement.dimensions}”, and name it{" "}
              {selected.requirement.filename}.
            </p>
          </div>
          <div className="form-actions">
            <div className="form-action-copy">
              <Link className="text-link" to="/prepare">
                Back to category
              </Link>
              {!allRequirementsAreComplete ? (
                <span role="status">Complete every file rule to continue.</span>
              ) : null}
            </div>
            <ActionLink
              to="/prepare/files"
              disabled={!allRequirementsAreComplete}
            >
              Continue to files
            </ActionLink>
          </div>
        </form>
      </div>
    </PageFrame>
  )
}

export function FilesPage() {
  const { slots, attachFile } = usePack()
  const attached = slots.filter((slot) => slot.source).length

  const onFile = (slotId: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) attachFile(slotId, file)
  }

  return (
    <PageFrame
      title="Add files from this device."
      intro="Files are inspected in your browser. Nothing is sent to FormPack."
      aside={
        <div className="count-plate">
          <strong>
            {attached}/{slots.length}
          </strong>
          <span>files added</span>
        </div>
      }
    >
      <PrivacyNotice />
      <div className="upload-ledger">
        {slots.map((slot) => (
          <section className="upload-row" key={slot.id}>
            <div className="upload-name">
              <span className="slot-icon">
                <SlotIcon slot={slot} />
              </span>
              <div>
                <h2>{slot.name}</h2>
                <p>
                  {slot.requirement.format} · under {slot.requirement.maxSizeKb}{" "}
                  KB · {slot.requirement.dimensions}
                </p>
              </div>
            </div>
            <div className="upload-result">
              {slot.source ? (
                <>
                  <strong>{slot.source.name}</strong>
                  <span>
                    {formatBytes(slot.source.size)} ·{" "}
                    {slot.source.type || "Unknown type"}
                  </span>
                  {slot.status === "not-ready" ? (
                    <small className="upload-error" role="status">
                      {!fileTypeMatches(
                        slot.requirement.format,
                        slot.source.type
                      )
                        ? `Choose a ${slot.requirement.format} file.`
                        : slot.source.size === 0
                          ? "Choose a file that is not empty."
                          : `Choose a file under ${slot.requirement.maxSizeKb} KB.`}
                    </small>
                  ) : null}
                </>
              ) : (
                <span>No file selected</span>
              )}
            </div>
            <StatusLabel status={slot.status} />
            <label className="file-button">
              <input
                type="file"
                accept={slot.kind === "pdf" ? "application/pdf" : "image/*"}
                onChange={(event) => onFile(slot.id, event)}
              />
              <span>{slot.source ? "Replace file" : "Choose file"}</span>
            </label>
            {slot.source ? (
              <Link
                className="inspect-link"
                to="/prepare/file/$slotId"
                params={{ slotId: slot.id }}
              >
                Inspect <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ) : null}
          </section>
        ))}
      </div>
      <div className="flow-actions">
        <p>
          Camera capture appears automatically when your browser supports it.
        </p>
        <ActionLink to="/prepare/check">Check this pack</ActionLink>
      </div>
    </PageFrame>
  )
}

export function FileWorkspacePage() {
  const { slotId } = useParams({ from: "/prepare/file/$slotId" })
  const { slots, setStatus } = usePack()
  const slot = slots.find((item) => item.id === slotId)

  if (!slot) {
    return (
      <PageFrame
        title="File not found"
        intro="Return to your file list and choose a file slot."
      >
        <ActionLink to="/prepare/files">Return to files</ActionLink>
      </PageFrame>
    )
  }

  const mechanicalFailure = slot.status === "not-ready"

  return (
    <PageFrame
      title={`Inspect ${slot.name.toLowerCase()}.`}
      intro="Mechanical facts are shown separately from checks that still need your eyes."
      aside={<StatusLabel status={slot.status} />}
    >
      <div className="inspector-layout">
        <div className="preview-well">
          <div className="preview-placeholder">
            <SlotIcon slot={slot} />
            <strong>{slot.source?.name ?? "No file added yet"}</strong>
            <span>
              {slot.source
                ? "A real file preview is added in the processing build."
                : "Choose a source file before editing."}
            </span>
          </div>
          <div className="preview-caption">
            <span>Local preview</span>
            <span>{slot.source ? formatBytes(slot.source.size) : "—"}</span>
          </div>
        </div>

        <div className="inspector-panel">
          <div className="panel-heading">
            <span>Target specification</span>
            <strong>{slot.requirement.filename}</strong>
          </div>
          <dl className="measurement-list">
            <div>
              <dt>Format</dt>
              <dd>{slot.requirement.format}</dd>
            </div>
            <div>
              <dt>Maximum size</dt>
              <dd>{slot.requirement.maxSizeKb} KB</dd>
            </div>
            <div>
              <dt>Visual rule</dt>
              <dd>{slot.requirement.dimensions}</dd>
            </div>
          </dl>
          <div className="v0-tool-note">
            <SlidersHorizontal size={19} aria-hidden="true" />
            <div>
              <strong>Processing controls come next</strong>
              <p>
                This v0 reserves the workspace for crop, resize, conversion, and
                compression without pretending those operations are active yet.
              </p>
            </div>
          </div>
          <button
            className="review-button"
            type="button"
            disabled={!slot.source || mechanicalFailure}
            onClick={() => setStatus(slot.id, "ready")}
          >
            <CheckCircle2 size={18} aria-hidden="true" />
            Confirm visual review
          </button>
          {mechanicalFailure ? (
            <p className="review-blocker" role="status">
              Replace this file before confirming the visual review. It does not
              meet the measured format or size rule.
            </p>
          ) : null}
          <Link className="text-link" to="/prepare/check">
            Review the complete pack
          </Link>
        </div>
      </div>
    </PageFrame>
  )
}

export function CheckPage() {
  const { slots } = usePack()
  const readyCount = slots.filter((slot) => slot.status === "ready").length

  return (
    <PageFrame
      title="Check every rule before download."
      intro="A green result means the measured file rule passes. It does not mean an authority has approved the file."
      aside={
        <div className="count-plate">
          <strong>
            {readyCount}/{slots.length}
          </strong>
          <span>files ready</span>
        </div>
      }
    >
      <div className="check-ledger">
        {slots.map((slot) => {
          const sizePass = Boolean(
            slot.source &&
            slot.source.size > 0 &&
            slot.source.size <= slot.requirement.maxSizeKb * 1024
          )
          const typePass = Boolean(
            slot.source &&
            fileTypeMatches(slot.requirement.format, slot.source.type)
          )
          return (
            <section className="check-row" key={slot.id}>
              <div className="check-row-head">
                <div className="upload-name">
                  <span className="slot-icon">
                    <SlotIcon slot={slot} />
                  </span>
                  <div>
                    <h2>{slot.name}</h2>
                    <p>{slot.source?.name ?? "No source file"}</p>
                  </div>
                </div>
                <StatusLabel status={slot.status} />
              </div>
              <div className="rule-results">
                <div data-pass={typePass}>
                  <span>Format</span>
                  <strong>
                    {typePass
                      ? "Pass"
                      : slot.source
                        ? `Needs ${slot.requirement.format}`
                        : "Needs a file"}
                  </strong>
                </div>
                <div data-pass={sizePass}>
                  <span>File size</span>
                  <strong>
                    {sizePass
                      ? "Pass"
                      : slot.source
                        ? slot.source.size === 0
                          ? "File is empty"
                          : `Over ${slot.requirement.maxSizeKb} KB`
                        : "Needs a file"}
                  </strong>
                </div>
                <div data-pass={slot.status === "ready"}>
                  <span>Visual review</span>
                  <strong>
                    {slot.status === "ready" ? "Confirmed" : "Review manually"}
                  </strong>
                </div>
              </div>
              <Link to="/prepare/file/$slotId" params={{ slotId: slot.id }}>
                Inspect {slot.name.toLowerCase()}
              </Link>
            </section>
          )
        })}
      </div>
      <div className="flow-actions">
        <p>
          Complete each missing rule before using these files on the official
          portal.
        </p>
        <ActionLink to="/prepare/download">Continue to download</ActionLink>
      </div>
    </PageFrame>
  )
}

export function DownloadPage() {
  const { slots } = usePack()
  const allReady = slots.every((slot) => slot.status === "ready")

  return (
    <PageFrame
      title="Keep the pack together."
      intro="The full build will provide renamed files, a ZIP package, and a submission checklist."
      aside={<PrivacyNotice compact />}
    >
      <div className="download-layout">
        <div className="package-plate">
          <FileArchive size={34} strokeWidth={1.3} aria-hidden="true" />
          <div>
            <span>Application package</span>
            <h2>
              {allReady ? "Ready to package" : "Complete the remaining checks"}
            </h2>
            <p>
              {slots.filter((slot) => slot.status === "ready").length} of{" "}
              {slots.length} files are marked ready.
            </p>
          </div>
          <button type="button" className="download-button" disabled>
            <Download size={18} aria-hidden="true" /> Download ZIP in the
            processing build
          </button>
        </div>
        <div className="download-checklist">
          <h2>Submission checklist</h2>
          <ul>
            {slots.map((slot) => (
              <li key={slot.id}>
                <StatusLabel status={slot.status} />
                <span>
                  Upload <strong>{slot.requirement.filename}</strong> in the
                  portal field labelled “{slot.name}”.
                </span>
              </li>
            ))}
          </ul>
          <p>
            Always compare the final files with the latest instructions on the
            official form.
          </p>
        </div>
      </div>
    </PageFrame>
  )
}

export function FixPage({
  stage = "start",
}: {
  stage?: "start" | "requirements" | "file" | "result"
}) {
  const errors = [
    "File is too large",
    "File is too small",
    "Wrong dimensions",
    "Wrong format",
    "Photo or signature is unclear",
    "PDF is too large",
    "Another error",
  ]

  if (stage !== "start") {
    const copy = {
      requirements: [
        "Enter the portal rule",
        "Copy the size, format, or dimension shown beside the rejected upload.",
      ],
      file: [
        "Add the rejected file",
        "The full processing build will compare this source with the rule on your device.",
      ],
      result: [
        "Review the correction",
        "Mechanical changes and remaining visual checks will appear here.",
      ],
    }[stage]
    return (
      <PageFrame
        title={copy[0]}
        intro={copy[1]}
        aside={<PrivacyNotice compact />}
      >
        <div className="stage-placeholder">
          <FileWarning size={32} strokeWidth={1.4} aria-hidden="true" />
          <p>
            This v0 confirms the route, language, and task order. The processing
            control is the next implementation layer.
          </p>
          <ActionLink
            to={
              stage === "requirements"
                ? "/fix/file"
                : stage === "file"
                  ? "/fix/result"
                  : "/fix"
            }
          >
            {stage === "result" ? "Fix another file" : "Continue"}
          </ActionLink>
        </div>
      </PageFrame>
    )
  }

  return (
    <PageFrame
      title="What did the portal reject?"
      intro="Choose the message closest to what you saw. You can copy the exact rule next."
      aside={<PrivacyNotice compact />}
    >
      <div className="error-choice-list">
        {errors.map((error) => (
          <Link to="/fix/requirements" key={error}>
            <FileWarning size={18} strokeWidth={1.6} aria-hidden="true" />
            <span>{error}</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </PageFrame>
  )
}

export function QuickToolsPage({ tool }: { tool?: string }) {
  const selected = quickTools.find((item) => item.to.endsWith(tool ?? ""))

  if (tool && selected) {
    return (
      <PageFrame
        title={selected.title}
        intro={selected.description}
        aside={<PrivacyNotice compact />}
      >
        <div className="stage-placeholder">
          <ScanSearch size={34} strokeWidth={1.4} aria-hidden="true" />
          <p>
            This focused tool will reuse the same local processing engine as an
            application pack, with one rule and one file.
          </p>
          <ActionLink to="/prepare/requirements">
            Use the guided pack instead
          </ActionLink>
        </div>
      </PageFrame>
    )
  }

  return (
    <PageFrame
      title="Fix one file without making a pack."
      intro="Quick tools are for a single known rule. Use the guided pack when a form needs several files."
      aside={<PrivacyNotice compact />}
    >
      <div className="quick-tool-list">
        {quickTools.map((item, index) => (
          <Link to={item.to} className="quick-tool-row" key={item.title}>
            <span>{index + 1}</span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
            <ArrowRight size={19} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </PageFrame>
  )
}

export function PrivacyPage() {
  return (
    <PageFrame
      title="Your documents stay on your device."
      intro="FormPack is designed so sensitive application files do not need to leave your browser."
    >
      <article className="prose-page">
        <section>
          <h2>Local processing</h2>
          <p>
            File analysis, image preparation, PDF preparation, and package
            creation are intended to run in your browser. FormPack does not need
            an account or cloud document storage for the core workflow.
          </p>
        </section>
        <section>
          <h2>Aggregate product analytics</h2>
          <p>
            Future analytics may count privacy-safe events such as a workflow
            starting or finishing. Filenames, file contents, entered
            requirements, and generated previews must not be included.
          </p>
        </section>
      </article>
    </PageFrame>
  )
}

export function LimitationsPage() {
  return (
    <PageFrame
      title="What FormPack can and cannot confirm."
      intro="Mechanical checks are useful evidence, not a guarantee that a third-party portal will approve a file."
    >
      <article className="prose-page">
        <section>
          <h2>Reliable mechanical checks</h2>
          <p>
            FormPack can measure file type, byte size, pixel dimensions, aspect
            ratio, orientation, filename, and PDF page count when the browser
            supports the file.
          </p>
        </section>
        <section>
          <h2>Human review still matters</h2>
          <p>
            Background quality, face position, signature clarity, legibility,
            and unusual portal instructions require your judgment. Always check
            the latest official instructions before submission.
          </p>
        </section>
      </article>
    </PageFrame>
  )
}

export function NotFoundPage() {
  return (
    <PageFrame
      title="Page not found"
      intro="This route is not part of the FormPack workflow."
    >
      <ActionLink to="/">Return home</ActionLink>
    </PageFrame>
  )
}
