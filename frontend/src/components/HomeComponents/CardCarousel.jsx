function CardCarousel(props) {
    return (
      <div>
        <div className="relative h-[390px]">
          <img
            src={props.img}
            className="h-full w-full object-cover"
            alt="Carousel Slide"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute bottom-0  left-0 p-4 text-white w-5/6">
            <p className="text-xl text-left">{props.heading}</p><br />
          </div>
        </div>
      </div>
    );
  }
  
  export default CardCarousel;
  