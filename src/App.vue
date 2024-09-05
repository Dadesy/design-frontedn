<script setup lang="ts">
import { RouterView } from 'vue-router'

import TheHeader from "@/components/TheHeader/TheHeader.vue";
import TheFooter from "@/components/TheFooter/TheFooter.vue";
import TheSider from './components/TheSider/TheSider.vue';

import ru_RU from "ant-design-vue/locale/ru_RU";

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { ref } from "vue";

dayjs.locale('ru')

const currentTheme = ref({ token: undefined });

document.addEventListener('setTheme', (e) => {
    const themeData = (e as CustomEvent).detail;

    currentTheme.value = { token: themeData.token }
})

</script>

<template>
    <a-config-provider :locale="ru_RU" :theme="currentTheme">
        <a-space direction="vertical" :size="[0, 48]" class="flex-grow w-full">

            <a-layout>
                <the-header />
                <a-layout-content class="p-0">
                    <a-layout>
                        <the-sider />
                        <a-layout-content>
                            <RouterView />
                        </a-layout-content>
                    </a-layout>
                </a-layout-content>
                <the-footer />
            </a-layout>

        </a-space>
    </a-config-provider>
</template>

<style scoped></style>
