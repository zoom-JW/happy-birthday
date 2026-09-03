# ⚛️ My React App

Современный стартовый шаблон для React-приложений, построенный на Vite. Настроен с TypeScript, SCSS, ESLint, Prettier и React Router — всё готово к разработке с первого запуска.

---

## 🛠️ Технологический стек

| Технология | Версия | Назначение |
|---|---|---|
| [React](https://react.dev/) | ^19 | UI-библиотека |
| [TypeScript](https://www.typescriptlang.org/) | ~6.0 | Статическая типизация |
| [Vite](https://vite.dev/) | ^8 | Сборщик и dev-сервер |
| [React Router DOM](https://reactrouter.com/) | ^7 | Клиентская маршрутизация |
| [SASS / SCSS](https://sass-lang.com/) | ^1 | Препроцессор стилей |
| [ESLint](https://eslint.org/) | ^10 | Статический анализ кода |
| [Prettier](https://prettier.io/) | ^3 | Форматирование кода |

### ESLint плагины
- `typescript-eslint` — правила для TypeScript
- `eslint-plugin-react-hooks` — правила для React хуков
- `eslint-plugin-react-refresh` — совместимость с Vite HMR
- `eslint-plugin-prettier` — Prettier как правило ESLint
- `eslint-config-prettier` — отключает конфликтующие правила ESLint/Prettier

---

## 📁 Структура проекта

```
my-react-app/
├── public/              # Статические файлы (favicon и т.д.)
├── src/
│   ├── components/      # React компоненты
│   │   └── App.tsx      # Корневой компонент приложения
│   ├── style/
│   │   ├── index.scss   # Точка входа стилей
│   │   └── app.scss     # Глобальные стили приложения
│   └── main.tsx         # Точка входа React
├── .eslintconfig.js     # Конфигурация ESLint (flat config)
├── .prettierrc          # Конфигурация Prettier
├── .prettierignore      # Исключения для Prettier
├── .gitignore           # Исключения для Git
├── index.html           # HTML шаблон
├── vite.config.ts       # Конфигурация Vite
├── tsconfig.json        # Базовый конфиг TypeScript
├── tsconfig.app.json    # Конфиг TypeScript для приложения
└── tsconfig.node.json   # Конфиг TypeScript для Node (Vite)
```

---

## 🚀 Установка и запуск

### Предварительные требования

- [Node.js](https://nodejs.org/) версии **18.0.0** или выше
- [npm](https://www.npmjs.com/) версии **9.0.0** или выше

### 1. Клонирование репозитория

```bash
git clone https://github.com/<ваш-username>/<название-репозитория>.git
cd <название-репозитория>
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Запуск в режиме разработки

```bash
npm run dev
```

Откройте браузер по адресу: **http://localhost:5173**

---

## 📦 Доступные команды

| Команда | Описание |
|---|---|
| `npm run dev` | Запуск dev-сервера с HMR |
| `npm run build` | Сборка production-бандла |
| `npm run preview` | Предпросмотр production-сборки локально |
| `npm run lint` | Проверка кода с ESLint |

---

## ⚙️ Настройка инструментов

### Prettier (`.prettierrc`)
```json
{
  "singleQuote": true,
  "semi": false,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "endOfLine": "auto"
}
```

### SCSS
Все стили подключаются через `src/style/index.scss`, который импортирует `app.scss`. Для создания стилей компонента создайте `.scss` файл рядом с компонентом и импортируйте его напрямую.

---

## 📝 Лицензия

[ISC](./LICENSE)
