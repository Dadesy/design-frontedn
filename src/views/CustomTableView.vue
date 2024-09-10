<template>
  <page-title title="Прогрузка таблицы" />
  <div class="p-5">
    <div class="switch">
      <a-switch v-model:checked="loading" />
      <p>Прогрузка таблицы</p>
    </div>
    <div class="switch">
      <a-switch v-model:checked="card" />
      <p>Отображение карточками</p>
    </div>
    <div v-show="isMobile || card" class="card-container">
      <div v-for="record in loading ? skeletonDataSource : filteredDataSource" :key="record.key" class="card">
        <div class="card-header">
          <h3>{{ record.name }}</h3>
          <p><strong>Возраст:</strong> {{ record.age }}</p>
        </div>
        <div class="card-body">
          <p><strong>Адрес:</strong> {{ record.address }}</p>
          <p><strong>Профессия:</strong> {{ record.profession }}</p>
          <p><strong>Компания:</strong> {{ record.company }}</p>
          <p><strong>Email:</strong> {{ record.email }}</p>
          <div v-if="editableData[record.key]" class="card-switches">
            <a-checkbox v-model:checked="editableData[record.key].checkbox" class="card-checkbox">
              Включить
            </a-checkbox>
            <a-switch v-model:checked="editableData[record.key].switch" class="card-switch" />
          </div>
        </div>
        <div class="card-footer editable-row-operations">
          <a-button type="link" @click="openEditModal(record)">Редактировать</a-button>
          <a-popconfirm title="Вы уверены, что хотите удалить эту запись?" @confirm="deleteRow(record.key)" okText="Да"
            cancelText="Нет">
            <a-button type="link">Удалить</a-button>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <div v-show="!(isMobile || card)">
      <a-table class="lazy-scroll" :columns="columns" :data-source="loading ? skeletonDataSource : filteredDataSource"
        bordered @change="handleTableChange" :pagination="false"
        :scroll="{ x: 'max-content', y: 'calc(100vh - 300px)' }" ref="table" size="small">

        <template #title>
          <a-flex justify="flex-end">
            <a-tooltip title="Выгрузить в Excel">
              <a-button :icon="h(DownloadOutlined)"></a-button>
            </a-tooltip>
          </a-flex>
        </template>

        <template #bodyCell="{ column, text, record }">
          <template v-if="loading">
            <a-skeleton :active="true" :loading="loading" :title="false" :paragraph="{ rows: 1 }"></a-skeleton>
          </template>
          <template v-else>
            <template v-if="['checkbox', 'switch'].includes(column.dataIndex)">
              <div>
                <template v-if="column.dataIndex === 'checkbox'">
                  {{ text ? 'Включено' : 'Выключено' }}
                </template>
                <template v-else-if="column.dataIndex === 'switch'">
                  {{ text ? 'Включено' : 'Выключено' }}
                </template>
              </div>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
              <div class="editable-row-operations">
                <a-button type="link" @click="openEditModal(record)" class="pl-0">Редактировать</a-button>
                <a-popconfirm title="Вы уверены, что хотите удалить эту запись?" @confirm="deleteRow(record.key)"
                  okText="Да" cancelText="Нет">
                  <a-button type="link" class="pl-0">Удалить</a-button>
                </a-popconfirm>
              </div>
            </template>
            <template v-else>
              {{ text }}
            </template>
          </template>
        </template>
        <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
          <div style="padding: 8px">
            <a-input ref="searchInput" :placeholder="`Поиск по ${column.dataIndex}`" :value="selectedKeys[0]"
              style="width: 188px; margin-bottom: 8px; display: block"
              @change="(e: any) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
              @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
            <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
              @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
              <template #icon>
                <SearchOutlined />
              </template>
              Поиск
            </a-button>
            <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
              Сброс
            </a-button>
          </div>
        </template>
        <template #customFilterIcon="{ filtered }">
          <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
        </template>
        <template #footer>
          <div v-if="loadingMore" style="text-align: center; padding: 10px;">
            <a-spin />
          </div>
        </template>
      </a-table>
    </div>

    <a-modal v-model:visible="isModalVisible" title="Редактирование записи" @ok="save(editingKey)"
      @cancel="closeEditModal(editingKey)">
      <a-form-item label="Имя" v-if="editingKey && editableData[editingKey]">
        <a-input v-model:value="editableData[editingKey].name" :disabled="!isEditing" />
      </a-form-item>
      <a-form-item label="Возраст" v-if="editingKey && editableData[editingKey]">
        <a-input-number v-model:value="editableData[editingKey].age" :disabled="!isEditing" :min="0" />
      </a-form-item>
      <a-form-item label="Адрес" v-if="editingKey && editableData[editingKey]">
        <a-select v-model:value="editableData[editingKey].address" :disabled="!isEditing">
          <a-select-option value="Центральный парк">Центральный парк</a-select-option>
          <a-select-option value="Парк на Краснопресненской набережной">Парк на Краснопресненской
            набережной</a-select-option>
          <a-select-option value="Парк Горького">Парк Горького</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Профессия" v-if="editingKey && editableData[editingKey]">
        <a-input v-model:value="editableData[editingKey].profession" :disabled="!isEditing" />
      </a-form-item>
      <a-form-item label="Компания" v-if="editingKey && editableData[editingKey]">
        <a-input v-model:value="editableData[editingKey].company" :disabled="!isEditing" />
      </a-form-item>
      <a-form-item label="Email" v-if="editingKey && editableData[editingKey]">
        <a-input v-model:value="editableData[editingKey].email" :disabled="!isEditing" />
      </a-form-item>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash';
