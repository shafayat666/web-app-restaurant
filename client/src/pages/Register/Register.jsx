import { Link } from "react-router";

const Register = () => {
  return (
    <div className="hero">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold my-8">Sign Up</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Your Name</label>
              <input name="name" type="text" className="input" placeholder="Your Name" />
              <label className="fieldset-label">Email</label>
              <input name="email" type="email" className="input" placeholder="Email" />
              <label className="fieldset-label">Password</label>
              <input name="password" type="password" className="input" placeholder="Password" />
              <div>
                <p>Already have an account? Please <Link to="/login" className="link">login</Link></p>
              </div>
              <button className="btn btn-neutral mt-4">Sign Up</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;