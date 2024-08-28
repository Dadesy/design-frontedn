<template>
  <div>
    <a-calendar v-model:value="value" @select="onSelectDate">
      <template #dateCellRender="{ current }">
        <ul class="events">
          <li v-for="item in getListData(current)" :key="item.content">
            <a-badge :status="item.type" :text="item.content" />
          </li>
        </ul>
      </template>
      <template #monthCellRender="{ current }">
        <div v-if="getMonthData(current)" class="notes-month">
          <section>{{ getMonthData(current) }}</section>
          <span>Backlog number</span>
        </div>
      </template>
    </a-calendar>

    <!-- Модальное окно для добавления и просмотра задач -->
    <a-modal v-model:visible="isModalVisible" title="Задачи на день" @ok="handleOk" @cancel="handleCancel">
      <div v-if="selectedTasks.length > 0">
        <h4>Задачи:</h4>
        <ul class="events">
          <li v-for="item in selectedTasks" :key="item.content">
            <a-badge :status="item.type" :text="item.content" />
          </li>
        </ul>
      </div>
      <a-divider />
      <a-input v-model="newTask" placeholder="Введите новую задачу" />
      <a-select v-model="newTaskType" placeholder="Выберите тип" style="width: 120px; margin-top: 10px;">
        <a-select-option value="success">Успех</a-select-option>
        <a-select-option value="warning">Предупреждение</a-select-option>
        <a-select-option value="error">Ошибка</a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Dayjs } from 'dayjs';

const value = ref<Dayjs>();
const isModalVisible = ref(false);
const newTask = ref<string>('');
const newTaskType = ref<string>('success');
const selectedDate = ref<Dayjs | null>(null);
const selectedTasks = ref<Array<{ type: string, content: string }>>([]);
const tasks = ref<{ [key: string]: Array<{ type: string, content: string }> }>({});

const getListData = (value: Dayjs) => {
  return tasks.value[value.format('YYYY-MM-DD')] || [];
};

const onSelectDate = (date: Dayjs) => {
  selectedDate.value = date;
  selectedTasks.value = getListData(date);
  isModalVisible.value = true;
};

const handleOk = () => {
  if (selectedDate.value) {
    const dateKey = selectedDate.value.format('YYYY-MM-DD');
    if (!tasks.value[dateKey]) {
      tasks.value[dateKey] = [];
    }
    if (newTask.value) {
      tasks.value[dateKey].push({
        type: newTaskType.value,
        content: newTask.value,
      });
      newTask.value = ''; // Очистить поле ввода после добавления
      selectedTasks.value = getListData(selectedDate.value); // Обновить задачи для текущего дня
    }
  }
  isModalVisible.value = false; // Закрыть модальное окно
};

const handleCancel = () => {
  isModalVisible.value = false; // Закрыть модальное окно
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};
</script>

<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>
