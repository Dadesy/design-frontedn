<template>
    <div class="p-5 error-page-example">
        <a-card class="w-full">
            <a-result status="500" title="500" sub-title="Извините, ошибка сервера.">
                <template #extra>
                    <a-button type="primary">На главную</a-button>
                </template>
            </a-result>
        </a-card>
    </div>
</template>
