import DOMPurify from 'isomorphic-dompurify'

export default function useSanitize() {
  const sanitizeHtml = (dirtyHtml: string): string => {
    // Converti newline in <br> PRIMA della sanitizzazione
    const withBreaks = dirtyHtml.replace(/\n/g, '<br>')

    return DOMPurify.sanitize(withBreaks, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
      ALLOW_DATA_ATTR: false,
      ADD_ATTR: ['target'],
      FORBID_TAGS: ['script', 'style'],
      FORBID_ATTR: ['onclick', 'onerror', 'onload'],
      KEEP_CONTENT: true,
      RETURN_TRUSTED_TYPE: false,
    })
  }

  return ({
    sanitizeHtml,
  })
}
