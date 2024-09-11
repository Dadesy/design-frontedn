<template>
    <page-title title="Предупреждение" />
    <div class="p-5">
        <a-card class="w-full">
            <a-result title="Ведутся технические работы">
                <template #icon>
                    <div class="relative w-[200px] h-[150px] technical-work-icon">
                        <SettingOutlined />
                        <SettingOutlined :style="{ color: colors.colorPrimary }" />
                        <SettingOutlined />
                    </div>
                </template>
                <template #subTitle>
                    <span>На текущий момент наш интернет-ресурс недоступен.<br />Обновите страницу через пару
                        минут.</span>
                </template>
            </a-result>
        </a-card>
    </div>
</template>
<script setup lang="ts">
import PageTitle from '@/components/PageTitle/PageTitle.vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import { useThemeColors } from '@/hooks/useThemeColors';

const { colors } = useThemeColors();
</script>

<style>
@keyframes clockwise {
    0% {
        transform: rotate(0)
    }

    to {
        transform: rotate(360deg)
    }
}

@keyframes counterclockwise {
    0% {
        transform: rotate(0)
    }

    to {
        transform: rotate(-360deg)
    }
}

.technical-work-icon {
    margin: 0 auto;

    .anticon {
        display: block;
        position: absolute;
        padding: 4px;

        svg {
            @apply w-full h-full;
        }
    }

    .anticon:nth-child(1) {
        left: 0;
        bottom: 50px;
        animation: 6s linear 0s normal none infinite running clockwise;

        @apply w-[70px] min-w-[70px] h-[70px] min-h-[70px];
    }

    .anticon:nth-child(2) {
        left: 60px;
        bottom: 10px;
        animation: 6s linear 0s normal none infinite running counterclockwise;

        @apply w-[100px] min-w-[100px] h-[100px] min-h-[100px];
    }

    .anticon:nth-child(3) {
        right: 0;
        bottom: 80px;
        animation: 6s linear 0s normal none infinite running clockwise;

        @apply w-[70px] min-w-[70px] h-[70px] min-h-[70px];
    }
}
</style>
