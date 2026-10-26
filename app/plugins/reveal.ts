import type { Directive } from 'vue'

const REVEAL_STAGGER_MS = 80 // per index in a list (v-reveal="index")
const REVEAL_MAX_DELAY_MS = 320

export default defineNuxtPlugin((nuxtApp) => {
  let _observer: IntersectionObserver | null = null

  const _getObserver = () => {
    _observer ??= new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }
        const el = entry.target as HTMLElement
        _observer?.unobserve(el)
        el.classList.add('sb-reveal--in')
        // Once in, the element goes back to its own transitions (hover, focus); children's transitionend bubble up too
        const _onEnd = (event: TransitionEvent) => {
          if (event.target !== el || event.propertyName !== 'opacity') {
            return
          }
          el.removeEventListener('transitionend', _onEnd)
          el.classList.remove('sb-reveal', 'sb-reveal--in')
        }
        el.addEventListener('transitionend', _onEnd)
      })
    }, { rootMargin: '0px 0px -10% 0px' })
    return _observer
  }

  // Server HTML stays fully visible: only what is still below the fold on mount gets hidden, so nothing flashes
  const reveal: Directive<HTMLElement, number | undefined> = {
    getSSRProps: () => ({}),
    mounted(el, binding) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        return
      }
      const delay = Math.min((binding.value ?? 0) * REVEAL_STAGGER_MS, REVEAL_MAX_DELAY_MS)
      el.style.setProperty('--sb-reveal-delay', `${delay}ms`)
      el.classList.add('sb-reveal')
      _getObserver().observe(el)
    },
    beforeUnmount(el) {
      _observer?.unobserve(el)
    },
  }

  nuxtApp.vueApp.directive('reveal', reveal)
})
