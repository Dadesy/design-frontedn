<template>
    <page-title title="Пользователи" />
    <div class="p-5">

        <a-card class="w-full overflow-hidden">
            <a-flex gap="middle" vertical>
                <a-flex gap="middle" justify="space-between" align="center">
                    <a-flex gap="middle" class="flex-grow">

                        <a-input placeholder="ФИО" class="w-[160px] custom-color-placeholder" />
                        <a-input placeholder="Почта" class="w-[160px] custom-color-placeholder" />

                        <a-select ref="select" class="w-[160px] custom-color-placeholder"
                            placeholder="Роль">
                            <a-select-option value="Админ">Админ</a-select-option>
                            <a-select-option value="Пользователь">Пользователь</a-select-option>
                            <a-select-option value="Гость">Гость</a-select-option>
                        </a-select>

                        <a-select ref="select" class="w-[160px] custom-color-placeholder"
                            placeholder="Активность">
                            <a-select-option value="Активен">Активен</a-select-option>
                            <a-select-option value="Не активен">Не активен</a-select-option>
                        </a-select>

                    </a-flex>
                    <a-flex gap="small">
                        <a-button type="primary" :icon="h(PlusOutlined)">Добавить</a-button>
                        <a-tooltip title="Выгрузить в Excel">
                            <a-button :icon="h(DownloadOutlined)"></a-button>
                        </a-tooltip>
                    </a-flex>
                </a-flex>

                <a-table :columns="columns" :data-source="data" bordered :pagination="false" size="small">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'user'">
                            <a-flex gap="small" align="center">
                                <img class="block w-11 min-w-11 h-11" :src="record[column.key].avatar"
                                    :alt="record[column.key]" />
                                <a-flex gap="0" vertical>
                                    <Text>{{ record[column.key].name }}</Text>
                                    <Text type="secondary" class="text-xs">{{ record[column.key].description }}</Text>
                                </a-flex>
                            </a-flex>
                        </template>
                        <template v-else-if="column.key === 'isActive'">
                            <a-checkbox disabled :checked="record[column.key]" />
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
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { Typography } from 'ant-design-vue';

import user1 from "../assets/img/users/1.png";
import user2 from "../assets/img/users/2.png";
import user3 from "../assets/img/users/3.png";
import user4 from "../assets/img/users/4.png";
import user5 from "../assets/img/users/5.png";
import user6 from "../assets/img/users/6.png";
import user7 from "../assets/img/users/7.png";
import user8 from "../assets/img/users/8.png";

const { Text } = Typography;

interface DataItem {
    key: string;
    user: {
        name: string;
        description: string;
        avatar: string;
    };
    email: string;
    role: string;
    isActive: boolean;
}

const columns = [
    {
        title: 'Пользователь',
        dataIndex: 'user',
        key: 'user',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Роль',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Активность',
        dataIndex: 'isActive',
        key: 'isActive',
    },
];

const data = ref<DataItem[]>([
    {
        key: '1',
        user: {
            name: 'Ивченко Алла Сергеевна',
            description: 'Ведущий веб-программист • Отдел веб-разработки',
            avatar: user1,
        },
        email: 'ivch@efko.ru',
        role: 'Гость',
        isActive: true
    },
    {
        key: '2',
        user: {
            name: 'Иванова Екатерина Геннадльевна',
            description: 'Руководитель проектов • Отдел управления проектами СЗГДРППО',
            avatar: user2,
        },
        email: 'ivanova@efko.ru',
        role: 'Пользователь',
        isActive: true
    },
    {
        key: '3',
        user: {
            name: 'Жданов Аполлон Владленович',
            description: 'Корпоративный архитектор • Архитектурное бюро службы генерального директора',
            avatar: user3,
        },
        email: 'zhdanov@efko.ru',
        role: 'Админ',
        isActive: true
    },
    {
        key: '4',
        user: {
            name: 'Трофимова Полианна Прокловна',
            description: 'Руководитель проектов по развитию инфраструктуры • Служба директора по информационным технологиям',
            avatar: user4,
        },
        email: 'trofimova@efko.ru',
        role: 'Пользователь',
        isActive: false
    },
    {
        key: '5',
        user: {
            name: 'Блохина Вида Мэлсовна',
            description: 'Младший программист-консультант • Отдел методологической поддержки',
            avatar: user5,
        },
        email: 'blokhina@efko.ru',
        role: 'Гость',
        isActive: true
    },
    {
        key: '6',
        user: {
            name: 'Николаева Нина Платоновна',
            description: 'Ведущий бизнес-аналитик - Отдел методологической поддержки',
            avatar: user6,
        },
        email: 'nikolaeva@efko.ru',
        role: 'Пользователь',
        isActive: true
    },
    {
        key: '7',
        user: {
            name: 'Исаев Егор Антонинович',
            description: 'Архитектор Данных • Архитектурное бюро службы генерального директора',
            avatar: user7,
        },
        email: 'isaev@efko.ru',
        role: 'Пользователь',
        isActive: true
    },
    {
        key: '8',
        user: {
            name: 'Бирюков Ефрем Игоревич',
            description: 'Ведущий программист-консультант • Отдел методологической поддержки',
            avatar: user8,
        },
        email: 'birukov@efko.ru',
        role: 'Гость',
        isActive: true
    },
]);
</script>

<style lang="scss">
.custom-color-placeholder input::placeholder,
.custom-color-placeholder::placeholder,
.custom-color-placeholder .ant-select-selection-placeholder {
    color: var(--placeholder-color) !important;
}
</style>
