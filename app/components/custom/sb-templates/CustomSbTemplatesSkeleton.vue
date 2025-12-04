<template>
  <article>
    <BaseCard
      class="h-full"
      full-custom-content
      variant="dark"
    >
      <!-- Header: Logo skeleton -->
      <div class="flex items-center justify-center p-8 md:p-10 bg-sb-surface-2 rounded-xl u-sb-soft-transition">
        <div class="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center rounded-2xl bg-sb-muted/20 shadow-[0_8px_30px_var(--color-sb-shadow)] ring-1 ring-white/5 animate-pulse u-sb-soft-transition">
          <div class="w-20 h-20 md:w-24 md:h-24 bg-sb-muted/30 rounded-xl"></div>
        </div>
      </div>

      <!-- Body: Title, Description, Technologies skeleton -->
      <div class="flex-1 flex flex-col px-4 py-5 md:px-6 md:py-6 u-sb-soft-transition">
        <!-- Title skeleton -->
        <div class="flex justify-center">
          <div class="ty-sb-title bg-sb-muted/20 rounded animate-pulse w-2/3">
            &nbsp;
          </div>
        </div>

        <!-- Description skeleton -->
        <div class="space-y-2 mt-3">
          <div class="ty-sb-paragraph bg-sb-muted/15 rounded animate-pulse w-full">
            &nbsp;
          </div>
          <div class="ty-sb-paragraph bg-sb-muted/15 rounded animate-pulse w-5/6 mx-auto">
            &nbsp;
          </div>
        </div>

        <!-- Technologies skeleton -->
        <div class="flex items-center justify-center gap-2 mt-6">
          <div class="size-6 md:size-7 bg-sb-muted/20 rounded animate-pulse"></div>
          <div class="ty-sb-label bg-sb-muted/15 rounded animate-pulse w-4">
            &nbsp;
          </div>
          <div class="size-6 md:size-7 bg-sb-muted/20 rounded animate-pulse"></div>
        </div>

        <!-- Spacer -->
        <div class="flex-1"></div>

        <!-- CTA skeleton -->
        <div class="mt-6 flex justify-center">
          <div class="ty-sb-btn-label bg-sb-muted/20 rounded-xl animate-pulse w-full h-10 md:h-12">
            &nbsp;
          </div>
        </div>
      </div>
    </BaseCard>
  </article>
</template>
