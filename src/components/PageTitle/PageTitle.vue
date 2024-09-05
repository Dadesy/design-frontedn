<template>
    <a-card class="rounded-none border-l-0 border-t-0 border-r-0">
        <a-flex justify="space-between" align="center">
            <div class="font-semibold text-xl">
                {{ title }}
                <the-breadcrumbs class="mt-2"/>
            </div>

            <a-form-item label="Тема:" class="w-[300px] mb-0">
                <a-select placeholder="Тема" v-model="selected" :options="themes" :option-filter-prop="'label'"
                    @select="onSelect">
                    <template #option="{ label, value }">
                        <div class="flex gap-1 items-center">
                            <span class="w-1.5 h-5 min-w-5 min-h-5 block rounded-full" :aria-label="label"
                                :style="{ backgroundColor: THEME_LIST[value].mainColor }" />
                            &nbsp;&nbsp;{{ label }}
                        </div>
                    </template>
                </a-select>
            </a-form-item>
        </a-flex>
    </a-card>
</template>
<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import { THEME_LIST } from "@/utils/themes/themes";
import TheBreadcrumbs from '../TheBreadcrumbs/TheBreadcrumbs.vue';

const themes = computed(() => {
    return Object.keys(THEME_LIST).map((key: string) => ({
        label: key,
        value: key,
    }));
});

const props = defineProps<{
    title?: string;
}>();

const title = props.title ?? '';
const selected = ref(null);

function onSelect(v: string) {
    document.dispatchEvent(new CustomEvent('setTheme', {
        detail: THEME_LIST[v]
    }));
}
</script>
