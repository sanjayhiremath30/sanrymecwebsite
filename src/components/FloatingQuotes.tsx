"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const quotes = [
  "A journey of a thousand miles begins with a single step",
  "Good times & crazy friends make the best memories",
  "Friends become our chosen family",
  "Side by side or miles apart, real friends are close to the heart",
  "Some souls just understand each other upon meeting",
  "The best days of our lives",
  "Count the memories, not the calories",
  "Different paths, same memories",
  "We'll never forget this!"
];

// Generate random positions that tend to stay near the edges
const getRandomEdgePosition = () => {
  const isHorizontalEdge = Math.random() > 0.5;
  const isFirstHalf = Math.random() > 0.5;

  if (isHorizontalEdge) {
    return {
      x: isFirstHalf ? Math.random() * 20 : 80 + Math.random() * 20,
      y: Math.random() * 100,
    };
  } else {
    return {
      x: Math.random() * 100,
      y: isFirstHalf ? Math.random() * 20 : 80 + Math.random() * 20,
    };
  }
};

export default function FloatingQuotes() {
  const [mounted, setMounted] = useState(false);
  const [activeQuotes, setActiveQuotes] = useState<
    { id: number; text: string; x: number; y: number; delay: number }[]
  >([]);

  useEffect(() => {
    setMounted(true);
    
    // Pick 5 random quotes to display at edges
    const shuffled = [...quotes].sort(() => 0.5 - Math.random()).slice(0, 5);
    
    const mappedQuotes = shuffled.map((text, i) => {
      const pos = getRandomEdgePosition();
      return {
        id: i,
        text,
        x: pos.x,
        y: pos.y,
        delay: Math.random() * 2,
      };
    });

    setActiveQuotes(mappedQuotes);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[-22] overflow-hidden">
      {activeQuotes.map((quote) => (
        <motion.div
          key={quote.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.3, 0.3, 0],
            y: [-10, -30],
            x: [0, Math.random() * 20 - 10],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: quote.delay,
            ease: "easeInOut"
          }}
          className="absolute text-zinc-300/40 font-serif italic text-lg md:text-xl whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          style={{
            left: `${quote.x}%`,
            top: `${quote.y}%`,
            transform: "translate(-50%, -50%)"
          }}
        >
          {quote.text}
        </motion.div>
      ))}
    </div>
  );
}
