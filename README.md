# ARCFORM — Premium Construction Company Website
## UI/UX Design & Frontend — 2026

---

## 📁 Структура проекту

```
arcform-full/
│
├── index.html              ← Головна точка входу (всі 6 сторінок)
│
├── css/
│   ├── tokens.css          ← Design Tokens: кольори, шрифти, відступи, ефекти
│   ├── base.css            ← Базовий Reset, утиліти, анімації
│   ├── components.css      ← Компоненти: Header, Buttons, Forms, Cards, Footer
│   └── sections.css        ← Секції всіх сторінок
│
├── js/
│   └── main.js             ← Навігація, анімації, FAQ, фільтри, форми
│
└── README.md               ← Цей файл
```

---

## 🎨 Design System

### Кольорова палітра

| Token | HEX | Призначення |
|-------|-----|-------------|
| `--color-bg-primary` | `#0a0a0b` | Головний фон |
| `--color-bg-secondary` | `#111113` | Секції, підложки |
| `--color-bg-surface` | `#18181b` | Картки, панелі |
| `--color-text-primary` | `#f4f2ee` | Основний текст |
| `--color-text-secondary` | `#a8a8b3` | Другорядний текст |
| `--color-steel` | `#8fb5c8` | Сталевий блакитний — акцент |
| `--color-sand` | `#c4b99a` | Пісочний — вторинний акцент |
| `--color-orange` | `#e07230` | Помаранчевий — тільки для CTA |

### Шрифти

- **Bebas Neue** — дисплейні заголовки (Display, H1)
- **DM Sans** — тіло тексту, UI елементи
- **DM Mono** — мітки, секційні номери, технічні деталі

### Відступи

`4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 120 / 160` px

---

## 📄 Сторінки

| ID | Назва | Секції |
|----|-------|--------|
| `home` | Головна | Hero, Stats, Services, Projects, Process, Why Us, Dashboard, Testimonials, FAQ, CTA, Footer |
| `services` | Послуги | Hero, 3 детальних блоки, CTA, Footer |
| `projects` | Проекти | Hero зі статами, Фільтри, Повна сітка, CTA, Footer |
| `project-detail` | Деталь проекту | Hero, Факти, Обсяг, Галерея, Відгук, Sidebar, Footer |
| `about` | Про нас | Hero, Історія, Цінності, Команда, Хронологія, CTA, Footer |
| `contact` | Контакт / Оцінка | Hero, Контактна інфо, Карта, Форма, Footer |

---

## 🧩 Компоненти

### Кнопки
```html
<button class="btn btn--primary">Отримати оцінку</button>
<button class="btn btn--secondary">Переглянути проекти</button>
<button class="btn btn--ghost">Ghost</button>
<button class="btn btn--link">Link style →</button>
<button class="btn btn--primary btn--primary-lg">Large CTA</button>
<button class="btn btn--primary btn--full">Full width</button>
```

### Картки послуг
```html
<div class="service-card service-card--featured">
  <div class="service-card__icon">...</div>
  <div class="service-card__title">Назва послуги</div>
  <p class="service-card__desc">Опис</p>
  <span class="tag">Тег</span>
</div>
```

### Форма
```html
<form data-form="estimate">
  <div class="form__group">
    <label class="form__label">Тип проекту</label>
    <input type="text" class="form__control" placeholder="..." required>
  </div>
  <button type="submit" class="btn btn--primary btn--full">Відправити</button>
  <div class="form__success">✓ Успішно відправлено!</div>
</form>
```

### Blueprint grid overlay
```html
<div class="blueprint-grid"></div>          <!-- 80px сітка -->
<div class="blueprint-grid blueprint-grid--fine"></div>    <!-- 20px сітка -->
<div class="blueprint-grid blueprint-grid--faint"></div>   <!-- слабка 60px -->
```

---

## 🔗 Навігація (JavaScript API)

```js
// Перейти на сторінку
navigate('home')
navigate('services')
navigate('projects')
navigate('project-detail')
navigate('about')
navigate('contact')
```

### HTML атрибути для автоматичної навігації
```html
<button data-nav="services">Послуги</button>
<a data-nav="contact">Контакт</a>
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Ширина | Поведінка |
|------------|--------|-----------|
| Desktop | 1440px | Повна версія, 12-колонна сітка |
| Tablet | ≤1024px | 2-колонна адаптація, відступи 32px |
| Mobile | ≤768px | 1 колонка, бургер-меню, sticky CTA бар |

---

## ⚡ Функціонал JS

| Модуль | Що робить |
|--------|-----------|
| `Router` | Навігація між сторінками (SPA-режим) |
| `Header` | Glass-ефект при скролі |
| `MobileMenu` | Бургер-меню |
| `FilterChips` | Фільтрація проектів по категоріях |
| `FAQ` | Accordion відкриття/закриття |
| `ScrollReveal` | Анімація появи елементів при скролі |
| `StatCounter` | Лічильник чисел при появі у вікні |
| `ProgressBars` | Анімація прогрес-барів Dashboard |
| `Forms` | Валідація і submit форм |

---

## 🚀 Запуск

### Локально (без сервера)
Просто відкрий `index.html` у браузері — Google Fonts підвантажаться з CDN.

### З локальним сервером (рекомендовано)
```bash
# Python
python -m http.server 8080

# Node.js
npx serve .

# VS Code
# Live Server extension → Click "Go Live"
```

Відкрий: `http://localhost:8080`

---

## 🔧 Для розробників

### Підключення до React/Next.js
- Стилі можна конвертувати в CSS Modules або Tailwind токени
- JS логіку замінити на React state/router
- Компоненти відповідають структурі shadcn/ui

### Figma
Файл **ARCFORM — Premium Construction Company UI/UX 2026** створено в Figma
з повною Design System (кольори, типографія, компоненти).

---

## 📋 Checklist перед продакшн

- [ ] Замінити `img-placeholder` на реальні фото (WebP формат)
- [ ] Підключити реальну форму (EmailJS / Formspree / backend API)
- [ ] Додати Google Maps iframe для карти
- [ ] Налаштувати SEO meta tags для кожної сторінки
- [ ] Додати Google Analytics / GTM
- [ ] Перевірити WCAG 2.1 AA доступність
- [ ] Оптимізувати завантаження шрифтів (font-display: swap)
- [ ] Налаштувати favicon і OG-зображення

---

**ARCFORM © 2025 | Розроблено з ❤️ та увагою до деталей**
