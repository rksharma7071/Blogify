import axios from 'axios';
import React, { useState } from 'react';

function WriteBlog() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [prevdata, setPrevData] = useState("");
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const [postTags, setPostTags] = useState([]);
    const API_BASE = import.meta.env.VITE_API;
    const [post, setPost] = useState({
        title: "",
        content: "",
        tags: [],
        category_id: "",
        author_id: user?.id || "",
        status: "",
        featured_image: "",
        slug: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPost((prev) => {
            let updatedPost = {
                ...prev,
                [name]: value
            };

            if (name === "title") {
                const slug = value
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-")
                    .replace(/^-+|-+$/g, "");

                updatedPost.slug = slug;
            }

            return updatedPost;
        });
    };


    const handleAddTag = () => {
        if (tag.trim() && !tags.includes(tag.trim())) {
            const newTags = [...tags, tag.trim()];
            setTags(newTags);
            setPost((prev) => ({ ...prev, tags: newTags }));
            setTag("");
        }
    };

    const handleTagKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        const updatedTags = tags.filter((t) => t !== tagToRemove);
        setTags(updatedTags);
        setPost((prev) => ({ ...prev, tags: updatedTags }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPost((prev) => ({
            ...prev,
            featured_image: file
        }));
    };

    const handlePost = async (e) => {
        e.preventDefault();

        if (!post.title) return;

        const slug = post.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");

        setPost((prev) => ({ ...prev, slug }));

        const formData = new FormData();
        let data = {}; // ✅ Declare data here

        try {
            // ✅ Step 1: Get or create category
            console.log(`category_id: ${post.category_id}`);
            const categoryRes = await axios.post(`${API_BASE}/categories`, {
                name: post.category_id,
                description: "NA"
            });
            console.log(`categoryRes: ${categoryRes}`);

            const categoryId = categoryRes.data.category.id;
            // console.log("categoryRes: ", categoryRes.data.category.id);
            console.log(`categoryId: ${categoryId}`);

            // ✅ Step 2: Create all tags if not exist
            const tagIds = [];
            for (const tag of tags) {
                const tagRes = await axios.post(`${API_BASE}/tags`, {
                    name: tag
                });
                tagIds.push(tagRes.data._id || tagRes.data.tag?.id); // supports both cases
            }
            console.log(`tagIds: ${tagIds}`)
            formData.append("title", post.title);
            formData.append("content", post.content);
            formData.append("author_id", post.author_id);
            formData.append("category_id", categoryId);
            formData.append("status", post.status);
            formData.append("slug", slug);
            formData.append("tags", JSON.stringify(tagIds));

            // tagIds.forEach(tagId => {
            //     formData.append("tags", tagId); // ✅ send as repeated keys
            // });
            if (post.featured_image) {
                formData.append("featured_image", post.featured_image);
            }
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
            // console.log("✅ Before Post:", data);

            // setPrevData(JSON.stringify(data));
            // ✅ Step 4: Submit post
            const res = await axios.post(`${API_BASE}/posts`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("✅ Post created:", res.data);

            // ✅ Reset form
            setPost({
                title: "",
                content: "",
                tags: [],
                category_id: "",
                author_id: user?.id || "",
                status: "",
                featured_image: "",
                slug: ""
            });
            setTags([]);
            setTag("");

        } catch (error) {
            console.error("❌ Error saving post or tags:", error.response?.data || error.message);
        }

        // console.log("📄 Final Data object (optional):", data);
    };

    return (
        <div className="bg-white p-6">
            <h1 className="text-2xl mb-6 text-gray-800">Write a Blog</h1>
            {prevdata &&
                <div>{prevdata}</div>
            }
            <form className="max-w-xl mx-auto bg-white p-6" onSubmit={handlePost} encType="multipart/form-data">
                {/* Title */}
                <div className="pb-4">
                    <label htmlFor="title" className="block mb-2 text-gray-800 font-medium">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
                    />
                </div>

                {/* Content */}
                <div className="pb-4">
                    <label htmlFor="content" className="block mb-2 text-gray-800 font-medium">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        rows="6"
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
                    ></textarea>
                </div>

                {/* Tags */}
                <div className="pb-4">
                    <label htmlFor="tagInput" className="block mb-2 text-gray-800 font-medium">Tags</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            id="tagInput"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            placeholder="Enter tag and press Enter"
                            className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700"
                        >
                            Add
                        </button>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                        {tags.map((t, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                            >
                                {t}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(t)}
                                    className="text-gray-800"
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Category */}
                <div className="pb-4">
                    <label htmlFor="category_id" className="block mb-2 text-gray-800 font-medium">Category</label>
                    <input
                        type="text"
                        id="category_id"
                        name="category_id"
                        value={post.category_id}
                        onChange={handleChange}
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
                    />
                </div>

                {/* Status */}
                <div className="pb-4">
                    <label htmlFor="status" className="block mb-2 text-gray-800 font-medium">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={post.status}
                        onChange={handleChange}
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
                    >
                        <option value="">Select Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                {/* Image */}
                <div className="pb-4">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-800">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleFileChange}
                        name="featured_image"
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400 bg-white text-sm text-gray-900"
                    />
                    <p className="mt-1 text-xs text-gray-500">Accepted formats: PNG, JPG, JPEG (max 5MB)</p>
                    {post.featured_image && (
                        <div className="mt-2">
                            <img
                                src={URL.createObjectURL(post.featured_image)}
                                alt="Preview"
                                className="h-32 rounded border border-gray-300"
                            />
                        </div>
                    )}
                </div>

                {/* Slug */}
                <div className="pb-4">
                    <label htmlFor="slug" className="block mb-2 text-gray-800 font-medium">Slug</label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={post.slug}
                        onChange={handleChange}
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
                    />
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4"
                    >
                        Save Post
                    </button>
                </div>
            </form>
        </div>
    );
}

export default WriteBlog;
