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
                    Пример таблицы
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

    <a-menu-item key="/list">
      <unordered-list-outlined/>
      <span>Пример списка</span>
    </a-menu-item>

  </a-menu>
</template>

<script setup lang="ts">
import {FormOutlined, NotificationOutlined, TableOutlined, UnorderedListOutlined} from "@ant-design/icons-vue";
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
