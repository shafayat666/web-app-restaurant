import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment/moment";

const FoodPurchase = () => {
  const { user } = useAuth();
  const food = useLoaderData();
  const { name, quantity, price } = food;
  const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Purchase Confirmed", _id);

    const formData = new FormData(event.currentTarget);
    console.log(formData.get("name"));

    const data = {
      name: formData.get("name"),
      price: parseInt(formData.get("price")),
      quantity: parseInt(formData.get("quantity")),
      buyer: formData.get("buyer"),
      buyerEmail: formData.get("buyer-email"),
      buyingDate: currentDate,
    }

    axios.post(`http://localhost:3000/orders`, data)
      .then(response => {
        console.log(response.data);
        Swal.fire("Purchase Confirmed");
        navigate(`/orders`);
      })
      .catch(error => {
        console.error(error);
      });
  
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Confirm Purchase</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Food Name</label>
          <input type="text" name="name" defaultValue={name} className="input-field w-full" />
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Price</label>
          <input type="number" name="price" value={price} className="input-field w-full" />
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Quantity</label>
          <input type="number" name="quantity" defaultValue={quantity} min={1} max={quantity} className="input-field w-full" />
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Buyer</label>
          <input type="text" name="buyer" value={user.displayName} className="input-field w-full" />
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input type="email" name="buyer-email" value={user.email} className="input-field w-full" />
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Buying Date</label>
          <input type="text" value={currentDate} disabled className="input-field w-full" />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
          Purchase
        </button>
      </form>
    </div>
  );
};

export default FoodPurchase;