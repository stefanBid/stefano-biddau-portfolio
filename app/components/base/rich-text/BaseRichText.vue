<script setup lang="ts">
interface Props {
  blocks: RichBlock[]
}

// Dependencies
const { sanitizeHtml } = useSanitize()

// Input / Output
const props = defineProps<Props>()

// State
const htmlContent = computed(() => {
  const html = blocksToHtml(props.blocks)
  return sanitizeHtml(html)
})
</script>

<template>
  <div
    class="rich-text u-sb-soft-transition"
    v-html="htmlContent"
  ></div>
</template>

<style scoped>
/* Typography styles conformi al progetto — usa i token --fs-sb-* fluidi
   invece di size fisse a scatti sui breakpoint, coerente con il resto
   del design system (vedi theme.css). */

/* h1 = ty-sb-h1 */
.rich-text :deep(h1) {
  font-family: var(--font-bebas-neue);
  text-transform: uppercase;
  letter-spacing: -0.025em; /* tracking-tight */
  line-height: 1; /* leading-none */
  font-size: var(--fs-sb-h1);
  margin: 0 0 0.75em 0;
}

/* h2 = ty-sb-h2 */
.rich-text :deep(h2) {
  font-family: var(--font-bebas-neue);
  text-transform: uppercase;
  letter-spacing: -0.025em; /* tracking-tight */
  line-height: 1.25; /* leading-tight */
  font-size: var(--fs-sb-h2);
  margin: 0 0 0.75em 0;
}

/* h3 = ty-sb-h3 */
.rich-text :deep(h3) {
  font-family: var(--font-bebas-neue);
  line-height: 1.25; /* leading-tight */
  font-size: var(--fs-sb-h3);
  margin: 0 0 0.75em 0;
}

/* h4-h6 = ty-sb-h4 */
.rich-text :deep(h4),
.rich-text :deep(h5),
.rich-text :deep(h6) {
  font-family: var(--font-space-mono);
  font-weight: 600; /* font-semibold */
  line-height: 1.375; /* leading-snug */
  font-size: var(--fs-sb-h4);
  margin: 0 0 0.75em 0;
}

/* p, ul, ol = ty-sb-p */
.rich-text :deep(p) {
  font-family: var(--font-space-mono);
  line-height: 1.625; /* leading-relaxed */
  font-size: var(--fs-sb-p);
  margin: 0 0 0.75em 0;
}

.rich-text :deep(ul),
.rich-text :deep(ol) {
  font-family: var(--font-space-mono);
  line-height: 1.625; /* leading-relaxed */
  font-size: var(--fs-sb-p);
  margin: 0 0 0.75em 0;
  padding-left: 2rem; /* Aumentato per dare spazio ai bullet */
  list-style-position: outside;
}

.rich-text :deep(li) {
  margin-bottom: 0.5em;
  display: list-item;
}

.rich-text :deep(ul li) {
  list-style-type: disc;
}

.rich-text :deep(ol li) {
  list-style-type: decimal;
}

/* blockquote = ty-sb-p + italic */
.rich-text :deep(blockquote) {
  font-family: var(--font-space-mono);
  line-height: 1.625; /* leading-relaxed */
  font-size: var(--fs-sb-p);
  font-style: italic;
  margin: 0 0 0.75em 0;
  padding-left: 1rem;
  border-left: 4px solid var(--color-sb-accent);
  opacity: 0.8;
}

.rich-text :deep(pre) {
  margin: 1rem 0;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.375rem;
  overflow-x: auto;
}

@media (prefers-color-scheme: dark) {
  .rich-text :deep(pre) {
    background-color: rgba(255, 255, 255, 0.05);
  }
}

.rich-text :deep(code) {
  font-family: var(--font-space-mono);
  font-size: var(--fs-sb-small);
}

.rich-text :deep(pre code) {
  font-size: var(--fs-sb-small);
}

.rich-text :deep(a) {
  color: var(--color-sb-accent);
  text-decoration: underline;
  transition: opacity 300ms ease-in-out;
}

.rich-text :deep(a:hover) {
  opacity: 0.8;
}

.rich-text :deep(strong) {
  font-weight: 700;
  color: var(--color-sb-contrast);
}

.rich-text :deep(em) {
  font-style: italic;
}
</style>
