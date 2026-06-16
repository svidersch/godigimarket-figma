Создай production-grade дизайн-систему и набор экранов для GoDigiMarket.

GoDigiMarket — это role-based marketplace для цифровых репортажей и контента. Пользователи: публичные посетители, registered user, customer, reporter, superadmin. Приложение уже существует как SSR web app на Go + templ + Tailwind, поэтому нужен не лендинг ради красоты, а практичный UI для реального продукта: marketplace + личные кабинеты + admin dashboard.

Главная цель:
Сделать современный, аккуратный, масштабируемый дизайн, который можно внедрить в существующий templ/Tailwind проект. Дизайн должен быть информативным, компактным, удобным для ежедневной работы, без декоративной перегрузки.

Стиль:
- Production SaaS / marketplace operations UI.
- Чистый, спокойный, профессиональный интерфейс.
- Не делать маркетинговый “красивый лендинг” как основной стиль.
- Для admin/reporter/customer кабинетов приоритет: таблицы, фильтры, быстрые действия, статусы, удобная навигация.
- Дизайн должен хорошо работать на desktop и mobile.
- Не использовать чрезмерные градиенты, огромные hero-блоки, карточки внутри карточек, декоративные blob/orb backgrounds.
- Использовать понятную сетку, стабильные spacing rules, аккуратные status badges, forms, tables, tabs, modals, alerts, pagination.
- Цвета: нейтральная профессиональная база + 1 основной брендовый цвет + семантические цвета для success/warning/danger/info.
- Желательно подготовить design tokens: colors, typography, spacing, border radius, shadows, status colors.

Нужны компоненты:
1. App shell:
- Public header
- Admin sidebar
- Reporter sidebar/navigation
- Customer navigation
- Top bar with user/account/actions
- Breadcrumbs

2. Common UI:
- Buttons: primary, secondary, ghost, destructive, disabled, loading
- Inputs, textarea, select, checkbox, radio, toggle
- Search input
- Date filters
- File upload area
- Status badges
- Alerts/toasts
- Empty states
- Loading skeletons
- Error states
- Pagination
- Tabs
- Modal/dialog
- Dropdown/menu
- Cards for entity summaries
- Tables with sorting/filtering/actions
- KPI/stat cards
- Timeline/activity log
- Notification item
- Wallet transaction row
- Map/list layout pattern

3. Public marketplace screens:
- Home page
- Register page
- Login page
- Reset password page
- Articles list
- Article detail
- Public CMS page
- Reporters map page
- Reporter public profile
- Reporter portfolio detail
- Reportages map page
- Reportage detail page
- Reportage requests map page
- Reportage request detail page
- Feeds map page

4. Authenticated shared screens:
- Subscription plans
- Registered dashboard
- My bookmarks
- Notifications list
- Notification detail
- Notification preferences
- User profile / me
- Wallet overview
- Wallet deposit
- Wallet history
- My content list
- My content detail

5. Reporter screens:
- Reporter dashboard
- Request responses
- Reporter earnings
- Reporter devices
- Reporter delivery detail
- Reporter profile
- Portfolio audio
- Portfolio photo
- Portfolio video
- Create reportage

6. Customer screens:
- Customer dashboard
- Customer purchases
- Customer delivery detail
- Customer reportage requests

7. Admin screens:
- Admin dashboard
- Admin notifications
- Financial transactions
- Financial transaction detail
- Wallet detail
- Platform earnings
- User activity
- Logging errors
- Error inbox
- Feeds
- Feed sources
- New feed source
- Feed source entries
- Feed entry detail
- Permissions matrix
- Users list
- User detail
- New user
- Edit user
- Subscriptions
- Taxonomy
- New taxonomy item
- Edit taxonomy item
- Reporters list
- Reporter detail
- Devices
- Reportages list
- Reportage detail
- Deliveries list
- Delivery detail
- Reportage requests list
- Reportage request detail
- Edit reportage request
- Disputes list
- Dispute detail
- Order detail
- Withdrawals
- Admin bookmarks
- Email templates
- Newsletters list
- New newsletter
- Newsletter detail
- Edit newsletter
- CKEditor settings
- Global settings
- Global settings history
- Articles list
- New article
- Edit article
- Article detail
- Basic pages list
- New basic page
- Basic page detail
- Edit basic page
- Public menus
- Public menu items

Для каждого ключевого типа экрана покажи:
- Desktop version
- Mobile version
- Empty state
- Loading state
- Error state
- Forbidden/no permission state, где применимо

Особое внимание:
- Admin screens должны быть плотными и удобными, не “маркетинговыми”.
- Таблицы должны иметь фильтры, поиск, сортировку, bulk/actions где уместно.
- Финансовые экраны должны выглядеть надежно и серьезно: четкие суммы, статусы, аудит, history.
- File/delivery screens должны показывать upload status, AV scan status, checksum/integrity status, download availability.
- Notification screens должны ясно показывать read/unread, type, severity, timestamps.
- Wallet screens должны ясно разделять balance, history, deposit, transaction status.
- Map screens должны иметь layout: карта + список/filters.
- Forms должны быть понятными, с validation/error states.

Ограничения внедрения:
- Дизайн должен быть реалистично переносим в Tailwind CSS.
- Не использовать слишком сложные custom visuals, которые трудно реализовать.
- Предпочитать reusable components.
- Использовать border radius умеренно, примерно 6-8px.
- Typography должна быть читаемой и компактной.
- Не использовать отрицательный letter spacing.
- Не использовать viewport-based font scaling.
- Должны быть понятные названия компонентов и слоев.
- Нужен component library / style guide page внутри Figma.

Результат, который нужен:
1. Design system page:
- colors
- typography
- spacing
- buttons
- forms
- tables
- badges
- cards
- navigation
- modals
- alerts
- empty/loading/error states

2. Screen map page:
- сгруппировать экраны по Public, Shared Authenticated, Reporter, Customer, Admin

3. High-fidelity mockups:
- минимум основные representative screens для каждой группы:
  - public home
  - login/register
  - marketplace map/list
  - reportage detail
  - customer dashboard
  - reporter dashboard
  - wallet
  - delivery detail
  - admin dashboard
  - admin users list
  - admin financial transactions
  - admin reportages/deliveries
  - admin notifications
  - admin settings

4. Responsive variants:
- desktop 1440px
- tablet 768px
- mobile 390px

5. Handoff notes:
- design tokens
- component naming
- reusable patterns
- notes for Tailwind implementation

Please produce a cohesive, implementation-ready Figma design system and screens for this existing production web application.