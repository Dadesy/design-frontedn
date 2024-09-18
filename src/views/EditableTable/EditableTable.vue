<template>
    <page-title title="Редактируемая таблица" />
    <div class="p-5">
        <a-table :columns="columns" :data-source="data" bordered :pagination="false" size="small">
            <template #title>
                <a-flex justify="flex-end" gap="small">
                    <a-button type="primary" :icon="h(PlusOutlined)">Добавить</a-button>
                    <a-tooltip title="Выгрузить в Excel" placement="left">
                        <a-button :icon="h(DownloadOutlined)"></a-button>
                    </a-tooltip>
                </a-flex>
            </template>
            <template #headerCell="{ column }">
                <template v-if="column.key === 'name'">
                    <span>Имя</span>
                </template>
            </template>

            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <span>{{ record.name }}</span>
                </template>
                <template v-else-if="column.key === 'roles'">
                    <span>
                        <a-tag v-for="role in record.roles" :key="role" :bordered="false"
                            :style="{ backgroundColor: colors.colorPrimaryBg }">
                            {{ role.toUpperCase() }}
                        </a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'actions'">
                    <a-tooltip title="Редактировать" placement="left">
                        <a-button :icon="h(EditOutlined)" @click="router.push(`editable/${record.key}`)"></a-button>
                    </a-tooltip>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import PageTitle from '@/components/PageTitle/PageTitle.vue';
import { DownloadOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons-vue';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useRouter } from 'vue-router';
import { DATA_ITEMS } from './constants';

const { colors } = useThemeColors();
const router = useRouter();

export interface DataItem {
    key: string;
    name: string;
    age: number;
    address: string;
    position: string;
    department: string;
    roles: string[];
}

const columns = [
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Возраст',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Адрес',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Должность',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: 'Роли',
        key: 'roles',
        dataIndex: 'roles',
    },
    {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
    },
];

const data = ref<DataItem[]>(DATA_ITEMS);
</script>