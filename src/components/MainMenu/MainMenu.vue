<template>
    <a-menu
        v-model:selectedKeys="selectedKeys2"
        v-model:openKeys="openKeys"
        mode="inline"
        @click="handleMenuClick"
    >
        <a-menu-item key="/">
            <form-outlined/>
            <span>Пример формы</span>
        </a-menu-item>

        <a-sub-menu key="/table">
            <template #title>
                <span>
                    <table-outlined/>
                    <span>Пример таблицы</span>
                </span>
            </template>
            <a-menu-item key="/table/basic">
                <span>Базовая таблица</span>
            </a-menu-item>
            <a-menu-item key="/table/advanced">
                <span>Расширенная таблица</span>
            </a-menu-item>
            <a-menu-item key="/table/custom">
                <span>Таблица с модальным окном</span>
            </a-menu-item>
        </a-sub-menu>

        <a-menu-item key="/calendar">
            <CalendarOutlined/>
            <span>Календарь</span>
        </a-menu-item>

        <a-sub-menu key="/error">
            <template #title>
                <span>
                    <warning-outlined/>
                    <span>Страницы ошибок/успеха</span>
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

    </a-menu>
</template>

<script setup lang="ts">
import {FormOutlined, WarningOutlined, TableOutlined, CalendarOutlined} from "@ant-design/icons-vue";
import {ref} from 'vue';
import {useRouter} from "vue-router";

const selectedKeys2 = ref<string[]>(['/']);
const openKeys = ref<string[]>(['/table']);

const router = useRouter();

function handleMenuClick(event: { key: string }) {
    router.push(event.key);
}
</script>

<style src="./MainMenu.scss"></style>
