"use client";


import './News.scss'

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const News = () =>{
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  
    return (
      <div className="news">
        <div className="container">
          <motion.h1
            className="news__title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            ПОСЛЕДНИЕ НОВОСТИ
          </motion.h1>
          <motion.div
            ref={ref}
            className="news__row"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {newsData.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </motion.div>
        </div>
      </div>
    );
  }
  
  function NewsCard({ title, image, buttonText, buttonIcon }) {
    return (
      <motion.div
        className="news__column"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="news__card-title">{title}</h2>
        <img src={image} alt="" className="news__card-preview" />
        <button className="news__card-button">
          {buttonText}
          <img src={buttonIcon} alt="" className="news__card-button-arrow" />
        </button>
      </motion.div>
    );
  }
  
  // Массив данных о новостях
  const newsData = [
    {
      title: 'Турнир по FIFA',
      image: 'src/newspreview1.png',
      buttonText: 'Принять участие',
      buttonIcon: 'src/arrowButton.svg',
    },
    {
      title: 'Участники предыдущего турнира',
      image: 'src/newspreview2.png',
      buttonText: 'Узнать больше',
      buttonIcon: 'src/arrowButton.svg',
    },
    {
      title: 'Участники предыдущего турнира',
      image: 'src/newspreview2.png',
      buttonText: 'Узнать больше',
      buttonIcon: 'src/arrowButton.svg',
    },
    {
      title: 'Участники предыдущего турнира',
      image: 'src/newspreview2.png',
      buttonText: 'Узнать больше',
      buttonIcon: 'src/arrowButton.svg',
    },
  ];
  