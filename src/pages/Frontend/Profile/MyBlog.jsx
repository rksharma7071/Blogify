import React, { useContext, useEffect, useState } from 'react'
import UserPosts from '../../../components/UserPosts'
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getPostByUser } from '../../../api_fetch/user';

function MyBlog() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const { isLoggedIn, logout } = useContext(AuthContext);
    const [query, setQuery] = useState("");

    const navigate = useNavigate();
    
    
    useEffect(() => {
        const fetchUserAndPosts = async () => {
            const userString = localStorage.getItem("user");
            if (!userString) return navigate("/signIn");

            try {
                const parsedUser = JSON.parse(userString);
                setUser(parsedUser);
                const userPosts = await getPostByUser(parsedUser.id);
                setPosts(userPosts);
            } catch (e) {
                console.error("Failed to load user or posts", e);
            }
        };

        fetchUserAndPosts();
    }, []);

    return (
        <div className='bg-white p-6'>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">My Blog</h1>

                <div>
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        className="px-3 py-2 border border-gray-300 focus:outline-none focus:ring-0 text-sm"
                        onChange={(e)=> setQuery(e.target.value)}
                    />
                </div>
            </div>
            {posts && <UserPosts posts={posts} query={query} />}
        </div>
    )
}

export default MyBlog