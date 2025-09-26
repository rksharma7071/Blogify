import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import User from "./pages/admin/User.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Post from "./pages/admin/Post.jsx";
import Tag from "./pages/admin/Tag.jsx";
import Category from "./pages/admin/Category.jsx";
import PostTag from "./pages/admin/PostTag.jsx";
import Comment from "./pages/admin/Comment.jsx";
import { getAllUser, getUserWithId } from "./api_fetch/user";
import { getAllPost, getPostWithId } from "./api_fetch/post";
import { getAllTag, getTagWithId } from "./api_fetch/tag.js";
import { getAllPostTag, getPostTagWithId } from "./api_fetch/postTags";
import { getAllCategory, getCategoryWithId } from "./api_fetch/category";
import { getAllComment, getCommentWithId } from "./api_fetch/comment";
import UserWithId from "./pages/admin/UserWithId.jsx";
import PostWithId from "./pages/admin/PostWithId.jsx";
import TagWithId from "./pages/admin/TagWithId.jsx";
import CategoryWithId from "./pages/admin/CategoryWithId.jsx";
import PostTagWithId from "./pages/admin/PostTagWithId.jsx";
import CommentWithId from "./pages/admin/CommentWithId.jsx";
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
import Account from "./pages/Frontend/Profile/Settings/Account.jsx";
import ProDashboard from "./pages/Frontend/Profile/Dashboard.jsx";
import ChangePassword from "./pages/Frontend/Profile/Settings/ChangePassword.jsx";
import MyBlog from "./pages/Frontend/Profile/MyBlog.jsx";
import WriteBlog from "./pages/Frontend/Profile/WriteBlog.jsx";
import Notification from "./pages/Frontend/Profile/Notification.jsx";
<<<<<<< HEAD
import Settings from "./pages/frontend/Profile/Settings.jsx";
import UpdateBlog from "./pages/frontend/Profile/UpdateBlog.jsx";
import SocialLinks from "./pages/frontend/Profile/Settings/SocialLinks.jsx";
import CategoryBySlug from "./components/frontend/CategoryBySlug.jsx";
import ResetPassword from "./pages/frontend/ResetPassword.jsx";
import { HeadProvider } from "react-head";
=======
import Settings from "./pages/Frontend/Profile/Settings.jsx";
import UpdateBlog from "./pages/Frontend/Profile/UpdateBlog.jsx";
import SocialLinks from "./pages/Frontend/Profile/Settings/SocialLinks.jsx";
import CategoryBySlug from "./components/frontend/CategoryBySlug.jsx";
import ResetPassword from "./pages/Frontend/ResetPassword.jsx";
>>>>>>> ecbb0cf1069a99186a9f5464c8291902aec651f7

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    // errorElement: <h1>Page not found</h1>,
    children: [
      // {
      //   index: true,
      //   element: <Home />,
      // },
      {
        index: true,
        element: <Home />,
        loader: getAllPost,
      },
      {
        path: "blogs",
        element: <Blogs />,
        loader: getAllPost,
      },
      {
        path: "blogs/:slug",
        element: <BlogById />,
        loader: async ({ params }) => {
          try {
            return await getPostWithId({ params });
          } catch (err) {
            throw new Response("Post not found", { status: 404 });
          }
        },
        // errorElement: <h2>Post not found</h2>,
      },
      {
        path: "categories",
        element: <FCategory />,
        loader: getAllPost,
      },
      {
        path: "categories/:slug",
        element: <CategoryBySlug />,
        loader: getCategoryWithId,
      },
      {
        path: "profile",
        element: <Profile />,
        children: [
          {
            path: "",
            element: <ProDashboard />
          },

          {
            path: "posts",
            element: <MyBlog />
          },
          {
            path: "newPost",
            element: <WriteBlog />
          },
          {
            path: "editPost/:slug",
            element: <UpdateBlog />,
          },
          {
            path: "notification",
            element: <Notification />
          },

          {
            path: "settings",
            element: <Settings />,
            children: [
              {
                path: "",
                element: <Account />
              },
              {
                path: "social-links",
                element: <SocialLinks />
              },
              {
                path: "change-password",
                element: <ChangePassword />
              }
            ]
          },

        ]
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
        path: "reset-password",
        element: <ResetPassword />
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
        path: "post/:slug",
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
    <HeadProvider>
      <RouterProvider router={router}></RouterProvider>
    </HeadProvider>
  </AuthProvider>
);
