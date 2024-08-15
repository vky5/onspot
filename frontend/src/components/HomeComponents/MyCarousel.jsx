import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from "prop-types";
import CardCarousel from "./CardCarousel";
import { useNavigate } from "react-router-dom";
import CardCarBig from "./CardCarBig";
import CardCarouselSkeleton from '../../loading/Carousel/CardCarouslSkeleton';
import CardCarouselSmol from '../../loading/Carousel/CardCarouselSmol';

function MyCarousel({ list, loading }) {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleCardClick = (id) => {
    navigate(`/blogs/${id}`, { state: { id } });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {loading ? (
        windowWidth >= 768 ? (
          <CardCarouselSkeleton />
        ) : (
          <CardCarouselSmol />
        )
      ) : (
        <Carousel
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          infiniteLoop={true}
          showArrows={windowWidth >= 768} // Conditionally render arrows based on window width
          className="h-full"
          emulateTouch={true}
        >
          {list.map((indi) => (
            <div key={indi._id}>
              <div
                className="md:hidden"
                onClick={() => handleCardClick(indi._id)}
              >
                <CardCarousel
                  heading={indi.heading}
                  img={
                    indi.img ||
                    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                  }
                  id={indi._id}
                />
              </div>
              <div className="hidden md:block">
                <CardCarBig
                  heading={indi.heading}
                  img={
                    indi.img ||
                    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  id={indi._id}
                  username={indi.user.username}
                />
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}

MyCarousel.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      img: PropTypes.string,
    })
  ),
  loading: PropTypes.bool.isRequired,
};

export default MyCarousel;
