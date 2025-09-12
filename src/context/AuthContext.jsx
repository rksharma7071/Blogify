// AuthContent.jsx
import React, { createContext, useState, useEffect } from "react";
import { getAllPost } from "../api_fetch/post";
import Loading from "../components/common/Loading";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch posts, users, and categories
  const getAllData = async () => {
    try {
      const { categoriesData, usersData, postsData } = await getAllPost();
      setCategories(categoriesData || []);
      setUsers(usersData || []);
      setPosts(postsData || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ On mount: check login status & fetch data
  useEffect(() => {
    const userString = localStorage.getItem("user");
    setIsLoggedIn(!!userString);
    getAllData();
  }, []);

  // ✅ Login method
  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  // ✅ Logout method
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // ✅ Capitalize utility
  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
        capitalize,
        categories,
        users,
        posts,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
