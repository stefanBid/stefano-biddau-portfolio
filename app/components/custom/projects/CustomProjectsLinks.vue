<script setup lang="ts">
interface CustomProjectsLinksProps {
  codebaseUrls?: Array<MenuItem>
  deploymentUrls?: Array<MenuItem>
  size?: 'sm' | 'md'
}

interface ProjectLinkGroup {
  urls: MenuItem[]
  icon: string
  label: string
}

// Dependencies
const { t } = useI18n()

// Input / Output
const props = withDefaults(defineProps<CustomProjectsLinksProps>(), {
  codebaseUrls: () => [],
  deploymentUrls: () => [],
  size: 'md',
})

// Data
const MAX_BUTTONS = 3

const _isNpmPackage = (urls: MenuItem[]) => urls.every(url => url.code.includes('npmjs.com'))

// One flat list: up to MAX_BUTTONS links stay visible buttons, more share one menu
const links = computed<MenuItem[]>(() => {
  const groups: ProjectLinkGroup[] = []

  if (props.codebaseUrls.length) {
    groups.push({
      urls: props.codebaseUrls,
      icon: 'solar:code-2-line-duotone',
      label: t('pages.projects.links.code'),
    })
  }

  if (props.deploymentUrls.length) {
    const isPackage = _isNpmPackage(props.deploymentUrls)
    groups.push({
      urls: props.deploymentUrls,
      icon: isPackage ? 'mdi:npm' : 'solar:global-line-duotone',
      label: isPackage ? t('pages.projects.links.package') : t('pages.projects.links.live'),
    })
  }

  return groups.flatMap(group => group.urls.map(url => ({
    code: url.code,
    label: group.label,
    description: group.urls.length > 1 ? url.label : undefined,
    icon: group.icon,
    iconType: 'nuxt-icon' as const,
  })))
})
</script>

<template>
  <template v-if="links.length <= MAX_BUTTONS">
    <BaseButton
      v-for="link in links"
      :key="link.code"
      :size="props.size"
      :to="link.code"
      type="link"
      variant="secondary"
    >
      <Icon
        aria-hidden="true"
        :class="props.size === 'sm' ? 'size-4' : 'size-5'"
        :name="link.icon!"
      />
      {{ link.description ? `${link.label} · ${link.description}` : link.label }}
    </BaseButton>
  </template>
  <BaseMenu
    v-else
    icon="solar:link-line-duotone"
    :items="links"
    :label="t('pages.projects.links.menu')"
    :size="props.size"
  />
</template>
