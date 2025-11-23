/**
 * Trigger a file download from a public URL.
 * Creates a temporary anchor element to initiate the download.
 * Only works on client-side (requires DOM access).
 *
 * @param publicUrl - The public URL of the file to download
 * @param filename - The name to save the file as
 */
export default function downloadFile(publicUrl: string, filename: string) {
  if (!import.meta.client) {
    return
  }

  const link = document.createElement('a')
  link.href = publicUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
