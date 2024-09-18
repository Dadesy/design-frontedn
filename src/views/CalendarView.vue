<template>
  <page-title title="Календарь событий" />
  <div class="p-5">
    <a-calendar v-model:value="value">
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
  </div>

  <div class="p-5">
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>

</template>
<script lang="ts" setup>
import { ref } from 'vue';
import PageTitle from '@/components/PageTitle/PageTitle.vue';
import { Dayjs } from 'dayjs';

import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createEventsServicePlugin } from '@schedule-x/events-service';

const eventsServicePlugin = createEventsServicePlugin();


const calendarApp = createCalendar({
  // selectedDate: '2023-12-19',
  locale: 'ru-RU',
  firstDayOfWeek: 1,
  dayBoundaries: {
    start: '08:00',
    end: '19:00',
  },
  callbacks: {
   /**
    * Is called when clicking a date in the month grid
    * */
    onClickDate(date) {
      console.log('onClickDate', date) // e.g. 2024-01-01
    },
 
    /**
    * Is called when clicking somewhere in the time grid of a week or day view
    * */
    onClickDateTime(dateTime) {
      console.log('onClickDateTime', dateTime) // e.g. 2024-01-01 12:37
    },
 
    /**
    * Is called when selecting a day in the month agenda
    * */
    onClickAgendaDate(date) {
      console.log('onClickAgendaDate', date) // e.g. 2024-01-01
    },
 
    /**
    * Is called when double clicking a date in the month grid
    * */
    onDoubleClickDate(date) {
      console.log('onClickDate', date) // e.g. 2024-01-01
    },

    onRangeUpdate(range) {
      console.log('new calendar range start date', range.start)
      console.log('new calendar range end date', range.end)
    },
  },
  views: [
    createViewDay(),
    createViewWeek(),
    createViewMonthGrid(),
    createViewMonthAgenda(),
  ],
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: '2023-12-19',
      end: '2023-12-19',
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2023-12-20 12:00',
      end: '2023-12-20 13:00',
    },
  ],
  calendars: {
    personal: {
      colorName: 'personal',
      lightColors: {
        main: '#f9d71c',
        container: '#fff5aa',
        onContainer: '#594800',
      },
      darkColors: {
        main: '#fff5c0',
        onContainer: '#fff5de',
        container: '#a29742',
      },
    },
  },
  plugins: [createEventModalPlugin(), eventsServicePlugin],
})

setTimeout(() => {
  eventsServicePlugin.add({
    title: 'Event 100500',
    start: '2024-09-17 15:00',
    end: '2024-09-17 16:00',
    id: 3,
    calendarId: "personal"
  })
}, 5000)


const value = ref<Dayjs>();

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
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
