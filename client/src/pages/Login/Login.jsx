import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    login(data)
    .then(result => {
      console.log(result);
      Swal.fire("Succesfully Logged In");
      navigate("/");
    })
    .catch(error => {
      console.log(error);
    }); 
  }
  return (
    <div className="hero flex justify-center items-center">
      <div className="hero-content flex-col w-full max-w-lg">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold my-8">Please Login</h1>
        </div>
        <div className="card bg-base-100 w-full p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body space-y-4">
            <fieldset className="fieldset space-y-4">
              <label className="fieldset-label">Email</label>
              <input name="email" type="email" className="input w-full p-3" placeholder="Email" />
              <label className="fieldset-label">Password</label>
              <input name="password" type="password" className="input w-full p-3" placeholder="Password" />
              <div className="text-center">
                <p>Don&apos;t have an account? Register <Link to="/register" className="link">here</Link></p>
              </div>
              <button className="btn btn-neutral w-full py-3 mt-4 text-lg">Login</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Login;