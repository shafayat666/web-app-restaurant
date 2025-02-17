import { useEffect, useState } from "react";
import FoodCard from "../../shared/FoodCard";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TopFoods = () => {
  const [topFoods, setTopFoods] = useState([]);
  const axiosInstance = useAxiosSecure();

  useEffect(() => {
    axiosInstance.get("/top-foods")
      .then(response => {
        // console.log(response.data);
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
      <div className="text-center my-8">
        <Link to={"/all-foods"} className="btn btn-neutral">View All</Link>
      </div>
    </div>
  );
};

export default TopFoods;