import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";
import {getAllCategory} from "../api_fetch/category";

function Category() {
  const loaderData = useLoaderData();
  const [categories, setCategories] = useState(loaderData.data || []);

  const refreshCategories = async () => {
    const updateCategoryData = await getAllCategory();
    setCategories(updateCategoryData.data || []);
  };

  if (!categories) return <h1>Loading...</h1>;

  return (
    <div>
      <CategoryForm refreshCategories={refreshCategories} />
      <CategoryTable refreshCategories={refreshCategories} categories={categories} />
    </div>
  );
}

export default Category;
