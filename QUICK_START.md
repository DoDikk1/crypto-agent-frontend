# 🚀 Быстрый старт

## За 3 минуты до запуска

### 1. Установка зависимостей (1 мин)

```bash
cd /home/user/Hydro9/telegram-mini-app
npm install
```

### 2. Запуск (30 сек)

```bash
npm run dev
```

Откроется на `http://localhost:5173`

### 3. Начинаем разработку!

Откройте `src/components/HomePage.tsx` и начинайте редактировать.
Изменения применятся мгновенно (Hot Module Replacement).

---

## 📝 Что дальше?

### Создайте свой компонент

```tsx
// src/components/MyComponent.tsx
import { Section, Cell, Button } from '@telegram-apps/telegram-ui';

export default function MyComponent() {
  return (
    <Section header="Моя секция">
      <Cell>Контент</Cell>
      <Button mode="filled">Кнопка</Button>
    </Section>
  );
}
```

### Подключите к App.tsx

```tsx
import MyComponent from './components/MyComponent';

function App() {
  return (
    <AppRoot>
      <MyComponent />
    </AppRoot>
  );
}
```

### Используйте хук для темы

```tsx
import { useTelegramTheme } from './hooks/useTelegramTheme';

function MyComponent() {
  const { platform, appearance } = useTelegramTheme();

  return (
    <div>Платформа: {platform}, Тема: {appearance}</div>
  );
}
```

---

## 🎨 Популярные компоненты

```tsx
import {
  Button,      // Кнопки
  Cell,        // Элементы списка
  Section,     // Секции
  Input,       // Поля ввода
  Switch,      // Переключатели
  Modal,       // Модальные окна
  Avatar,      // Аватары
  Badge,       // Значки
  Slider,      // Слайдеры
} from '@telegram-apps/telegram-ui';
```

---

## 🔧 Полезные команды

```bash
npm run dev          # Запуск разработки
npm run build        # Сборка для продакшена
npm run preview      # Предпросмотр сборки
npm run lint         # Проверка кода
npm run type-check   # Проверка типов
```

---

## 💡 Советы

1. **Всё обернуто в `<AppRoot>`** — это обязательно!
2. **Используйте CSS переменные** — `var(--tgui--text_color)`
3. **Проверяйте Telegram API** — `window.Telegram?.WebApp`
4. **Смотрите примеры** в `src/components/`

---

## 📚 Документация

- Полная документация: `TelegramUI/docs/README.md`
- Примеры компонентов: `TelegramUI/docs/EXAMPLES.md`
- Playground: https://tgui.xelene.me/

---

**Всё готово! Удачной разработки! 🎉**
