# 📖 Blogify

Blogify is a **full-stack blogging platform** built with **React, React Router, TailwindCSS, Node.js, Express, and MongoDB**.  
It includes a **frontend blogging site** for readers and authors, and an **admin dashboard** for managing users, posts, tags, categories, and comments.

---

## 🚀 Features

### 🔹 Frontend
- View blogs, categories, and blog details by slug.
- User authentication: Sign up, Sign in, Reset password.
- Profile dashboard with:
  - ✍️ Create, edit, delete blog posts.
  - 🔔 Notifications.
  - ⚙️ Settings: Account, Social Links, Change Password.
- Slug-based routing for SEO-friendly URLs.

### 🔹 Admin Panel
- Manage users, posts, categories, tags, comments, and post-tag relationships.
- CRUD operations for each entity.
- Uses `react-router-dom` loaders to fetch API data.

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router v6, Tailwind CSS  
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)  
- **Authentication**: Context API + JWT (assumed from AuthContext)  
- **File Uploads**: `multipart/form-data` (via Multer or Cloudinary backend)  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repo
```bash
git clone https://github.com/your-username/blogify.git
cd blogify
```
---
### 🌐 Routes Overview
- / → Home (All posts)
- /blogs/:slug → Blog details
- /categories → All categories
- /categories/:slug → Category by slug
- /signin, /signup, /reset-password
- /profile
  - /profile → User dashboard
  - /profile/posts → My blogs
  - /profile/newPost → Write a new blog
  - /profile/editPost/:slug → Edit a blog
  - /profile/notification → Notifications
  - /profile/settings
    - /profile/settings → Account
    - /profile/settings/social-links
    - /profile/settings/change-password


### ✅ Future Improvements

- Add WYSIWYG editor for writing blogs.
- Integrate Cloudinary or S3 for image uploads.
- Add role-based access (Admin vs User).
- SEO optimization and SSR (Next.js migration optional).