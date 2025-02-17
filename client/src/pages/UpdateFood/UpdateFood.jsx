import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateFood = () => {
  const axiosInstance = useAxiosSecure();
  const {user} = useAuth();
  const navigate = useNavigate();
  const food = useLoaderData();
  const { _id, name, image, category, quantity, price, origin, description } = food;

  const handleUpdate = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      image: formData.get("image"),
      category: formData.get("category"),
      quantity: parseInt(formData.get("quantity")),
      price: parseInt(formData.get("price")),
      addBy:{
        name: user.displayName,
        email: user.email,
      },
      origin: formData.get("origin"),
      description: formData.get("description"),
    }

    axiosInstance.patch(`/foods/${_id}`, data, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        Swal.fire("Food Updated");
        navigate(`/my-foods`);
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <div>
      <h1 className="text-3xl text-center my-8">Update: {name}</h1>      

      <form onSubmit={handleUpdate} className="card-body w-3/4 mx-auto">
        <fieldset className="fieldset">
          <label className="fieldset-label">Name</label>
          <input name="name" type="text" className="input w-full" placeholder="Food Name" defaultValue={name} />
          <label className="fieldset-label">Image URL</label>
          <input name="image" type="text" className="input w-full" placeholder="Image URL" defaultValue={image} />
          <label className="fieldset-label">Category</label>
          <input name="category" type="text" className="input w-full" placeholder="Category" defaultValue={category} />
          <label className="fieldset-label">Quantity</label>
          <input name="quantity" type="number" className="input w-full" placeholder="Quantity" defaultValue={quantity} />
          <label className="fieldset-label">Price</label>
          <input name="price" type="number" className="input w-full" placeholder="Price" defaultValue={price} />
          <label className="fieldset-label">Origin</label>
          <input name="origin" type="text" className="input w-full" placeholder="Origin" defaultValue={origin} />
          <label className="fieldset-label">Description</label>
          <input name="description" type="text" className="input w-full" placeholder="Description" defaultValue={description} />
        </fieldset>
          <button className="btn btn-neutral mt-4">Update</button>
      </form>
    </div>
  );
};

export default UpdateFood;