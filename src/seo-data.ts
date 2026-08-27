export type SeoGuide = {
  slug: string
  title: string
  seoTitle: string
  description: string
  summary: string
  audience: string
  checks: string[]
  steps: string[]
  mistakes: string[]
  relatedSlugs: string[]
}

export const seoGuides: SeoGuide[] = [
  {
    slug: "photo-size-and-format-checklist",
    title: "Photo upload requirements: a practical size and format checklist",
    seoTitle: "Photo upload requirements checklist | FormPack",
    description:
      "A plain-language checklist for checking application photo format, file size, dimensions, filename, and visual quality before upload.",
    summary:
      "Application portals often reject a photo for one small mismatch. Check the measurable rules first, then review the parts software cannot judge.",
    audience: "For exam, government, job, school, and visa application forms",
    checks: [
      "Confirm the accepted format, such as JPG or PNG, from the official form.",
      "Check the byte limit and leave a little headroom instead of targeting the exact ceiling.",
      "Record the required pixel dimensions, aspect ratio, or physical size.",
      "Use the exact filename pattern shown by the portal, including the extension.",
      "Review face position, background, lighting, and sharpness yourself.",
    ],
    steps: [
      "Copy the portal rule into a note so you can compare each value without guessing.",
      "Use FormPack's photo slot to measure format and file size on your device.",
      "Resize or convert only after preserving the original image as a backup.",
      "Inspect the finished image at 100% zoom and compare it with the portal's visual examples.",
    ],
    mistakes: [
      "Confusing centimetres or millimetres with pixel dimensions.",
      "Renaming a file without changing its real format.",
      "Compressing so aggressively that text or facial details become soft.",
    ],
    relatedSlugs: [
      "job-application-upload-checklist",
      "visa-application-file-checklist",
      "signature-file-requirements",
    ],
  },
  {
    slug: "signature-file-requirements",
    title: "Signature image requirements: size, format, and clarity checklist",
    seoTitle: "Signature image requirements checklist | FormPack",
    description:
      "Learn how to check a scanned signature's format, file size, proportions, filename, contrast, and legibility before submitting it.",
    summary:
      "A signature can pass a byte-size check and still be rejected if it is faint, cropped, or proportioned incorrectly. Use both mechanical and visual checks.",
    audience:
      "For application forms that request a handwritten signature image",
    checks: [
      "Match the exact format and maximum size in the application instructions.",
      "Check the required width-to-height ratio or pixel dimensions.",
      "Keep the signature inside the canvas with enough margin for safe cropping.",
      "Use a filename that follows the portal's spelling and extension rules.",
      "Review contrast, stray marks, blur, and whether the full signature is visible.",
    ],
    steps: [
      "Sign on clean, high-contrast paper using the pen requested by the form, if specified.",
      "Capture or scan the signature in even light and crop around the writing.",
      "Use FormPack to check the resulting format, size, and dimensions locally.",
      "Open the final file and confirm that thin strokes remain readable at normal zoom.",
    ],
    mistakes: [
      "Submitting a screenshot with extra browser or paper edges.",
      "Using a transparent format when the portal only accepts JPG.",
      "Stretching the signature to meet a ratio instead of recropping it naturally.",
    ],
    relatedSlugs: [
      "photo-size-and-format-checklist",
      "job-application-upload-checklist",
    ],
  },
  {
    slug: "reduce-pdf-size-for-application-forms",
    title: "How to reduce a PDF for an application form",
    seoTitle: "Reduce a PDF for an application form | FormPack",
    description:
      "A safe workflow for reducing a PDF to a portal's file-size and page-limit rules while keeping scans readable and verifiable.",
    summary:
      "PDF portals usually care about bytes and page count, but an unreadable certificate creates a different kind of rejection. Reduce size in measured steps.",
    audience: "For certificates, identity documents, and supporting PDFs",
    checks: [
      "Write down the maximum PDF size and page count before changing anything.",
      "Remove blank or duplicate pages only when the official instructions allow it.",
      "Prefer a lower scan resolution before applying heavy image compression.",
      "Keep the PDF format and required filename unchanged.",
      "Open the reduced file and verify that every name, date, stamp, and seal is readable.",
    ],
    steps: [
      "Keep the original PDF untouched so you can compare it after each change.",
      "Use FormPack's PDF check to measure current bytes and page count locally.",
      "Reduce oversized scans gradually, checking text and signatures after each export.",
      "Run the final file through the same size, format, filename, and visual checklist.",
    ],
    mistakes: [
      "Deleting pages that the portal treats as one required document.",
      "Printing and rescanning a PDF, which can increase size and reduce clarity.",
      "Checking only the first page after compression.",
    ],
    relatedSlugs: [
      "fix-file-too-large-rejection",
      "visa-application-file-checklist",
    ],
  },
  {
    slug: "fix-file-too-large-rejection",
    title: "Fix a file-too-large rejection before you resubmit",
    seoTitle: "Fix a file-too-large rejection | FormPack",
    description:
      "A step-by-step checklist for diagnosing a file-too-large portal rejection and reducing an image or PDF without losing required detail.",
    summary:
      "A rejection message is a rule to copy, not a reason to guess. Capture the limit, measure the source, then make the smallest safe change.",
    audience:
      "For anyone resubmitting a photo, signature, or PDF after a size error",
    checks: [
      "Copy the exact limit and unit: KB and MB are not interchangeable.",
      "Measure the file's real byte size instead of trusting its filename or app preview.",
      "Check whether the rejection also mentions dimensions, page count, or format.",
      "Leave headroom under the limit so rounding or portal differences do not cause another rejection.",
      "Keep a copy of the rejected original until the replacement is accepted.",
    ],
    steps: [
      "Choose the closest rejection reason in FormPack and enter the portal rule.",
      "Add the rejected file so its measured size and type are visible on-device.",
      "Reduce dimensions or compression in small steps, choosing the least destructive fix first.",
      "Confirm the replacement visually before uploading it to the official portal.",
    ],
    mistakes: [
      "Changing a file extension and assuming the bytes were compressed.",
      "Reducing a certificate until small text is no longer legible.",
      "Forgetting that a portal can enforce more than one rule at a time.",
    ],
    relatedSlugs: [
      "reduce-pdf-size-for-application-forms",
      "photo-size-and-format-checklist",
    ],
  },
  {
    slug: "job-application-upload-checklist",
    title: "Job application uploads: photo, signature, and PDF checklist",
    seoTitle: "Job application upload checklist | FormPack",
    description:
      "Prepare common job-portal uploads with a reusable checklist for photos, signatures, resumes, certificates, filenames, and privacy.",
    summary:
      "Recruitment portals vary by employer. Use this checklist to separate the rules you can measure from the visual details you must confirm yourself.",
    audience:
      "For job seekers preparing files for employer and recruitment portals",
    checks: [
      "Save the employer's exact format, size, dimension, and page-limit rules.",
      "Keep the resume or certificate PDF text selectable when the portal does not require a scan.",
      "Use clear, consistent filenames without spaces if the portal recommends a pattern.",
      "Check that a profile photo follows the employer's requested orientation and crop.",
      "Remove unrelated personal documents from a multi-file upload.",
    ],
    steps: [
      "Create one small requirement list for each upload field instead of one rule for the whole application.",
      "Run each source through the matching FormPack slot or quick tool on your device.",
      "Open the final files from the same device you will use for submission.",
      "Upload only after comparing each filename with the field label in the portal.",
    ],
    mistakes: [
      "Reusing a government-photo crop when the employer requests a natural headshot.",
      "Uploading a draft resume with tracked changes or comments.",
      "Combining unrelated certificates into one PDF without checking the page limit.",
    ],
    relatedSlugs: [
      "photo-size-and-format-checklist",
      "reduce-pdf-size-for-application-forms",
    ],
  },
  {
    slug: "visa-application-file-checklist",
    title: "Visa application uploads: a privacy-first file checklist",
    seoTitle: "Visa application file checklist | FormPack",
    description:
      "A privacy-first checklist for visa and passport application photos, signatures, and supporting PDFs, with clear limits on what software can verify.",
    summary:
      "Identity documents are sensitive and visa portals are exacting. Keep files local while you check measurable rules, then use the official guidance for visual approval.",
    audience: "For visa, passport, and travel-document application portals",
    checks: [
      "Use the issuing authority's current photo and document specifications, not a generic preset alone.",
      "Check file format, byte size, pixel dimensions, and page count separately.",
      "Preserve the original scan and never share a document with an untrusted converter.",
      "Match names, dates, document numbers, and signatures across all pages.",
      "Review background, face position, glare, and crop against the authority's examples.",
    ],
    steps: [
      "Copy the current authority instructions into your own checklist before preparing files.",
      "Use FormPack in the browser so measurements and previews stay on your device.",
      "Make one mechanical change at a time and recheck the complete file afterward.",
      "Delete temporary exports after the portal confirms the upload, if your device is shared.",
    ],
    mistakes: [
      "Treating a generic visa photo preset as an authority-approved rule.",
      "Uploading a cropped scan that hides seals, corners, or document numbers.",
      "Sending identity files to a cloud compressor without understanding its retention policy.",
    ],
    relatedSlugs: [
      "photo-size-and-format-checklist",
      "signature-file-requirements",
      "reduce-pdf-size-for-application-forms",
    ],
  },
]

export function getSeoGuide(slug: string) {
  return seoGuides.find((guide) => guide.slug === slug)
}
