# SecurityBadge Component 🔒

Универсальный компонент бейджа безопасности с современным дизайном и различными вариантами отображения.

## ✨ Особенности

- **3 варианта**: `default`, `compact`, `minimal`
- **Кастомизация**: Настраиваемые иконка, заголовок и описание
- **Современный дизайн**: Градиентный фон с hover эффектами
- **Адаптивный**: Оптимизирован для всех устройств
- **Темная тема**: Автоматическая поддержка
- **Анимации**: Плавные переходы и hover эффекты

## 🎯 Использование

### Базовое использование

```tsx
import { SecurityBadge } from "./components/SecurityBadge";

<SecurityBadge />;
```

### С кастомными параметрами

```tsx
<SecurityBadge
  icon="🛡️"
  title="Защищенные данные"
  description="SSL шифрование 256-bit"
  variant="compact"
  className="my-custom-class"
/>
```

## 📋 Пропсы

| Проп          | Тип                                   | По умолчанию                        | Описание                  |
| ------------- | ------------------------------------- | ----------------------------------- | ------------------------- |
| `className`   | `string`                              | `""`                                | Дополнительные CSS классы |
| `icon`        | `string`                              | `"🔒"`                              | Иконка (emoji или текст)  |
| `title`       | `string`                              | `"Paiement sécurisé"`               | Заголовок                 |
| `description` | `string`                              | `"Vos informations sont protégées"` | Описание                  |
| `variant`     | `"default" \| "compact" \| "minimal"` | `"default"`                         | Вариант отображения       |

## 🎨 Варианты

### Default

```tsx
<SecurityBadge variant="default" />
```

- Полный размер с градиентным фоном
- Иконка + заголовок + описание
- Hover эффекты с подъемом

### Compact

```tsx
<SecurityBadge variant="compact" />
```

- Уменьшенные отступы и размеры
- Сохраняет все элементы
- Подходит для боковых панелей

### Minimal

```tsx
<SecurityBadge variant="minimal" />
```

- Только иконка + заголовок
- Прозрачный фон с границей
- Минималистичный дизайн

## 🎯 Примеры использования

### E-commerce безопасность

```tsx
<SecurityBadge
  icon="🔒"
  title="Paiement sécurisé"
  description="Transactions cryptées SSL"
/>
```

### Защита данных

```tsx
<SecurityBadge
  icon="🛡️"
  title="Données protégées"
  description="Conformité RGPD"
  variant="compact"
/>
```

### Сертификация

```tsx
<SecurityBadge
  icon="✅"
  title="Certifié sécurisé"
  description="Audit de sécurité validé"
/>
```

### Минималистичная версия

```tsx
<SecurityBadge icon="🔐" title="Sécurisé" variant="minimal" />
```

## 🌙 Темная тема

Компонент автоматически адаптируется к системным настройкам:

- Темные градиенты
- Светлый текст
- Адаптивные цвета границ

## 📱 Адаптивность

- **Desktop**: Полные размеры и отступы
- **Mobile**: Компактные размеры для экономии места
- **Варианты**: Автоматическое масштабирование для всех вариантов

## 🎨 Кастомизация

### CSS переменные (будущие улучшения)

```scss
.security-badge {
  --badge-bg-start: #f8fafc;
  --badge-bg-end: #e2e8f0;
  --badge-border: #cbd5e1;
  --badge-text: #1e293b;
}
```

### Кастомные стили

```tsx
<SecurityBadge
  className="my-security-badge"
  // Добавьте свои стили в CSS
/>
```
