"use client";

import "./News.scss";

// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";

// export const News = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   return (
//     <div className="news">
//       {/* <div className="container">
//           <motion.h1
//             className="news__title"
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             ПОСЛЕДНИЕ НОВОСТИ
//           </motion.h1>
//           <motion.div
//             ref={ref}
//             className="news__row"
//             initial="hidden"
//             animate={isInView ? 'visible' : 'hidden'}
//             variants={{
//               hidden: { opacity: 0 },
//               visible: {
//                 opacity: 1,
//                 transition: { staggerChildren: 0.2 },
//               },
//             }}
//           >
//             {newsData.map((news, index) => (
//               <NewsCard key={index} {...news} />
//             ))}
//           </motion.div>
//         </div> */}
//       <iframe
//         src="https://t.me/+1Z9JQmLU8DswN2Ji"
//         width="100%"
//         height="500"
//         frameBorder="0"
//         scrolling="no"
//       ></iframe>
//     </div>
//   );
// };

// function NewsCard({ title, image, buttonText, buttonIcon }) {
//   return (
//     <motion.div
//       className="news__column"
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h2 className="news__card-title">{title}</h2>
//       <img src={image} alt="" className="news__card-preview" />
//       <button className="news__card-button">
//         {buttonText}
//         <img src={buttonIcon} alt="" className="news__card-button-arrow" />
//       </button>
//     </motion.div>
//   );
// }

// const newsData = [
//   {
//     title: "Турнир по FIFA",
//     image: "src/newspreview1.png",
//     buttonText: "Принять участие",
//     buttonIcon: "src/arrowButton.svg",
//   },
//   {
//     title: "Участники предыдущего турнира",
//     image: "src/newspreview2.png",
//     buttonText: "Узнать больше",
//     buttonIcon: "src/arrowButton.svg",
//   },
//   {
//     title: "Участники предыдущего турнира",
//     image: "src/newspreview2.png",
//     buttonText: "Узнать больше",
//     buttonIcon: "src/arrowButton.svg",
//   },
//   {
//     title: "Участники предыдущего турнира",
//     image: "src/newspreview2.png",
//     buttonText: "Узнать больше",
//     buttonIcon: "src/arrowButton.svg",
//   },
// ];

// import { useEffect, useState } from 'react';

// export const News = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await fetch('/api/getNewsTelegram');
//         const data = await res.json();
//         console.log(data)
//         setNews(data);
//       } catch (error) {
//         console.error('Ошибка загрузки новостей:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   if (loading) {
//     return <p>Загрузка новостей...</p>;
//   }

//   return (
//     <div>
//       <h2>Новости</h2>
//       {news.length === 0 ? (
//         <p>Нет новостей</p>
//       ) : (
//         <ul>
//           {news.map((item, index) => (
//             <li key={index}>
//               <p>{item.text}</p>
//               <small>{item.date}</small>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };



// components/News.js
import { useEffect, useState } from 'react';

export const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const TELEGRAM_BOT_TOKEN = '8128306533:AAEEsGMREiC6TmlV7MTtBUd_YEgIs_VZcDw';

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/getNewsTelegram');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Received data:', data);
        
        if (data.error) {
          throw new Error(data.error);
        }
        

        const sortedMessages = data.messages.sort((a, b) => 
          b.channel_post.date - a.channel_post.date
        );
        
        setNews(sortedMessages);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="news">
      <h1 className="news__title">Новости</h1>
      {!news || news.length === 0 ? (
        <p>Нет доступных новостей</p>
      ) : (
        <div className="news__list">
          {news.map((item, index) => (
            <div key={item.update_id} className="news__item">
              {item.channel_post && (
                <div className="news__content">
                  {item.channel_post.photo && item.photo_path && (
                    <img
                      src={`https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${item.photo_path}`}
                      alt="Post Image"
                      className="news__image"
                    />
                  )}
                  
                  {item.channel_post.caption && (
                    <>
                      <h2 className="news__item-title">
                        {item.channel_post.caption.split('\n')[0]}
                      </h2>
                      <p className="news__item-text">
                        {item.channel_post.caption.split('\n').slice(1).join('\n')}
                      </p>
                    </>
                  )}
                  
                  {item.channel_post.text && !item.channel_post.caption && (
                    <>
                      <h2 className="news__item-title">
                        {item.channel_post.text.split('\n')[0]}
                      </h2>
                      <p className="news__item-text">
                        {item.channel_post.text.split('\n').slice(1).join('\n')}
                      </p>
                    </>
                  )}
                  
                  <small className="news__item-date">
                    {new Date(item.channel_post.date * 1000).toLocaleString()}
                  </small>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
