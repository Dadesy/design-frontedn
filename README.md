# Проект: Efko дизайн

Cтандарт эргономики интерфейса (Web)

Индекс проекта - FRNTDSGN

### Установка окружения:

Установить:
- nodejs 21.6.2 и выше

### Запуск в режиме разработки

1. Склонируйте проект в **требуемую директорию**

~~~
git clone https://gitlab.efko.ru/k.podkovyrov/update-frontend.git
~~~

2. Установите зависимости

~~~
npm install
~~~

3. Запустите проект

 ~~~
 npm run dev
 ~~~

## Дополнительные команды

### Компиляция и минимизация для производства
```
npm run build
```

## Docker:

1. `cp .env.dist .env`
2. `make install`

### Переменные окружения:

- `ENV` - режим разработки (local, prod)
- `TIMEZONE` - часовой пояс
- `APP_PORT` - порт приложения
- `DOCKER_REGISTRY` - хранилище Docker образов
- `DOCKER_IMAGE_NAME` - имя Docker-образа
- `DOCKER_IMAGE_VERSION` - версия (тег) Docker-образа

### Основные `make`-команды

* `make up` - запусть приложение
* `make down` - остановить приложение
* `make restart` - перезапустить приложение
* `make install` - выполнить полный цикл установки и запуска приложения
* `make shell` - подключится к консоли контейнера
