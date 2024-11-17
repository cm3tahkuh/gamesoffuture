"use client"

import "./Hero.scss";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="hero">
    {/* Анимация фона */}
    <motion.img
      className="hero__background"
      src="src/mainBg.png"
      alt="Фон"
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    />
    {/* Анимация заголовка */}
    <motion.h1
      className="hero__title"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
    >
      игры будущего
    </motion.h1>
  </div>
);
};
