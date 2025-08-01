import React, { useContext, useEffect, useState } from 'react'
import UserPosts from '../../../components/UserPosts'
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getPostByUser } from '../../../api_fetch/user';

function MyBlog() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const { isLoggedIn, logout } = useContext(AuthContext);
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

    console.log(posts)

    return (
        <div className='bg-white p-6'>
            <h1 className="text-2xl mb-6 text-gray-800">
                My Blog
            </h1>
            {posts && <UserPosts posts={posts} />}
        </div>
    )
}

export default MyBlog