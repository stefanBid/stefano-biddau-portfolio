<script setup lang="ts">
interface CustomSkillsDialogProps {
  openDialog: boolean
}
// Dependencies
const { t } = useI18n()
// const { success, error } = useNotification()

// Input / Output
const props = defineProps<CustomSkillsDialogProps>()

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'closeDialog', value: boolean): void
}>()

// State
const currentPage = ref<number>(1)
const totalSkills = ref<number>(42)
const skillsPerPage = ref<number>(9)
const totalPages = computed(() => Math.ceil(totalSkills.value / skillsPerPage.value))

// Events
const onCloseDialog = () => {
  emits('closeDialog', false)
}

const onGoToPrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}
const onGoToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
  }
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
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[535px]"
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
      <div class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 w-full">
        <div class="text-sb-accent ty-sb-caption u-sb-soft-transition">
          {{ t('pages.skills.skillsDialog.total', { tot: totalSkills }) }}
        </div>
        <div class="flex items-center gap-4">
          <BaseButton
            class="p-2!"
            :is-disabled="currentPage === 1"
            variant="secondary"
            @click="onGoToPrevPage"
          >
            <Icon name="solar:map-arrow-left-bold-duotone" />
          </BaseButton>
          <span class=" text-sb-accent ty-sb-caption u-sb-soft-transition">
            {{ currentPage }} / {{ totalPages }}
          </span>
          <BaseButton
            class="p-2!"
            :is-disabled="currentPage === totalPages"
            variant="secondary"
            @click="onGoToNextPage"
          >
            <Icon name="solar:map-arrow-right-bold-duotone" />
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>
