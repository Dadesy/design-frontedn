<template>
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline" @click="handleMenuClick" class="components-menu">
        <a-menu-item key="/">
            <FileTextOutlined />
            <span>Дизайн-система</span>
        </a-menu-item>
    </a-menu>
</template>

<script setup lang="ts">
import { FileTextOutlined } from "@ant-design/icons-vue";
import { ref, watch } from 'vue';
import { useRoute, useRouter } from "vue-router";


const router = useRouter();
const route = useRoute();

const selectedKeys = ref<string[]>([route.path]);

watch(() => route.path, (newPath) => {
    selectedKeys.value = [newPath];
});

function handleMenuClick(event: { key: string }) {
    router.push(event.key);
}
</script>

<style src="./HomePageMenu.scss"></style>
