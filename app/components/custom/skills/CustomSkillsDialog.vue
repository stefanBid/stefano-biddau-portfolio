<script setup lang="ts">
interface CustomSkillsDialogProps {
  openDialog: boolean
}
// Dependencies
const { t } = useI18n()
const { success, error } = useNotification()

// Input / Output
const props = defineProps<CustomSkillsDialogProps>()

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'closeDialog', value: boolean): void
}>()

// Events
const onCloseDialog = () => {
  emits('closeDialog', false)
}

watch(
  () => props.openDialog,
  (newVal) => {
    if (newVal) {
      // Dialog opened
      console.log('Skills Dialog opened')
    }
    else {
      // Dialog closed
      console.log('Skills Dialog closed')
    }
  },
)
</script>

<template>
  <BaseDialog
    :is-open="props.openDialog"
    size="full"
    :subtitle="t('pages.skills.skillsDialog.subtitle')"
    :title="t('pages.skills.skillsDialog.title')"
    @close="onCloseDialog"
  >
    <template #header>
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between u-sb-soft-transition">
        <BaseInput
          id="skill-key"
          class="w-full md:w-2/3 u-sb-soft-transition"
          placeholder="Search by skill name"
          prefix-icon="solar:card-search-bold-duotone"
          type="search"
        />
        <BaseInput
          id="skill-level"
          class="w-full md:w-1/3 u-sb-soft-transition"
          placeholder="Filter by skill type"
        />
      </div>
    </template>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[535px] border"
    >
      <CustomSkillsCard
        v-for="(skill, index) in 10"
        :key="skill"
        icon="logos:vue"
        :level="3"
        :name="`#${index + 1} Vue`"
      />
    </div>
    <template #footer>
    </template>
  </BaseDialog>
</template>
