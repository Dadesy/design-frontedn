<template>
    <page-title title="Редактирование сценария" />
    <a-form class="p-5">
        <div class="flex gap-2 items-center mb-5">
            <a-switch v-model:checked="switched" />
            Активность
        </div>
        <a-flex gap="middle">
            <a-card class="w-full overflow-hidden" title="Общее">

                <label class="flex flex-col gap-2 mb-5">
                    <span>Название сценария <i class="text-red-500">*</i></span>
                    <a-input placeholder="Введите текст"
                        :status="requireError['optionText'] ? 'error' : undefined"
                        @blur="validateReqired('optionText', $event)" @input="requireInputHandler('optionText')" />
                    <div v-if="requireError['optionText']" class="text-red-500">{{ requireError['optionText'] }}</div>
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Группа доступа</span>
                    <a-select ref="select" class="w-full" placeholder="Выберите группу доступа">
                        <a-select-option value="Общая">Общая</a-select-option>
                        <a-select-option value="ИСУИ">ИСУИ</a-select-option>
                        <a-select-option value="MDM">MDM</a-select-option>
                    </a-select>
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Провайдер</span>
                    <a-select ref="select" class="w-full" placeholder="Выберите провайдер">
                        <a-select-option value="Email">Email</a-select-option>
                        <a-select-option value="СМС центр">СМС центр</a-select-option>
                        <a-select-option value="Zvonok.com">Zvonok.com</a-select-option>
                        <a-select-option value="Telegram bot">Telegram bot</a-select-option>
                    </a-select>
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Приоритет обработки</span>
                    <a-select ref="select" class="w-full" placeholder="Выберите приоритет">
                        <a-select-option value="Email">Не установлен</a-select-option>
                        <a-select-option value="СМС центр">Высокий</a-select-option>
                        <a-select-option value="Zvonok.com">Средний</a-select-option>
                        <a-select-option value="Telegram bot">Низкий</a-select-option>
                    </a-select>
                </label>

                <a-flex vertical gap="small">
                    <a-checkbox>Включить ограничение на размер вложения</a-checkbox>
                    <a-checkbox>Включить ограничение на общий размер вложений</a-checkbox>
                </a-flex>

            </a-card>
            <a-card class="w-full overflow-hidden" title="Рассылка">

                <label class="flex flex-col gap-2 mb-5">
                    <span>Адресанты</span>
                    <a-select v-model:value="valueAdresses" class="w-full" mode="tags" placeholder="Email"
                        :not-found-content="null" :filter-option="false" />
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span class="flex items-center gap-1">
                        Шаблоны
                        <eye-outlined class="w-4 h-4 cursor-pointer relative top-[1px]" />
                    </span>
                    <a-select ref="select" class="w-full" placeholder="Выберите шаблон">
                        <a-select-option value="Повторная отправка файлов МЧД">Повторная отправка файлов
                            МЧД</a-select-option>
                        <a-select-option value="Универсальный шаблон">Универсальный шаблон</a-select-option>
                    </a-select>
                </label>

                <a-flex vertical gap="small">
                    <a-checkbox>Проверка на дубликаты</a-checkbox>
                    <a-checkbox v-model:checked="addressCheckbox">На адрес из запроса</a-checkbox>
                    <div class="flex gap-0.5 items-center">
                        <a-checkbox>На адрес из сценария</a-checkbox>
                        <a-tooltip
                            title="Выберите, если хотите указать список получателей, которым всегда будет отправлено сообщение.">
                            <info-circle-outlined class="w-4 h-4 cursor-pointer relative top-[1px]" />
                        </a-tooltip>
                    </div>
                    <a-checkbox>Использовать пакетную отправку</a-checkbox>
                </a-flex>

            </a-card>
        </a-flex>

        <a-card class="w-full mt-5">
            <a-flex gap="small">
                <a-button type="primary">Сохранить</a-button>
                <a-button>Отмена</a-button>
            </a-flex>
        </a-card>
    </a-form>
</template>
<script setup lang="ts">
import PageTitle from "@/components/PageTitle/PageTitle.vue";
import { EyeOutlined, InfoCircleOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";

let requireError = ref<{ [key: string]: string }>({});
const valueAdresses = ref([]);
const addressCheckbox = ref(true);

const switched = ref<boolean>(true);

function validateReqired(field: string, e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;
    if (value.length === 0) {
        requireError.value[field] = 'Поле обязательно для заполнения';
        return;
    }

    delete requireError.value[field]
}

function requireInputHandler(field: string) {
    delete requireError.value[field];
}
</script>

<style scoped>
.avatar-uploader>.ant-upload {
    width: 128px;
    height: 128px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>
