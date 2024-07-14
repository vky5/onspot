import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CardCarBig({ img, heading, id }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/blogs/${id}`, { state: { id } });
  };
  return (
  <div>
    <div>
        <img src={img}/>
    </div>
  </div>
  );
}

CardCarBig.propTypes = {
  img: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default CardCarBig;
