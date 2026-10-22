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
    class="rich-text sb-transition"
    v-html="htmlContent"
  ></div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.rich-text :deep(h1) {
  @apply sb-h1;
  margin: 0 0 0.75em 0;
}

.rich-text :deep(h2) {
  @apply sb-h2;
  margin: 0 0 0.75em 0;
}

.rich-text :deep(h3) {
  @apply sb-h3;
  margin: 0 0 0.75em 0;
}

.rich-text :deep(h4),
.rich-text :deep(h5),
.rich-text :deep(h6) {
  @apply sb-h4;
  margin: 0 0 0.75em 0;
}

.rich-text :deep(p) {
  @apply sb-body;
  max-width: 65ch;
  margin: 0 0 0.75em 0;
}

.rich-text :deep(ul),
.rich-text :deep(ol) {
  @apply sb-body;
  max-width: 65ch;
  margin: 0 0 0.75em 0;
  padding-left: 2rem;
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

.rich-text :deep(blockquote) {
  @apply sb-body;
  font-style: italic;
  margin: 0 0 0.75em 0;
  padding-left: 1rem;
  border-left: 2px solid var(--color-border-strong);
  opacity: 0.8;
}

.rich-text :deep(pre) {
  margin: 1rem 0;
  padding: 1rem;
  background-color: var(--color-surface-2);
  border-radius: var(--radius-md);
  overflow-x: auto;
}

.rich-text :deep(code),
.rich-text :deep(pre code) {
  @apply sb-small font-mono;
}

.rich-text :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
  transition: opacity var(--sb-duration-feedback) var(--ease-in-out);
}

.rich-text :deep(a:hover) {
  opacity: 0.8;
}

.rich-text :deep(strong) {
  font-weight: var(--font-weight-bold);
  color: var(--color-ink);
}

.rich-text :deep(em) {
  font-style: italic;
}
</style>
