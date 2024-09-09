<template>
    <page-title title="Пример верстки формы" />
    <a-form class="p-5">
        <a-flex gap="middle">
            <a-card class="w-full overflow-hidden" title="Инпут">

                <label class="flex flex-col gap-2 mb-5">
                    <span>Вариант интпута <i class="text-red-500">*</i></span>
                    <a-input size="large" placeholder="Введите текст"
                        :status="requireError['optionText'] ? 'error' : undefined"
                        @blur="validateReqired('optionText', $event)" @input="requireInputHandler('optionText')" />
                    <div v-if="requireError['optionText']" class="text-red-500">{{ requireError['optionText'] }}</div>
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Введите пароль <i class="text-red-500">*</i></span>
                    <a-input-password size="large" placeholder="Ваш пароль" @blur="validateReqired('optionPass', $event)"
                        :status="requireError['optionPass'] ? 'error' : undefined"
                        @input="requireInputHandler('optionPass')" />
                    <div v-if="requireError['optionPass']" class="text-red-500">{{ requireError['optionPass'] }}</div>
                </label>


                <label class="flex flex-col gap-2 mb-5">
                    <span>Вариант интпута email</span>
                    <div>
                        <a-input type="email" size="large" @blur="validateEmail" placeholder="Введите email"
                            :status="emailError ? 'error' : undefined" @input="emailInputHandler" />
                        <div v-if="emailError" class="text-red-500">{{ emailError }}</div>
                    </div>
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Вариант интпута телефон</span>
                    <div>
                        <a-input type="text" @blur="validatePhone" size="large" v-mask="'+7 (###) ###-##-##'"
                            placeholder="+7 (___) ___-__-__" :status="phoneError ? 'error' : undefined" />
                        <div v-if="phoneError" class="text-red-500">{{ phoneError }}</div>
                    </div>
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Маска времени</span>
                    <a-time-picker v-model="valueTime" format="HH:mm" v-mask="'##:##'" size="large" class="w-full"
                        placeholder="__:__" />
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Маска даты рождения</span>
                    <div>
                        <a-date-picker v-model="valueBirthday" v-mask="'##.##.####'" :format="`DD.MM.YYYY`"
                            class="w-full" placeholder="__.__.____" size="large" />
                    </div>
                </label>

            </a-card>
            <a-card class="w-full overflow-hidden" title="Выпадающий список, чекбокс, свитчер">

                <label class="flex flex-col gap-2 mb-5">
                    <span>Вариант выпадающего списка</span>
                    <a-select ref="select" size="large" class="w-full" placeholder="Выберите вариант">
                        <a-select-option value="Общая">Общая</a-select-option>
                        <a-select-option value="ИСУИ">ИСУИ</a-select-option>
                        <a-select-option value="MDM">MDM</a-select-option>
                    </a-select>
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Вариант выпадающего списка c множественным выбором</span>
                    <a-select class="w-full" :options="optionsMultiple" mode="multiple" size="large"
                        placeholder="Выберите варианты" />
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Выбор страны</span>
                    <countries-select />
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Поиск по адресу</span>
                    <address-select />
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span class="flex items-center gap-1">
                        Вариант лэйбл с изображением
                        <eye-outlined class="w-4 h-4 cursor-pointer relative top-[1px]" />
                    </span>
                    <a-select ref="select" size="large" class="w-full" placeholder="Выберите шаблон">
                        <a-select-option value="Повторная отправка файлов МЧД">Повторная отправка файлов МЧД
                        </a-select-option>
                        <a-select-option value="Универсальный шаблон">Универсальный шаблон</a-select-option>
                    </a-select>
                </label>

                <a-flex vertical gap="small">
                    <a-checkbox>Проверка на дубликаты</a-checkbox>
                    <div class="flex gap-0.5 items-center">
                        <a-checkbox>Использовать пакетную отправку</a-checkbox>
                        <a-tooltip title="Небесная сфера колеблет непреложный эффективный диаметp.">
                            <info-circle-outlined class="w-4 h-4 cursor-pointer relative top-[1px]" />
                        </a-tooltip>
                    </div>

                    <div class="flex gap-2 items-center mt-5">
                        <a-switch v-model:checked="switched" />
                        Переключение состояния
                    </div>
                </a-flex>

            </a-card>
        </a-flex>

        <a-flex gap="middle" class="mt-5">
            <a-card class="w-full overflow-hidden" title="Дата/радиокнопки">

                <label class="flex flex-col gap-2 mb-5">
                    <span>Диапазон дат</span>
                    <a-range-picker name="buildTime" class="w-[300px]" :placeholder="['Дата начала', 'Дата окончания']"
                        size="large" />
                </label>

                <label class="flex flex-col gap-2 mb-5">
                    <span>Выберите вариант</span>
                    <a-radio-group v-model:value="radioValue">
                        <a-radio :style="radioStyle" :value="1">Иван</a-radio>
                        <a-radio :style="radioStyle" :value="2">Андрей</a-radio>
                        <a-radio :style="radioStyle" :value="3">Елена</a-radio>
                        <a-radio :style="radioStyle" :value="4">Виктория</a-radio>
                    </a-radio-group>
                </label>

            </a-card>

            <a-card class="w-full overflow-hidden" title="Загрузка/скачивание файлов">

                <a-flex vertical gap="small">
                    <div class="flex flex-col gap-2 mb-5">
                        <span>Выберите или перетащите файл</span>
                        <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card"
                            class="avatar-uploader" :show-upload-list="false"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :before-upload="beforeUpload"
                            @change="handleChange">
                            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                            <div v-else>
                                <loading-outlined v-if="loading"></loading-outlined>
                                <plus-outlined v-else></plus-outlined>
                                <div class="ant-upload-text">Upload</div>
                            </div>
                        </a-upload>
                    </div>

                    <a-flex>
                        <a-button type="primary" size="large" href="./files/npl.jpg" download>
                            <template #icon>
                                <DownloadOutlined />
                            </template>
                            Скачать файл
                        </a-button>
                    </a-flex>
                </a-flex>
            </a-card>
        </a-flex>

        <a-card class="w-full mt-5">
            <a-flex gap="small">
                <a-button size="large" type="primary">Сохранить</a-button>
                <a-button size="large">Отмена</a-button>
            </a-flex>
        </a-card>
    </a-form>
