<script setup lang="ts">
interface TheHeaderProps {
  routes: Array<RouteItem>
  langs: Array<MenuItem>
  selectedLangId?: string | null
}

// Dependencies
const { lock, unlock } = useLockScroll()
const { t } = useI18n()

// Input / Output
const props = withDefaults(defineProps<TheHeaderProps>(), {
  selectedLangId: null,
})

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{ (e: 'change-lang', langCode: string): void }>()
// Dependencies
const open = useState('header-drawer-open', () => false)
const isMdUp = ref(false) // Always start with false to avoid hydration mismatch
const rootRef = ref<HTMLElement | null>(null)
const drawerRef = ref<HTMLElement | null>(null)
// The trap spans header + panel so the close toggle stays reachable with Tab
const { activate, deactivate } = useFocusTrap(rootRef)
const { navigatingFromMenu } = usePageTransition()
const currentRoute = useRoute()
const getRouteBaseName = useRouteBaseName()

const isActiveRoute = (r: RouteItem) => {
  if (r.disabled) {
    return false
  }
  if (!r.routeName) {
    return currentRoute.path === r.path
  }
  const baseName = String(getRouteBaseName(currentRoute) ?? '')
  return baseName === r.routeName || baseName.startsWith(`${r.routeName}-`)
}

// Data

// Events
/** Only client: attach/detach listeners */
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && open.value && !e.defaultPrevented) {
    e.preventDefault()
    onClose()
  }
}

const onToggle = (newOpenValue: boolean) => {
  open.value = newOpenValue
  if (open.value) {
    lock()
    activate()
    // Focus the panel itself: moving it onto the first link would flash a focus ring on open
    nextTick(() => drawerRef.value?.focus())
  }
  else {
    unlock()
    deactivate()
  }
}

const onClose = (restoreFocus = true) => {
  if (!open.value) {
    return
  }
  open.value = false
  unlock()
  deactivate(false)
  if (restoreFocus) {
    nextTick(() => rootRef.value?.querySelector<HTMLElement>('[aria-controls="mobile-drawer"]')?.focus())
  }
}

const onNavigateFromMenu = (r: RouteItem) => {
  if (!isActiveRoute(r)) {
    navigatingFromMenu.value = true
  }
  // Focus goes to the new page (route announcer / main), not back to the toggle
  onClose(false)
}

const onSelectLang = (langCode: string | null) => {
  if (!langCode) {
    return
  }
  emit('change-lang', langCode)
}

onMounted(() => {
  if (import.meta.client) {
    // Initialize media query reactivity only on client
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    isMdUp.value = mediaQuery.matches

    const handleMediaChange = (e: MediaQueryListEvent) => {
      isMdUp.value = e.matches
    }

    mediaQuery.addEventListener('change', handleMediaChange)

    // Also add keyboard listener
    window.addEventListener('keydown', onKeydown)

    // Cleanup
    onBeforeUnmount(() => {
      mediaQuery.removeEventListener('change', handleMediaChange)
      window.removeEventListener('keydown', onKeydown)
      unlock()
    })
  }
})

watch(isMdUp, (newVal) => {
  if (newVal && open.value) {
    onClose()
  }
})
</script>

