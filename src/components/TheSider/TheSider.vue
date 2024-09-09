<template>
    <a-layout-sider class="flex-grow the-sider pt-5" v-model:collapsed="collapsed" collapsible width="250" theme="light"
        :trigger="null" :style="{ borderRight: `1px solid ${colors.colorBorderSecondary}` }">
        <slot name="menu"></slot>
        <div class="the-sider-trigger pl-[28px] flex items-center gap-2" :class="{ 'is-collapsed': collapsed }"
            :style="{ backgroundColor: colors.colorBgTextHover }" @click="() => (collapsed = !collapsed)">
            <double-right-outlined v-if="collapsed" class="trigger w-[14px] h-[14px]" />
            <double-left-outlined v-else class="trigger w-[14px] min-w-[14px] h-[14px]" />
            <span class="transition-opacity">Свернуть</span>
        </div>
    </a-layout-sider>
</template>

<script setup lang="ts">
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue';
import { ref } from "vue";
import { useThemeColors } from '@/hooks/useThemeColors';

const { colors } = useThemeColors();
const collapsed = ref<boolean>(false);

</script>

<style>
.the-sider-trigger {
    width: 250px;
    position: fixed;
    bottom: 0;
    height: 40px;
    transition: width 0.2s;
    cursor: pointer;
    transition: padding 0.2s, width 0.2s;

    .trigger {
        svg {
            @apply w-full h-full;
        }
    }

    &.is-collapsed {
        width: 80px;
        padding-left: 32px;

        .trigger {
            @apply w-[16px] h-[16px] min-w-[16px];
        }

        span:not(.trigger) {
            opacity: 0;
        }
    }
}
</style>