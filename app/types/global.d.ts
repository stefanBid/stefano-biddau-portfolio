declare global {
  // --------------------------------- Interfaces ------------------------ /

  interface MenuItem {
    code: string
    label: string
    iconType?: 'nuxt-icon' | 'custom'
    icon?: string
    description?: string
    download?: string
  }

  interface RouteItem {
    name: string
    path: string
    disabled?: true
    routeName?: string
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

  interface GithubRepo {
    name: string
    url: string
    description: string | null
    language: string | null
    stars: number
  }

  interface GithubStats {
    login: string
    profileUrl: string
    publicRepos: number
    totalStars: number
    yearsOnGithub: number
    contributionsLastYear: number | null
    topRepos: GithubRepo[]
  }
}

export {}
