import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const MyFoods = () => {
  const {user} = useAuth();
  // console.log(user.email);
  const [myFoods, setMyFoods] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/my-foods?email=admin@gmail.com`)
    .then(response => {
      console.log(response.data);
      setMyFoods(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, [user.email]);


  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold text-center my-4">My Foods: {myFoods.length}</h1>
      <table className="table w-3/4 mx-auto">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {
            myFoods.map((food, index) => <tr key={index}>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={food.image}
                      alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{food.name}</div>
                  <div className="text-sm opacity-50">{food.category}</div>
                </div>
              </div>
            </td>
            <td>
              {food.price}
            </td>
            <td>{food.description}</td>
            <th>
              <Link to={`/update-food/${food._id}`} className="btn btn-info">Update</Link>
            </th>
          </tr>)
          }
          
        </tbody>
      </table>
    </div>
  );
};

export default MyFoods;