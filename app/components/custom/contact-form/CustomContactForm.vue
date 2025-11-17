<script setup lang="ts">
import { z } from 'zod'

interface CustomContactFormProps {
  openForm: boolean
}

// Dependencies
const { sendReplyToUser, sendContactEmailAdmin } = useEmailJs()

// Input / Output
const props = defineProps<CustomContactFormProps>()

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'closeForm', value: boolean): void
}>()

// State
const nameController = ref<string>('')
const emailController = ref<string>('')
const messageController = ref<string>('')
const consentGivenController = ref<boolean>(false)

// Form validation Schema using Zod

const MESSAGE_MIN_LENGTH = 10
const MESSAGE_MAX_LENGTH = 800
const contactValidationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.email('Invalid email address'),
  message: z.string().min(MESSAGE_MIN_LENGTH, 'Message is too short').max(MESSAGE_MAX_LENGTH, 'Message is too long'),
  consentGiven: z.boolean().refine(val => val === true, {
    message: 'You must agree to the processing of your data',
  }),
})

const errors = ref<Record<string, string | null>>({
  name: null,
  email: null,
  message: null,
  consentGiven: null,
})

const emailIsSending = ref<boolean>(false)

const formIsChanged = computed(() => {
  return (
    nameController.value !== ''
    || emailController.value !== ''
    || messageController.value !== ''
    || consentGivenController.value !== false
  )
})

// events
const closeForm = () => {
  if (props.openForm) {
    emits('closeForm', false)
  }
}

const onSendMessage = async () => {
  // Validate Form Data
  const validationResult = contactValidationSchema.safeParse({
    name: nameController.value,
    email: emailController.value,
    message: messageController.value,
    consentGiven: consentGivenController.value,
  })

  if (!validationResult.success) {
    // Reset errors
    onResetErrors()
    // Map errors
    validationResult.error.issues.forEach((issue) => {
      if (issue.path.length > 0) {
        const field = issue.path[0] as keyof typeof errors.value
        errors.value[field] = issue.message
      }
    })
    return
  }
  // Prepare Message Data
  const completeMessage = `${messageController.value} \n User's Consent Given: ${consentGivenController.value ? 'Yes' : 'No'}`
  emailIsSending.value = true
  await sendContactEmailAdmin({
    from_name: nameController.value,
    from_email: emailController.value,
    message: completeMessage,
    agree_time: new Date().toLocaleTimeString(),
    year: new Date().getFullYear().toString(),
  })

  await sendReplyToUser({
    user_name: nameController.value,
    to_email: emailController.value,
    message: messageController.value,
    year: new Date().getFullYear().toString(),
  })
  emailIsSending.value = false
}

const onResetForm = () => {
  nameController.value = ''
  emailController.value = ''
  messageController.value = ''
  consentGivenController.value = false
}

const onResetErrors = () => {
  errors.value = {
    name: null,
    email: null,
    message: null,
    consentGiven: null,
  }
}

watch(
  () => props.openForm,
  (newVal) => {
    if (!newVal) {
      onResetForm()
      onResetErrors()
    }
  },
)
</script>

<template>
  <BaseDialog
    :is-open="openForm"
    size="lg"
    subtitle="Get in Touch! Let's Work Together"
    title="Contact Me"
    @close="closeForm"
  >
    <form class="flex flex-col gap-6" @reset.prevent="onResetForm" @submit.prevent="onSendMessage">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-[45%] space-y-6 ">
          <BaseInput
            id="name"
            v-model:input="nameController"
            autocomplete="name"
            :error="errors.name"
            label="Your Name"
            placeholder="Enter your name"
            type="text"
          />
          <BaseInput
            id="email"
            v-model:input="emailController"
            autocomplete="email"
            :error="errors.email"
            label="Your Email"
            placeholder="Enter your email"
            type="email"
          />
        </div>
        <div class="w-full md:w-[55%] border-l-none md:border-l border-sb-border pl-0 md:pl-6">
          <BaseTextarea
            id="message"
            v-model:input="messageController"
            :error="errors.message"
            label="Your Message"
            :max-length="MESSAGE_MAX_LENGTH"
            placeholder="Write your message here..."
          />
        </div>
      </div>
      <BaseCheckbox
        id="consent"
        v-model:input="consentGivenController"
        :error="errors.consentGiven"
        label="I agree to the processing of my data in accordance with the privacy policy."
      />
      <div class="w-full flex justify-end items-center mt-4 gap-4">
        <BaseButton

          :is-disabled="!formIsChanged"
          type="reset"
          variant="secondary"
        >
          Cancel
        </BaseButton>
        <BaseButton :is-loading="emailIsSending" type="submit" variant="primary">
          Send Message
        </BaseButton>
      </div>
    </form>
  </BaseDialog>
</template>
