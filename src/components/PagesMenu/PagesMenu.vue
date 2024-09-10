<template>
    <a-menu theme="light" mode="horizontal" class="pages-menu" v-model:selectedKeys="selectedKeys" @click="handleMenuClick">
        <a-menu-item key="/">Главная</a-menu-item>
        <a-menu-item key="/components/form">Компоненты</a-menu-item>
        <a-menu-item key="/templates/scenario">Шаблоны страниц</a-menu-item>
    </a-menu>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const key = computed(() => {
    switch (true) {
        case route.path.includes('templates'):
            return '/templates/scenario';
        case route.path.includes('components'):
            return '/components/form';
        default:
            return '/';
    }
});

const selectedKeys = ref<string[]>([key.value]);

function handleMenuClick(event: { key: string }) {
    router.push(event.key);
}
</script>

<style src="./PagesMenu.scss"></style>