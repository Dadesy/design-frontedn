<template>
    <page-title title="Журнал обменов" />
    <div class="p-5">
        <div class="flex gap-2 items-center mb-5">
            <a-switch v-model:checked="switched" />
            Расширенный фильтр
        </div>

        <a-card class="w-full overflow-hidden">
            <a-flex gap="middle" vertical>
                <a-flex justify="space-between" class="mb-4">
                    <a-button @click="showColumnSelector = true">Настроить колонки</a-button>
                    <a-flex gap="small" align="center">
                        <a-button type="primary" :icon="h(PlusOutlined)">
                            Добавить
                        </a-button>
                        <a-tooltip title="Выгрузить в Excel">
                            <a-button :icon="h(DownloadOutlined)"></a-button>
                        </a-tooltip>
                    </a-flex>
                </a-flex>

                <div v-if="hasActiveFilters" class="filter-tags-container mb-4 flex flex-wrap gap-2 items-center">
                    <a-tag
                        v-for="filter in flatFilters"
                        :key="filter.key + '-' + filter.value"
                        closable
                        @close="removeFilterValue(filter.key, filter.value)"
                        class="filter-tag"
                    >
                        {{ getColumnTitle(filter.key) }}: {{ filter.value }}
                    </a-tag>
                    <a-button type="link" @click="resetFilters" class="reset-filters-button">Сбросить все фильтры</a-button>
                </div>

                <a-table
                    :columns="visibleColumnsWithFilters"
                    :data-source="filteredData"
                    bordered
                    :pagination="false"
                    size="small"
                    @change="handleTableChange"
                >
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'status'">
                            <a-tag
                                :color="getStatusColor(record[column.key])"
                                :bordered="false"
                                class="status-tag bg-transparent"
                            >
                                {{ record[column.key].toUpperCase() }}
                            </a-tag>
                        </template>
                        <template v-else-if="column.key === 'provider'">
                            <a-flex gap="small" align="center">
                                <component
                                    :is="getProviderImage(record[column.key])"
                                    class="block w-4 min-w-4 h-4 svg-w-full"
                                ></component>
                                <span>{{ record[column.key] }}</span>
                            </a-flex>
                        </template>
                        <template v-else>
                            {{ record[column.key] }}
                        </template>
                    </template>
                </a-table>
            </a-flex>
        </a-card>

        <a-modal
            v-model:visible="showColumnSelector"
            title="Выбор колонок"
            :footer="null"
        >
            <a-checkbox-group
                v-model:value="selectedColumnKeys"
                class="column-selector-checkbox-group"
            >
                <a-checkbox
                    v-for="col in allColumns"
                    :key="col.key"
                    :value="col.key"
                >
                    {{ col.title || "Действия" }}
                </a-checkbox>
            </a-checkbox-group>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from "vue";
import PageTitle from "@/components/PageTitle/PageTitle.vue";
import {
    DownloadOutlined,
    SendOutlined,
    PhoneOutlined,
    MessageOutlined,
    MailOutlined,
    PlusOutlined,
} from "@ant-design/icons-vue";

const switched = ref<boolean>(false);
const showColumnSelector = ref<boolean>(false);
const selectedFilter = ref([]);

const colorMap: { [key: string]: string | undefined } = {
    ошибка: "red",
    выполнено: "green",
    "выполнено с замечаниями": undefined,
    "в процессе": undefined,
    "нет информаци": undefined,
};
const getStatusColor = (status: string) => {
    return colorMap[status];
};

const providerImage: { [key: string]: any } = {
    Email: MailOutlined,
    "СМС центр": MessageOutlined,
    "Zvonok.com": PhoneOutlined,
    "Telegram bot": SendOutlined,
};
const getProviderImage = (name: string) => {
    return providerImage[name];
};

interface DataItem {
    key: string;
    date: string;
    notify: string;
    status: string;
    scenario: string;
    provider: string;
    addresse: string;
}

const uniqueFilterValues = (data: DataItem[], key: keyof DataItem) => {
    return [...new Set(data.map((item) => item[key]))].map((value) => ({
        text: value,
        value: value,
    }));
};

const data = ref<DataItem[]>([
    {
        key: "1",
        date: "06.07.2024 в 23:55:00",
        notify: "Анкета по оценке аудита",
        status: "в процессе",
        scenario: "Аудит предприятий",
        provider: "Telegram bot",
        addresse: "test@efko.ru",
    },
    {
        key: "2",
        date: "07.07.2024 в 23:55:00",
        notify: "Уведомление об отправке на доработку",
        status: "ошибка",
        scenario: "ELT Новые точки в ИС",
        provider: "СМС центр",
        addresse: "test@efko.ru",
    },
    {
        key: "3",
        date: "08.07.2024 в 23:55:00",
        notify: "Уведомление об отправке на доработку",
        status: "выполнено",
        scenario: "ELT Новые точки в ИС",
        provider: "Email",
        addresse: "test@efko.ru",
    },
    {
        key: "4",
        date: "09.07.2024 в 23:55:00",
        notify: "Анкета по оценке аудита",
        status: "выполнено с замечаниями",
        scenario: "Отзыв доверенности",
        provider: "Email",
        addresse: "test@efko.ru",
    },
    {
        key: "5",
        date: "10.07.2024 в 23:55:00",
        notify: "Анкета по оценке аудита",
        status: "нет информаци",
        scenario: "Отзыв доверенности",
        provider: "Zvonok.com",
        addresse: "test@efko.ru",
    },
]);

