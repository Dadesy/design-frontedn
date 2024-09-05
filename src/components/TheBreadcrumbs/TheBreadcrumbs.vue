<template>
    <a-breadcrumb class="font-normal">
        <a-breadcrumb-item v-for="(route, index) in breadcrumbRoutes" :key="index">
            <router-link v-if="index !== breadcrumbRoutes.length - 1" :to="route.path">
                {{ route.breadcrumbName }}
            </router-link>
            <span v-else>{{ route.breadcrumbName }}</span>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>
<script setup lang="ts">
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
