# Dark Theme Feature

## Overview
Implements a light/dark theme toggle that persists user preference in `localStorage` and applies CSS class to `<html>` element.

## Files Created/Modified

### `src/context/ThemeContext.jsx`
- Creates `ThemeContext` using React Context API
- Exports `ThemeProvider` component that:
  - Reads saved theme from `localStorage` on mount (falls back to system preference via `prefers-color-scheme`)
  - Provides `theme` (string: `'light'` | `'dark'`) and `toggleTheme` function via context
  - Applies `.dark` class to `<html>` element when theme is dark
- Exports `useTheme()` custom hook for consuming the context

### `src/components/ThemeToggle.jsx`
- Button component with Moon/Sun icons from `lucide-react`
- Calls `toggleTheme` on click
- Shows appropriate icon based on current theme

### `src/main.jsx`
- Wraps `<App />` with `<ThemeProvider>` so all components have access to theme context

### `src/index.css`
- Defines `.dark` CSS class with shadcn/ui CSS variables for dark colors
- Overrides hardcoded utility classes (`bg-white`, `bg-slate-50`, etc.) when `.dark` is present on `<html>`
- Uses `!important` to ensure overrides win over Tailwind utilities
- Added `.dark body` rule to apply background and text colors

### Components Updated for Dark Mode

#### Layout & Navigation
- `src/layouts/MainLayout.jsx` - Uses `bg-background` CSS variable
- `src/components/Navbar.jsx` - Nav dark mode handled via CSS override

#### Pages
- `src/pages/Home.jsx` - Background, loading/error/empty states
- `src/pages/Dashboard.jsx` - Stat cards, order list, status badges, text colors
- `src/pages/ProductDetail.jsx` - Image container, features section, text colors
- `src/pages/Login.jsx` - Form inputs, labels, text colors
- `src/pages/Register.jsx` - Form inputs, labels, text colors
- `src/pages/AdminProducts.jsx` - Table, search input, badges, loading states
- `src/pages/AdminCategories.jsx` - Category cards, search input, buttons
- `src/pages/AdminOrders.jsx` - Table, search input, item avatars, text colors

#### Components
- `src/components/ProductCard.jsx` - Card background, border, text, category badge, price tag
- `src/components/Cart.jsx` - Dialog content, item rows, quantity controls, totals
- `src/components/home/ProductFilter.jsx` - Search input, category filter buttons
- `src/components/dashboard/Sidebar.jsx` - User card, nav items, active state styling
- `src/components/admin/OrderStatusBadge.jsx` - All status color variants
- `src/components/admin/OrderDetailsDialog.jsx` - Dialog, item list, status buttons
- `src/components/CheckoutDialog.jsx` - Dialog content, total display
- `src/components/ConfirmDialog.jsx` - Dialog container, buttons, text

## How It Works
1. On mount, `ThemeProvider` reads `localStorage.getItem('theme')`
2. If no saved preference, checks `window.matchMedia('(prefers-color-scheme: dark)')`
3. Sets `theme` state and calls `applyTheme()` which adds/removes `.dark` class on `<html>`
4. `toggleTheme()` switches between light/dark and saves to `localStorage`
5. CSS overrides in `index.css` activate when `.dark` class is present
6. Components use `dark:` Tailwind prefix for inline dark mode variants

## Color Strategy
- **Backgrounds**: `bg-white dark:bg-slate-900`, `bg-slate-50 dark:bg-slate-950`
- **Text**: `text-slate-900 dark:text-white`, `text-slate-500 dark:text-slate-400`
- **Borders**: `border-slate-200 dark:border-slate-700`
- **Accents**: `text-indigo-600 dark:text-indigo-400`
- **Status badges**: Use `dark:bg-{color}-950/50` with lighter text variants

## Usage
```jsx
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Current: {theme}</button>;
}
```
