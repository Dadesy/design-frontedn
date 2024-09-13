<template>
    <a-select class="w-full" placeholder="Выберите вариант" v-model="value" :options="addresses" :filter-option="false"
        :not-found-content="null" show-search :option-filter-prop="'label'" @search="onSearch" :loading="addressLoad" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { ADDRESS_API_URL } from "@/constants/yamaps";
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
            const res = await axios.get(`${ADDRESS_API_URL}${v}&format=json`);
            if (res?.data?.response?.GeoObjectCollection?.featureMember) {
                addresses.value = res.data.response.GeoObjectCollection.featureMember.map((v: any) => {
                    return {
                        label: `${v.GeoObject.name} ${v.GeoObject.description || ''}`,
                        value: `${v.GeoObject.name} ${v.GeoObject.description || ''}`
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
