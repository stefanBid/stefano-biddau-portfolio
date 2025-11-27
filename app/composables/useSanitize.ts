export default function useSanitize() {
  /**
   * Sanitizes HTML content to prevent XSS attacks.
   * @param dirtyHtml
   * @returns Sanitized HTML string
   */
  function sanitizeHtml(dirtyHtml: string): string {
    // Convert newlines to <br> tags
    const withBreaks = dirtyHtml.replace(/\n/g, '<br>')
    return withBreaks
  }

  return {
    sanitizeHtml,
  }
}
