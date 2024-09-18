<template>
  <page-title title="Расширенная таблица" />
  <div class="p-5">
    <a-table :columns="columns" :data-source="loading ? skeletonDataSource : filteredDataSource" bordered
      @change="handleTableChange" size="small">
      <template #title>
        <a-flex justify="flex-end">
          <a-flex gap="small">
            <a-button type="primary" :icon="h(PlusOutlined)">Добавить</a-button>
            <a-tooltip title="Выгрузить в Excel" placement="left">
              <a-button :icon="h(DownloadOutlined)"></a-button>
            </a-tooltip>
          </a-flex>
        </a-flex>
      </template>
      <template #bodyCell="{ column, text, record }">
        <template v-if="loading">
          <a-skeleton :active="true" :loading="loading" :title="false" :paragraph="{ rows: 1 }"></a-skeleton>
        </template>
        <template v-else>
          <template v-if="['name', 'age', 'address', 'checkbox', 'switch'].includes(column.dataIndex)">
            <div>
              <template v-if="column.dataIndex === 'checkbox'">
                {{ text ? 'Включено' : 'Выключено' }}
              </template>
              <template v-else-if="column.dataIndex === 'switch'">
                {{ text ? 'Активен' : 'Неактивен' }}
              </template>
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">

              <a-flex gap="small" justify="center" class="w-full">
                <a-tooltip title="Редактировать" placement="left">
                  <a-button :icon="h(EditOutlined)" @click="openEditModal(record)"></a-button>
                </a-tooltip>

                <a-tooltip title="Удалить" placement="left">
                  <a-button :icon="h(DeleteOutlined)" @click="confirmDelete(record.key)"></a-button>
                </a-tooltip>

                <a-dropdown>
                  <a-button :icon="h(EllipsisOutlined)"></a-button>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1">
                        Просмотр
                      </a-menu-item>
                      <a-menu-item key="2">
                        Печать
                      </a-menu-item>
                      <a-menu-item key="3">
                        Расчет
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </a-flex>

            </div>
          </template>
        </template>
      </template>
      <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div style="padding: 8px">
          <a-input ref="searchInput" :placeholder="`Search ${column.dataIndex}`" :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="(e: Event) => setSelectedKeys((e.target as HTMLInputElement).value ? [(e.target as HTMLInputElement).value] : [])"
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
          <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
            <template #icon>
              <SearchOutlined />
            </template>
            Search
          </a-button>
          <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
            Reset
          </a-button>
        </div>
      </template>
      <template #customFilterIcon="{ filtered }">
        <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
    </a-table>
  </div>

  <a-modal v-model:visible="isModalVisible" title="Редактирование записи" class="text-center">
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" class="mt-5 text-left">

        <label class="flex flex-col gap-2 mb-5" v-if="editingKey && editableData[editingKey]">
          <span>Имя</span>
          <a-input v-model:value="editableData[editingKey].name" :disabled="!isEditing" />
        </label>

        <label class="flex flex-col gap-2 mb-5" v-if="editingKey && editableData[editingKey]">
          <span>Возраст</span>
          <a-input-number v-model:value="editableData[editingKey].age" :disabled="!isEditing" class="w-full" />
        </label>

        <label class="flex flex-col gap-2 mb-5" v-if="editingKey && editableData[editingKey]">
          <span>Адрес</span>
          <a-select v-model:value="editableData[editingKey].address" :disabled="!isEditing">
            <a-select-option value="Центральный парк">Центральный парк</a-select-option>
            <a-select-option value="Парк на Краснопресненской набережной">Парк на Краснопресненской
              набережной</a-select-option>
            <a-select-option value="Парк Горького">Парк Горького</a-select-option>
          </a-select>
        </label>

        <label class="flex flex-col gap-2 mb-5" v-if="editingKey && editableData[editingKey]">
          <span>Состояние</span>
          <a-checkbox v-model:checked="editableData[editingKey].checkbox" :disabled="!isEditing">
            Включить
          </a-checkbox>
        </label>

        <label class="flex gap-2 mb-5" v-if="editingKey && editableData[editingKey]">
          <a-switch v-model:checked="editableData[editingKey].switch" :disabled="!isEditing" />
          <span>Активность</span>
        </label>
        
      </a-form>

      <template #footer>
        <div style="text-align: center;">
          <a-button @click="closeEditModal(editingKey)">
            Отмена
          </a-button>
          <a-button type="primary" @click="save(editingKey)">
            Сохранить
          </a-button>
        </div>
      </template>

    </a-modal>

  <a-modal v-model:visible="isModalRemoveVisible" title="Подтверждение удаления" @ok="deleteRow"
    @cancel="onCancelRemove">
    <p>Вы уверены, что хотите удалить эту запись?</p>
  </a-modal>

