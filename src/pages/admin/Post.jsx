import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import PostForm from "../../components/admin/PostForm";
import PostTable from "../../components/admin/PostTable";
import { getAllPost } from "../../api_fetch/post";

function Post() {
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
    <>
      <PostForm
        refreshPosts={refreshPosts}
        usersData={usersData}
        categoriesData={categoriesData}
      // getUserName={getUserName}
      // getCategoryTitle={getCategoryTitle}
      />
      <PostTable refreshPosts={refreshPosts} posts={posts} />
    </>
  );
}

export default Post;
