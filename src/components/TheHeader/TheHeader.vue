<template>
  <div class="rounded-none pl-6 pr-6 border-b border-solid"
    :style="{ borderColor: colors.colorBorderSecondary, backgroundColor: colors.colorPrimaryBg }">
    <div class="flex items-center">
      <div class="w-[226px]">
        <slot name="logo"></slot>
      </div>
      <pages-menu />

      <div class="profile">
        <img src="../../assets//img/user.png" class="block" />
      </div>
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
  @apply ml-auto rounded-full w-10 h-10 min-w-10 cursor-pointer;
}
</style>
