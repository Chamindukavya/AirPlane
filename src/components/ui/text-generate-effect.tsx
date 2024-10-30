"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-outline dark:text-white text-black"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div
          className="relative dark:text-white text-black text-6xl leading-snug tracking-wide 
            p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700"
          style={{
            backgroundColor: "rgba(100, 100, 100, 0.5)", // Ash-colored transparent background
            backdropFilter: "blur(10px)", // Adds a subtle glassy effect
            border: "1px solid rgba(255, 255, 255, 0.2)", // Semi-transparent border
          }}
        >
          {/* Shadow Box */}
          <div
            className="absolute inset-0 z-[-1] rounded-lg bg-transparent
              shadow-lg shadow-transparent blur-[2px]"
            style={{ opacity: 0.4 }} // Softer ash-colored shadow effect
          ></div>

          {renderWords()}
        </div>
      </div>
    </div>
  );
};

// CSS in your global stylesheet or within a styled component
<style jsx global>{`
  .text-outline {
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8); /* White outline */
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8),
      /* Dark shadow for depth */ 0px 0px 20px rgba(255, 255, 255, 0.6); /* Glow effect */
    background: linear-gradient(90deg, #ffafbd 0%, #ffc3a0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`}</style>;
