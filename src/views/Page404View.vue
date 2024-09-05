<template>
    <page-title title="404 не найдено" />
    <div class="p-5 error-page-example">
        <a-card class="w-full">
            <a-result status="404" title="404" sub-title="К сожалению, страница, которую вы посетили, не существует.">
                <template #extra>
                    <a-button type="primary">На главную</a-button>
                </template>
            </a-result>
        </a-card>
    </div>
</template>
<script setup>
import PageTitle from '@/components/PageTitle/PageTitle.vue';
</script>