import { reactive, ref, onMounted, onBeforeUnmount, h } from 'vue';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import type { UnwrapRef } from 'vue';
import PageTitle from '@/components/PageTitle/PageTitle.vue';

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
  profession: string;
  company: string;
  email: string;
  checkbox: boolean;
  switch: boolean;
}

const loading = ref<boolean>(false);
const isModalVisible = ref<boolean>(false);
const isEditing = ref<boolean>(false);
const editingKey = ref<string | null>(null);
const currentPage = ref<number>(1);
const pageSize = 20;
const hasMoreData = ref<boolean>(true);
const loadingMore = ref<boolean>(false);
const card = ref<boolean>(false);

const isMobile = ref<boolean>(window.innerWidth <= 768);

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  loadData();
  const table = document.querySelector('.ant-table-body');
  table?.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

const columns = [
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
    filters: [
      { text: 'Иван', value: 'Иван' },
      { text: 'Петр', value: 'Петр' },
      { text: 'Алексей', value: 'Алексей' },
    ],
    onFilter: (value: string, record: DataItem) => record.name.includes(value),
  },
  {
    title: 'Возраст',
    dataIndex: 'age',
    key: 'age',
    width: '10%',
    sorter: (a: DataItem, b: DataItem) => a.age - b.age,
    filters: [
      { text: '25', value: 25 },
      { text: '35', value: 35 },
      { text: '45', value: 45 },
    ],
    onFilter: (value: number, record: DataItem) => record.age === value,
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 'address',
    sorter: (a: DataItem, b: DataItem) => a.address.localeCompare(b.address),
    filters: [
      { text: 'Центральный парк', value: 'Центральный парк' },
      { text: 'Парк на Краснопресненской набережной', value: 'Парк на Краснопресненской набережной' },
      { text: 'Парк Горького', value: 'Парк Горького' },
    ],
    onFilter: (value: string, record: DataItem) => record.address.includes(value),
  },
  {
    title: 'Профессия',
    dataIndex: 'profession',
    key: 'profession',
    sorter: (a: DataItem, b: DataItem) => a.profession.localeCompare(b.profession),
  },
  {
    title: 'Компания',
    dataIndex: 'company',
    key: 'company',
    sorter: (a: DataItem, b: DataItem) => a.company.localeCompare(b.company),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Чекбокс',
    dataIndex: 'checkbox',
    key: 'checkbox',
  },
  {
    title: 'Переключатель',
    dataIndex: 'switch',
    key: 'switch',
    width: '12%',
  },
  {
    title: 'Операции',
    dataIndex: 'operation',
    key: 'operation',
  },
];

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Иван ${i}`,
    age: 32 + (i % 3) * 10,
    address: `Центральный парк ${i}`,
    profession: `Профессия ${i}`,
    company: `Компания ${i}`,
    email: `ivan${i}@example.com`,
    checkbox: i % 2 === 0,
    switch: i % 2 === 0,
  });
}

const skeletonData: DataItem[] = [];
for (let i = 0; i < 10; i++) {
  skeletonData.push({
    key: `skeleton-${i}`,
    name: '',
    age: 0,
    address: '',
    profession: '',
    company: '',
    email: '',
    checkbox: false,
    switch: false,
  });
}

const dataSource = ref<DataItem[]>(data);
const filteredDataSource = ref<DataItem[]>(data);
const skeletonDataSource = ref<DataItem[]>(skeletonData);
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

const searchInput = ref<HTMLInputElement | null>(null);

const state = reactive({
  searchText: '',
  searchedColumn: '',
});

const openEditModal = (record: DataItem) => {
  editableData[record.key] = cloneDeep(record);
  editingKey.value = record.key;
  isEditing.value = true;
  isModalVisible.value = true;
};

const closeEditModal = (key: string | null) => {
  if (key) {
    delete editableData[key];
  }

  editingKey.value = null;
  isEditing.value = false;
  isModalVisible.value = false;
};

const save = (key: string | null) => {
  if (key && editableData[key]) {
    const recordIndex = dataSource.value.findIndex(item => item.key === key);
    if (recordIndex !== -1) {
      dataSource.value[recordIndex] = cloneDeep(editableData[key]);
      filteredDataSource.value[recordIndex] = cloneDeep(editableData[key]);
      message.success('Изменения сохранены');
    }
  }

  closeEditModal(key);
};

const deleteRow = (key: string) => {
  dataSource.value = dataSource.value.filter(item => item.key !== key);
  filteredDataSource.value = filteredDataSource.value.filter(item => item.key !== key);
  message.success('Запись удалена');
};

const handleTableChange = (
  pagination: any,
  filters: Record<string, (string | number | boolean)[] | null>,
  sorter: any
) => {
  let filteredData = [...dataSource.value];

  if (filters.name) {
    filteredData = filteredData.filter(item => filters.name?.includes(item.name));
  }
  if (filters.age) {
    filteredData = filteredData.filter(item => filters.age?.includes(item.age));
  }
  if (filters.address) {
    filteredData = filteredData.filter(item => filters.address?.includes(item.address));
  }

  if (sorter.order) {
    filteredData = filteredData.sort((a, b) => {
      const order = sorter.order === 'ascend' ? 1 : -1;
      if (sorter.field === 'name') {
        return order * a.name.localeCompare(b.name);
      } else if (sorter.field === 'age') {
        return order * (a.age - b.age);
      } else if (sorter.field === 'address') {
        return order * a.address.localeCompare(b.address);
      } else if (sorter.field === 'profession') {
        return order * a.profession.localeCompare(b.profession);
      } else if (sorter.field === 'company') {
        return order * a.company.localeCompare(b.company);
      }
      return 0;
    });
  }

  filteredDataSource.value = filteredData;
};

const handleSearch = (
  selectedKeys: string[],
  confirm: () => void,
  dataIndex: string
) => {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
};

const handleReset = (clearFilters: () => void) => {
  clearFilters();
  state.searchText = '';
};

const loadData = async () => {
  loadingMore.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newData: DataItem[] = [];
    for (let i = 0; i < pageSize; i++) {
      const index = (currentPage.value - 1) * pageSize + i;
      newData.push({
        key: index.toString(),
        name: `Иван ${index}`,
        age: 25 + (index % 3) * 10,
        address: `Центральный парк ${index}`,
        profession: `Профессия ${index}`,
        company: `Компания ${index}`,
        email: `ivan${index}@example.com`,
        checkbox: index % 2 === 0,
        switch: index % 2 === 0,
      });
    }

    if (newData.length < pageSize) {
      hasMoreData.value = false;
    }

    dataSource.value = [...dataSource.value, ...newData];
    filteredDataSource.value = [...filteredDataSource.value, ...newData];
    currentPage.value += 1;
  } finally {
    loadingMore.value = false;
  }
};

const handleScroll = () => {
  const table = document.querySelector('.ant-table-body');
  if (table) {
    const bottomOfWindow = table.scrollHeight - table.scrollTop === table.clientHeight;
    if (bottomOfWindow && hasMoreData.value && !loadingMore.value) {
      loadData();
    }
  }
};
</script>

<style scoped>
.switch {
  padding: 10px 20px;
  display: flex;
  gap: 10px;
}

/* Контейнер для карточек */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 16px;
}

/* Стили для карточек */
.card {
  border: 1px solid #dfe1e5;
  border-radius: 12px;
  padding: 24px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 2px solid #f1f3f4;
  padding-bottom: 16px;
}

.card-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #202124;
}

.card-header p {
  margin: 0;
  font-size: 1.1rem;
  color: #5f6368;
}

.card-body {
  margin-bottom: 16px;
  line-height: 1.6;
}

.card-body p {
  margin: 0 0 8px;
  font-size: 1rem;
  color: #3c4043;
}

.card-switches {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 16px;
}

.card-checkbox {
  font-size: 1rem;
  color: #202124;
}

.card-switch {
  font-size: 1rem;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 2px solid #f1f3f4;
  padding-top: 16px;
}

@media (max-width: 768px) {
  .card-container {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .card {
    padding: 16px;
    margin: 8px 0;
  }

  .card-header h3 {
    font-size: 1.25rem;
  }

  .card-body p {
    font-size: 0.9rem;
  }
}
</style>
