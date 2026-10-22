<script setup lang="ts">
import { z } from 'zod'

interface CustomContactFormProps {
  openForm: boolean
}

// Dependencies
const { sendReplyToUser, sendContactEmailAdmin } = useEmailJs()
const { t } = useI18n()
const localePath = useLocalePath()
const { success } = useNotification()

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

const MESSAGE_MIN_LENGTH = 10
const MESSAGE_MAX_LENGTH = 800
const FIELD_ORDER = ['name', 'email', 'message', 'consentGiven'] as const
type ContactField = typeof FIELD_ORDER[number]
const FIELD_IDS: Record<ContactField, string> = {
  name: 'name',
  email: 'email',
  message: 'message',
  consentGiven: 'consent',
}

// Messages are i18n keys, resolved at render time so they follow a locale switch
const contactValidationSchema = z.object({
  name: z.string().trim().min(1, 'pages.home.contactForm.fields.name.errorRequired').max(100, 'pages.home.contactForm.fields.name.errorMaxlength'),
  email: z.string().trim().min(1, 'pages.home.contactForm.fields.email.errorRequired').pipe(z.email('pages.home.contactForm.fields.email.errorInvalid')),
  message: z.string().trim().min(1, 'pages.home.contactForm.fields.message.errorRequired').min(MESSAGE_MIN_LENGTH, 'pages.home.contactForm.fields.message.errorMinlength').max(MESSAGE_MAX_LENGTH, 'pages.home.contactForm.fields.message.errorMaxlength'),
  consentGiven: z.boolean().refine(val => val === true, {
    message: 'pages.home.contactForm.fields.consentGiven.errorRequired',
  }),
})

const errors = ref<Record<ContactField, string | null>>({
  name: null,
  email: null,
  message: null,
  consentGiven: null,
})

const emailIsSending = ref<boolean>(false)
const sendFailed = ref<boolean>(false)

const formIsChanged = computed(() => {
  return (
    nameController.value !== ''
    || emailController.value !== ''
    || messageController.value !== ''
    || consentGivenController.value !== false
  )
})

const errorCount = computed(() => FIELD_ORDER.filter(field => errors.value[field]).length)

const errorMessage = (field: ContactField) => {
  const key = errors.value[field]
  return key ? t(key) : null
}

// events
const closeForm = () => {
  if (props.openForm) {
    emits('closeForm', false)
  }
}

const onSendMessage = async () => {
  sendFailed.value = false
  const validationResult = contactValidationSchema.safeParse({
    name: nameController.value,
    email: emailController.value,
    message: messageController.value,
    consentGiven: consentGivenController.value,
  })

  if (!validationResult.success) {
    onResetErrors()
    validationResult.error.issues.forEach((issue) => {
      const field = issue.path[0] as ContactField | undefined
      if (field && !errors.value[field]) {
        errors.value[field] = issue.message
      }
    })
    const firstInvalid = FIELD_ORDER.find(field => errors.value[field])
    if (firstInvalid) {
      await nextTick()
      document.getElementById(FIELD_IDS[firstInvalid])?.focus()
    }
    return
  }

  const completeMessage = `${messageController.value} \n User's Consent Given: ${consentGivenController.value ? 'Yes' : 'No'}`
  emailIsSending.value = true

  const adminResult = await sendContactEmailAdmin({
    from_name: nameController.value,
    from_email: emailController.value,
    message: completeMessage,
    agree_time: new Date().toLocaleTimeString(),
    year: new Date().getFullYear().toString(),
  })

  if (!adminResult.success) {
    emailIsSending.value = false
    sendFailed.value = true
    return
  }

  // The copy to the sender is a courtesy: the message already reached the inbox, so its failure is not a send failure
  await sendReplyToUser({
    user_name: nameController.value,
    to_email: emailController.value,
    message: messageController.value,
    year: new Date().getFullYear().toString(),
  })

  emailIsSending.value = false
  success({
    title: t('pages.home.contactForm.notifications.success.title'),
    message: t('pages.home.contactForm.notifications.success.message'),
    icon: 'solar:mailbox-bold-duotone',
    autoClose: true,
    dismissible: true,
    duration: 12000,
  })
  onResetForm()
  closeForm()
}

