import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllFoods from "../pages/AllFoods/AllFoods";
import Gallery from "../pages/Gallery/Gallery";
import App from "../App";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import FoodPurchase from "../pages/FoodPurchase/FoodPurchase";
import PrivateRoute from "./PrivateRoute";
import MyFoods from "../pages/MyFoods/MyFoods";
import UpdateFood from "../pages/UpdateFood/UpdateFood";
import AddFood from "../pages/AddFood/AddFood";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/all-foods",
        element: <AllFoods />,
        loader: () => fetch("http://localhost:3000/foods"),
      },
      {
        path: "/foods/:id",
        element: <FoodDetails />,
        loader: ({ params }) => fetch(`http://localhost:3000/foods/${params.id}`),
      },
      {
        path: "/food-purchase/:id",
        element: <PrivateRoute><FoodPurchase /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/foods/${params.id}`),
      },
      {
        path: "/update-food/:id",
        element: <PrivateRoute><UpdateFood /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/foods/${params.id}`),
      },
      {
        path: "/add-food",
        element: <PrivateRoute><AddFood /></PrivateRoute>
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/my-foods",
        element: <PrivateRoute><MyFoods /></PrivateRoute>
      },
    ],
  },
]);


export default router;
