import { useLoaderData } from "react-router";
import { useState } from "react";

const FoodDetails = () => {
  const food = useLoaderData();
  const { name, image, category, quantity, price, addBy, origin, description, purchase_count } = food;
  const [count, setCount] = useState(purchase_count);

  const handlePurchase = () => {
    setCount(count + 1);
    // Add logic to update purchase count in the database if needed
  };

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
          <p className="text-lg"><strong>Purchase Count:</strong> {count}</p>
          <p className="text-lg"><strong>Description:</strong> {description}</p>

          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
