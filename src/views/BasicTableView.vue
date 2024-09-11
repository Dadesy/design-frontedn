<template>
  <page-title title="Базовая таблица" />
  <div class="p-5">
    <a-table :columns="columns" :data-source="data" bordered :pagination="false" size="small">
      <template #title>
        <a-flex justify="flex-end">
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
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import PageTitle from '@/components/PageTitle/PageTitle.vue';
import { DownloadOutlined } from '@ant-design/icons-vue';
import { useThemeColors } from '@/hooks/useThemeColors';

const { colors } = useThemeColors();

interface DataItem {
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
    title: 'Отдел',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: 'Роли',
    key: 'roles',
    dataIndex: 'roles',
  },
];

const data = ref<DataItem[]>([
  {
    key: '1',
    name: 'Алексей Иванов',
    age: 34,
    address: 'Москва, ул. Тверская, д. 1',
    position: 'Руководитель проектов',
    department: 'IT',
    roles: ['менеджер', 'лидер'],
  },
  {
    key: '2',
    name: 'Мария Петрова',
    age: 29,
    address: 'Санкт-Петербург, Невский проспект, д. 10',
    position: 'Аналитик',
    department: 'Бизнес-аналитика',
    roles: ['аналитик', 'новичок'],
  },
  {
    key: '3',
    name: 'Дмитрий Соколов',
    age: 45,
    address: 'Новосибирск, ул. Ленина, д. 5',
    position: 'Разработчик',
    department: 'Разработка ПО',
    roles: ['сеньор', 'эксперт'],
  },
  {
    key: '4',
    name: 'Ольга Кузнецова',
    age: 31,
    address: 'Казань, ул. Баумана, д. 12',
    position: 'Тестировщик',
    department: 'Контроль качества',
    roles: ['тестировщик', 'педант'],
  },
]);
</script>
