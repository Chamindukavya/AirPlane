// CardComponent.tsx
import React from "react";

interface CardProps {
  title: string;
  value: string;
  gradient: string; // Gradient style
  textColor: string;
  imageSrc: string; // Path to the plane image
}

const CardComponent: React.FC<CardProps> = ({
  title,
  value,
  gradient,
  textColor,
  imageSrc,
}) => {
  return (
    <div
      className={`relative p-4 rounded-lg shadow-lg ${gradient} overflow-hidden h-52`}
    >
      {/* Plane Image */}
      <img
        src={imageSrc}
        alt="Plane"
        className="absolute bottom-12 right-50 w-21 h-auto transform translate-x-1/4 translate-y-1/4"
      />

      {/* Background Shape */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-20 rounded-full"></div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <p className={`text-sm ${textColor}`}>{title}</p>
          <h2 className={`text-3xl font-bold ${textColor}`}>{value}</h2>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
