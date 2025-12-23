<template>
  <article>
    <BaseCard
      class="h-full"
      variant="dark"
    >
      <!-- Card Header -->
      <template #card-header>
        <div class="relative w-full min-h-42.5 md:min-h-67.5 border-4 border-sb-surface-2 rounded-t-xl bg-sb-muted/20 u-sb-soft-transition">
          <!-- Flex-between content wrapper -->
          <div class="relative z-10 flex flex-col justify-between p-4 md:p-6 u-sb-soft-transition h-full">
            <!-- Top row: skeleton actions buttons -->
            <div class="flex items-center gap-2 self-end mb-10 md:mb-20">
              <div class="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-sb-muted/30 animate-pulse"></div>
              <div class="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-sb-muted/30 animate-pulse"></div>
            </div>

            <!-- Bottom row: skeleton title -->
            <div class="space-y-2">
              <div class="ty-sb-title bg-sb-muted/25 rounded animate-pulse w-3/4">
                &nbsp;
              </div>
              <div class="ty-sb-title bg-sb-muted/25 rounded animate-pulse w-1/2">
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Card Body -->
      <template #card-body>
        <div class="space-y-2">
          <div class="ty-sb-paragraph bg-sb-muted/10 rounded animate-pulse w-full">
            &nbsp;
          </div>
          <div class="ty-sb-paragraph bg-sb-muted/10 rounded animate-pulse w-full">
            &nbsp;
          </div>
          <div class="ty-sb-paragraph bg-sb-muted/10 rounded animate-pulse w-5/6">
            &nbsp;
          </div>
        </div>
      </template>

      <!-- Card Footer -->
      <template #card-footer>
        <div class="ty-sb-label bg-sb-muted/15 rounded animate-pulse w-24 px-2 py-1">
          &nbsp;
        </div>
      </template>
    </BaseCard>
  </article>
</template>