const allColumns = [
    {
        title: "Дата",
        dataIndex: "date",
        key: "date",
        filters: uniqueFilterValues(data.value, "date"),
        onFilter: (value: string, record: DataItem) => record.date === value,
        sorter: (a: DataItem, b: DataItem) =>
            new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
        title: "Уведомление",
        dataIndex: "notify",
        key: "notify",
        filters: uniqueFilterValues(data.value, "notify"),
        onFilter: (value: string, record: DataItem) => record.notify === value,
        sorter: (a: DataItem, b: DataItem) => a.notify.localeCompare(b.notify),
    },
    {
        title: "Статус",
        dataIndex: "status",
        key: "status",
        filters: uniqueFilterValues(data.value, "status"),
        onFilter: (value: string, record: DataItem) => record.status === value,
        sorter: (a: DataItem, b: DataItem) => a.status.localeCompare(b.status),
    },
    {
        title: "Сценарий",
        dataIndex: "scenario",
        key: "scenario",
        filters: uniqueFilterValues(data.value, "scenario"),
        onFilter: (value: string, record: DataItem) =>
            record.scenario === value,
        sorter: (a: DataItem, b: DataItem) =>
            a.scenario.localeCompare(b.scenario),
    },
    {
        title: "Провайдер",
        key: "provider",
        dataIndex: "provider",
        filters: uniqueFilterValues(data.value, "provider"),
        onFilter: (value: string, record: DataItem) =>
            record.provider === value,
        sorter: (a: DataItem, b: DataItem) =>
            a.provider.localeCompare(b.provider),
    },
    {
        title: "Адресант",
        key: "addresse",
        dataIndex: "addresse",
        filters: uniqueFilterValues(data.value, "addresse"),
        onFilter: (value: string, record: DataItem) =>
            record.addresse === value,
        sorter: (a: DataItem, b: DataItem) =>
            a.addresse.localeCompare(b.addresse),
    },
];

const selectedColumnKeys = ref(allColumns.map((col) => col.key));

const visibleColumns = computed(() =>
    allColumns.filter((col) =>
        selectedColumnKeys.value.includes(col.key)
    )
);

const visibleColumnsWithFilters = computed(() =>
    visibleColumns.value.map((col) => ({
        ...col,
        filteredValue: currentFilters.value[col.key] || null,
    }))
);

const filteredData = ref(data.value);

const currentFilters = ref<Record<string, string[]>>({});

const flatFilters = computed(() => {
    const filters: { key: string, value: string }[] = [];
    for (const key in currentFilters.value) {
        currentFilters.value[key]?.forEach((value) => {
            filters.push({ key, value });
        });
    }
    return filters;
});

const handleTableChange = (
    pagination: { current: number; pageSize: number },
    filters: Record<string, string[] | null>,
    sorter: { field: string; order: string | null },
    extra: { action: string }
) => {
    currentFilters.value = {};

    for (const key in filters) {
        const filterValues = filters[key];

        if (filterValues !== null && filterValues.length > 0) {
            currentFilters.value[key] = filterValues;
        }
    }

    applyFilters();
};

const applyFilters = () => {
    let filtered = data.value;

    for (const key in currentFilters.value) {
        const filterValues = currentFilters.value[key];
        if (filterValues && filterValues.length > 0) {
            filtered = filtered.filter((item) =>
                filterValues.includes(item[key as keyof DataItem] as string)
            );
        }
    }

    filteredData.value = filtered;
};

applyFilters();

const getColumnTitle = (key: string) => {
    const column = allColumns.find((col) => col.key === key);
    return column ? column.title : key;
};

const hasActiveFilters = computed(() =>
    Object.values(currentFilters.value).some(
        (values) => values && values.length > 0
    )
);

const removeFilterValue = (key: string, value: string) => {
    const values = currentFilters.value[key];
    if (values) {
        currentFilters.value[key] = values.filter((v) => v !== value);
        if (currentFilters.value[key].length === 0) {
            delete currentFilters.value[key];
        }
        applyFilters();
    }
};

const resetFilters = () => {
    currentFilters.value = {};
    applyFilters();
};
</script>

<style lang="scss">
.custom-color-placeholder input::placeholder,
.custom-color-placeholder::placeholder,
.custom-color-placeholder .ant-select-selection-placeholder {
    color: var(--placeholder-color) !important;
}
</style>
