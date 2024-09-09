<template>
  <page-title title="Предупреждающее окно" />
  <div class="p-5">
    <a-card class="max-w-2xl mx-auto">
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="Имя пользователя">
          <a-input v-model:value="formState.username" placeholder="Введите имя пользователя" />
        </a-form-item>
        <a-form-item label="Email">
          <a-input v-model:value="formState.email" type="email" placeholder="Введите email" @blur="validateEmail"
            :status="emailError ? 'error' : undefined" @input="emailInputHandler" />
          <div v-if="emailError" class="text-red-500">{{ emailError }}</div>
        </a-form-item>
        <a-form-item label="Пароль">
          <a-input-password v-model:value="formState.password" placeholder="Введите пароль" />
        </a-form-item>
        <a-form-item label="Подтверждение пароля">
          <a-input-password v-model:value="formState.confirmPassword" placeholder="Подтвердите пароль" />
        </a-form-item>
        <a-form-item label="Роль пользователя">
          <a-radio-group v-model:value="formState.role">
            <a-radio value="admin">Администратор</a-radio>
            <a-radio value="user">Пользователь</a-radio>
            <a-radio value="guest">Гость</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="Согласие с условиями">
          <a-checkbox v-model:checked="formState.agreement">Я согласен с условиями использования</a-checkbox>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="text-center">
          <a-button type="primary" @click="onSubmit">Создать</a-button>
          <a-button style="margin-left: 10px">Отмена</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRaw, onBeforeUnmount, watch, onMounted, ref } from 'vue';
import { Modal } from 'ant-design-vue';
import type { UnwrapRef } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import PageTitle from '@/components/PageTitle/PageTitle.vue';
import { EMAIL_PATTERN } from '@/constants/regexp';

interface FormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  agreement: boolean;
}

const formState: UnwrapRef<FormState> = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
  agreement: false,
});

let emailError = ref<string | null>('');

const isFormDirty = () => {
  return formState.username || formState.email || formState.password || formState.confirmPassword || formState.role || formState.agreement;
};

function validateEmail(e: InputEvent) {
  const value = (e.target as HTMLInputElement).value;
  if (value.length > 0) {
    emailError.value = EMAIL_PATTERN.test(value) ? null : 'Некорректный email';
    return;
  }

  emailError.value = null;
}

function emailInputHandler() {
  emailError.value = null;
}

const onSubmit = () => {
  if (formState.password !== formState.confirmPassword) {
    Modal.error({
      title: 'Ошибка',
      content: 'Пароли не совпадают',
    });
    return;
  }

  console.log('submit!', toRaw(formState));
  saved = true;

  Modal.success({
    title: 'Пользователь создан',
    content: 'Новый пользователь был успешно создан.',
  });

  window.removeEventListener('beforeunload', handleBeforeUnload);
};

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (isFormDirty() && !saved) {
    event.preventDefault();
    event.returnValue = '';
  }
};

let saved = false;

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);

  onBeforeRouteLeave((to, from, next) => {
    if (isFormDirty() && !saved) {
      Modal.confirm({
        title: 'Вы уверены, что хотите покинуть эту страницу?',
        content: 'У вас есть несохраненные изменения. Если вы уйдете, изменения будут потеряны.',
        okText: 'Да, уйти',
        cancelText: 'Отмена',
        onOk() {
          window.removeEventListener('beforeunload', handleBeforeUnload);
          next();
        },
        onCancel() {
          next(false);
        },
      });
    } else {
      next();
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});

watch(
  () => formState,
  () => {
    saved = false;
  },
  { deep: true }
);

const labelCol = { xs: { span: 24 }, sm: { span: 8 } };
const wrapperCol = { xs: { span: 24 }, sm: { span: 16 } };

</script>

<style scoped></style>
