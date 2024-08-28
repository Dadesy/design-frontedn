<template>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="ЭФКО дизайн"
      :breadcrumb="{ routes: breadcrumbRoutes }"
  ><a-flex justify="space-between" align="center" class="h-full">
            <span/>
            <div class="w-10 h-10 border-r-[50%] overflow-hidden">
                <img src="../../assets/img/user.png" alt="user" class="block h-full"/>
            </div>
        </a-flex>
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
