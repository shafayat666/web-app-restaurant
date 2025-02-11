
const CustomerReviews = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Customer Reviews</h1>
      <div className="space-y-6">
        <div className=" p-4 rounded-lg shadow">
          <p className="text-lg font-semibold">John Doe</p>
          <p className="text-gray-600">Amazing food! The taste was incredible, and the delivery was quick!</p>
        </div>
        <div className=" p-4 rounded-lg shadow">
          <p className="text-lg font-semibold">Jane Smith</p>
          <p className="text-gray-600">Loved the variety of options. Everything was fresh and delicious!</p>
        </div>
        <div className=" p-4 rounded-lg shadow">
          <p className="text-lg font-semibold">Michael Brown</p>
          <p className="text-gray-600">One of the best food services I&apos;ve tried. Highly recommended!</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;