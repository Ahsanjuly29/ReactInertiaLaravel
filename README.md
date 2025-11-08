# 🚀 Laravel + React + Inertia.js — Full Project Setup Guide

## ✨ Features

  ✅ Laravel + React + Inertia.js setup  
  ✅ Organized project structure  
  ✅ Shared layout system (no repetition across pages)  
  ✅ Example routes, pages, and layout integration  
  ✅ Example form submission (React → Laravel)  
  ✅ Full installation and usage instructions  

---

## 🧱 Step 1 — Create a New Laravel Project

```bash
composer create-project laravel/laravel project-name
cd project-name
````

---

## ⚙️ Step 2 — Install Jetstream with Inertia + React

```bash
composer require laravel/jetstream
php artisan jetstream:install inertia --react
```

---

## 📦 Step 3 — Install Frontend Dependencies

```bash
npm install
npm run dev
```

---

## 🗄️ Step 4 — Run Database Migrations

```bash
php artisan migrate
```

---

## 🧰 Step 5 — Start Development Servers

Run both servers in separate terminals:

```bash
php artisan serve
```

```bash
npm run dev
```

Then visit → [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🧩 Step 6 — Project Folder Structure

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

## 🧭 Step 7 — Define Routes (Server Side)

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

## 🎨 Step 8 — Create a Shared Layout

📄 **File:** `resources/js/Layouts/AppLayout.jsx`

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
                    <Link href="/about" style={{ marginRight: 10 }}>About</Link>
                    <Link href="/contact">Contact</Link>
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

## 🏗️ Step 9 — Create React Pages

### 📄 `resources/js/Pages/Welcome.jsx`

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

### 📄 `resources/js/Pages/About.jsx`

```jsx
import React from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function About({ title }) {
    return (
        <AppLayout>
            <h1>{title}</h1>
            <p>This page uses the shared layout component.</p>
        </AppLayout>
    );
}
```

---

## 💬 Step 10 — Add a Contact Form (React → Laravel)

### 🛠️ Step 10.1 — Backend Route

```php
use Illuminate\Http\Request;

Route::post('/contact', function (Request $request) {
    $request->validate([
        'name' => 'required',
        'message' => 'required',
    ]);

    // Example: Save to DB or send an email
    return back()->with('success', 'Message received!');
});
```

---

### 🖋️ Step 10.2 — Frontend Contact Page

📄 **File:** `resources/js/Pages/Contact.jsx`

```jsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact');
    };

    return (
        <AppLayout>
            <h1>Contact Us</h1>

            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <div>
                    <label>Name:</label><br />
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        style={{ padding: '5px', width: '250px' }}
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>

                <div style={{ marginTop: '10px' }}>
                    <label>Message:</label><br />
                    <textarea
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        style={{ padding: '5px', width: '250px', height: '100px' }}
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

---

### 🗺️ Step 10.3 — Add Contact Page Route

```php
Route::get('/contact', fn() => Inertia::render('Contact', ['title' => 'Contact Us']));
```

---

## 💾 Step 11 — Build for Production

```bash
npm run build
```

---

## 🧠 Step 12 — Key Points to Remember

* 🧩 **Laravel** handles backend logic, database, and validation.
* ⚛️ **React + Inertia.js** manages frontend UI and navigation.
* 🧱 **AppLayout.jsx** keeps your app design consistent.
* 🚫 No REST API needed — Inertia directly shares Laravel data with React components.
* 💼 Ideal for professional dashboards, admin panels, and SaaS apps.

---

## ✅ Step 13 — All Set!

Visit → [http://127.0.0.1:8000](http://127.0.0.1:8000)
You now have a **fully functional, production-ready Laravel + React + Inertia.js** project with layouts, routing, and forms 🎉

---

## 🧩 Common Useful Commands

| Purpose                       | Command                      |
| ----------------------------- | ---------------------------- |
| ▶️ Start Laravel server        | `php artisan serve`          |
| ⚡ Run Vite (React dev server) | `npm run dev`                |
| 🏗️ Build for production        | `npm run build`              |
| 🗃️ Run database migrations     | `php artisan migrate`        |
| 🔄 Clear caches                | `php artisan optimize:clear` |

---

**Made using Laravel + React + Inertia.js**

```

---
