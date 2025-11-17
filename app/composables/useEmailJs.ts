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

export default function () {
  const config = useRuntimeConfig()

  const sendContactEmailAdmin = async (payload: AdminEmailForm) => {
    const serviceId = config.public.emailjsServiceId as string
    const templateId = config.public.emailjsTemplateAdminId as string
    const publicKey = config.public.emailjsPublicKey as string

    const result = await emailjs.send(
      serviceId,
      templateId,
      payload,
      { publicKey },
    )
    return result
  }

  const sendReplyToUser = async (payload: ReplyEmailForm) => {
    const serviceId = config.public.emailjsServiceId as string
    const templateId = config.public.emailjsTemplateReplyToId as string
    const publicKey = config.public.emailjsPublicKey as string

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
