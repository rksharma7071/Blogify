import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function Comment({ post_id }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const { users } = useContext(AuthContext)

    const [comments, setComments] = useState([]);
    const [filteredComments, setFilteredComments] = useState([]);
    const [newComment, setNewComment] = useState("");


    const getUserName = (userId) => {
        const user = users.find((u) => u._id === userId);
        return user ? user.username : "Unknown User";
    }

    // Fetch comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get("/api/comments");
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, []);


    // Filter comments for this post
    useEffect(() => {
        if (comments.length > 0) {
            const commentData = comments.filter(
                (c) => c.post_id === post_id
            );
            setFilteredComments(commentData);
        }
    }, [comments, post_id]);

    // Submit new comment
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await axios.post("/api/comments", {
                post_id,
                user_id: user?.id,
                content: newComment,
            });

            // Optimistically update UI
            setComments((prev) => [...prev, response.data]);
            setNewComment("");
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    //   console.log("Filtered Comments: ", filteredComments);
    return (
        <div>
            {/* Comment Input */}
            <form onSubmit={handleSubmit}>
                <div className="py-4">
                    <label
                        htmlFor="comment"
                        className="block mb-2 text-gray-800 font-medium"
                    >
                        Leave a comment
                    </label>
                    <textarea
                        rows={4}
                        id="comment"
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        name="comment"
                    />
                </div>
                <div className="pb-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4"
                    >
                        Submit
                    </button>
                </div>
            </form>

            {/* Display Comments */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Comments
                </h3>
                {filteredComments.length > 0 ? (
                    filteredComments.map((c) => (
                        <div
                            key={c._id}
                            className="border-b border-gray-200 py-2 text-gray-700"
                        >
                            <p className=""><span className="font-bold">{getUserName(c.user_id)}</span> - <span className="italic">{new Date(c.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                            </span></p>
                            <p>{c.content}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
            </div>
        </div>
    );
}

export default Comment;
