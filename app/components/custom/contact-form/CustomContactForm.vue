<script setup lang="ts">
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
  // Prepare Message Data
  const completeMessage = `${messageController.value} \n User's Consent Given: ${consentGivenController.value ? 'Yes' : 'No'}`
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
}

const onResetForm = () => {
  nameController.value = ''
  emailController.value = ''
  messageController.value = ''
  consentGivenController.value = false
}
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
        {{ consentGivenController }}
        <div class="w-full md:w-[45%] space-y-6 ">
          <BaseInput
            id="name"
            v-model:input="nameController"
            autocomplete="name"
            label="Your Name"
            placeholder="Enter your name"
            type="text"
          />
          <BaseInput
            id="email"
            v-model:input="emailController"
            autocomplete="email"
            label="Your Email"
            placeholder="Enter your email"
            type="email"
          />
        </div>
        <div class="w-full md:w-[55%] border-l-none md:border-l border-sb-border pl-0 md:pl-6">
          <BaseTextarea
            id="message"
            v-model:input="messageController"
            label="Your Message"
            placeholder="Write your message here..."
          />
        </div>
      </div>
      <BaseCheckbox
        id="consent"
        v-model:input="consentGivenController"
        :invalid="false"
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
        <BaseButton type="submit" variant="primary">
          Send Message
        </BaseButton>
      </div>
    </form>
  </BaseDialog>
</template>
