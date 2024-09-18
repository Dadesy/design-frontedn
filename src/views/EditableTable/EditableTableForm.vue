<template>
    <page-title :title="activeItem?.name" />
    <div class="p-5">
        <a-card class="max-w-screen-sm mx-auto">
            <a-form :model="formState">
                <label class="flex flex-col gap-2 mb-5">
                    <span>Имя</span>
                    <a-input v-model:value="formState.name" placeholder="Введите имя пользователя" />
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Возраст</span>
                    <a-input-number v-model:value="formState.age" :min="1" :max="100" class="w-full" />
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Адрес</span>
                    <a-input v-model:value="formState.address" placeholder="Введите адрес" />
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Должность</span>
                    <a-input v-model:value="formState.position" placeholder="Введите должность" />
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Отдел</span>
                    <a-input v-model:value="formState.department" placeholder="Введите отдел" />
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Роли</span>
                    <a-select v-model:value="formState.roles" mode="multiple" placeholder="Выберите роли">
                        <a-select-option value="Менеджер">Менеджер</a-select-option>
                        <a-select-option value="Лидер">Лидер</a-select-option>
                        <a-select-option value="Аналитик">Аналитик</a-select-option>
                        <a-select-option value="Новичок">Новичок</a-select-option>
                        <a-select-option value="Сеньор">Сеньор</a-select-option>
                        <a-select-option value="Эксперт">Эксперт</a-select-option>
                        <a-select-option value="Тестировщик">Тестировщик</a-select-option>
                    </a-select>
                </label>

                <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="text-center">
                    <a-button type="primary" @click="onSubmit">Сохранить</a-button>
                    <a-button style="margin-left: 10px"
                        @click="router.push(`/components/table/editable`)">Отмена</a-button>
                </a-form-item>

            </a-form>
        </a-card>
    </div>
</template>
<script setup lang="ts">
import PageTitle from '@/components/PageTitle/PageTitle.vue';
import { reactive, ref, type UnwrapRef } from 'vue';
import type { DataItem } from './EditableTable.vue';
import { DATA_ITEMS } from './constants';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();

const route = useRoute();

const activeItem = ref<DataItem | null>(DATA_ITEMS.find((item) => item.key === route.params.key) || null);

interface FormState {
    name: string;
    age: number;
    address: string;
    position: string;
    department: string;
    roles: string[];
}

const formState: UnwrapRef<FormState> = reactive({
    name: activeItem.value?.name || '',
    age: activeItem.value?.age || 0,
    address: activeItem.value?.address || '',
    position: activeItem.value?.position || '',
    department: activeItem.value?.department || '',
    roles: activeItem.value?.roles || [],
});

const onSubmit = () => {
    const index = DATA_ITEMS.findIndex((item) => item.key === route.params.key);
    DATA_ITEMS[index] = { ...formState, key: activeItem.value?.key || '' };
    router.push(`/components/table/editable`);
}
</script>