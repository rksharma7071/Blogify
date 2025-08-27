import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPost } from "../api_fetch/post";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const getAllData = async () => {
    const { categoriesData, usersData, postsData } = await getAllPost();
    setCategories(categoriesData);
    setUsers(usersData);
    setPosts(postsData);
  }

  getAllData();

  useEffect(() => {
    const userString = localStorage.getItem("user");

    setIsLoggedIn(!!userString);
  }, []);

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

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, capitalize, categories, users, posts }}>
      {children}
    </AuthContext.Provider>
  );
}
