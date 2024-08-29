<template>
    <div class="p-5 error-page-example">
        <a-card class="w-full">
            <a-result title="Отлично! Задача успешно выполнена!">
                <template #icon>
                    <smile-twoTone/>
                </template>
                <template #extra>
                    <a-button type="primary">Далее</a-button>
                </template>
            </a-result>
        </a-card>
    </div>
</template>
<script lang="ts">
import {SmileTwoTone} from '@ant-design/icons-vue';
import {defineComponent} from 'vue';

export default defineComponent({
    components: {
        SmileTwoTone,
    },
});
</script>

