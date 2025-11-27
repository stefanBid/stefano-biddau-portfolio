declare global {
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
  }

  interface NotificationItem {
    id: string
    type: 'success' | 'warning' | 'error' | 'info'
    icon?: string | null
    title?: string | null
    message: string
    dismissible?: boolean
    autoClose?: boolean
    duration?: number
  }

  interface StrapiResponse<T> {
    data: T
    meta: {
      pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
      }
    }
  }
}

export {}
