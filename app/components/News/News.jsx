"use client";

import "./News.scss";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/getNewsTelegram");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setNews(data.messages);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading)
    return (
      <motion.h1
        className="news__metainfo"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        Загрузка...
      </motion.h1>
    );

  if (error)
    return (
      <motion.h1
        className="news__metainfo"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        Ошибка: {error}
      </motion.h1>
    );

  return (
    <div className="news">
      <div className="container">
        <motion.h1
          className="news__title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {" "}
          ПОСЛЕДНИЕ НОВОСТИ{" "}
        </motion.h1>
        <div className="news__row">
          {news.map((post) => (
            <div key={post.id} className="news__column">
              {post.photos?.length > 0 && (
                <div className="grid gap-2 mb-4">
                  {post.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index}`}
                      className="news__card-image"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}

              <div className="news__card__text-block">
                <p className="news__card-paragraph">{post.text}</p>
                <div className="news__card-date">
                  {new Date(post.date).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
