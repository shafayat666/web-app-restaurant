import { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../../shared/FoodCard";

const TopFoods = () => {
  const [topFoods, setTopFoods] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3000/top-foods")
      .then(response => {
        console.log(response.data);
        setTopFoods(response.data);
      })
      .catch(error => {
        console.log(error);
      });

  }, [])

  return (
    <div>
      <h1 className="text-3xl text-center my-8">This is the TopFoods: {topFoods.length}</h1>
      <div className="grid grid-cols-3 gap-4">
        {
          topFoods.map((food, index) => (
            <FoodCard key={index} food={food} />
          ))
        }
      </div>
    </div>
  );
};

export default TopFoods;