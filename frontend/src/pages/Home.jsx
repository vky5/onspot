import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

import Latest from "../components/Latest";

function Home() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div
        className="flex justify-center sm:space-x-3 mt-5 sm:tracking-[0.4em] text-white tracking-[0.6em] text-gradient lg:text-9xl md:text-8xl sm:text-7xl text-3xl lg:my-3 xl:mt-[120px] sm:pl-6 pl-3 "
      >
        <p className="inline-block max-w-max" data-aos="fade-left">
          O
        </p>
        <p className="inline-block max-w-max" data-aos="fade-left">
          N
        </p>
        <p className="inline-block max-w-max" data-aos="fade-left">
          S
        </p>
        <p className="inline-block max-w-max" data-aos="fade-left">
          P
        </p>
        <p className="inline-block max-w-max" data-aos="fade-left">
          O
        </p>
        <p className="inline-block max-w-max" data-aos="fade-left">
          T
        </p>
      </div>
      <div>
        <Latest />
      </div>

      {/* Add other components or content here */}
    </div>
  );
}

export default Home;
