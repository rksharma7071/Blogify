import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

function Blogs() {
  const { categoriesData, usersData, postsData } = useLoaderData();

  const [posts, setPosts] = useState(postsData);

  const getUserName = (userId) => {
    const user = usersData.find((user) => user._id === userId);
    const full_name = user?.first_name;
    return user ? full_name : "Unknown User";
  };

  const getCategoryTitle = (categoryId) => {
    const category = categoriesData.find(
      (category) => category._id === categoryId
    );
    const title = category?.name;
    return category ? title : "Unknown Category";
  };
  const refreshPosts = async () => {
    const updatedPostData = await getAllPost();
    // console.log("updatedPostData",updatedPostData);
    setPosts(updatedPostData.postsData || []);
  };

  if (!posts) return <h1>Loading...</h1>;
  return (
    <div>
      <div className="container">
        {posts && posts.length > 0 ? (
          <div className="dashboard-posts">
            {posts.map((post, index) => (
              <div key={index} className="post-card">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="post-image"
                />
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>
                <p>
                  <strong>
                    By: {post.author_id.first_name} {post.author_id.last_name}
                  </strong>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default Blogs;
