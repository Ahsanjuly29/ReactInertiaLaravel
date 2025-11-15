<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
{
    private function flash(string $message, string $type = 'success')
    {
        return ['flash' => ['message' => $message, 'type' => $type]];
    }

    public function index()
    {
        try {
            return Inertia::render('index', [
                'posts' => Post::latest('id')->paginate(10)
            ]);
        } catch (\Exception $e) {
            return back()->with($this->flash($e->getMessage(), 'error'));
        }
    }

    public function create()
    {
        return Inertia::render('create');
    }

    public function store(StorePostRequest $request)
    {
        try {
            Post::create($request->validated());

            return Redirect::route('posts.index')
                ->with($this->flash('Post created successfully.'));
        } catch (\Exception $e) {
            return back()->with($this->flash($e->getMessage(), 'error'));
        }
    }

    public function show(Post $post)
    {
        try {
            return Inertia::render('show', [
                'post' => $post
            ]);
        } catch (\Exception $e) {
            return back()->with($this->flash($e->getMessage(), 'error'));
        }
    }

    public function edit(Post $post)
    {
        return Inertia::render('edit', [
            'post' => $post
        ]);
    }

    public function update(UpdatePostRequest $request, Post $post)
    {
        try {
            $post->update($request->validated());

            return Redirect::route('posts.index')
                ->with($this->flash('Post updated successfully.'));
        } catch (\Exception $e) {
            return back()->with($this->flash($e->getMessage(), 'error'));
        }
    }

    public function destroy(Post $post)
    {
        try {
            // $post->delete();

            return Redirect::route('posts.index')
                ->with($this->flash('Post deleted successfully.'));
        } catch (\Exception $e) {
            return back()->with($this->flash($e->getMessage(), 'error'));
        }
    }
}
