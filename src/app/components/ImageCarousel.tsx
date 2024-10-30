"use client";

import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const items = [
  {
    title: "Gourmet In-Flight Dining",
    description: "Experience curated gourmet meals and refreshing beverages to make your journey delightful.",
    src: "/food1.webp",
  },
  {
    title: "Exclusive Duty-Free Shopping",
    description: "Pre-order premium products and shop exclusive duty-free items from the comfort of your seat.",
    src: "/duty_free.jpg",
  },
  {
    title: "Effortless Baggage Assistance",
    description: "Relax while we handle all baggage concerns, ensuring you have a stress-free experience.",
    src: "/prepaid_excess_baggage.jpg",
  },
  {
    title: "Reserve Your Ideal Seat",
    description: "Choose your preferred seat in advance for a comfortable, personalized travel experience.",
    src: "/seat.webp",
  },
  {
    title: "Specialized Passenger Assistance",
    description: "Our dedicated team supports elderly and disabled passengers throughout their journey.",
    src: "/elderly.webp",
  },
];

const ImageCarousel = () => {
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
        centerSlidePercentage={30} // Larger slide size for improved card dimensions
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
        {items.map((item, index) => (
          <div key={index} className="flex justify-center p-4">
            <div
              className="bg-[#211f1e] bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden w-96 h-[28rem] border border-gray-700 transition-transform transform hover:scale-105 hover:brightness-110 duration-300" // Lengthened card height
            >
              {/* Image */}
              <Image
                src={item.src}
                alt={item.title}
                width={350}
                height={250}
                className="object-cover w-full h-56" // Consistent height for larger images
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

export default ImageCarousel;
