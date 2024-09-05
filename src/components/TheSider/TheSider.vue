<template>
    <a-layout-sider class="flex-grow the-sider pt-5" v-model:collapsed="collapsed" collapsible width="250" theme="light"
        :trigger="null">
        <components-menu />
        <div class="the-sider-trigger" :class="{ 'is-collapsed': collapsed }">
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </div>
    </a-layout-sider>
</template>

<script setup lang="ts">
import ComponentsMenu from '../ComponentsMenu/ComponentsMenu.vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { ref } from "vue";

const collapsed = ref<boolean>(false);

</script>

<style scoped>
.the-sider-trigger {
    width: 250px;
    position: fixed;
    bottom: 0;

    background-color: var(--ant-primary-color); 

    &.is-collapsed {
        width: 80px;
    }
}

.the-sider {
    border-right: 1px solid rgba(5, 5, 5, 0.06);
}
</style>