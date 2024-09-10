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
import HomePageLayout from "@/layouts/HomePageLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePageLayout,
      meta: {
        breadcrumbName: "Главная",
      },
    },
    {
      path: "/components",
      name: "components",
      component: ComponentsLayout,
      meta: {
        breadcrumbName: "Компоненты",
      },
      children: [
        {
          path: "/components/form",
          name: "form",
          component: FormView,
          meta: {
            breadcrumbName: "Пример верстки формы",
          },
        },
        {
          path: "/components/table",
          name: "table",
          meta: {
            breadcrumbName: "Таблица",
          },
          children: [
            {
              path: "/components/table/advanced",
              name: "advancedTable",
              component: AdvancedTableView,
              meta: {
                breadcrumbName: "Расширенная таблица",
              },
            },
            {
              path: "/components/table/basic",
              name: "basicTable",
              component: BasicTableView,
              meta: {
                breadcrumbName: "Базовая таблица",
              },
            },
            {
              path: "/components/table/custom",
              name: "customTable",
              component: CustomTableView,
              meta: {
                breadcrumbName: "Таблица с модальным окном",
              },
            },
          ],
        },
        {
          path: "/components/error",
          name: "error",
          meta: {
            breadcrumbName: "Страницы ошибок/успеха",
          },
          children: [
            {
              path: "/components/error/success",
              name: "successPage",
              component: SuccessPagView,
              meta: {
                breadcrumbName: "Успешно",
              },
            },
            {
              path: "/components/error/warning",
              name: "warningPage",
              component: WarningPageView,
              meta: {
                breadcrumbName: "Предупреждения",
              },
            },
            {
              path: "/components/error/403",
              name: "403Page",
              component: Page403View,
              meta: {
                breadcrumbName: "403 Ошибка доступа",
              },
            },
            {
              path: "/components/error/404",
              name: "404Page",
              component: Page404View,
              meta: {
                breadcrumbName: "404 Страница не найдена",
              },
            },
            {
              path: "/components/error/500",
              name: "500Page",
              component: Page500View,
              meta: {
                breadcrumbName: "500 Ошибка сервера",
              },
            },
            {
              path: "/components/error/submission",
              name: "submissionPage",
              component: SubmissionFailedPageView,
              meta: {
                breadcrumbName: "Ошибка отправки",
              },
            },
            {
              path: "/components/error/great",
              name: "greatPage",
              component: GreatPageView,
              meta: {
                breadcrumbName: "Задача выполнена",
              },
            },
          ],
        },
        {
          path: "/components/calendar",
          name: "calendar",
          component: CalendarView,
          meta: {
            breadcrumbName: "Календарь",
          },
        },
        {
          path: "/components/warningForm",
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
