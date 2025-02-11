import { useEffect, useState } from "react";
import axios from "axios";

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
      <h1 className="text-3xl">This is the TopFoods: {topFoods.length}</h1>
    </div>
  );
};

export default TopFoods;