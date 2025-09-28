<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TaskList;

class ListController extends Controller
{
    public function index()
    {
        $lists = TaskList::where('user_id', auth()->id())->with('tasks')->get();

        return Inertia::render('Lists/index', [
            'lists' => $lists,
            'flash' => [
                'success' => session('success'),
                'error'   => session('error'),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Lists/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        TaskList::create([
            'user_id'     => auth()->id(),
            'title'       => $validated['title'],
            'description' => $validated['description'] ?? null,
        ]);

        return redirect()->route('lists.index')->with('success', 'List created successfully!');
    }

    public function show(string $id)
    {
        $list = TaskList::where('user_id', auth()->id())->with('tasks')->findOrFail($id);

        return Inertia::render('Lists/Show', [
            'list' => $list,
        ]);
    }

    public function edit(string $id)
    {
        $list = TaskList::where('user_id', auth()->id())->findOrFail($id);

        return Inertia::render('Lists/Edit', [
            'list' => $list,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $list = TaskList::where('user_id', auth()->id())->findOrFail($id);
        $list->update($validated);

        return redirect()->route('lists.index')->with('success', 'List updated successfully.');
    }

    public function destroy(string $id)
    {
        $list = TaskList::where('user_id', auth()->id())->findOrFail($id);
        $list->delete();

        return redirect()->route('lists.index')->with('success', 'List deleted successfully.');
    }
}
