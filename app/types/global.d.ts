declare global {
  interface LangItem {
    code: string
    label: string
    icon: string
  }

  interface RouteItem {
    name: string
    path: string
    disabled?: true
  }
}

export {}
