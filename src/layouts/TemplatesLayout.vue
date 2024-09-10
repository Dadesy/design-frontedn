<template>
    <the-layout>
        <template #logo>
            <a href="/" class="block logo w-[120px]">
                <the-logo class="block" />
            </a>
        </template>
        <template #menu>
            <templates-menu />
        </template>
    </the-layout>
</template>

<script setup lang="ts">
import TheLayout from './TheLayout.vue';
import TheLogo from '@/components/TheLogo/TheLogo.vue';
import TemplatesMenu from '@/components/TemplatesMenu/TemplatesMenu.vue';
</script>