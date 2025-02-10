import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const links = <>
    <Link className="mr-4" to="/">Home</Link>
    <Link className="mr-4" to="/all-foods">All Foods</Link>
    <Link className="mr-4" to="/gallery">Gallery</Link>
  </>

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged Out!",
          icon: "success"
        });
        logout()
          .then(() => {
            navigate("/login");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Restaurant</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ?
            <>
              <span className="mr-4">Hello, {user.displayName}</span>
              <img
                className="w-10 rounded-full mr-4"
                alt="Tailwind CSS Navbar component"
                src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
              <button onClick={handleLogOut} className="btn btn-warning">Logout</button>
            </>
            :
            <Link to="/login" className="btn btn-primary">Login</Link>
        }
      </div>
    </div>
  );
};

export default NavBar;