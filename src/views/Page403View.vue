<template>
    <page-title title="403 ошибка доступа" />
    <div class="p-5">
        <a-card class="w-full">
            <a-result status="403" title="403" sub-title="К сожалению, у вас нет прав доступа к этой странице.">
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
