import { Link, useForm } from '@inertiajs/react';

export default function Show({ post }) {
    const { delete: destroy } = useForm();

    function submit(e) {
        e.preventDefault();
        destroy(`/posts/${post.id}`);
    }

    return (
        <article className="max-w-4xl mx-auto my-12 px-6">
            {/* Article Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{post.title}</h1>

            {/* Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 text-sm text-slate-500">
                <div>
                    Posted on: <time className="font-medium">{new Date(post.created_at).toLocaleString()}</time>
                </div>
                <div className="flex gap-3 mt-2 sm:mt-0">
                    <form onSubmit={submit}>
                        <button
                            type="submit"
                            className="primary-btn bg-red-500 hover:scale-105 hover:shadow-md cursor-pointer"
                        >
                            Delete
                        </button>
                    </form>
                    <Link
                        href={`/posts/${post.id}/edit`}
                        className="primary-btn bg-green-500 hover:scale-105 hover:shadow-md cursor-pointer"
                    >
                        Edit
                    </Link>
                </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-slate max-w-none text-lg leading-relaxed text-slate-800">
                {post.body}
            </div>
        </article>
    );
}
