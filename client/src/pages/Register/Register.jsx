import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Register = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      photo: formData.get('photo'),
    };

    try {
      const result = await signUp(data);
      const user = result.user;
      console.log(user);

      await updateProfile(user, {
        displayName: data.name,
        photoURL: data.photo,
      });
      
      Swal.fire("Succesfully Registered");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    // signUp(data)
    // .then((result) => {
    //   const user = result.user;
    //   console.log(user);
    //   updateProfile(user, {
    //     displayName: data.name,
    //     photoURL: data.photo,
    //   })
    //   Swal.fire("Succesfully Registered");
    //   navigate("/");
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }

  return (
    <div className="hero flex justify-center items-center">
      <div className="hero-content flex-col w-full max-w-lg">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold my-8">Sign Up</h1>
        </div>
        <div className="card bg-base-100 w-full p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body space-y-4">
            <fieldset className="fieldset space-y-4">
              <label className="fieldset-label">Your Name</label>
              <input name="name" type="text" className="input w-full p-3" placeholder="Your Name" />

              <label className="fieldset-label">Photo URL</label>
              <input name="photo" type="text" className="input w-full p-3" placeholder="Photo URL" />

              <label className="fieldset-label">Email</label>
              <input name="email" type="email" className="input w-full p-3" placeholder="Email" />

              <label className="fieldset-label">Password</label>
              <input name="password" type="password" className="input w-full p-3" placeholder="Password" />

              <div className="text-center">
                <p>Already have an account? Please <Link to="/login" className="link">login</Link></p>
              </div>

              <button className="btn btn-neutral w-full py-3 mt-4 text-lg">Sign Up</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Register;