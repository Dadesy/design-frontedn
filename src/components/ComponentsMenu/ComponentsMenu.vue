<template>
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" @click="handleMenuClick"
        class="components-menu">
        <a-menu-item key="/components/form">
            <form-outlined />
            <span>Форма</span>
        </a-menu-item>

        <a-sub-menu key="/components/table">
            <template #title>
                <span>
                    <table-outlined />
                    <span>Таблица</span>
                </span>
            </template>
            <a-menu-item key="/components/table/basic">
                <span>Базовая</span>
            </a-menu-item>
            <a-menu-item key="/components/table/advanced">
                <span>Расширенная</span>
            </a-menu-item>
            <a-menu-item key="/components/table/custom">
                <span>С модальным окном</span>
            </a-menu-item>
        </a-sub-menu>

        <a-menu-item key="/components/calendar">
            <CalendarOutlined />
            <span>Календарь</span>
        </a-menu-item>

        <a-sub-menu key="/components/error">
            <template #title>
                <span>
                    <warning-outlined />
                    <span>Ошибки/успех</span>
                </span>
            </template>
            <a-menu-item key="/components/error/success">
                <span>Успешно</span>
            </a-menu-item>
            <a-menu-item key="/components/error/great">
                <span>Задача выполнена</span>
            </a-menu-item>
            <a-menu-item key="/components/error/warning">
                <span>Предупреждение</span>
            </a-menu-item>
            <a-menu-item key="/components/error/403">
                <span>403 Ошибка доступа</span>
            </a-menu-item>
            <a-menu-item key="/components/error/404">
                <span>404 Страница не найдена</span>
            </a-menu-item>
            <a-menu-item key="/components/error/500">
                <span>500 Ошибка сервера</span>
            </a-menu-item>
            <a-menu-item key="/components/error/submission">
                <span>Ошибка отправки</span>
            </a-menu-item>
            <a-menu-item key="/components/error/work">
                <span>Технические работы</span>
            </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="/components/warningForm">
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
const openKeys = ref<string[]>([route.path?.split('/').slice(0, 3).join('/')]);

watch(() => route.path, (newPath) => {
    selectedKeys.value = [newPath];

    const openKey = newPath.split('/').slice(0, 3).join('/');
    openKeys.value = [openKey];
});

function handleMenuClick(event: { key: string }) {
    router.push(event.key);
}
</script>

<style src="./ComponentsMenu.scss"></style>
