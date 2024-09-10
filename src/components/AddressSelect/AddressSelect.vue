<template>
    <a-select
        class="w-full"
        placeholder="Выберите вариант"
        v-model="value"
        :options="addresses"
        :filter-option="false"
        :not-found-content="null"
        show-search
        :option-filter-prop="'label'"
        @search="onSearch"
        :loading="addressLoad"
    />
</template>

<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import {ADDRESS_API} from "@/constants/api-urls";
let timeOut: number;

const value = ref(null);
let addressLoad = ref<boolean>(false);

export interface IAddress {
    label: string
    value: string
}
const addresses = ref<IAddress[]>([]);

async function onSearch(v: string) {
    clearTimeout(timeOut);
    try {
        timeOut = setTimeout(async () => {
            addressLoad.value = true;
            const res = await axios.get(`${ADDRESS_API}addressdetails=1&q=${v}&format=jsonv2&limit=100`);
            if (res?.data && Array.isArray(res.data)) {
                addresses.value = res.data.map((v: any) => {
                    const result = `${v.address.village || ''} ${v.address.city || v.address.town || v.address.river ? 'р. ' + v.address.river : '' || ''} ${v.address.country || ''} ${v.address.state || ''}`
                    return {
                        label: v.display_name,
                        value: v.display_name,
                    }
                });
            }
            addressLoad.value = false;
        }, 500)
    } catch (e) {
        console.log(e);
    }
}
</script>
