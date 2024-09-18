<template>
    <a-layout-footer class="text-center the-footer" :style="{ borderTop: `1px solid ${colors.colorBorderSecondary}`, backgroundColor: colors.colorBgContainer }">
        Эфко дизайн ©2024
    </a-layout-footer>
</template>

<script setup lang="ts">
import { useThemeColors } from '@/hooks/useThemeColors';
const { colors } = useThemeColors();
</script>
