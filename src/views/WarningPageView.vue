<template>
    <page-title title="Предупреждение" />
    <div class="p-5 error-page-example">
        <a-card class="w-full">
            <a-result status="warning" title="Возникли проблемы с вашей операцией"
                sub-title="Дополнительная информация: Номер заказа: 2017182818828182881.">
                <template #extra>
                    <a-button key="console" type="primary">На главную</a-button>
                </template>
            </a-result>
        </a-card>
    </div>
</template>
<script setup>
import PageTitle from '@/components/PageTitle/PageTitle.vue';
</script>
