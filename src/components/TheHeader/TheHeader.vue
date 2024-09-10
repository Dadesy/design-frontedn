<template>
  <div class="rounded-none pl-6 pr-6 border-b border-solid"
    :style="{ borderColor: colors.colorBorderSecondary, backgroundColor: colors.colorPrimaryBg }">
    <div class="flex items-center justify-between">
      <div class="w-[226px]">
        <slot name="logo"></slot>
      </div>

      <a-flex align="center" gap="large">
        <pages-menu />
        <div class="profile" :style="{ backgroundColor: colors.colorPrimary, color: colors.colorTextLightSolid }">
          АП
        </div>
      </a-flex>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PagesMenu from '../PagesMenu/PagesMenu.vue';
import { useThemeColors } from '@/hooks/useThemeColors';

const { colors } = useThemeColors();

console.log(colors.value);

</script>
<style>
.profile {
  @apply ml-auto rounded-full w-7 h-7 min-w-7 cursor-pointer flex items-center justify-center text-xs;
}
</style>
