<template>
    <a-page-header :title="title" class="border-b border-t border-gray-200 !bg-white"/>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    title?: string;
}>();

const title = props.title ?? '';
</script>
