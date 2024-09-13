<template>
    <the-layout>
        <template #logo>
            <div class="flex gap-1 items-end">
                <a href="/" class="block logo w-[110px]">
                    <the-logo class="block" />
                </a>
                <span class="relative bottom-1 italic" :style="{ color: logoColor() }">дизайн</span>
            </div>
        </template>
        <template #menu>
            <components-menu />
        </template>
    </the-layout>
</template>

<script setup lang="ts">
import TheLayout from './TheLayout.vue';
import TheLogo from '@/components/TheLogo/TheLogo.vue';
import ComponentsMenu from '@/components/ComponentsMenu/ComponentsMenu.vue';
import { useThemeColors } from '@/hooks/useThemeColors';
const { colors } = useThemeColors();

const logoColor = () => {
      return colors.value.colorLogo || colors.value.colorText;
}
</script>