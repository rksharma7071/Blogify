import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

function FCategory() {
  const loaderData = useLoaderData();
  const [categories, setCategories] = useState(loaderData.data || []);

  return (
    <div>
      <h1>Category</h1>
      <ul>
        {categories &&
          categories.map((category, index) => (
            <li key={index}>
              <Link to={category.name}>{category.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FCategory;
