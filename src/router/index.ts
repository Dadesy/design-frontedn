import { createRouter, createWebHistory } from "vue-router";
import FormView from "@/views/FormView.vue";
import AdvancedTableView from "@/views/AdvancedTableView.vue";
import BasicTableView from "@/views/BasicTableView.vue";
import CustomTableView from "@/views/CustomTableView.vue";
import CalendarView from "@/views/CalendarView.vue";
import SuccessPagView from "@/views/SuccessPageView.vue";
import WarningPageView from "@/views/WarningPageView.vue";
import Page403View from "@/views/Page403View.vue";
import Page404View from "@/views/Page404View.vue";
import Page500View from "@/views/Page500View.vue";
import SubmissionFailedPageView from "@/views/SubmissionFailedPageView.vue";
import GreatPageView from "@/views/GreatPageView.vue";
import WarningFormView from "@/views/WarningWindowForm.vue";
import ComponentsLayout from "@/layouts/ComponentsLayout.vue";
import TemplatesLayout from "@/layouts/TemplatesLayout.vue";
import TemplateEditScenario from "@/views/TemplateEditScenario.vue";
import TemplateJournal from "@/views/TemplateJournal.vue";
import TemplateUsers from "@/views/TemplateUsers.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ComponentsLayout,
      meta: {
        breadcrumbName: "Компоненты",
      },
      children: [
        {
          path: "/",
          name: "form",
          component: FormView,
          meta: {
            breadcrumbName: "Пример верстки формы",
          },
        },
        {
          path: "/table",
          name: "table",
          meta: {
            breadcrumbName: "Таблица",
          },
          children: [
            {
              path: "advanced",
              name: "advancedTable",
              component: AdvancedTableView,
              meta: {
                breadcrumbName: "Расширенная таблица",
              },
            },
            {
              path: "basic",
              name: "basicTable",
              component: BasicTableView,
              meta: {
                breadcrumbName: "Базовая таблица",
              },
            },
            {
              path: "custom",
              name: "customTable",
              component: CustomTableView,
              meta: {
                breadcrumbName: "Таблица с модальным окном",
              },
            },
          ],
        },
        {
          path: "/error",
          name: "error",
          meta: {
            breadcrumbName: "Страницы ошибок/успеха",
          },
          children: [
            {
              path: "success",
              name: "successPage",
              component: SuccessPagView,
              meta: {
                breadcrumbName: "Успешно",
              },
            },
            {
              path: "warning",
              name: "warningPage",
              component: WarningPageView,
              meta: {
                breadcrumbName: "Предупреждения",
              },
            },
            {
              path: "403",
              name: "403Page",
              component: Page403View,
              meta: {
                breadcrumbName: "403 Ошибка доступа",
              },
            },
            {
              path: "404",
              name: "404Page",
              component: Page404View,
              meta: {
                breadcrumbName: "404 Страница не найдена",
              },
            },
            {
              path: "500",
              name: "500Page",
              component: Page500View,
              meta: {
                breadcrumbName: "500 Ошибка сервера",
              },
            },
            {
              path: "submission",
              name: "submissionPage",
              component: SubmissionFailedPageView,
              meta: {
                breadcrumbName: "Ошибка отправки",
              },
            },
            {
              path: "great",
              name: "greatPage",
              component: GreatPageView,
              meta: {
                breadcrumbName: "Задача выполнена",
              },
            },
          ],
        },
        {
          path: "/calendar",
          name: "calendar",
          component: CalendarView,
          meta: {
            breadcrumbName: "Календарь",
          },
        },
        {
          path: "/warningForm",
          name: "warningForm",
          component: WarningFormView,
          meta: {
            breadcrumbName: "Предупреждающие окна",
          },
        },
      ],
    },
    {
      path: "/templates",
      name: "templates",
      component: TemplatesLayout,
      meta: {
        breadcrumbName: "Шаблоны страниц",
      },
      children: [
        {
          path: "/templates/scenario",
          name: "scenario",
          component: TemplateEditScenario,
          meta: {
            breadcrumbName: "Редактировать сценарий",
          },
        },
        {
          path: "/templates/journal",
          name: "journal",
          component: TemplateJournal,
          meta: {
            breadcrumbName: "Журнал обменов",
          },
        },
        {
          path: "/templates/users",
          name: "users",
          component: TemplateUsers,
          meta: {
            breadcrumbName: "Пользователи",
          },
        },
      ],
    },
  ],
});

export default router;
