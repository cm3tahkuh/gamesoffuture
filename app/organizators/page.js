"use client";

import "./organizators.scss";

import { motion, useInView } from "framer-motion";
import { useRef } from 'react';

const Organizators = () => {
  return (
    <main>
      <div className="organizators">
        <div className="container">
          <motion.div
            className="organizators__row"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 },
              },
            }}
          >
            <OrganizatorsColumn
              image="src/URK_org-logo.svg"
              alt="УРК логотип"
              title="ПОУ “Уральский региональный колледж”"
              description={`
Уральский региональный колледж – образовательное учреждение среднего профессионального образования, был основан в 1994 году.

Основная цель – обеспечение рынка труда специалистами в области правоведения, экономики, программного обеспечения и дизайна.
              `}
            />
            <OrganizatorsColumn
              image="src/YUTY_org-logo.png"
              alt="ЮУТУ логотип"
              title="ОУ ВО “Южно-Уральский технологический университет”"
              description={`
Южно-Уральский технологический университет — это не просто учебное заведение, а отправная точка для реализации ваших амбиций, достижения целей и профессионального роста.

Присоединяйтесь к сообществу единомышленников, где каждый студент — это ценность, а каждая идея может изменить мир.

Не упустите шанс стать частью чего-то большего. Поступайте в Южно-Уральский технологический университет и начните своё путешествие, полное новых возможностей и открытий.
              `}
            />
            <OrganizatorsColumn
              image="src/HUSKY_ogr-logo.png"
              alt="Хаски логотип"
              title="ССК “Хаски”"
              description={`
В Образовательном учреждении высшего образования «Южно-Уральский технологический университет» с 2012 года эффективно действует орган студенческого самоуправления — общественное объединение Студенческий спортивный клуб «Хаски» (далее — ССК «Хаски»), который одним из приоритетных направлений определяет формирование у студенческой молодежи Университета ценностного отношения к своему здоровью, внутренней потребности и мотивации личности в здоровом образе жизни; формирование установки на систематические занятия физической культурой и спортом; организацию и проведение физкультурно-спортивных и оздоровительных мероприятий; участие студентов в спортивных соревнованиях различного уровня; профилактику асоциального поведения и др.

В состав ССК «Хаски» входят волейбольный клуб ССК «Хаски», баскетбольный клуб ССК «Хаски», футбольный клуб ССК «Хаски», Клуб болельщиков ССК «Хаски».
              `}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}

function OrganizatorsColumn({ image, alt, title, description }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="organizators__column"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <img className="organizators__image" src={image} alt={alt} />
      <div className="organizators__text-block">
        <h1 className="organizators__title">{title}</h1>
        <p
          className="organizators__description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </motion.div>
  );
}


export default Organizators;
