<template>
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline" @click="handleMenuClick" class="components-menu">
        <a-menu-item key="/templates/scenario">
            <CodeOutlined />
            <span>Сценарий</span>
        </a-menu-item>

        <a-menu-item key="/templates/journal">
            <SwapOutlined />
            <span>Журнал обменов</span>
        </a-menu-item>

        <a-menu-item key="/templates/users">
            <UserOutlined />
            <span>Пользователи</span>
        </a-menu-item>
    </a-menu>
</template>

<script setup lang="ts">
import { SwapOutlined, CodeOutlined, UserOutlined } from "@ant-design/icons-vue";
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

<style src="./TemplatesMenu.scss"></style>
