import { createRouter, createWebHistory } from 'vue-router';
import FormView from "@/views/FormView.vue";
import AdvancedTableView from "@/views/AdvancedTableView.vue";
import ListView from "@/views/ListView.vue";
import BasicTableView from "@/views/BasicTableView.vue";
import CustomTableView from "@/views/CustomTableView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'form',
      component: FormView,
      meta: {
        breadcrumbName: 'Пример верстки формы'
      }
    },
    {
      path: '/table',
      name: 'table',
      meta: {
        breadcrumbName: 'Таблицы'
      },
      children: [
        {
          path: 'advanced',
          name: 'advancedTable',
          component: AdvancedTableView,
          meta: {
            breadcrumbName: 'Расширенная таблица'
          }
        },
        {
          path: 'basic',
          name: 'basicTable',
          component: BasicTableView,
          meta: {
            breadcrumbName: 'Базовая таблица'
          }
        },
        {
          path: 'custom',
          name: 'customTable',
          component: CustomTableView,
          meta: {
            breadcrumbName: 'Таблица с модальным окном таблица'
          }
        }
      ]
    },
    {
      path: '/list',
      name: 'list',
      component: ListView,
      meta: {
        breadcrumbName: 'List'
      }
    }
  ]
});

export default router;
