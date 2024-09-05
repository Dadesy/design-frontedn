<template>
  <a-form
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      class="user-form"
  >
    <a-form-item label="Имя пользователя">
      <a-input v-model:value="formState.username" placeholder="Введите имя пользователя" />
    </a-form-item>
    <a-form-item label="Email">
      <a-input v-model:value="formState.email" type="email" placeholder="Введите email" />
    </a-form-item>
    <a-form-item label="Пароль">
      <a-input v-model:value="formState.password" type="password" placeholder="Введите пароль" />
    </a-form-item>
    <a-form-item label="Подтверждение пароля">
      <a-input v-model:value="formState.confirmPassword" type="password" placeholder="Подтвердите пароль" />
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
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Создать</a-button>
      <a-button style="margin-left: 10px">Отмена</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, toRaw, onBeforeUnmount, watch, onMounted } from 'vue';
import { Modal } from 'ant-design-vue';
import type { UnwrapRef } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';

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

const isFormDirty = () => {
  return formState.username || formState.email || formState.password || formState.confirmPassword || formState.role || formState.agreement;
};

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

<style scoped>
.user-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>
