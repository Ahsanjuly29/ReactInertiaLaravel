import './bootstrap';
import '../css/app.css'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import Layout from '@/layouts/app';

createInertiaApp({

    title: title => [title, "react inertia laravel"].filter(Boolean).join(" - "),

    // resolve components
    resolve: name => {
        const pages = import.meta.glob('./pages/**/*.jsx', { eager: true })
        let page = pages[`./pages/${name}.jsx`]

        page.default.layout = page.default.layout || ((page) => <Layout children={page} />);

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
    // progress: false,
    progress: {
        // delay: 250,
        color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
        showSpinner: true,
    }
})
