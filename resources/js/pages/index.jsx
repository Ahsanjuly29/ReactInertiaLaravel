import { Head, Link, usePage, useForm, router } from "@inertiajs/react";

export default function Index({ posts }) {

    const { flash } = usePage().props;
    const { component } = usePage();

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        router.visit(`/posts/${id}`, {
            method: 'delete',
            preserveScroll: true,
            onSuccess: () => {
                // nothing needed; flash will come from response
            }
        });
    };

    const getPages = () => {
        const delta = 3;
        const left = Math.max(1, posts.current_page - delta);
        const right = Math.min(posts.last_page, posts.current_page + delta);
        const pages = [];
        if (left > 1) pages.push(1, "...");
        for (let i = left; i <= right; i++) pages.push(i);
        if (right < posts.last_page - 1) pages.push("...");
        if (right < posts.last_page) pages.push(posts.last_page);
        return pages;
    };

    return (
        <>
            <Head title={component} />
            <div className="max-w-2xl mx-auto p-4">
                <div className="relative border-b-2 pb-2 text-center mb-4">
                    <h1 className="text-2xl font-bold">Posts List</h1>
                    <Link
                        href="/posts/create"
                        className="absolute right-0 top-1/2 -translate-y-1/2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm font-medium px-3 py-1.5 rounded-md transition-colors duration-200"
                    >Create post</Link>
                </div>

                {flash?.message && (
                    <div
                        key={flash.message}
                        className={`my-4 rounded-md border px-4 py-2 text-sm text-center font-semibold
                        ${flash.type === "error" ? "bg-red-100 border-red-400 text-red-700"
                                : flash.type === "warning" ? "bg-yellow-100 border-yellow-400 text-yellow-700"
                                    : "bg-green-100 border-green-400 text-green-700"}`}
                        style={{ animation: "fadeOut 1s 1s forwards" }}
                    >
                        {flash.message}
                    </div>
                )}

                <div className="space-y-4 my-4">
                    {posts.data.map(post => (
                        <div key={post.id} className="flex border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                            <div className="w-2" style={{ backgroundColor: `hsl(${(post.id * 40) % 360}, 60%, 45%)` }} />
                            <div className="flex-1 p-4">
                                <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
                                    <span>{new Date(post.created_at).toLocaleString()}</span>
                                    <span className="text-gray-400">#{post.id}</span>
                                </div>
                                <p className="text-gray-800 mb-3"> {post.body.length > 70 ? post.body.slice(0, 70) + "..." : post.body}</p>
                                <div className="flex justify-between items-center">
                                    <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline text-sm">Read more →</Link>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="bg-red-500 rounded-md text-sm px-4 py-1 text-white"
                                    >Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-6">
                    {posts.prev_page_url ? (
                        <Link href={posts.prev_page_url} preserveScroll className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Prev</Link>
                    ) : <span className="px-3 py-1 text-gray-400">Prev</span>}

                    {getPages().map((page, idx) => page === "..." ? (
                        <span key={idx} className="px-2 text-gray-400">...</span>
                    ) : (
                        <Link
                            key={idx}
                            href={`${posts.path}?page=${page}`}
                            preserveScroll
                            className={`px-3 py-1 rounded ${page === posts.current_page ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                        >{page}</Link>
                    ))}

                    {posts.next_page_url ? (
                        <Link href={posts.next_page_url} preserveScroll className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Next</Link>
                    ) : <span className="px-3 py-1 text-gray-400">Next</span>}
                </div>
            </div>
        </>
    );
}
