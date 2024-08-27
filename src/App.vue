<script setup lang="ts">
import {RouterView} from 'vue-router'

import TheHeader from "@/components/TheHeader/TheHeader.vue";
import TheFooter from "@/components/TheFooter/TheFooter.vue";
import MainMenu from "@/components/MainMenu/MainMenu.vue";
</script>

<template>
    <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
        <a-layout>
            <a-layout-sider class="h-screen" collapsible width="300" theme="light">
                <main-menu/>
            </a-layout-sider>
            <a-layout>
                <the-header/>
                <a-layout-content>
                    <RouterView/>
                </a-layout-content>
                <the-footer/>
            </a-layout>
        </a-layout>
    </a-space>

</template>

<style scoped>

</style>
