import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getPostByUser } from '../../../api_fetch/user';
import UserPosts from '../../../components/UserPosts';

function ProDashboard() {

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
        <>
            <div className="bg-white p-6">
                <h1 className="text-2xl mb-6 text-gray-800">
                    My Account Details
                </h1>

                {user ? (
                    <div className="space-y-4 text-gray-700">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <p>
                                <span className="font-semibold text-gray-600">Username:</span>{" "}
                                {user.username}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">Name:</span>{" "}
                                {user.first_name} {user.last_name}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">Email:</span>{" "}
                                {user.email}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">Role:</span>{" "}
                                {user.role || "N/A"}
                            </p>
                        </div>
                        {/* <button
                onClick={handleLogout}
                className="mt-4 inline-block bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded shadow-sm transition"
              >
                Logout
              </button> */}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Loading user data...</p>
                )}
            </div>
            {/* User Posts */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
                    My Posts
                </h2>
                {posts && <UserPosts posts={posts} />}
            </div>
        </>
    )
}

export default ProDashboard