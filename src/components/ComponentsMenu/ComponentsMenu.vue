<template>
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" @click="handleMenuClick"
        class="components-menu">
        <a-menu-item key="/">
            <form-outlined />
            <span>Форма</span>
        </a-menu-item>

        <a-sub-menu key="/table">
            <template #title>
                <span>
                    <table-outlined />
                    <span>Таблица</span>
                </span>
            </template>
            <a-menu-item key="/table/basic">
                <span>Базовая</span>
            </a-menu-item>
            <a-menu-item key="/table/advanced">
                <span>Расширенная</span>
            </a-menu-item>
            <a-menu-item key="/table/custom">
                <span>С модальным окном</span>
            </a-menu-item>
        </a-sub-menu>

        <a-menu-item key="/calendar">
            <CalendarOutlined />
            <span>Календарь</span>
        </a-menu-item>

        <a-sub-menu key="/error">
            <template #title>
                <span>
                    <warning-outlined />
                    <span>Ошибки/успех</span>
                </span>
            </template>
            <a-menu-item key="/error/success">
                <span>Успешно</span>
            </a-menu-item>
            <a-menu-item key="/error/great">
                <span>Задача выполнена</span>
            </a-menu-item>
            <a-menu-item key="/error/warning">
                <span>Предупреждение</span>
            </a-menu-item>
            <a-menu-item key="/error/403">
                <span>403 Ошибка доступа</span>
            </a-menu-item>
            <a-menu-item key="/error/404">
                <span>404 Страница не найдена</span>
            </a-menu-item>
            <a-menu-item key="/error/500">
                <span>500 Ошибка сервера</span>
            </a-menu-item>
            <a-menu-item key="/error/submission">
                <span>Ошибка отправки</span>
            </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="/warningForm">
            <appstore-outlined />
            <span>Предупреждающие окна</span>
        </a-menu-item>
    </a-menu>
</template>

<script setup lang="ts">
import { FormOutlined, WarningOutlined, AppstoreOutlined, TableOutlined, CalendarOutlined } from "@ant-design/icons-vue";
import { ref, watch } from 'vue';
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const selectedKeys = ref<string[]>([route.path]);
const openKeys = ref<string[]>([route.path?.split('/').slice(0, 2).join('/')]);

watch(() => route.path, (newPath) => {
    selectedKeys.value = [newPath];

    const openKey = newPath.split('/').slice(0, 2).join('/');
    openKeys.value = [openKey];
});

function handleMenuClick(event: { key: string }) {
    router.push(event.key);
}
</script>

<style src="./ComponentsMenu.scss"></style>
