export default function (publicUrl: string, filename: string) {
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
