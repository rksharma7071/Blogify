import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

function FCategory() {
  const { categoriesData, usersData, postsData } = useLoaderData();
  const [posts, setPosts] = useState(postsData);


  function getUsedCategories() {
    const categoryIds = postsData.map((post) => post.category_id._id.toString());
    
    const usedCategories = categoriesData.filter((cat) =>
      categoryIds.includes(cat._id.toString())
    );
    
    return usedCategories;
  }

  const [categories, setCategories] = useState(getUsedCategories);


  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Categories
      </h1>

      {categories.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                to={`/categories/${category.slug}`}
                className="block bg-white shadow-sm hover:shadow-md transition p-4 text-center border border-gray-100"
              >
                <span className="text-lg font-medium text-blue-600">
                  {category.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-10">No categories found.</p>
      )}
    </div>
  );
}

export default FCategory;
