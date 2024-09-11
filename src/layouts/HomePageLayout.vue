<template>
    <the-layout>
        <template #logo>
            <div class="flex gap-1 items-end">
                <a href="/" class="block logo w-[110px]">
                    <the-logo class="block" />
                </a>
                <span class="relative bottom-1 text-xs italic">дизайн</span>
            </div>
        </template>
        <template #menu>
            <home-page-menu />
        </template>
        <template #router-view>
            <home-info v-if="rout.path === '/'" />
            <RouterView v-else />
        </template>
    </the-layout>
</template>

<script setup lang="ts">
import TheLayout from './TheLayout.vue';
import TheLogo from '@/components/TheLogo/TheLogo.vue';
import HomePageMenu from '@/components/HomePageMenu/HomePageMenu.vue';
import { RouterView, useRoute } from 'vue-router';
import HomeInfo from '@/views/HomeInfo.vue';

const rout = useRoute();
</script>