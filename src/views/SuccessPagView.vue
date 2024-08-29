<template>
    <div class="p-5 error-page-example">
        <a-card class="w-full">
            <a-result
                status="success"
                title="Успешно приобретен облачный сервер ECS!"
                sub-title="Номер заказа: 2017182818828182881 Настройка облачного сервера занимает 1–5 минут, подождите."
            >
                <template #extra>
                    <a-button key="console" type="primary">На главную</a-button>
                    <a-button key="buy">Назад</a-button>
                </template>
            </a-result>
        </a-card>
    </div>
</template>
