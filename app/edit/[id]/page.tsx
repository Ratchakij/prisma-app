'use client'

import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Edit = ({ params }: { params: Promise<{ id: string }> }) => {
    // const Edit = ({ params }: { params: { id: string } }) => {
    // const { id } = params

    const { id } = use(params);
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const fetchPost = async (id: Number) => {
        try {
            const res = await axios.get(`/api/posts/${id}`);
            setTitle(res.data.title);
            setContent(res.data.content);
            setCategory(res.data.category);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (id) {
            fetchPost(parseInt(id));
        }
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.put(`/api/posts/${id}`, { title, content, category });
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">Edit Post {id}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Content
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        required
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    ></textarea>
                </div>
                <div>
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select a category</option>
                        {/* Example static categories, replace or populate dynamically */}
                        <option value="Tech">Tech</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>
                </div>
                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Edit


