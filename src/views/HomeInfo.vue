<template>
    <page-title title="Дизайн-система"/>
    <div class="p-5">
        <a-card class="w-full">
            <p class="text-lg font-semibold mb-4">При разработке frontend цифровых веб-сервисов в ЭФКО ЦР
                используются:</p>
            <ul class="list-disc pl-6 space-y-2">
                <li>VueJs для создания пользовательских интерфейсов;</li>
                <li>TailwindCSS для стилизации элементов пользовательских интерфейсов;</li>
                <li>Figma для отрисовки мокапов и работы с UI-Kit;</li>
                <li>Ant Design как основа дизайн-системы.</li>
            </ul>
            <p class="text-lg font-semibold mt-6 mb-4">Дизайн-система ЭФКО ЦР включает:</p>
            <ul class="list-disc pl-6 space-y-2">
                <li>ЭФКО UI-Kit;</li>
                <li>Библиотека компонентов;</li>
                <li>NPM-репозиторий;</li>
                <li>Стандарт эргономики веб-интерфейсов ЭФКО-ЦР.</li>
            </ul>
        </a-card>
    </div>
</template>
<script setup lang="ts">
import PageTitle from '@/components/PageTitle/PageTitle.vue';
</script>
