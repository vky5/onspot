import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from "prop-types";
// import CardCarousel from "./CardCarousel";
import { useNavigate } from "react-router-dom";
import CardCarBig from "./CardCarBig";

function MyCarousel({ list }) {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/blogs/${id}`, { state: { id } });
  };

  return (
    <div>
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        showArrows={false}
        className="h-full"
        emulateTouch={true} // Ensure this is set to true for swipe gestures
      >
        {list.map((indi) => (
          <div key={indi._id}>
            <div onClick={() => handleCardClick(indi._id)}>
              {/* <CardCarousel
                heading={indi.heading}
                img={
                  indi.img ||
                  "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                }
                id={indi._id}
              /> */}
              <CardCarBig 
                heading={indi.heading}
                img={
                  indi.img ||
                  "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                }
                id={indi._id}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

MyCarousel.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      img: PropTypes.string,
    })
  ).isRequired,
};

export default MyCarousel;
