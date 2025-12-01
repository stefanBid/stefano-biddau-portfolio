<script setup lang="ts">
interface CustomSkillsDialogProps {
  openDialog: boolean
  filterPreset?: SkillsFilterPreset
}
// Dependencies
const { t } = useI18n()
const { error } = useNotification()

const {
  data: skills,
  pending,
  fetchSkills,
  error: fetchError,
  pagination,
} = useSkills()

// Input / Output
const props = withDefaults(defineProps<CustomSkillsDialogProps>(), {
  filterPreset: undefined,
})

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'closeDialog', value: boolean): void
}>()

// State
const isFromPreset = ref<boolean>(false)
const skillsKey = ref<string>('')
const skillsTypes = ref<SkillType[]>([])
const debounceHandle = ref<ReturnType<typeof setTimeout> | null>(null)

const typesItems = computed<{ label: string, value: SkillType }[]>(() => [
  { label: t('pages.skills.skillsDialog.filterOptions.feLang'), value: 'feLang' },
  { label: t('pages.skills.skillsDialog.filterOptions.feFramework'), value: 'feFramework' },
  { label: t('pages.skills.skillsDialog.filterOptions.beLang'), value: 'beLang' },
  { label: t('pages.skills.skillsDialog.filterOptions.beFramework'), value: 'beFramework' },
  { label: t('pages.skills.skillsDialog.filterOptions.database'), value: 'database' },
  { label: t('pages.skills.skillsDialog.filterOptions.tool'), value: 'tool' },
  { label: t('pages.skills.skillsDialog.filterOptions.other'), value: 'other' },
])

const currentPage = computed(() => pagination.value?.page ?? 1)
const totalPages = computed(() => pagination.value?.pageCount ?? 1)
const totalSkills = computed(() => pagination.value?.total ?? 0)

// Events
const onCloseDialog = () => {
  emits('closeDialog', false)
}

const onGoToPrevPage = () => {
  if (pending.value) {
    return
  }
  if (currentPage.value > 1) {
    _triggerFetch(currentPage.value - 1)
  }
}
const onGoToNextPage = () => {
  if (pending.value) {
    return
  }
  if (currentPage.value < totalPages.value) {
    _triggerFetch(currentPage.value + 1)
  }
}

watch(
  () => props.openDialog,
  (isOpen) => {
    if (!isOpen) {
      isFromPreset.value = false
      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        skillsKey.value = ''
        skillsTypes.value = []
      }, 300)
      return
    }

    const hasPreset
      = !!props.filterPreset
        && ((props.filterPreset.key && props.filterPreset.key.length > 0)
          || (props.filterPreset.filters && props.filterPreset.filters.length > 0))

    if (hasPreset) {
      isFromPreset.value = true
      skillsKey.value = props.filterPreset!.key || ''
      skillsTypes.value = props.filterPreset!.filters || []
    }

    _triggerFetch(1)
  },
)

watch([skillsKey, skillsTypes], () => {
  if (!props.openDialog) {
    return
  }

  if (isFromPreset.value) {
    isFromPreset.value = false
    return
  }

  _debouncedFetch()
})

watch(fetchError, (newError) => {
  if (!import.meta.client) {
    return
  } // ← GUARD CLIENT-ONLY
  if (newError) {
    error({
      title: t('pages.skills.skillsDialog.noSkills.title'),
      message: t('pages.skills.skillsDialog.noSkills.message'),
      autoClose: true,
      dismissible: true,
    })
  }
}, { immediate: true })

onBeforeUnmount(() => {
  if (debounceHandle.value) {
    clearTimeout(debounceHandle.value)
  }
})

// Private methods
const _triggerFetch = (page?: number) => {
  fetchSkills({
    name: skillsKey.value,
    types: skillsTypes.value,
    page: page ?? currentPage.value,
  })
}

const _debouncedFetch = () => {
  if (debounceHandle.value) {
    clearTimeout(debounceHandle.value)
  }
  debounceHandle.value = setTimeout(() => {
    _triggerFetch(1)
  }, 400)
}
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
          v-model:input="skillsKey"
          class="w-full md:w-2/3 u-sb-soft-transition"
          :placeholder="t('pages.skills.skillsDialog.filters.searchPlaceholder')"
          prefix-icon="solar:card-search-bold-duotone"
          type="search"
        />
        <BaseCombobox
          id="skill-level"
          v-model:input="skillsTypes"
          class="w-full md:w-1/3 u-sb-soft-transition"
          :items="typesItems"
          :placeholder="t('pages.skills.skillsDialog.filters.typePlaceholder')"
          prefix-icon="solar:filter-bold-duotone"
          type="multiple"
        />
      </div>
    </template>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 auto-rows-fr items-stretch u-sb-soft-transition"
    >
      <template v-if="pending">
        <CustomSkillsSkeleton
          v-for="index in 9"
          :key="`skill-skeleton-${index}`"
          class="h-20 md:h-24 "
        />
      </template>
      <template v-else-if="skills && skills.length > 0">
        <CustomSkillsCard
          v-for="skill in skills"
          :key="skill.id"
          class="h-20 md:h-24 "
          :icon="skill.icon || 'solar:bolt-line-duotone'"
          :level="skill.level || 0"
          :name="skill.name"
        />
      </template>
      <div
        v-else
        class="col-span-1 sm:col-span-2 lg:col-span-3 p-6 text-center ty-sb-caption text-sb-muted u-sb-soft-transition"
      >
        {{ t('pages.skills.skillsDialog.noResults') }}
      </div>
    </div>
    <template #footer>
      <div class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 w-full">
        <div class="text-sb-accent ty-sb-caption u-sb-soft-transition">
          {{ t('pages.skills.skillsDialog.total', { tot: totalSkills }) }}
        </div>
        <div class="flex items-center gap-4">
          <BaseButton
            class="p-2!"
            :is-disabled="pending || currentPage === 1 || totalPages === 0"
            variant="secondary"
            @click="onGoToPrevPage"
          >
            <Icon name="solar:map-arrow-left-bold-duotone" />
          </BaseButton>
          <span class=" text-sb-accent ty-sb-caption u-sb-soft-transition">
            {{ currentPage }} / {{ totalPages === 0 ? 1 : totalPages }}
          </span>
          <BaseButton
            class="p-2!"
            :is-disabled="pending || currentPage === totalPages || totalPages === 0"
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
