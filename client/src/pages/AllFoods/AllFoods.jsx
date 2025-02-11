import { useLoaderData } from "react-router";
import FoodCard from "../shared/FoodCard";
import { useState } from "react";

const AllFoods = () => {
  const loadFoods = useLoaderData();
  const [foods, setFoods] = useState(loadFoods);

  return (
    <div>
      <h1 className="text-6xl text-center">All of our Foods</h1>
      <input type="text" placeholder="Search for food" className="w-full p-4 my-4" />
      <div className="grid grid-cols-1 gap-4">
        {
          foods.map((food, index) => (
            <FoodCard key={index} food={food} />
          ))
        }
      </div>
    </div>
  );
};

export default AllFoods;