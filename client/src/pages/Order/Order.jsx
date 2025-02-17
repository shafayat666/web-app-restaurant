import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Order = () => {
  const { user } = useAuth();
  const [myOrders, setMyOrders] = useState([]);
  const axiosInstance = useAxiosSecure();

  const handleDelete = (id) => {
    console.log("Delete", id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/orders/${id}`)
          .then(response => {
            console.log(response.data);
            setMyOrders(myOrders.filter(order => order._id !== id));
          })
          .catch(error => {
            console.error(error);
          });
          
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  }


  useEffect(() => {
    axiosInstance.get(`/orders?email=${user.email}`, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        setMyOrders(response.data);
      })
      .catch(error => {
        console.error(error);
      });

  }, [user.email]);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold text-center my-4">My Orders</h1>
      <table className="table w-3/4 mx-auto">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Buying Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {
            myOrders.map((order, index) => <tr key={index}>
              <th>{index + 1}</th>
              <td>{order.name}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.buyingDate}</td>
              <th>
                <button onClick={() => handleDelete(order._id)} className="btn btn-error">X</button>
              </th>
            </tr>)
          }

        </tbody>
      </table>
    </div>
  );
};

export default Order;