const MeetChefs = () => {
  const chefs = [
    {
      name: "Chef Gordon",
      specialty: "Italian Cuisine",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c"
    },
    {
      name: "Chef Lisa",
      specialty: "French Pastries",
      image: "https://images.unsplash.com/photo-1731576089270-9e806089a40f"
    },
    {
      name: "Chef Kenji",
      specialty: "Japanese Sushi",
      image: "https://images.unsplash.com/photo-1573637798035-53c4aa94d094"
    },
    {
      name: "Chef Maria",
      specialty: "Mexican Tacos",
      image: "https://images.unsplash.com/photo-1601341348280-550b5e87281b"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Meet Our Chefs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {chefs.map((chef, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg text-center">
            <img src={chef.image} alt={chef.name} className="w-24 h-24 mx-auto rounded-full mb-4" />
            <h2 className="text-xl font-semibold">{chef.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{chef.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetChefs;
