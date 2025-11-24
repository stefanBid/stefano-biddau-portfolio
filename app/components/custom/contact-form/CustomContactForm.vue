<script setup lang="ts">
import { z } from 'zod'

interface CustomContactFormProps {
  openForm: boolean
}

// Dependencies
const { sendReplyToUser, sendContactEmailAdmin } = useEmailJs()
const { t } = useI18n()
const localePath = useLocalePath()
const { success, error } = useNotification()

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
  name: z.string().min(1, t('pages.home.contactForm.fields.name.error-required')).max(100, t('pages.home.contactForm.fields.name.error-maxlength')),
  email: z.email(t('pages.home.contactForm.fields.email.error-invalid')),
  message: z.string().min(MESSAGE_MIN_LENGTH, t('pages.home.contactForm.fields.message.error-minlength')).max(MESSAGE_MAX_LENGTH, t('pages.home.contactForm.fields.message.error-maxlength')),
  consentGiven: z.boolean().refine(val => val === true, {
    message: t('pages.home.contactForm.fields.consentGiven.error-required'),
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
  const resultFirst = await sendContactEmailAdmin({
    from_name: nameController.value,
    from_email: emailController.value,
    message: completeMessage,
    agree_time: new Date().toLocaleTimeString(),
    year: new Date().getFullYear().toString(),
  })
  const resultSecond = await sendReplyToUser({
    user_name: nameController.value,
    to_email: emailController.value,
    message: messageController.value,
    year: new Date().getFullYear().toString(),
  })

  if (resultFirst.status === 200 && resultSecond.status === 200) {
    success({
      title: t('pages.home.contactForm.notifications.success.title'),
      message: t('pages.home.contactForm.notifications.success.message'),
      icon: 'solar:mailbox-bold-duotone',
      autoClose: true,
      dismissible: true,
      duration: 7000,
    })
  }
  else {
    error({
      title: t('pages.home.contactForm.notifications.error.title'),
      message: t('pages.home.contactForm.notifications.error.message'),
      icon: 'solar:folder-error-bold-duotone',
      autoClose: true,
      dismissible: true,
      duration: 7000,
    })
  }
  emailIsSending.value = false
  closeForm()
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
    :subtitle="t('pages.home.contactForm.subtitle')"
    :title="t('pages.home.contactForm.title')"
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
            :label="t('pages.home.contactForm.fields.name.label')"
            :placeholder="t('pages.home.contactForm.fields.name.placeholder')"
            type="text"
          />
          <BaseInput
            id="email"
            v-model:input="emailController"
            autocomplete="email"
            :error="errors.email"
            :label="t('pages.home.contactForm.fields.email.label')"
            :placeholder="t('pages.home.contactForm.fields.email.placeholder')"
            type="email"
          />
        </div>
        <div class="w-full md:w-[55%] border-l-none md:border-l border-sb-border pl-0 md:pl-6">
          <BaseTextarea
            id="message"
            v-model:input="messageController"
            :error="errors.message"
            :label="t('pages.home.contactForm.fields.message.label')"
            :max-length="MESSAGE_MAX_LENGTH"
            :placeholder="t('pages.home.contactForm.fields.message.placeholder')"
          />
        </div>
      </div>
      <BaseCheckbox
        id="consent"
        v-model:input="consentGivenController"
        :error="errors.consentGiven"
      >
        {{ t('pages.home.contactForm.fields.consentGiven.label') }}
        {{ t('pages.home.contactForm.fields.consentGiven.extra') }}
        <NuxtLink
          class="text-sb-accent hover:text-sb-accent-hover underline underline-offset-4 u-sb-soft-transition u-sb-focus rounded"
          rel="noopener noreferrer"
          target="_blank"
          :to="localePath('privacy-policy')"
        >
          {{ t('nav.privacy-policy') }}
        </NuxtLink>
        ,
        <NuxtLink
          class="text-sb-accent hover:text-sb-accent-hover underline underline-offset-4 u-sb-soft-transition u-sb-focus rounded"
          rel="noopener noreferrer"
          target="_blank"
          :to="localePath('terms-and-conditions')"
        >
          {{ t('nav.terms-and-conditions') }}
        </NuxtLink>
      </BaseCheckbox>
      <div class="w-full flex justify-end items-center mt-4 gap-4">
        <BaseButton

          :is-disabled="!formIsChanged"
          type="reset"
          variant="secondary"
        >
          {{ t('pages.home.contactForm.fields.resetButton.text') }}
        </BaseButton>
        <BaseButton :is-loading="emailIsSending" type="submit" variant="primary">
          {{ emailIsSending ? t('pages.home.contactForm.fields.submitButton.loadingText') : t('pages.home.contactForm.fields.submitButton.text') }}
        </BaseButton>
      </div>
    </form>
  </BaseDialog>
</template>
