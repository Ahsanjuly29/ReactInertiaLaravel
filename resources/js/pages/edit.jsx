import { Head, useForm } from '@inertiajs/react';

export default function Edit({ post }) {

    const { data, setData, put, errors, processing } = useForm({
        body: post.body,
    });

    function submit(e) {
        e.preventDefault();
        put(`/posts/${post.id}`);
    }

    return (
        <>
            <Head title='Edit' />

            <h1 className="title">Edit post</h1>
            <div className="flex max-w-4xl mx-auto gap-6 py-10">

                <form onSubmit={submit} className="w-1/2 flex flex-col">
                    <textarea
                        rows="12"
                        value={data.body}
                        onChange={(e) => setData("body", e.target.value)}
                        className={`flex-none h-[240px] p-3 border rounded resize-none ${errors.body ? 'border-red-500' : ''
                            }`}
                    />

                    {errors.body && (
                        <p className="text-red-500 text-sm mt-2">{errors.body}</p>
                    )}

                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded mt-3 disabled:opacity-50"
                        disabled={processing}
                    >
                        Submit
                    </button>
                </form>

                <div className="w-1/2">
                    <div className="h-[240px] p-3 border rounded bg-blue-900 text-gray-100 overflow-auto">
                        {data.body || (
                            <span className="">Type something on the left...</span>
                        )}
                    </div>
                </div>

            </div>
        </>
    )

}