</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash';
import { reactive, ref, onMounted, type UnwrapRef, h } from 'vue';
import { SearchOutlined, DownloadOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import type { TableColumnType } from 'ant-design-vue';
import type { Key } from 'ant-design-vue/es/table/interface';
import PageTitle from '@/components/PageTitle/PageTitle.vue';

type ColumnDataIndex = string;

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
  checkbox: boolean;
  switch: boolean;
}

interface EditableDataItem {
  key: Key;
  name?: string;
  age?: number;
  address?: string;
  checkbox?: boolean;
  switch?: boolean;
}

interface ColumnType extends TableColumnType<DataItem> {
  dataIndex: ColumnDataIndex;
  customFilterDropdown?: boolean;
  onFilterDropdownOpenChange?: (visible: boolean) => void;
}

const loading = ref<boolean>(true);
const isModalRemoveVisible = ref<boolean>(false);
const modalRemoveIndex = ref<null | string>(null);
const isModalVisible = ref<boolean>(false);
const isEditing = ref<boolean>(false);
  const editingKey = ref<string | null>(null);

const onCancelRemove = () => {
  modalRemoveIndex.value = null;
  isModalRemoveVisible.value = false;
}

const confirmDelete = (key: string) => {
  modalRemoveIndex.value = key;
  isModalRemoveVisible.value = true;
}

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

const columns: ColumnType[] = [
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
    width: '20%',
    sorter: (a, b) => a.name.localeCompare(b.name),
    filters: [
      { text: 'Edward', value: 'Edward' },
      { text: 'John', value: 'John' },
      { text: 'James', value: 'James' },
    ],
    onFilter: (value, record) => record.name.includes(value as string),
    customFilterDropdown: true,
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => {
          searchInput.value?.focus();
        }, 100);
      }
    },
  },
  {
    title: 'Возраст',
    dataIndex: 'age',
    key: 'age',
    width: '10%',
    sorter: (a, b) => a.age - b.age,
    filters: [
      { text: '32', value: 32 },
      { text: '42', value: 42 },
      { text: '52', value: 52 },
    ],
    onFilter: (value, record) => record.age === value,
    customFilterDropdown: true,
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => {
          searchInput.value?.focus();
        }, 100);
      }
    },
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 'address',
    width: '30%',
    sorter: (a, b) => a.address.localeCompare(b.address),
    filters: [
      { text: 'London Park', value: 'London Park' },
      { text: 'New York Park', value: 'New York Park' },
      { text: 'San Francisco Park', value: 'San Francisco Park' },
    ],
    onFilter: (value, record) => record.address.includes(value as string),
    customFilterDropdown: true,
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => {
          searchInput.value?.focus();
        }, 100);
      }
    },
  },
  {
    title: 'Состояние',
    dataIndex: 'checkbox',
    key: 'checkbox',
    width: '15%',
  },
  {
    title: 'Активность',
    dataIndex: 'switch',
    key: 'switch',
    width: '15%',
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'operation',
  },
];

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32 + (i % 3) * 10,
    address: `London Park no. ${i}`,
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
    checkbox: false,
    switch: false,
  });
}

const dataSource = ref<DataItem[]>(data);
const filteredDataSource = ref<DataItem[]>(data);
const skeletonDataSource = ref<DataItem[]>(skeletonData);
const editableData: UnwrapRef<Record<Key, EditableDataItem>> = reactive({});

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
  const record = dataSource.value.find(item => key === item.key);
  if (key && record && editableData[key]) {
    Object.assign(record, editableData[key]);
    delete editableData[key];
    message.success('Изменения сохранены');
  }

  closeEditModal(key);
};

const deleteRow = () => {
  dataSource.value = dataSource.value.filter(item => item.key !== modalRemoveIndex.value);
  filteredDataSource.value = filteredDataSource.value.filter(item => item.key !== modalRemoveIndex.value);
  message.success('Запись удалена');

  onCancelRemove();
};

const handleTableChange = (
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
</script>

<style scoped>
.editable-row-operations {
  display: flex;
  align-items: center;
}

.editable-row-operations a-button {
  margin-right: 8px;
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
