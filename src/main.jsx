import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { getAllUser, getUserWithId } from "./api_fetch/user.jsx";
import User from "./pages/User.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Post from "./pages/Post.jsx";
import Tag from "./pages/Tag.jsx";
import Category from "./pages/Category.jsx";
import PostTag from "./pages/PostTag.jsx";
import Comment from "./pages/Comment.jsx";
import { getAllPost, getPostWithId } from "./api_fetch/post.jsx";
import { getAllTag, getTagWithId } from "./api_fetch/tag.jsx";
import { getAllPostTag, getPostTagWithId } from "./api_fetch/postTags.jsx";
import { getAllCategory, getCategoryWithId } from "./api_fetch/category.jsx";
import { getAllComment, getCommentWithId } from "./api_fetch/comment.jsx";
import UserWithId from "./pages/UserWithId.jsx";
import PostWithId from "./pages/PostWithId.jsx";
import TagWithId from "./pages/TagWithId.jsx";
import CategoryWithId from "./pages/CategoryWithId.jsx";
import PostTagWithId from "./pages/PostTagWithId.jsx";
import CommentWithId from "./pages/CommentWithId.jsx";
import Base from "./pages/Frontend/Base.jsx";
import Home from "./pages/Frontend/Home.jsx";
import Blogs from "./pages/Frontend/Blogs.jsx";
import FCategory from "./pages/Frontend/Category.jsx";
import SignIn from "./pages/Frontend/SignIn.jsx";
import Signup from "./pages/Frontend/Signup.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Profile from "./pages/Frontend/Profile.jsx";
import AuthRedirect from "./context/AuthRedirect.jsx";
import BlogById from "./components/frontend/BlogById.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    errorElement: <h1>Page not found</h1>,
    children: [
      // {
      //   index: true,
      //   element: <Home />,
      // },
      {
        path: '',
        element: <Blogs />,
        loader: getAllPost,
      },
      {
        path: "blogs",
        element: <Blogs />,
        loader: getAllPost,
      },
      {
        path: "blogs/:id",
        element: <BlogById />,
        loader: async ({ params }) => {
          try {
            return await getPostWithId({ params });
          } catch (err) {
            throw new Response("Post not found", { status: 404 });
          }
        },
        errorElement: <h2>Post not found</h2>,
      },
      {
        path: "category",
        element: <FCategory />,
        loader: getAllCategory,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "signin",
        element: (
          <AuthRedirect>
            <SignIn />
          </AuthRedirect>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthRedirect>
            <Signup />
          </AuthRedirect>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: getAllPost,
      },
      {
        path: "user",
        element: <User />,
        loader: getAllUser,
      },
      {
        path: "user/:id",
        element: <UserWithId />,
        loader: getUserWithId,
      },
      {
        path: "post",
        element: <Post />,
        loader: getAllPost,
      },
      {
        path: "post/:id",
        element: <PostWithId />,
        loader: getPostWithId,
      },
      {
        path: "tag",
        element: <Tag />,
        loader: getAllTag,
      },
      {
        path: "tag/:id",
        element: <TagWithId />,
        loader: getTagWithId,
      },
      {
        path: "category",
        element: <Category />,
        loader: getAllCategory,
      },
      {
        path: "category/:id",
        element: <CategoryWithId />,
        loader: getCategoryWithId,
      },
      {
        path: "posttag",
        element: <PostTag />,
        loader: getAllPostTag,
      },
      {
        path: "posttag/:id",
        element: <PostTagWithId />,
        loader: getPostTagWithId,
      },
      {
        path: "comment",
        element: <Comment />,
        loader: getAllComment,
      },
      {
        path: "comment/:id",
        element: <CommentWithId />,
        loader: getCommentWithId,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
);
