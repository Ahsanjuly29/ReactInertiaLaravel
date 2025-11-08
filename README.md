**Features**
✅ Laravel + React + Inertia.js setup
✅ Project structure
✅ Shared Layout system (no repetition across pages)
✅ Example routes, pages, and layout integration
✅ Full installation and usage instructions

You can directly copy–paste this file into your project root as **`README.md`** — ready for use 👇

---

````markdown
# 🚀 Laravel + React + Inertia.js — Full Project Setup Guide

A complete, production-ready setup guide for creating a **Laravel + React + Inertia.js** application with layouts and clean structure.

---

## 🧱 1. Create New Laravel Project

```bash
composer create-project laravel/laravel project-name
cd project-name
````

---

## ⚙️ 2. Install Jetstream with Inertia + React

```bash
composer require laravel/jetstream
php artisan jetstream:install inertia --react
```

---

## 📦 3. Install Frontend Dependencies

```bash
npm install
npm run dev
```

---

## 🗄️ 4. Run Database Migrations

```bash
php artisan migrate
```

---

## 🧰 5. Start Development Servers

Run both servers in separate terminals:

```bash
php artisan serve
```

```bash
npm run dev
```

Visit: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🧩 6. Project Folder Structure Overview

```
project-name/
├── app/
│   └── Http/
│       └── Controllers/
├── routes/
│   └── web.php
├── resources/
│   └── js/
│       ├── Layouts/
│       │   └── AppLayout.jsx
│       ├── Pages/
│       │   ├── Welcome.jsx
│       │   └── About.jsx
│       ├── app.jsx
│       └── bootstrap.js
└── ...
```

---

## 🧭 7. Define Routes (Server Side)

```php
// routes/web.php
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'title' => 'Home Page',
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About', [
        'title' => 'About Us',
    ]);
});
```

---

## 🎨 8. Create a Shared Layout

Create file:
`resources/js/Layouts/AppLayout.jsx`

```jsx
import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { props } = usePage();
    const { title } = props;

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <header style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
                <h2>{title || 'My App'}</h2>
                <nav style={{ marginTop: '10px' }}>
                    <Link href="/" style={{ marginRight: 10 }}>Home</Link>
                    <Link href="/about">About</Link>
                </nav>
            </header>

            <main>{children}</main>

            <footer style={{ marginTop: '30px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
                <p>© {new Date().getFullYear()} My Laravel + React App</p>
            </footer>
        </div>
    );
}
```

---

## 🏗️ 9. Create React Pages

### `resources/js/Pages/Welcome.jsx`

```jsx
import React from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function Welcome({ title }) {
    return (
        <AppLayout>
            <h1>Welcome to {title}</h1>
            <p>This is your Laravel + React + Inertia.js application.</p>
        </AppLayout>
    );
}
```

---

### `resources/js/Pages/About.jsx`

```jsx
import React from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function About({ title }) {
    return (
        <AppLayout>
            <h1>{title}</h1>
            <p>This page is using the same layout component.</p>
        </AppLayout>
    );
}
```

---

## 🧱 10. Example: Adding Form Submission (React → Laravel)

**Step 1:** Add a route in `web.php`

```php
use Illuminate\Http\Request;

Route::post('/contact', function (Request $request) {
    $request->validate([
        'name' => 'required',
        'message' => 'required',
    ]);

    // Example: Save to DB or send email
    return back()->with('success', 'Message received!');
});
```

**Step 2:** Create page `resources/js/Pages/Contact.jsx`

```jsx
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        message: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/contact');
    }

    return (
        <AppLayout>
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label><br />
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>

                <div style={{ marginTop: '10px' }}>
                    <label>Message:</label><br />
                    <textarea
                        value={data.message}
                        onChange={e => setData('message', e.target.value)}
                    />
                    {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
                </div>

                <button type="submit" disabled={processing} style={{ marginTop: '15px' }}>
                    {processing ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </AppLayout>
    );
}
```

**Add route for contact page:**

```php
Route::get('/contact', fn() => Inertia::render('Contact', ['title' => 'Contact Us']));
```

---

## 💾 11. Build for Production

```bash
npm run build
```

---

## 🧠 12. Key Points

* **Laravel** handles backend logic, validation, and database.
* **React + Inertia.js** handles frontend UI and navigation.
* **AppLayout.jsx** ensures consistent layout across all pages.
* **No API needed** — Inertia directly passes Laravel data to React pages.

---

## ✅ 13. Done!

Visit: [http://127.0.0.1:8000](http://127.0.0.1:8000)
You now have a **fully functional, production-ready Laravel + React + Inertia.js** project with shared layouts, routes, and forms 🎉

---

## 🧩 Optional: Useful Commands

| Purpose                     | Command                      |
| --------------------------- | ---------------------------- |
| Start Laravel server        | `php artisan serve`          |
| Run Vite (React dev server) | `npm run dev`                |
| Build for production        | `npm run build`              |
| Run database migrations     | `php artisan migrate`        |
| Clear caches                | `php artisan optimize:clear` |

---

**Made using Laravel + React + Inertia.js**

```

---
 
