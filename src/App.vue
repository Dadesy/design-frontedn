<script setup lang="ts">
import { RouterView } from 'vue-router'

import ru_RU from "ant-design-vue/locale/ru_RU";

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { ref } from "vue";
import { THEME_LIST } from './utils/themes/themes';

dayjs.locale('ru')

const currentTheme = localStorage.getItem('theme');
const theme = ref(currentTheme ? { token: THEME_LIST[currentTheme]?.token } : { token: undefined });

document.addEventListener('setTheme', (e) => {
    const themeData = (e as CustomEvent).detail;

    theme.value = { token: themeData.token }
})

</script>

<template>
    <a-config-provider :locale="ru_RU" :theme="{ ...theme, cssVar: true }">
        <RouterView />
    </a-config-provider>
</template>

<style>
#app .ant-space-item {
    @apply flex-grow flex flex-col;
}
</style>
