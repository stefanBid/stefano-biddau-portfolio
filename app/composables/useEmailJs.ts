import emailjs from '@emailjs/browser'

type AdminEmailForm = {
  from_name: string
  from_email: string
  message: string
  agree_time?: string
  year?: string
}

type ReplyEmailForm = {
  user_name: string
  to_email: string
  message: string
  year?: string
}

export default function useEmailJs() {
  // Private state
  const _config = useRuntimeConfig()

  // State

  /**
   * Send contact email to admin
   * @param payload AdminEmailForm - form data to send email
   * @returns emailjs.SendResponse
   */
  const sendContactEmailAdmin = async (payload: AdminEmailForm) => {
    const serviceId = _config.public.emailjsServiceId as string
    const templateId = _config.public.emailjsTemplateAdminId as string
    const publicKey = _config.public.emailjsPublicKey as string

    const result = await emailjs.send(
      serviceId,
      templateId,
      payload,
      { publicKey },
    )
    return result
  }

  /**
   * Send reply email to user
   * @param payload ReplyEmailForm - form data to send email
   * @returns emailjs.SendResponse
   */
  const sendReplyToUser = async (payload: ReplyEmailForm) => {
    const serviceId = _config.public.emailjsServiceId as string
    const templateId = _config.public.emailjsTemplateReplyToId as string
    const publicKey = _config.public.emailjsPublicKey as string

    const result = await emailjs.send(
      serviceId,
      templateId,
      payload,
      { publicKey },
    )

    return result
  }

  return {
    sendContactEmailAdmin,
    sendReplyToUser,
  }
}
