import { useLoaderData } from "react-router";
import FoodCard from "../shared/FoodCard";
import { useState } from "react";

const AllFoods = () => {
  const foods = useLoaderData();
  const [search, setSearch] = useState("");
  // console.log(search);

  const filteredFoods = foods.filter(food => {
    return food.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <h1 className="text-6xl text-center">All of our Foods</h1>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        type="text"
        placeholder="Search for food"
        className="w-full p-4 my-4" />

      {
        filteredFoods.length > 0 ?
        <div className="grid grid-cols-1 gap-4">
          {
            filteredFoods.map((food, index) => (
              <FoodCard key={index} food={food} />
            ))
          }
        </div>
        :
        <h1 className="text-4xl text-center">No food found</h1>
      }
      {/* <div className="grid grid-cols-1 gap-4">
        {
          foods.map((food, index) => (
            <FoodCard key={index} food={food} />
          ))
        }
      </div> */}
    </div>
  );
};

export default AllFoods;