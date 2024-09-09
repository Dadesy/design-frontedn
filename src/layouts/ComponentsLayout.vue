<template>
    <the-layout>
        <template #logo>
            <a href="/" class="block logo w-40">
                <the-logo class="block" />
            </a>
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
</script>