</template>
<script setup lang="ts">
import PageTitle from "@/components/PageTitle/PageTitle.vue";
import { EyeOutlined, InfoCircleOutlined, PlusOutlined, LoadingOutlined, DownloadOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import CountriesSelect from "@/components/CountriesSelect/CountriesSelect.vue";
import AddressSelect from "@/components/AddressSelect/AddressSelect.vue";
import dayjs, { type Dayjs } from 'dayjs';
import { message } from 'ant-design-vue';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { EMAIL_PATTERN, PHONE_PATTERN } from "@/constants/regexp";

let emailError = ref<string | null>('');
let phoneError = ref<string | null>('');
let requireError = ref<{ [key: string]: string }>({});

const optionsMultiple = [{ value: 'Иван' }, { value: 'Марина' }, { value: 'Василий' }, { value: 'Анатолий' }, { value: 'Ирина' }, { value: 'Андрей' }, { value: 'Карина' }]

const valueBirthday = ref<Dayjs>();
const valueTime = ref(dayjs('00:00', 'HH:mm'));
const switched = ref<boolean>(false);

const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');
const radioValue = ref<number>(1);

const radioStyle = reactive({
    display: 'flex',
    height: '30px',
    lineHeight: '30px',
});

function validateEmail(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;
    if (value.length > 0) {
        emailError.value = EMAIL_PATTERN.test(value) ? null : 'Некорректный email';
        return;
    }

    emailError.value = null;
}

function validateReqired(field: string, e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;
    if (value.length === 0) {
        requireError.value[field] = 'Поле обязательно для заполнения';
        return;
    }

    delete requireError.value[field]
}

function emailInputHandler() {
    emailError.value = null;
}

function requireInputHandler(field: string) {
    delete requireError.value[field];
}

function validatePhone(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;
    if (value.length > 0) {
        phoneError.value = PHONE_PATTERN.test(value) ? null : 'Некорректный формат телефона';
        return;
    }

    phoneError.value = null;
}

function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
}

const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
        loading.value = true;
        return;
    }
    if (info.file.status === 'done') {
        // @ts-ignore
        getBase64(info.file.originFileObj, (base64Url: string) => {
            imageUrl.value = base64Url;
            loading.value = false;
        });
    }
    if (info.file.status === 'error') {
        loading.value = false;
        message.error('Ошибка загрузки файла');
    }
};

// @ts-ignore
const beforeUpload = (file: UploadProps['fileList'][number]) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Вы можете загрузить только JPG файл!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Изображение должно быть меньше 2 МБ!');
    }
    return isJpgOrPng && isLt2M;
};
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
