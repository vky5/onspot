import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import CardCarousel from "./CardCarousel";

function MyCarousel() {
  return (
    <div>
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        showArrows={false}
        className="h-full "
      >
        <div className="">
          <CardCarousel img="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80" heading="today we are going to start a comapny and this is a good company we don't know how it is going to happen but we do know that something like that could "/>
        </div>
        <div className="">
          <CardCarousel img="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80" heading="today we are going to start a comapny and this is a good company we don't know how it is going to happen but we do know that something like that could "/>
        </div>
        <div className="">
          <CardCarousel img="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80" heading="today we are going to start a comapny and this is a good company we don't know how it is going to happen but we do know that something like that could "/>
        </div>
      </Carousel>
    </div>
  );
}

export default MyCarousel;
