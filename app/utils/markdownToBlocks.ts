export function markdownToRichBlocks(markdown: string): RichBlock[] {
  // Guard against undefined/null/empty values
  if (!markdown || typeof markdown !== 'string') {
    return []
  }

  const blocks: RichBlock[] = []
  const lines = markdown.split('\n')

  let i = 0
  while (i < lines.length) {
    const line = lines[i]?.trim() ?? ''

    // Titoli
    if (line.startsWith('### ')) {
      blocks.push({
        type: 'heading',
        level: 3,
        children: [{ type: 'text', text: line.slice(4) }],
      })
      i++
      continue
    }

    if (line.startsWith('## ')) {
      blocks.push({
        type: 'heading',
        level: 2,
        children: [{ type: 'text', text: line.slice(3) }],
      })
      i++
      continue
    }

    // Liste
    if (line.startsWith('- ')) {
      const listItems: RichBlockListItem[] = []
      while (i < lines.length && lines[i]?.trim().startsWith('- ')) {
        const itemText = lines[i]?.trim().slice(2) ?? ''
        listItems.push({
          type: 'list-item',
          children: parseInlineFormatting(itemText),
        })
        i++
      }
      blocks.push({
        type: 'list',
        format: 'unordered',
        children: listItems,
      })
      continue
    }

    // Paragrafi
    if (line) {
      blocks.push({
        type: 'paragraph',
        children: parseInlineFormatting(line),
      })
    }

    i++
  }

  return blocks
}

function parseInlineFormatting(text: string): RichBlockChild[] {
  const children: RichBlockChild[] = []

  // Regex per **bold** e *italic*
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|[^*]+)/g
  const matches = text.match(regex)

  if (!matches) {
    return [{ type: 'text', text }]
  }

  matches.forEach((match) => {
    if (match.startsWith('**') && match.endsWith('**')) {
      children.push({
        type: 'text',
        text: match.slice(2, -2),
        bold: true,
      })
    }
    else if (match.startsWith('*') && match.endsWith('*')) {
      children.push({
        type: 'text',
        text: match.slice(1, -1),
        italic: true,
      })
    }
    else {
      children.push({ type: 'text', text: match })
    }
  })

  return children
}
