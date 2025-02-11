import Banner from "./components/Banner";
import CustomerReviews from "./components/CustomerReviews";
import MeetChefs from "./components/MeetChefs";
import TopFoods from "./components/TopFoods";

const Home = () => {
  return (
    <div>
      <Banner />      
      <TopFoods />
      <CustomerReviews />
      <MeetChefs />
    </div>
  );
};

export default Home;