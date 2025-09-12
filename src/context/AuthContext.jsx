import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPost } from "../api_fetch/post";
import Loading from "../components/common/Loading";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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



  // console.log(categories, users, posts);

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const userString = localStorage.getItem("user");
      setIsLoggedIn(!!userString);
    }
  }, [loading]);

  useEffect(() => {
    const userString = localStorage.getItem("user");

    setIsLoggedIn(!!userString);
  }, [loading]);
  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };
  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

    if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, capitalize, categories, users, posts, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
