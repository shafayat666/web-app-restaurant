import { Link } from "react-router";

const Login = () => {
  return (
    <div className="hero">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold my-8">Please Login</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Email</label>
              <input name="email" type="email" className="input" placeholder="Email" />
              <label className="fieldset-label">Password</label>
              <input name="password" type="password" className="input" placeholder="Password" />
              <div>
                <p>Don&apos;t have an account? Register <Link to="/register" className="link">here</Link></p>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;