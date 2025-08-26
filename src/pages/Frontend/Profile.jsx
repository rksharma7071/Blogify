import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserPosts from "../../components/admin/UserPosts";
import { getPostByUser } from "../../api_fetch/user";
import ProfileHeader from "../../components/frontend/ProfileHeader";
import Dashboard from "./Profile/Dashboard";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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


  // console.log("All Posts: ", posts);
  return (
    <div className="w-full">
      <div className="max-w-8xl mx-auto flex flex-1 justify-between items-start overflow-hidden">
        <ProfileHeader handleLogout={handleLogout} />
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
