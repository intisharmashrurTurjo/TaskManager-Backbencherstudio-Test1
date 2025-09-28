<form
    onSubmit={handleSubmit}
    className="space-y-4"
>
    <div>
        <label className="block text-sm font-medium">Title</label>
        <input
            type="text"
            value={data.title}
            onChange={e => setData("title", e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
        />
        {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
    </div>

    <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
            value={data.description}
            onChange={e => setData("description", e.target.value)}
            className="w-full border rounded px-3 py-2"
        />
        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
    </div>

    <div className="flex justify-end gap-2">
        <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
        >
            Cancel
        </button>
        <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-green-600 text-white rounded"
        >
            {processing ? "Creating..." : "Create"}
        </button>
    </div>
</form>
