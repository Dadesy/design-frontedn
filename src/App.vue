<script setup lang="ts">
import {RouterView} from 'vue-router'

import TheHeader from "@/components/TheHeader/TheHeader.vue";
import TheFooter from "@/components/TheFooter/TheFooter.vue";
import MainMenu from "@/components/MainMenu/MainMenu.vue";

import ru_RU from "ant-design-vue/locale/ru_RU";

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

</script>

<template>
    <a-config-provider :locale="ru_RU">
        <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
            <a-layout>
                <a-layout-sider class="flex-grow" collapsible width="300" theme="light">
                    <main-menu/>
                </a-layout-sider>
                <a-layout>
                    <the-header/>
                    <a-layout-content>
                        <RouterView/>
                    </a-layout-content>
                    <the-footer/>
                </a-layout>
            </a-layout>
        </a-space>
    </a-config-provider>
</template>

<style scoped>

</style>
