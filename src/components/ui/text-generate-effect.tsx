"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  className,
  filter = true,
  duration = 0.7,
  duration = 0.7,
}: {
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();

  // Define the lines of text
  const textLines = [
    "Discover New Destinations",
    "Book with Ease",
    "Begin Your Adventure Today",
  ];

  // Define the lines of text
  const textLines = [
    "Discover New Destinations",
    "Book with Ease",
    "Begin Your Adventure Today",
  ];

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 2,
        opacity: 2,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.3),
        delay: stagger(0.3),
      }
    );
  }, [scope.current]);

  const renderTextLines = () => {
  const renderTextLines = () => {
    return (
      <motion.div ref={scope} className="flex flex-col items-center">
        {textLines.map((line, idx) => {
      <motion.div ref={scope} className="flex flex-col items-center">
        {textLines.map((line, idx) => {
          return (
            <motion.span
              key={line + idx}
              className="opacity-0"
              key={line + idx}
              className="opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              <span className="text-8xl leading-snug tracking-wide text-white">
                {line}
              </span>
              <span className="text-8xl leading-snug tracking-wide text-white">
                {line}
              </span>
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold text-center", className)} style={{ fontFamily: "Arial, sans-serif" }}>
      <div className="mt-4">
        <div
          className="dark:text-gray-700 text-white"
          className="dark:text-gray-700 text-white"
          style={{
            fontFamily: "Playfair Display", 
            textShadow: "3px 3px 7px rgba(1, 1, 1, 0.5)", // Add shadow effect here
          }}
        >
          {renderTextLines()}
        </div>
      </div>
    </div>
  );
};