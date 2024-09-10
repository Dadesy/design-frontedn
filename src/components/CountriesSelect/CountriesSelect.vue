<template>
    <a-select
        class="w-full"
        placeholder="Выберите вариант"
        v-model="value"
        :options="countries"
        show-search
        :option-filter-prop="'label'"
    >
        <template #option="{ label, value, flag }">
            <span role="img" :aria-label="label">{{ flag }}</span>
            &nbsp;&nbsp;{{ label }}
        </template>
    </a-select>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import {COUNTRY_API} from "@/constants/api-urls";

const value = ref(null);

export interface ICountry {
    label: string
    value: string
    flag: string
}
const countries = ref<ICountry[]>([]);

onMounted(async () => {
    try {
        const res = await axios.get(COUNTRY_API);
        if (res?.data && Array.isArray(res.data)) {
            const preparedData: ICountry[] = res.data.map((v: any) => {
                return {
                    label: v.name.common,
                    value: v.name.common,
                    flag: v.flag
                }
            })
            countries.value = preparedData;
        }
    } catch (e) {
        console.log(e);
    }
});
</script>
