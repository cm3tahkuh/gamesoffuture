"use client";

import "./News.scss";

import { useEffect, useState } from "react";
import Link from "next/link";
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
          throw new Error("Что-то пошло не так 🙄");
        }
        const data = await response.json();

        setNews(data.messages);
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
          ПОСЛЕДНИЕ НОВОСТИ
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="news__row"
        >
          {news.map((post) => (
            <article key={post.id} className="news__card">
              <img src={post.photos[0]} alt="Превью" loading="lazy" />
              <div className="news__card__content">
                <h2 className="news__card__heading">{post.title}</h2>
                <Link className="news__card__link" href={`/news/${post.id}`}>
                  Подробнее...
                </Link>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
