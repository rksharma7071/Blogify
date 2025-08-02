import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateBlog() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);

    const [post, setPost] = useState({
        title: "",
        content: "",
        tags: [],
        category_id: "",
        status: "",
        featured_image: "",
        slug: ""
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/api/posts/${slug}`);
                const blog = res.data;
                console.log("Blog: ", blog);
                setPost({
                    title: blog.title,
                    content: blog.content,
                    tags: blog.tags || [],
                    category_id: blog.category_id,
                    status: blog.status,
                    featured_image: blog.featured_image,
                    slug: blog.slug
                });
                setTags(blog.tags || []);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        fetchPost();
    }, [slug]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => {
            let updatedPost = { ...prev, [name]: value };
            if (name === "title") {
                const slug = value.toLowerCase().trim()
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

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            // Optional: Upload new image if it's a file
            let featuredImageUrl = post.featured_image;
            if (post.featured_image instanceof File) {
                const imageForm = new FormData();
                imageForm.append("image", post.featured_image);
                const imageRes = await axios.post("/api/upload", imageForm);
                featuredImageUrl = imageRes.data.url;
            }

            const updatedPost = {
                ...post,
                tags,
                featured_image: featuredImageUrl
            };

            await axios.put(`/api/posts/${slug}`, updatedPost);
            alert("Post updated successfully!");
            navigate("/my-blogs");
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    };

    return (
        <div className="bg-white p-6">
            <h1 className="text-2xl mb-6 text-gray-800">Edit Blog</h1>

            <form onSubmit={handleUpdate} className="max-w-xl mx-auto bg-white p-6">
                {/* Reuse form like WriteBlog */}
                {/* Title */}
                <div className="pb-4">
                    <label className="block mb-2 text-gray-800 font-medium">Title</label>
                    <input type="text" name="title" value={post.title} onChange={handleChange}
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400" />
                </div>

                {/* Content */}
                <div className="pb-4">
                    <label className="block mb-2 text-gray-800 font-medium">Content</label>
                    <textarea name="content" value={post.content} onChange={handleChange}
                        rows="6" className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400" />
                </div>

                {/* Tags */}
                <div className="pb-4">
                    <label className="block mb-2 text-gray-800 font-medium">Tags</label>
                    <div className="flex gap-2">
                        <input type="text" value={tag} onChange={(e) => setTag(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            placeholder="Enter tag and press Enter"
                            className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400" />
                        <button type="button" onClick={handleAddTag}
                            className="bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700">
                            Add
                        </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {tags.map((t, index) => (
                            <span key={index} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                {t}
                                <button type="button" onClick={() => handleRemoveTag(t)}>&times;</button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Category */}
                <div className="pb-4">
                    <label className="block mb-2 text-gray-800 font-medium">Category</label>
                    <input type="text" name="category_id" value={post.category_id} onChange={handleChange}
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400" />
                </div>

                {/* Status */}
                <div className="pb-4">
                    <label className="block mb-2 text-gray-800 font-medium">Status</label>
                    <select name="status" value={post.status} onChange={handleChange}
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400">
                        <option value="">Select Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                {/* Image */}
                <div className="pb-4">
                    <label className="block mb-2 text-gray-800 font-medium">Image</label>
                    <input type="file" onChange={handleFileChange}
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400" />
                    {post.featured_image && !(post.featured_image instanceof File) && (
                        <div className="mt-2">
                            <img src={post.featured_image} alt="Preview" className="h-32 border border-gray-300 rounded" />
                        </div>
                    )}
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <button type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4">
                        Update Blog
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateBlog;
