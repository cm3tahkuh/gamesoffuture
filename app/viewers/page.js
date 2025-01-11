"use client";

import "./viewers.scss";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Viewers = () => {
  const cards = [
    {
      image:
        "https://cdn-m.sport24.ru/m/a0a6/413f/e6a7/4cf6/8848/735c/048f/6624/1200_10000_max.jpeg",
      title: "Баскетбол",
      description:
        "Инновационный формат баскетбола, где команда из 2 игроков и капитана соревнуется сначала в виртуальном пространстве, а затем на реальной площадке с умным мячом и AR-элементами.",
    },
    {
      image:
        "https://cdn.sovsport.prod.plat.agency/image_9540_1667394453_11zon_e9245b4080.webp",
      title: "Футбол",
      description:
        "Новое слово в футболе: 4 игрока и капитан проходят виртуальный этап стратегии, после чего выходят на поле с умным мячом и AR-воротами.",
    },
    {
      image:
        "https://rt-online.ru/wp-content/uploads/2022/12/Fidzhital-Igry-3.jpg",
      title: "Хоккей",
      description:
        "Команда из 5 игроков и капитана начинает с виртуальной симуляции, затем переходит на реальный лед с умной шайбой и AR-препятствиями.",
    },
  ];

  return (
    <main>
      <div className="viewers">
        <div className="container">
          <div className="viewers__row">
            <div className="viewers__column">
              <motion.h1
                className="viewers__title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Что такое игры будущего?
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="viewers__description"
              >
                Фиджитал-спорт — это инновационный формат соревнований,
                объединяющий виртуальный и реальный спорт. Каждый матч проходит
                в два этапа: сначала команды соревнуются в виртуальном
                пространстве, а затем переносят игру на реальное поле.
              </motion.p>

              {/* Карточки */}
              <div className="viewers__cards">
                {cards.map((card, index) => (
                  <Card
                    key={index}
                    image={card.image}
                    title={card.title}
                    description={card.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

function Card({ image, title, description }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="viewers__card"
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <img className="viewers__card-image" src={image} alt="Card Image" />
      <div className="viewers__card-text-block">
        <h2 className="viewers__card-title">{title}</h2>
        <p className="viewers__card-description">{description}</p>
      </div>
    </motion.div>
  );
}

export default Viewers;
