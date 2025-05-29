import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom';

function Dashboard() {
  const { postsData } = useLoaderData();

  const [posts, setPosts] = useState(postsData);
  console.log("posts", postsData);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
      <div className="container">
        { posts && posts.length > 0 ? (
          <div className="dashboard-posts">
            {posts.map((post,index) => (
              <div key={index} className="post-card">
              <img src={post.featured_image} alt={post.title} className="post-image" />
                <h3 className='post-title'>{post.title}</h3>
                <p className='post-content'>{post.content}</p>
                <p><strong>By: {post.author_id.first_name} {post.author_id.last_name}</strong></p>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts available.</p>
        )}
      </div>

    </div>
  )
}

export default Dashboard