const onResetForm = () => {
  nameController.value = ''
  emailController.value = ''
  messageController.value = ''
  consentGivenController.value = false
  sendFailed.value = false
  onResetErrors()
}

const onResetErrors = () => {
  errors.value = {
    name: null,
    email: null,
    message: null,
    consentGiven: null,
  }
}

watch(nameController, () => {
  errors.value.name = null
})
watch(emailController, () => {
  errors.value.email = null
})
watch(messageController, () => {
  errors.value.message = null
})
watch(consentGivenController, () => {
  errors.value.consentGiven = null
})

watch(
  () => props.openForm,
  (newVal) => {
    if (!newVal) {
      onResetErrors()
      sendFailed.value = false
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
    <form
      class="flex flex-col gap-6 my-4 md:my-6 sb-transition"
      novalidate
      @reset.prevent="onResetForm"
      @submit.prevent="onSendMessage"
    >
      <p aria-live="polite" class="sr-only">
        {{ errorCount ? t('pages.home.contactForm.errorSummary', errorCount) : '' }}
      </p>
      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-[45%] space-y-6 ">
          <BaseInput
            id="name"
            v-model:input="nameController"
            autocomplete="name"
            :error="errorMessage('name')"
            :label="t('pages.home.contactForm.fields.name.label')"
            :placeholder="t('pages.home.contactForm.fields.name.placeholder')"
            type="text"
          />
          <BaseInput
            id="email"
            v-model:input="emailController"
            autocomplete="email"
            :error="errorMessage('email')"
            :label="t('pages.home.contactForm.fields.email.label')"
            :placeholder="t('pages.home.contactForm.fields.email.placeholder')"
            type="email"
          />
        </div>
        <div class="w-full md:w-[55%] md:border-l border-border pl-0 md:pl-6">
          <BaseTextarea
            id="message"
            v-model:input="messageController"
            :error="errorMessage('message')"
            :hint="t('pages.home.contactForm.fields.message.hint')"
            :label="t('pages.home.contactForm.fields.message.label')"
            :max-length="MESSAGE_MAX_LENGTH"
            :min-length="MESSAGE_MIN_LENGTH"
            :placeholder="t('pages.home.contactForm.fields.message.placeholder')"
          />
        </div>
      </div>
      <BaseCheckbox
        id="consent"
        v-model:input="consentGivenController"
        :error="errorMessage('consentGiven')"
      >
        {{ t('pages.home.contactForm.fields.consentGiven.label') }}
        {{ t('pages.home.contactForm.fields.consentGiven.extra') }}
        <NuxtLink
          class="text-primary-ink hover:text-primary-ink-hover underline underline-offset-4 sb-transition sb-focus rounded-sm"
          rel="noopener noreferrer"
          target="_blank"
          :to="localePath('privacy-policy')"
        >
          {{ t('nav.privacy-policy') }}<span class="sr-only"> ({{ t('a11y.newTab') }})</span>
        </NuxtLink>,
        <NuxtLink
          class="text-primary-ink hover:text-primary-ink-hover underline underline-offset-4 sb-transition sb-focus rounded-sm"
          rel="noopener noreferrer"
          target="_blank"
          :to="localePath('terms-and-conditions')"
        >
          {{ t('nav.terms-and-conditions') }}<span class="sr-only"> ({{ t('a11y.newTab') }})</span>
        </NuxtLink>
      </BaseCheckbox>
      <div
        v-if="sendFailed"
        class="flex items-start gap-3 rounded-md bg-error-soft text-error px-4 py-3"
        role="alert"
      >
        <Icon class="size-6 shrink-0" name="solar:danger-triangle-bold-duotone" />
        <div>
          <p class="sb-body-strong mb-1">
            {{ t('pages.home.contactForm.notifications.error.title') }}
          </p>
          <p class="sb-label normal-case">
            {{ t('pages.home.contactForm.notifications.error.message') }}
          </p>
        </div>
      </div>
      <div class="w-full flex flex-wrap justify-end items-center mt-4 gap-4">
        <BaseButton
          :is-disabled="!formIsChanged || emailIsSending"
          type="reset"
          variant="ghost"
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
