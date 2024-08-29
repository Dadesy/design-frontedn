<template>
    <div class="p-5 error-page-example">
        <a-card class="w-full">
            <a-result status="403" title="403" sub-title="К сожалению, у вас нет прав доступа к этой странице.">
                <template #extra>
                    <a-button type="primary">На главную</a-button>
                </template>
            </a-result>
        </a-card>
    </div>
</template>
