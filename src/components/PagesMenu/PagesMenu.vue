<template>
    <a-menu theme="light" mode="horizontal" class="pages-menu" v-model:selectedKeys="selectedKeys" @click="handleMenuClick">
        <a-menu-item key="/">Компоненты</a-menu-item>
        <a-menu-item key="/templates/scenario">Шаблоны страниц</a-menu-item>
    </a-menu>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const key = computed(() => {
    return route.path.includes('templates') ? '/templates/scenario' : '/';
})

const selectedKeys = ref<string[]>([key.value]);

function handleMenuClick(event: { key: string }) {
    router.push(event.key);
}
</script>

<style src="./PagesMenu.scss"></style>