<template>
    <the-layout>
        <template #logo>
            <a href="/" class="" title="Главная">
                <div class="flex items-center gap-[8px] h-[40px] font-bold logo-text">
                    <img src="../assets//img/notify.svg" alt="Logo" class="w-[38px] h-[38px]">
                    <span class="text-base italic">NOTIFY</span>
                </div>
            </a>
        </template>
        <template #menu>
            <templates-menu />
        </template>
    </the-layout>
</template>

<script setup lang="ts">
import TheLayout from './TheLayout.vue';
import TemplatesMenu from '@/components/TemplatesMenu/TemplatesMenu.vue';
</script>