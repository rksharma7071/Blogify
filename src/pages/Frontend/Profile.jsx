import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserPosts from "../../components/UserPosts";
import { getPostByUser } from "../../api_fetch/user";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  console.log(posts);

  useEffect(() => {
  const fetchUserAndPosts = async () => {
    const userString = localStorage.getItem("user");
    if (!userString) return navigate("/signIn");

    try {
      const parsedUser = JSON.parse(userString);
      setUser(parsedUser);

      const userPosts = await getPostByUser(parsedUser._id); // ⬅️ use _id not id
      console.log(userPosts)
      setPosts(userPosts);
    } catch (e) {
      console.error("Failed to load user or posts", e);
    }
  };

  fetchUserAndPosts();
}, []);


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Profile
      </h1>

      {user ? (
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <p>
            <span className="font-semibold">Name:</span> {user.first_name}{" "}
            {user.last_name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {user.role || "N/A"}
          </p>
          <p onClick={handleLogout}>Logout</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading user data...</p>
      )}
      <UserPosts />
    </div>
  );
}

export default Profile;
