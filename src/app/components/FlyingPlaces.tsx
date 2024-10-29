"use client";

import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const destinations = [
  {
    title: "Indonesia",
    description: "Dive into rich cultural heritage, scenic landscapes, and tropical beauty in Indonesia.",
    src: "/bali.jpeg",
  },
  {
    title: "India",
    description: "Discover vibrant culture, ancient history, and diverse landscapes across India.",
    src: "/india1.jpg",
  },
  {
    title: "Thailand",
    description: "Explore stunning beaches, rich traditions, and tantalizing flavors of Thailand.",
    src: "/thailand.jpg",
  },
  {
    title: "Sri Lanka",
    description: "Uncover breathtaking nature, historical wonders, and warm hospitality in Sri Lanka.",
    src: "/tower.jpeg",
  },
  {
    title: "Singapore",
    description: "Savor the blend of luxury, innovation, and multicultural dining in Singapore.",
    src: "/singapore.png",
  },
  {
    title: "Indonesia",
    description: "Dive into rich cultural heritage, scenic landscapes, and tropical beauty in Indonesia.",
    src: "/bali.jpeg",
  },
  {
    title: "Bankok",
    description: "Explore stunning beaches, rich traditions, and tantalizing flavors of Thailand.",
    src: "/11178.jpg",
  },
];

const DestinationCarousel = () => {
  return (
    <div className="w-full h-full py-10 bg-black">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        interval={4000}
        centerMode={true}
        centerSlidePercentage={30} // Improved size for larger card display
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full shadow-md -translate-y-1/2 top-1/2 hover:bg-blue-600"
              aria-label="Previous Slide"
            >
              <span className="text-white">‹</span>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              className="absolute right-0 z-10 flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full shadow-md -translate-y-1/2 top-1/2 hover:bg-blue-600"
              aria-label="Next Slide"
            >
              <span className="text-white">›</span>
            </button>
          )
        }
        className="max-w-7xl mx-auto"
      >
        {destinations.map((item, index) => (
          <div key={index} className="flex justify-center p-4">
            <div
              className="relative bg-[#211f1e] bg-opacity-80 rounded-lg shadow-lg overflow-hidden w-96 h-[28rem] border border-gray-700 hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
            >
              {/* Image */}
              <Image
                src={item.src}
                alt={item.title}
                width={350}
                height={250}
                className="object-cover w-full h-56"
              />

              {/* Card Content */}
              <div className="p-6 text-center flex flex-col justify-between h-44 text-gray-200">
                <h3 className="text-xl font-semibold text-blue-400">{item.title}</h3>
                <p className="mt-2 text-gray-400">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default DestinationCarousel;
