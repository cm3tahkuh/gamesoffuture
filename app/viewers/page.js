"use client";

import './viewers.scss'
import { motion, useInView } from "framer-motion";
import { useRef } from 'react';

const Viewers = () =>{
    const cards = [
      {
        image: 'src/viewers1.png',
        description:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      },
      {
        image: 'src/viewers2.png',
        description:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      },
      {
        image: 'src/viewers1.png',
        description:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      },
      {
        image: 'src/viewers2.png',
        description:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      },
    ];
  
    return (
      <main>
        <div className="viewers">
          <div className="container">
            <div className="viewers__row">
              {/* Левая колонка */}
              <div className="viewers__column">
                <div className="viewers__background">
                  <motion.img
                    className="viewers__image"
                    src="src/bgViewers.png"
                    alt="Background Image"
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
  
              {/* Правая колонка */}
              <div className="viewers__column">
                <motion.div
                  className="viewers__title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="viewers__subtitle">Что такое</span> игры будущего?
                </motion.div>
  
                {/* Карточки */}
                <div className="viewers__cards">
                  {cards.map((card, index) => (
                    <Card key={index} image={card.image} description={card.description} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  function Card({ image, description }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  
    return (
      <motion.div
        ref={ref}
        className="viewers__card"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <img className="viewers__card-image" src={image} alt="Card Image" />
        <p className="viewers__card-description">{description}</p>
      </motion.div>
    );
  }
  

export default Viewers;