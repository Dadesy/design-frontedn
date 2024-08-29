<template>
  <a-page-header
      style="padding: 16px;"
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
