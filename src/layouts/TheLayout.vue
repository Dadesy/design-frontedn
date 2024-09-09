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
                            <RouterView />
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
</script>