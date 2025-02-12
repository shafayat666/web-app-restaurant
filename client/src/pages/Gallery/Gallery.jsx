import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const photos = [
  { src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1484723091739-30a097e8f929", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1606787366850-de6330128bfc", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe", width: 800, height: 600 },
];

const Gallery = () => {
  const [index, setIndex] = useState(-1); // Track clicked image index

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl text-center mb-4 text-gray-900 dark:text-gray-100">Photo Gallery</h1>

      {/* Photo Album */}
      {/* <PhotoAlbum
        layout="columns"
        photos={photos}
        columns={3}
        onClick={({ index }) => setIndex(index)} // Open lightbox on click
      /> */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="w-48 mx-auto">
            <img
              src={photo.src}
              alt=""
              className="w-full rounded-lg shadow-md cursor-pointer"
              onClick={() => setIndex(index)}
            />
          </div>
        ))}
      </div>


      {/* Lightbox */}
      <Lightbox
        slides={photos}
        open={index >= 0} // Open when index is set
        index={index} // Set the clicked image
        close={() => setIndex(-1)} // Close when user exits
      />
    </div>
  );
};

export default Gallery;
