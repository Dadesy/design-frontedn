<template>
    <the-layout>
        <template #logo>
            <a href="/" class="block logo w-[120px]">
                <the-logo class="block" />
            </a>
        </template>
        <template #menu>
            <home-page-menu />
        </template>
        <template #router-view>
            <home-info v-if="rout.path === '/'"/>
            <RouterView v-else/>
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