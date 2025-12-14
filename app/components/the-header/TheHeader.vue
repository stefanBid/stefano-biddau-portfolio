<!-- app/components/the-header/TheHeader.vue -->

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
const currentRoute = useRoute()

// Data

// Events
/** Only client: attach/detach listeners */
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    onClose()
  }
}

const onToggle = (newOpenValue: boolean) => {
  open.value = newOpenValue
  if (open.value) {
    lock()
  }
  else {
    unlock()
  }
}

const onClose = () => {
  open.value = false
  unlock()
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
      class="fixed top-0 inset-x-0 h-16 border-b border-sb-border backdrop-blur  px-6 md:px-10 u-sb-soft-transition"
      :class="{
        'bg-sb-main': open,
        'supports-backdrop-filter:bg-sb-main/60 bg-sb-main/80': !open,
      }"
    >
      <div class="h-full flex items-center max-w-350 mx-auto justify-between">
        <NuxtLink
          class="inline-flex items-center gap-2 font-bebas-neue ty-sb-title tracking-tight hover:opacity-90 u-sb-focus u-sb-soft-transition rounded cursor-pointer"
          :to="props.routes[0]?.path || '/'"
          @click="onClose"
        >
          <NuxtImg
            alt="Logo"
            class="object-contain size-8 sm:size-10 md:size-12 u-sb-soft-transition"
            fetchpriority="high"
            loading="eager"
            src="/images/logo.webp"
          />
          Stefano Biddau
        </NuxtLink>

        <!-- Desktop nav -->
        <div class="flex items-center">
          <nav class="hidden md:flex items-center gap-6 bg-sb-surface-2 rounded-xl px-4 py-2">
            <template v-for="r in routes" :key="r.path">
              <NuxtLink
                v-if="!r.disabled"
                class="ty-sb-btn-label normal-case! cursor-pointer u-sb-soft-transition u-sb-focus rounded"
                :class="{
                  'text-sb-contrast/80 hover:text-sb-contrast font-normal!': currentRoute.path !== r.path && !r.disabled,
                  'text-sb-accent font-bold!': currentRoute.path === r.path && !r.disabled,
                  'opacity-50 cursor-not-allowed text-sb-contrast/80': r.disabled,
                }"
                :to="r.path"
              >
                {{ r.name }}
              </NuxtLink>
              <span
                v-else
                class="ty-sb-btn-label normal-case! font-normal! cursor-not-allowed opacity-50 text-sb-contrast/80 u-sb-soft-transition rounded-md"
              >
                {{ r.name }}
              </span>
            </template>
          </nav>
          <div class="ml-0 md:ml-4 hidden! md:inline-block!">
            <BaseIconMenu
              icon="solar:globus-bold-duotone"
              :items="props.langs"
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
        class="fixed inset-0 top-16 bg-black/50 transition-opacity duration-200"
        :class="open ? 'opacity-100 pointer-events-auto' :'opacity-0 pointer-events-none'"
        @click="onClose"
      ></div>

      <!-- drawer -->
      <aside
        id="mobile-drawer"
        :aria-modal="open ? 'true' : undefined"
        class="fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 max-w-[85vw] bg-sb-surface border-r border-sb-border shadow-[0_20px_60px_var(--color-sb-shadow)] transition-transform duration-300 will-change-transform"
        :class="open ? 'translate-x-0' : '-translate-x-full'"
        :inert="!open"
        :role="open ? 'dialog' : undefined"
      >
        <div class="flex items-center justify-between px-6 py-3 border-b border-sb-border">
          <span class="ty-label text-sb-muted font-semibold! u-sb-soft-transition">{{ t('header.routeSection') }}</span>
        </div>

        <nav class="flex flex-col gap-2 p-6">
          <template v-for="r in routes" :key="r.path">
            <NuxtLink
              v-if="!r.disabled"
              class="rounded-xl p-3 ty-btn-label cursor-pointer u-sb-soft-transition u-sb-focus"
              :class="{
                'hover:bg-sb-surface-2': currentRoute.path !== r.path,
                'bg-sb-accent font-bold!': currentRoute.path === r.path,
              }"
              :to="r.path"
              @click="onClose"
            >
              {{ r.name }}
            </NuxtLink>
            <span
              v-else
              class="rounded-lg p-3 ty-btn-label cursor-not-allowed opacity-50 text-sb-contrast/80 u-sb-soft-transition"
            >
              {{ r.name }}
            </span>
          </template>
        </nav>
        <div class="flex items-center justify-between px-6 py-3 border-y border-sb-border">
          <span class="ty-label text-sb-muted u-sb-soft-transition font-semibold ">{{ t('header.settingsSection') }}</span>
        </div>
        <div class="p-6">
          <BaseIconMenu
            icon="solar:globus-bold-duotone"
            :items="props.langs"
            :selected-item-id="props.selectedLangId"
            @select="itemId => onSelectLang(itemId)"
          />
        </div>
      </aside>
    </div>
  </div>
</template>
