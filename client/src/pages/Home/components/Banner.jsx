import { Link } from "react-router";

const Banner = () => {
  return (
    <div
      className="hero h-[500px]"
      style={{
        backgroundImage: "url(https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D)",
      }}>
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to Food Paradise</h1>
          <p className="mb-5">
          Discover the best dishes, hand-picked for you. Taste the difference!
          </p>
          <Link className="btn btn-primary" to={"/all-foods"}>Explore All Foods</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;