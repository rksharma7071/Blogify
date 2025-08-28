import React, { useContext, useEffect, useState } from 'react'
import UserPosts from '../../../components/admin/UserPosts'
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { getPostByUser } from '../../../api_fetch/user';

function MyBlog() {
    const [user, setUser] = useState(null);
    const { posts } = useContext(AuthContext);
    const [postsData, setPostsData] = useState([]);
    const { isLoggedIn, logout } = useContext(AuthContext);
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserAndPosts = async () => {
            if(isLoggedIn === false) return navigate("/signIn");
            const userString = localStorage.getItem("user");
            // if (!userString) return navigate("/signIn");

            try {
                const parsedUser = JSON.parse(userString);
                setUser(parsedUser);

                const allPosts = posts.filter(
                    (post) =>
                        post.author_id._id === parsedUser.id
                );

                // const userPosts = await getPostByUser(parsedUser.id);

                setPostsData(allPosts);
            } catch (e) {
                console.error("Failed to load user or posts", e);
            }
        };

        fetchUserAndPosts();
    }, [posts, navigate]);

    return (
        <div className='bg-white p-4 md:p-6'>
            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">My Blog</h1>

                <div className='mt-2 md:mt-0'>
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        className="px-3 py-2 border border-gray-300 focus:outline-none focus:ring-0 text-sm"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* ✅ Only pass filtered posts */}
            {postsData.length > 0 ? (
                <UserPosts posts={postsData} query={query} />
            ) : (
                <p className="text-gray-500 italic">No published blogs yet.</p>
            )}
        </div>
    )
}

export default MyBlog
