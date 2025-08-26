import React from "react";
import { useLoaderData } from "react-router-dom";

function PostTag() {
  const { postTagsData, tagsData, postsData } = useLoaderData();
  console.log("PostTags:", postTagsData);
  console.log("Tags:", tagsData);
  console.log("Posts:", postsData);

  
  const getTagName = (tagId) => {
    const tag = tagsData.find((tag) => tag._id === tagId);
    return tag ? tag.name : "Unknown Tag";
  };

  const getPostTitle = (postId) => {
    const post = postsData.find((post) => post._id === postId);
    return post ? post.title : "Unknown Post";
  };

  return (
    <div>
      <h1>PostTags</h1>
      <table border={1} cellPadding="10">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>ID</th>
            <th>Tag Name</th>
            <th>Post Title</th>
          </tr>
        </thead>
        <tbody>
          {postTagsData.map((tag, index) => (
            <tr key={tag._id}>
              <td>{index + 1}</td>
              <td>{tag._id}</td>
              <td>{getTagName(tag.tag_id)}</td>
              <td>{getPostTitle(tag.post_id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostTag;
