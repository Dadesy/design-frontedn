<template>
    <page-title title="Журнал обменов" />
    <div class="p-5" :style="{ '--placeholder-color': colors.colorText }">
        <div class="flex gap-2 items-center mb-5">
            <a-switch v-model:checked="switched" />
            Расширенный фильтр
        </div>

        <a-card class="w-full overflow-hidden">
            <a-flex gap="middle" vertical>
                <a-flex gap="middle" justify="space-between" align="center">
                    <a-flex gap="middle" class="flex-grow">
                        <a-date-picker :format="`DD.MM.YYYY`" class="w-[150px] custom-color-placeholder"
                            placeholder="Дата" />
                        <a-select ref="select" class="w-[160px] custom-color-placeholder" placeholder="Статус">
                            <a-select-option value="Ошибка">Ошибка</a-select-option>
                            <a-select-option value="Выполнено">Выполнено</a-select-option>
                            <a-select-option value="Выполнено с замечаниями">Выполнено с замечаниями</a-select-option>
                            <a-select-option value="В процессе">В процессе</a-select-option>
                            <a-select-option value="Нет информации">Нет информации</a-select-option>
                        </a-select>
                        <a-select ref="select" class="w-[160px] custom-color-placeholder" placeholder="Провайдеры">
                            <a-select-option value="Email">Email</a-select-option>
                            <a-select-option value="СМС центр">СМС центр</a-select-option>
                            <a-select-option value="Zvonok.com">Zvonok.com</a-select-option>
                            <a-select-option value="Telegram bot">Telegram bot</a-select-option>
                        </a-select>
                        <a-select ref="select" class="w-[200px] custom-color-placeholder" placeholder="Сценарий">
                            <a-select-option value="ELT Новые точки в ИС">ELT Новые точки в ИС</a-select-option>
                            <a-select-option value="Отзыв доверенности">Отзыв доверенности</a-select-option>
                            <a-select-option value="Создана задача">Создана задача</a-select-option>
                        </a-select>
                        <a-input placeholder="Адресат" class="w-[160px] custom-color-placeholder" />
                    </a-flex>

                    <a-flex gap="small" align="center">
                        <a-tooltip title="Выгрузить в Excel">
                            <a-button :icon="h(DownloadOutlined)"></a-button>
                        </a-tooltip>
                        <span :style="{ color: colors.colorTextDescription }">Найдено 301 записей</span>
                    </a-flex>
                </a-flex>

                <a-table :columns="columns" :data-source="data" bordered :pagination="false" size="small">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'status'">
                            <a-tag :color="getStatusColor(record[column.key])" :bordered="false" class="bg-transparent">
                                {{ record[column.key].toUpperCase() }}
                            </a-tag>
                        </template>
                        <template v-else-if="column.key === 'provider'">
                            <a-flex gap="small" align="center">
                                <component :is="getProviderImage(record[column.key])"
                                    class="block w-4 min-w-4 h-4 svg-w-full"></component>
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
    </div>
</template>
<script setup lang="ts">
import { ref, h } from 'vue';
import PageTitle from '@/components/PageTitle/PageTitle.vue';
import { useThemeColors } from '@/hooks/useThemeColors';
import { DownloadOutlined, SendOutlined, PhoneOutlined, MessageOutlined, MailOutlined } from '@ant-design/icons-vue';

const { colors } = useThemeColors();

const switched = ref<boolean>(false);

const colorMap: { [key: string]: string | undefined } = {
    'ошибка': 'red',
    'выполнено': 'green',
    'выполнено с замечаниями': undefined,
    'в процессе': undefined,
    'нет информаци': undefined,
}
const getStatusColor = (status: string) => {
    return colorMap[status];
}

const providerImage: { [key: string]: any } = {
    'Email': MailOutlined,
    'СМС центр': MessageOutlined,
    'Zvonok.com': PhoneOutlined,
    'Telegram bot': SendOutlined,
}

const getProviderImage = (name: string) => {
    return providerImage[name];
}

interface DataItem {
    key: string;
    date: string;
    notify: string;
    status: string;
    scenario: string;
    provider: string;
    addresse: string;
}

const columns = [
    {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Уведомление',
        dataIndex: 'notify',
        key: 'notify',
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Сценарий',
        dataIndex: 'scenario',
        key: 'scenario',
    },
    {
        title: 'Провайдер',
        key: 'provider',
        dataIndex: 'provider',
    },
    {
        title: 'Адресант',
        key: 'addresse',
        dataIndex: 'addresse',
    },
];

const data = ref<DataItem[]>([
    {
        key: '1',
        date: '06.07.2024 в 23:55:00',
        notify: 'Анкета по оценке аудита',
        status: 'в процессе',
        scenario: 'Аудит предприятий',
        provider: 'Telegram bot',
        addresse: 'test@efko.ru',
    },
    {
        key: '2',
        date: '07.07.2024 в 23:55:00',
        notify: 'Уведомление об отправке на доработку',
        status: 'ошибка',
        scenario: 'ELT Новые точки в ИС',
        provider: 'СМС центр',
        addresse: 'test@efko.ru',
    },
    {
        key: '3',
        date: '08.07.2024 в 23:55:00',
        notify: 'Уведомление об отправке на доработку',
        status: 'выполнено',
        scenario: 'ELT Новые точки в ИС',
        provider: 'Email',
        addresse: 'test@efko.ru',
    },
    {
        key: '4',
        date: '09.07.2024 в 23:55:00',
        notify: 'Анкета по оценке аудита',
        status: 'выполнено с замечаниями',
        scenario: 'Отзыв доверенности',
        provider: 'Email',
        addresse: 'test@efko.ru',
    },
    {
        key: '5',
        date: '10.07.2024 в 23:55:00',
        notify: 'Анкета по оценке аудита',
        status: 'нет информаци',
        scenario: 'Отзыв доверенности',
        provider: 'Zvonok.com',
        addresse: 'test@efko.ru',
    },
    {
        key: '6',
        date: '06.07.2024 в 23:55:00',
        notify: 'Анкета по оценке аудита',
        status: 'в процессе',
        scenario: 'Аудит предприятий',
        provider: 'Telegram bot',
        addresse: 'test@efko.ru',
    },
    {
        key: '7',
        date: '07.07.2024 в 23:55:00',
        notify: 'Уведомление об отправке на доработку',
        status: 'ошибка',
        scenario: 'ELT Новые точки в ИС',
        provider: 'СМС центр',
        addresse: 'test@efko.ru',
    },
    {
        key: '8',
        date: '08.07.2024 в 23:55:00',
        notify: 'Уведомление об отправке на доработку',
        status: 'выполнено',
        scenario: 'ELT Новые точки в ИС',
        provider: 'Email',
        addresse: 'test@efko.ru',
    },
    {
        key: '9',
        date: '09.07.2024 в 23:55:00',
        notify: 'Анкета по оценке аудита',
        status: 'выполнено с замечаниями',
        scenario: 'Отзыв доверенности',
        provider: 'Email',
        addresse: 'test@efko.ru',
    },
    {
        key: '10',
        date: '10.07.2024 в 23:55:00',
        notify: 'Анкета по оценке аудита',
        status: 'нет информаци',
        scenario: 'Отзыв доверенности',
        provider: 'Zvonok.com',
        addresse: 'test@efko.ru',
    },
]);
</script>

<style lang="scss">
.custom-color-placeholder input::placeholder,
.custom-color-placeholder::placeholder,
.custom-color-placeholder .ant-select-selection-placeholder {
    color: var(--placeholder-color) !important;
}

.svg-w-full svg {
    width: 100%;
    height: 100%;
}
</style>
