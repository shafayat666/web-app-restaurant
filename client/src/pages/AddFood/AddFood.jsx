import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddFood = () => {
  const {user} = useAuth();
  const axiosInstance = useAxiosSecure();
  const navigate = useNavigate();

  const handleAdd = (event) => {
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

    axiosInstance.post(`/foods`, data)
      .then(response => {
        console.log(response.data);
        Swal.fire("Food Added");
        navigate(`/my-foods`);
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <div>
      <h1 className="text-3xl text-center my-8">Add a new Food</h1>      

      <form onSubmit={handleAdd} className="card-body w-3/4 mx-auto">
        <fieldset className="fieldset">
          <label className="fieldset-label">Name</label>
          <input name="name" type="text" className="input w-full" placeholder="Food Name" />
          <label className="fieldset-label">Image URL</label>
          <input name="image" type="text" className="input w-full" placeholder="Image URL" />
          <label className="fieldset-label">Category</label>
          <input name="category" type="text" className="input w-full" placeholder="Category" />
          <label className="fieldset-label">Quantity</label>
          <input name="quantity" type="number" className="input w-full" placeholder="Quantity" />
          <label className="fieldset-label">Price</label>
          <input name="price" type="number" className="input w-full" placeholder="Price" />
          <label className="fieldset-label">Origin</label>
          <input name="origin" type="text" className="input w-full" placeholder="Origin" />
          <label className="fieldset-label">Description</label>
          <input name="description" type="text" className="input w-full" placeholder="Description" />
        </fieldset>
          <button className="btn btn-neutral mt-4">Add</button>
      </form>
    </div>
  );
};

export default AddFood;