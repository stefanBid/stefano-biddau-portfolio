<script setup lang="ts">
interface CustomContactFormProps {
  openForm: boolean
}

// Input / Output
const props = defineProps<CustomContactFormProps>()

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'closeForm', value: boolean): void
}>()

// State

const contactObject = ref({
  name: '',
  email: '',
  message: '',
  consentGiven: false,
})

// events
const closeForm = () => {
  if (props.openForm) {
    emits('closeForm', false)
  }
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
    <form>
      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-[45%] space-y-6 ">
          <BaseInput
            id="name"
            v-model:input="contactObject.name"
            autocomplete="name"
            label="Your Name"
            placeholder="Enter your name"
            type="text"
          />
          <BaseInput
            id="email"
            v-model:input="contactObject.email"
            autocomplete="email"
            label="Your Email"
            placeholder="Enter your email"
            type="email"
          />
        </div>
        <div class="w-full md:w-[55%] border-l-none md:border-l border-sb-border pl-0 md:pl-6">
          <BaseTextarea
            id="message"
            v-model:input="contactObject.message"
            label="Your Message"
            placeholder="Write your message here..."
          />
        </div>
        <BaseCheckbox
          id="consent"
          v-model:input="contactObject.consentGiven"
          :invalid="false"
          label="I agree to the processing of my data in accordance with the privacy policy."
        />
      </div>
    </form>
  </BaseDialog>
</template>
