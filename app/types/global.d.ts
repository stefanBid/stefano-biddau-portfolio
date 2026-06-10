declare global {
  // ------------------------ Types ------------------------ /
  type SkillType = 'beLang' | 'feLang' | 'beFramework' | 'feFramework' | 'database' | 'tool' | 'other'

  // --------------------------------- Interfaces ------------------------ /

  interface MenuItem {
    code: string
    label: string
    iconType: 'nuxt-icon' | 'custom'
    icon: string
  }

  interface RouteItem {
    name: string
    path: string
    disabled?: true
    routeName?: string
  }

  interface NotificationItem {
    id: string
    type: 'success' | 'warning' | 'error' | 'info'
    icon?: string
    title?: string
    message: string
    dismissible?: boolean
    autoClose?: boolean
    duration?: number
  }

  interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }

  // Rich Text Blocks types
  interface RichBlockText {
    type: 'text'
    text: string
    bold?: boolean
    italic?: boolean
    underline?: boolean
    strikethrough?: boolean
    code?: boolean
  }

  interface RichBlockLink {
    type: 'link'
    url: string
    children: RichBlockText[]
  }

  type RichBlockChild = RichBlockText | RichBlockLink

  interface RichBlockParagraph {
    type: 'paragraph'
    children: RichBlockChild[]
  }

  interface RichBlockHeading {
    type: 'heading'
    level: 1 | 2 | 3 | 4 | 5 | 6
    children: RichBlockChild[]
  }

  interface RichBlockList {
    type: 'list'
    format: 'ordered' | 'unordered'
    children: RichBlockListItem[]
  }

  interface RichBlockListItem {
    type: 'list-item'
    children: RichBlockChild[]
  }

  interface RichBlockQuote {
    type: 'quote'
    children: RichBlockChild[]
  }

  interface RichBlockCode {
    type: 'code'
    children: RichBlockText[]
  }

  type RichBlock = RichBlockParagraph | RichBlockHeading | RichBlockList | RichBlockQuote | RichBlockCode
}

export {}
