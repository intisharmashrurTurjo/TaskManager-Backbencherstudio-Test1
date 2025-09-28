import React, { useState } from "react";
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Lists',
    href: dashboard().url,
  },
];

type ListType = {
  id: number;
  title: string;
  description?: string | null;
  created_at: string;
};

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);

  // pull lists from Inertia page props
  const { lists = [] } = usePage().props as { lists: ListType[] };

  // Inertia form
  const { data, setData, post, processing, reset, errors } = useForm({
    title: '',
    description: '',
  });

  // submit handler
  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(route('lists.store'), {
      onSuccess: () => {
        // close modal and reset fields
        setIsOpen(false);
        reset();
      },
      onError: () => {
        // errors are available in `errors` automatically
      },
      preserveScroll: true,
    });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Lists" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          {/* Header section */}
          <div className="flex items-center justify-between my-4 mx-5">
            <h1 className="text-2xl font-bold">Lists</h1>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-green-400 dark:bg-white dark:text-black dark:hover:bg-green-400 rounded transition"
            >
              + New List
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto px-5 pb-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">#</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Created At</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {lists && lists.length > 0 ? (
                  lists.map((list, index) => (
                    <tr key={list.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{list.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{list.description ?? "-"}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{new Date(list.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      No lists found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create New List</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">✕</button>
            </div>

            {/** FORM: handled by Inertia useForm */}
            <form onSubmit={submit} className="mt-4">
              {/* Modal Body */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={e => setData('title', e.target.value)}
                  required
                  className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 focus:ring focus:ring-green-400"
                  placeholder="Enter list title"
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}

                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">Description</label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                  className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 focus:ring focus:ring-green-400"
                  rows={3}
                  placeholder="Enter description"
                />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={processing}
                  className="px-4 py-2 text-sm rounded bg-green-500 text-white hover:bg-green-600 transition disabled:opacity-50"
                >
                  {processing ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
