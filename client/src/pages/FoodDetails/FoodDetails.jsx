import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const FoodDetails = () => {
  const { user } = useAuth();
  const food = useLoaderData();
  const { _id, name, image, category, quantity, price, addBy, origin, description } = food;
  const [available, setAvailable] = useState(true);

  const addEmail = addBy.email;

  // console.log(user?.email, addEmail);
  
  useEffect(() => {
    if (quantity === 0) {
      setAvailable(false);
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: "This food item is currently unavailable.",
      });
    }

    if (user?.email === addEmail) {
      console.log("I am being called");
      setAvailable(false);
      Swal.fire({
        icon: "error",
        title: "Invalid Action",
        text: "You cannot purchase your own food item.",
      });
    }

  }, [quantity, user, addEmail]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-6">{name}</h1>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Food Image */}
        <img src={image} alt={name} className="w-80 h-80 object-cover rounded-lg shadow-md" />

        {/* Food Details */}
        <div className="flex-1 space-y-4">
          <p className="text-lg"><strong>Category:</strong> {category}</p>
          <p className="text-lg"><strong>Origin:</strong> {origin}</p>
          <p className="text-lg"><strong>Quantity:</strong> {quantity}</p>
          <p className="text-lg"><strong>Price:</strong> ${price}</p>
          <p className="text-lg"><strong>Added by:</strong> {addBy.name} ({addBy.email})</p>
          <p className="text-lg"><strong>Description:</strong> {description}</p>

          {/* Purchase Button */}
          <Link
            to={`/food-purchase/${_id}`}
            className={`btn ${available ? "btn-primary" : "btn-disabled"}`}
          >
            Purchase
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
