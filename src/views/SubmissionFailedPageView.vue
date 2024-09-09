<template>
    <page-title title="Ошибка отправки" />
    <div class="p-5">
        <a-card class="w-full">
            <a-result status="error" title="Ошибка отправки"
                sub-title="Пожалуйста, проверьте и измените следующую информацию перед повторной отправкой.">
                <template #extra>
                    <a-button key="console" type="primary">На главную</a-button>
                    <a-button key="buy">Назад</a-button>
                </template>

                <div class="desc">
                    <p style="font-size: 16px">
                        <strong>Отправленный вами контент содержит следующую ошибку:</strong>
                    </p>
                    <p>
                        <close-circle-outlined :style="{ color: 'red' }" />
                        Ваш аккаунт заморожен
                        <a>Разморозить &gt;</a>
                    </p>
                    <p>
                        <close-circle-outlined :style="{ color: 'red' }" />
                        Вы еще не можете подать заявку
                        <a>Разблокировать &gt;</a>
                    </p>
                </div>
            </a-result>
        </a-card>
    </div>
</template>
<script lang="ts" setup>
import { CloseCircleOutlined } from '@ant-design/icons-vue';
import PageTitle from '@/components/PageTitle/PageTitle.vue';
</script>
<style scoped>
.desc p {
    margin-bottom: 1em;
}
</style>
