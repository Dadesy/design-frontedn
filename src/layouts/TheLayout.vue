<template>
    <a-space direction="vertical" :size="[0, 48]" class="flex-grow w-full">
        <a-layout class="flex-grow">
            <the-header>
                <template #logo>
                    <slot name="logo"></slot>
                </template>
            </the-header>
            <a-layout-content class="p-0 flex flex-col">
                <a-layout class="flex-grow">
                    <the-sider>
                        <template #menu>
                            <slot name="menu"></slot>
                        </template>
                    </the-sider>
                    <a-layout-content class="flex flex-col">
                        <slot name="router-view">
                            <RouterView />
                        </slot>
                        <the-footer class="mt-auto" />
                    </a-layout-content>
                </a-layout>
            </a-layout-content>
        </a-layout>
    </a-space>
</template>

<script setup lang="ts">
import TheHeader from "@/components/TheHeader/TheHeader.vue";
import TheFooter from "@/components/TheFooter/TheFooter.vue";
import TheSider from '@/components/TheSider/TheSider.vue';
import { useThemeColors } from '@/hooks/useThemeColors';
import type { ICustomColors } from "@/utils/themes/themes";

const { colors } = useThemeColors();

document.body.style.setProperty('--bg-menu-selected', (colors.value as ICustomColors).mainBgColor ? (colors.value as ICustomColors).mainBgColor : colors.value.colorPrimaryBg);
document.body.style.setProperty('--color-menu-selected', (colors.value as ICustomColors).colorSelectedMenu);
document.body.style.setProperty('--placeholder-color', colors.value.colorText);
</script>

<style>
.ant-menu-light.ant-menu-horizontal>.ant-menu-item-selected,
.ant-menu-light.ant-menu-horizontal>.ant-menu-submenu-selected,
.ant-menu-light.ant-menu-horizontal>.ant-menu-item-selected::after,
.ant-menu-light.ant-menu-horizontal>.ant-menu-submenu-selected::after,
.ant-menu-light .ant-menu-item-selected,
.ant-menu-light .ant-menu-submenu-selected>.ant-menu-submenu-title {
    color: var(--color-menu-selected);
}

.ant-menu-light .ant-menu-item-selected,
.ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: var(--bg-menu-selected);
}
</style>