<template>
  <div ref="rootRef" class="relative z-50">
    <!-- HEADER FIXED -->
    <header
      class="fixed top-0 inset-x-0 h-16 border-b border-border backdrop-blur  px-6 md:px-10 sb-transition"
      :class="{
        'bg-bg': open,
        'supports-backdrop-filter:bg-bg/60 bg-bg/80': !open,
      }"
    >
      <div class="h-full flex items-center gap-4 max-w-350 mx-auto">
        <NuxtLink
          class="inline-flex items-center gap-2 sb-h3 tracking-tight hover:opacity-90 sb-focus sb-transition rounded-sm cursor-pointer"
          :to="props.routes[0]?.path || '/'"
          @click="onClose(false)"
        >
          <NuxtImg
            alt=""
            class="object-contain size-8 sm:size-10 md:size-12"
            fetchpriority="high"
            loading="eager"
            src="/images/logo.webp"
          />
          Stefano Biddau
        </NuxtLink>

        <!-- Desktop nav: fixed width (fits the longest locale) with labels spread evenly, so it never resizes on a language switch -->
        <nav class="hidden md:flex md:ml-auto w-100 items-center justify-between bg-surface-2 rounded-lg px-6 py-2">
          <template v-for="r in routes" :key="r.path">
            <NuxtLink
              v-if="!r.disabled"
              :aria-current="isActiveRoute(r) ? 'page' : undefined"
              class="sb-label uppercase relative py-1 cursor-pointer sb-transition sb-focus rounded-sm after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary after:sb-transition"
              :class="{
                'text-ink-muted hover:text-ink after:scale-x-0': !isActiveRoute(r),
                'text-ink font-bold after:scale-x-100': isActiveRoute(r),
              }"
              :to="r.path"
            >
              {{ r.name }}
            </NuxtLink>
            <span
              v-else
              aria-disabled="true"
              class="py-1 sb-label uppercase cursor-not-allowed opacity-50 text-ink-muted rounded-md"
            >
              {{ r.name }}
            </span>
          </template>
        </nav>

        <div class="hidden md:flex">
          <BaseMenu
            icon="solar:globus-bold-duotone"
            :items="props.langs"
            kind="select"
            :label="t('a11y.changeLanguage')"
            placement="bottom-start"
            :selected="props.selectedLangId"
            size="sm"
            variant="ghost"
            @update:selected="onSelectLang"
          />
        </div>

        <!-- Mobile: hamburger -->
        <TheHeaderMenuToggle
          class="ml-auto md:hidden"
          :open="open"
          @toggle="newOpenValue => onToggle(newOpenValue)"
        />
      </div>
    </header>
    <!-- Mobile full-screen menu -->
    <div
      id="mobile-drawer"
      ref="drawerRef"
      :aria-label="t('header.routeSection')"
      :aria-modal="open ? 'true' : undefined"
      class="md:hidden fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-bg outline-none sb-transition-slow"
      :class="open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 motion-reduce:translate-y-0 pointer-events-none'"
      :inert="!open"
      :role="open ? 'dialog' : undefined"
      tabindex="-1"
    >
      <div class="min-h-full flex flex-col justify-end gap-10 px-6 pt-10 pb-10">
        <nav class="flex flex-col">
          <template v-for="r in routes" :key="r.path">
            <NuxtLink
              v-if="!r.disabled"
              :aria-current="isActiveRoute(r) ? 'page' : undefined"
              class="relative flex items-center min-h-14 sb-h2 uppercase cursor-pointer rounded-sm sb-transition sb-focus"
              :class="isActiveRoute(r) ? 'text-ink' : 'text-ink-muted hover:text-ink'"
              :to="r.path"
              @click="onNavigateFromMenu(r)"
            >
              <span
                aria-hidden="true"
                class="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 rounded-full bg-primary sb-transition"
                :class="isActiveRoute(r) ? 'w-6' : 'w-0'"
              ></span>
              <span class="sb-transition" :class="{ 'translate-x-9': isActiveRoute(r) }">{{ r.name }}</span>
            </NuxtLink>
            <span
              v-else
              aria-disabled="true"
              class="flex items-center min-h-14 sb-h2 uppercase cursor-not-allowed opacity-50 text-ink-muted"
            >
              {{ r.name }}
            </span>
          </template>
        </nav>

        <div
          :aria-label="t('a11y.changeLanguage')"
          class="flex gap-2 pt-6 border-t border-border"
          role="group"
        >
          <BaseButton
            v-for="lang in props.langs"
            :key="lang.code"
            :aria-label="lang.label"
            :aria-pressed="lang.code === props.selectedLangId ? 'true' : 'false'"
            class="border-border"
            :is-active="lang.code === props.selectedLangId"
            size="sm"
            variant="ghost"
            @click="onSelectLang(lang.code)"
          >
            {{ lang.code }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
