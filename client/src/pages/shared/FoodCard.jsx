import PropTypes from 'prop-types';
import { Link } from 'react-router';

const FoodCard = ({ food }) => {
  const { _id, name, image, category, quantity, price, addBy, origin, description, purchase_count } = food;
  return (
    <div>
      <div className="p-4">
        <h1 className="text-xl font-bold">{name}</h1>
        <p>{description}</p>
        <p>Price: {price}</p>
        <p>Purchase Count: {purchase_count}</p>
        <Link to={`/foods/${_id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
};

export default FoodCard;

FoodCard.propTypes = {
  food: PropTypes.object,
}