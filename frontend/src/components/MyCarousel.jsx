import Latest from "./Latest";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function MyCarousel() {
  return (
    <div>
        <Carousel 
          showIndicators={false}
          autoPlay={true}
          infiniteLoop={true}
        >
            <Latest />
            <Latest />
            <Latest />
            <Latest />
            <Latest />
        </Carousel>
    </div>
  )
}

export default MyCarousel
