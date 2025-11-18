export interface Notification {
  id: number
  type: 'success' | 'warning' | 'error' | 'info'
  icon?: string | null
  title?: string | null
  message: string
  dismissible?: boolean
  autoClose?: boolean
  duration?: number
}

export interface NotificationOptions {
  type?: 'success' | 'warning' | 'error' | 'info'
  icon?: string | null
  title?: string | null
  dismissible?: boolean
  autoClose?: boolean
  duration?: number
}

export interface NotificationState {
  notifications: Notification[]
  notificationId: number
}

// Global state
const state = useState<NotificationState>('notifications', () => ({
  notifications: [],
  notificationId: 0,
}))

export const useNotification = () => {
  // Add notification
  const addNotification = (message: string, options: NotificationOptions = {}) => {
    const id = state.value.notificationId++

    const notification: Notification = {
      id,
      type: options.type || 'info',
      icon: options.icon || null,
      title: options.title || null,
      message,
      dismissible: options.dismissible !== undefined ? options.dismissible : true,
      autoClose: options.autoClose !== undefined ? options.autoClose : true,
      duration: options.duration || 5000,
    }

    state.value.notifications.push(notification)
    return id
  }

  // Remove notification by id
  const removeNotification = (id: number) => {
    const index = state.value.notifications.findIndex(n => n.id === id)
    if (index > -1) {
      state.value.notifications.splice(index, 1)
    }
  }

  // Clear all notifications
  const clearNotifications = () => {
    state.value.notifications = []
  }

  // Helper methods for specific types
  const success = (message: string, options: Omit<NotificationOptions, 'type'> = {}) => {
    return addNotification(message, { ...options, type: 'success' })
  }

  const warning = (message: string, options: Omit<NotificationOptions, 'type'> = {}) => {
    return addNotification(message, { ...options, type: 'warning' })
  }

  const error = (message: string, options: Omit<NotificationOptions, 'type'> = {}) => {
    return addNotification(message, { ...options, type: 'error' })
  }

  const info = (message: string, options: Omit<NotificationOptions, 'type'> = {}) => {
    return addNotification(message, { ...options, type: 'info' })
  }

  return {
    notifications: computed(() => state.value.notifications),
    addNotification,
    removeNotification,
    clearNotifications,
    success,
    warning,
    error,
    info,
  }
}
