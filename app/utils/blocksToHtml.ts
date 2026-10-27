/**
 * Converts Rich Text Blocks to HTML string
 */
export function blocksToHtml(blocks: RichBlock[], newTabLabel?: string): string {
  if (!blocks || !Array.isArray(blocks)) {
    return ''
  }

  return blocks.map(block => blockToHtml(block, newTabLabel)).join('')
}

function blockToHtml(block: RichBlock, newTabLabel?: string): string {
  switch (block.type) {
    case 'paragraph':
      return `<p>${childrenToHtml(block.children, newTabLabel)}</p>`

    case 'heading':
      return `<h${block.level}>${childrenToHtml(block.children, newTabLabel)}</h${block.level}>`

    case 'list': {
      const tag = block.format === 'ordered' ? 'ol' : 'ul'
      const items = block.children.map(item => `<li>${childrenToHtml(item.children, newTabLabel)}</li>`).join('')
      return `<${tag}>${items}</${tag}>`
    }

    case 'quote':
      return `<blockquote>${childrenToHtml(block.children, newTabLabel)}</blockquote>`

    case 'code':
      return `<pre><code>${childrenToHtml(block.children, newTabLabel)}</code></pre>`

    default:
      return ''
  }
}

function childrenToHtml(children: RichBlockChild[], newTabLabel?: string): string {
  if (!children || !Array.isArray(children)) {
    return ''
  }

  return children.map((child) => {
    if (child.type === 'link') {
      const linkText = child.children.map(c => formatText(c)).join('')
      // mailto: and same-site paths stay in the tab
      if (!/^https?:\/\//.test(child.url)) {
        return `<a href="${child.url}">${linkText}</a>`
      }
      const srNote = newTabLabel ? `<span class="sr-only"> (${newTabLabel})</span>` : ''
      return `<a href="${child.url}" target="_blank" rel="noopener noreferrer">${linkText}${srNote}</a>`
    }

    return formatText(child)
  }).join('')
}

function formatText(text: RichBlockText): string {
  if (!text.text) {
    return ''
  }

  let html = text.text

  if (text.bold) {
    html = `<strong>${html}</strong>`
  }
  if (text.italic) {
    html = `<em>${html}</em>`
  }
  if (text.underline) {
    html = `<u>${html}</u>`
  }
  if (text.strikethrough) {
    html = `<s>${html}</s>`
  }
  if (text.code) {
    html = `<code>${html}</code>`
  }

  return html
}
