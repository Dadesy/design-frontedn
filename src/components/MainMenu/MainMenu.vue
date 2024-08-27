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
        <a-menu-item key="/table">
            <table-outlined/>
            <span>Пример таблицы</span>
        </a-menu-item>
        <a-menu-item key="/list">
            <unordered-list-outlined/>
            <span>Пример списка</span>
        </a-menu-item>

<!--        <a-sub-menu key="sub1">
            <template #title>
                            <span>
                              <notification-outlined/>
                              Выпадающее
                            </span>
            </template>
            <a-menu-item key="5">Один</a-menu-item>
            <a-menu-item key="6">Два</a-menu-item>
            <a-menu-item key="7">Три</a-menu-item>
            <a-menu-item key="8">Четыре</a-menu-item>
        </a-sub-menu>-->
    </a-menu>
</template>
<script setup lang="ts">
import {FormOutlined, NotificationOutlined, TableOutlined, UnorderedListOutlined} from "@ant-design/icons-vue";

const selectedKeys2 = ref<string[]>(['/']);
const openKeys = ref<string[]>(['sub1']);

import {ref} from 'vue';
import {useRouter} from "vue-router";
const router = useRouter();

function handleMenuClick(event: { key: string }) {
    router.push(event.key);
}
</script>
<style src="./MainMenu.scss"></style>
