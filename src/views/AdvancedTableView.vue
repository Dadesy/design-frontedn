<template>
  <page-title title="Расширенная таблица" />
  <div class="p-5">
    <a-table :columns="columns" :data-source="loading ? skeletonDataSource : filteredDataSource" bordered
      @change="handleTableChange">
      <template #bodyCell="{ column, text, record }">
        <template v-if="loading">
          <a-skeleton :active="true" :loading="loading" :title="false" :paragraph="{ rows: 1 }"></a-skeleton>
        </template>
        <template v-else>
          <template v-if="['name', 'age', 'address', 'checkbox', 'switch'].includes(column.dataIndex)">
            <div>
              <template v-if="editableData[record.key]">
                <a-select v-if="column.dataIndex === 'address'"
                  v-model:value="editableData[record.key][column.dataIndex as 'address']"
                  style="width: 100%; margin: -5px 0">
                  <a-select-option value="London Park">London Park</a-select-option>
                  <a-select-option value="New York Park">New York Park</a-select-option>
                  <a-select-option value="San Francisco Park">San Francisco Park</a-select-option>
                </a-select>
                <a-input v-else-if="['name', 'age'].includes(column.dataIndex)"
                  v-model:value="editableData[record.key][column.dataIndex as 'name' | 'age']" style="margin: -5px 0" />
                <a-checkbox v-else-if="column.dataIndex === 'checkbox'"
                  v-model:checked="editableData[record.key][column.dataIndex as 'checkbox']" style="margin: -5px 0">
                  Включить
                </a-checkbox>
                <a-switch v-else-if="column.dataIndex === 'switch'"
                  v-model:checked="editableData[record.key][column.dataIndex as 'switch']" style="margin: -5px 0" />
              </template>
              <template v-else>
                <template v-if="column.dataIndex === 'checkbox'">
                  {{ text ? 'Включено' : 'Выключено' }}
                </template>
                <template v-else-if="column.dataIndex === 'switch'">
                  {{ text ? 'Включено' : 'Выключено' }}
                </template>
                <template v-else>
                  {{ text }}
                </template>
              </template>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <template v-if="editableData[record.key]">
                <a-button type="link" @click="save(record.key)">Сохранить</a-button>
                <a-button type="link" @click="cancel(record.key)">Отмена</a-button>
              </template>
              <template v-else>
                <a-dropdown-button>
                  Действие
                  <template #overlay>
                    <a-menu @click="$event.stopPropagation()">
                      <a-menu-item @click="edit(record.key)">
                        Редактировать
                      </a-menu-item>
                      <a-menu-item>
                        <a-popconfirm title="Вы уверены, что хотите удалить эту запись?"
                          @confirm="deleteRow(record.key)" okText="Да" cancelText="Нет">
                          Удалить
                        </a-popconfirm>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown-button>
              </template>
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
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash';
import { reactive, ref, onMounted, type UnwrapRef } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
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

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

const columns: ColumnType[] = [
  {
    title: 'name',
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
    title: 'age',
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
    title: 'address',
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
    title: 'checkbox',
    dataIndex: 'checkbox',
    key: 'checkbox',
    width: '15%',
  },
  {
    title: 'switch',
    dataIndex: 'switch',
    key: 'switch',
    width: '15%',
  },
  {
    title: 'operation',
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

const edit = (key: Key) => {
  const record = dataSource.value.find(item => key === item.key);
  if (record) {
    editableData[key] = cloneDeep(record);
  }
};

const save = (key: Key) => {
  const record = dataSource.value.find(item => key === item.key);
  if (record && editableData[key]) {
    Object.assign(record, editableData[key]);
    delete editableData[key];
    message.success('Изменения сохранены');
  }
};

const cancel = (key: Key) => {
  delete editableData[key];
};

const deleteRow = (key: Key) => {
  dataSource.value = dataSource.value.filter(item => item.key !== key);
  filteredDataSource.value = filteredDataSource.value.filter(item => item.key !== key);
  message.success('Запись удалена');
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
