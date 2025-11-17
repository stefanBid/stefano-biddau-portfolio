import emailjs from '@emailjs/browser'

type ContactTemplatePayload = {
  from_name: string
  from_email: string
  message: string
}

export default function () {
  const config = useRuntimeConfig()

  const sendContactEmail = async (payload: ContactTemplatePayload) => {
    console.log('Preparing to send email with payload:', payload)
    const serviceId = config.public.emailjsServiceId as string
    const templateId = config.public.emailjsTemplateId as string
    const publicKey = config.public.emailjsPublicKey as string
    const result = await emailjs.send(
      serviceId,
      templateId,
      payload,
      publicKey,
    )

    console.log('EmailJS result:', result)
    return result
  }

  return {
    sendContactEmail,
  }
}
