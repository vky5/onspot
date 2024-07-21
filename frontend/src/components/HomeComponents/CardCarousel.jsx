import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CardCarousel({ img, heading, id }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/blogs/${id}`, { state: { id } });
  };

  return (
    <div>
      <div className="relative h-[390px]">
        <img
          src={img}
          className="h-full w-full object-cover"
          alt="Image failed to load."
        />
        <div className="absolute inset-0 bg-priDark opacity-50"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white w-5/6">
          <p className="text-xl text-left">{heading}</p>
          <br />
        </div>

        <div
          className="absolute inset-0 cursor-pointer"
          onClick={handleCardClick}
        ></div>
      </div>
    </div>
  );
}

CardCarousel.propTypes = {
  img: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CardCarousel;
