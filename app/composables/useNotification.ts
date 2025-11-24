interface NotificationState {
  notifications: NotificationItem[]
}

export default function useNotification() {
  // Internal State
  const _state = useState<NotificationState>('notifications', () => ({
    notifications: [],
  }))

  /**
   * Add a new notification (client-only, SSR-safe)
   * @param newNotification Omit<NotificationItem, 'id'> - notification data without id
   * @returns string - generated notification id
   */
  function _addNotification(newNotification: Omit<NotificationItem, 'id'>): string {
    // Notifications only make sense on client-side
    if (!import.meta.client) {
      return ''
    }

    const id = generateUuid()

    _state.value.notifications.push({
      ...newNotification,
      id,
    })
    return id
  }

  // State

  const notifications = computed(() => _state.value.notifications)

  /**
   * Remove a notification by id
   * @param id string - notification id to remove
   * @returns boolean - true if notification was found and removed, false otherwise
   */
  function removeNotification(id: string) {
    const index = _state.value.notifications.findIndex(n => n.id === id)
    if (index > -1) {
      _state.value.notifications.splice(index, 1)
      return true
    }
    return false
  }

  /**
   * Clear all notifications
   */
  function clearNotifications() {
    _state.value.notifications = []
  }

  /**
   * Adds a success notification.
   * @param newNotification Notification data without type and id
   * @returns The generated notification id
   */
  function success(newNotification: Omit<NotificationItem, 'type' | 'id'>) {
    return _addNotification({ ...newNotification, type: 'success' })
  }

  /**
   * Adds a warning notification.
   * @param newNotification Notification data without type and id
   * @returns The generated notification id
   */
  function warning(newNotification: Omit<NotificationItem, 'type' | 'id'>) {
    return _addNotification({ ...newNotification, type: 'warning' })
  }

  /**
   * Adds an error notification.
   * @param newNotification Notification data without type and id
   * @returns The generated notification id
   */
  function error(newNotification: Omit<NotificationItem, 'type' | 'id'>) {
    return _addNotification({ ...newNotification, type: 'error' })
  }

  /**
   * Adds an info notification.
   * @param newNotification Notification data without type and id
   * @returns The generated notification id
   */
  function info(newNotification: Omit<NotificationItem, 'type' | 'id'>) {
    return _addNotification({
      ...newNotification, type: 'info',
    })
  }

  return {
    notifications,
    removeNotification,
    clearNotifications,
    success,
    warning,
    error,
    info,
  }
}
