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
const drawerRef = ref<HTMLElement | null>(null)
const { activate, deactivate } = useFocusTrap(drawerRef)
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
  if (e.key === 'Escape' && open.value) {
    e.preventDefault()
    onClose()
  }
}

const onToggle = (newOpenValue: boolean) => {
  open.value = newOpenValue
  if (open.value) {
    lock()
    activate()
    nextTick(() => drawerRef.value?.querySelector<HTMLElement>('a[href]')?.focus())
  }
  else {
    unlock()
    deactivate()
  }
}

const onClose = () => {
  if (!open.value) {
    return
  }
  open.value = false
  unlock()
  deactivate()
}

const onSelectLang = (langCode: string) => {
  // Emit lang change
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
  <div class="relative z-50">
    <!-- HEADER FIXED -->
    <header
      class="fixed top-0 inset-x-0 h-16 border-b border-border backdrop-blur  px-6 md:px-10 sb-transition"
      :class="{
        'bg-bg': open,
        'supports-backdrop-filter:bg-bg/60 bg-bg/80': !open,
      }"
    >
      <div class="h-full flex items-center max-w-350 mx-auto justify-between">
        <NuxtLink
          class="inline-flex items-center gap-2 sb-h3 tracking-tight hover:opacity-90 sb-focus sb-transition rounded-sm cursor-pointer"
          :to="props.routes[0]?.path || '/'"
          @click="onClose"
        >
          <NuxtImg
            alt="Logo"
            class="object-contain size-8 sm:size-10 md:size-12"
            fetchpriority="high"
            loading="eager"
            src="/images/logo.webp"
          />
          Stefano Biddau
        </NuxtLink>

        <!-- Desktop nav -->
        <div class="flex items-center">
          <nav class="hidden md:flex items-center gap-6 bg-surface-2 rounded-lg px-4 py-2">
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
                class="sb-label uppercase cursor-not-allowed opacity-50 text-ink-muted rounded-md"
              >
                {{ r.name }}
              </span>
            </template>
          </nav>
          <div class="ml-0 md:ml-4 hidden! md:inline-block!">
            <BaseIconMenu
              icon="solar:globus-bold-duotone"
              :items="props.langs"
              :label="t('a11y.changeLanguage')"
              :selected-item-id="props.selectedLangId"
              @select="itemId => onSelectLang(itemId)"
            />
          </div>
        </div>
        <!-- Mobile: hamburger -->
        <TheHeaderMenuToggle
          class="md:hidden"
          :open="open"
          @toggle="newOpenValue => onToggle(newOpenValue)"
        />
      </div>
    </header>
    <!-- OVERLAY + DRAWER -->
    <div class="md:hidden">
      <!-- overlay -->
      <div
        aria-hidden="true"
        class="fixed inset-0 top-16 bg-bg/80 backdrop-blur-sm sb-transition"
        :class="open ? 'opacity-100 pointer-events-auto' :'opacity-0 pointer-events-none'"
        @click="onClose"
      ></div>

      <!-- drawer -->
      <aside
        id="mobile-drawer"
        ref="drawerRef"
        :aria-labelledby="open ? 'mobile-drawer-title' : undefined"
        :aria-modal="open ? 'true' : undefined"
        class="fixed right-0 top-16 h-[calc(100dvh-4rem)] w-72 max-w-[85vw] flex flex-col bg-surface border-l border-border shadow-lg sb-transition-slow will-change-transform"
        :class="open ? 'translate-x-0' : 'translate-x-full'"
        :inert="!open"
        :role="open ? 'dialog' : undefined"
      >
        <div class="mt-auto flex items-center justify-between px-6 py-3 border-y border-border">
          <span id="mobile-drawer-title" class="sb-overline text-ink-muted font-bold!">{{ t('header.routeSection') }}</span>
        </div>

        <nav class="flex flex-col gap-2 p-6">
          <template v-for="r in routes" :key="r.path">
            <NuxtLink
              v-if="!r.disabled"
              :aria-current="isActiveRoute(r) ? 'page' : undefined"
              class="rounded-lg p-3 sb-body cursor-pointer sb-transition sb-focus"
              :class="{
                'hover:bg-surface-2': !isActiveRoute(r),
                'bg-primary text-on-primary sb-body-strong': isActiveRoute(r),
              }"
              :to="r.path"
              @click="onClose"
            >
              {{ r.name }}
            </NuxtLink>
            <span
              v-else
              aria-disabled="true"
              class="rounded-md p-3 sb-body cursor-not-allowed opacity-50 text-ink/80"
            >
              {{ r.name }}
            </span>
          </template>
        </nav>
        <div class="flex items-center justify-between px-6 py-3 border-y border-border">
          <span class="sb-overline text-ink-muted font-bold!">{{ t('header.settingsSection') }}</span>
        </div>
        <div class="p-6">
          <BaseIconMenu
            icon="solar:globus-bold-duotone"
            :items="props.langs"
            :label="t('a11y.changeLanguage')"
            :selected-item-id="props.selectedLangId"
            @select="itemId => onSelectLang(itemId)"
          />
        </div>
      </aside>
    </div>
  </div>
</template>
