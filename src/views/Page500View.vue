<template>
    <page-title title="500 ошибка сервера" />
    <div class="p-5">
        <a-card class="w-full">
            <a-result status="500" title="500" sub-title="Извините, ошибка сервера.">
                <template #extra>
                    <a-button type="primary">На главную</a-button>
                </template>
            </a-result>
        </a-card>
    </div>
</template>
<script setup lang="ts">
import PageTitle from '@/components/PageTitle/PageTitle.vue';
</script>
