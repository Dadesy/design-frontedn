<template>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240); padding: 16px;"
      title="ЭФКО дизайн"
      :breadcrumb="{ routes: breadcrumbRoutes }"
  >
  </a-page-header>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const breadcrumbRoutes = computed(() => {
  const matchedRoutes = route.matched;

  return matchedRoutes.map(r => ({
    path: r.path,
    breadcrumbName: r.meta.breadcrumbName || r.name
  }));
});
</script>
