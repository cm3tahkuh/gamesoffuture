"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./ScrollButton.scss";

export const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      className="scroll__block"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: showButton ? 1 : 0, scale: showButton ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
    >
      <button onClick={scrollToTop} className="scroll__button">
        ↑
      </button>
    </motion.div>
  );
};
