"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import "./news_id.scss";

export default function FullNews() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      try {
        const res = await fetch("/api/getNewsTelegram");
        if (!res.ok) {
          throw new Error("Ошибка при загрузке новостей");
        }
        const data = await res.json();

        const fullNews = data.messages.find((item) => item.id === id);
        setNewsItem(fullNews);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return <h1 className="news__id-metainfo">Загрузка...</h1>;
  }

  if (error) {
    return <p className="news__id-metainfo">Ошибка: {error}</p>;
  }

  if (!newsItem) {
    return <p className="news__id-metainfo">Новость не найдена.</p>;
  }

  const formatText = (text) =>
    text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));

  return (
    <div className="news__full">
      <h1 className="news__id__title">{newsItem.title}</h1>
      <div className="news__card-date">
        {new Date(newsItem.date).toLocaleString()}
      </div>
      <div className="news__id__card">
        {newsItem.photos?.length > 0 && (
          <img
            src={newsItem.photos[0]}
            alt="Главное изображение"
            className="news__id__card-image"
            loading="lazy"
          />
        )}

        <p className="news__paragraph">{formatText(newsItem.text)}</p>
        <div className="news__bottom__block">
          {newsItem.photos?.length > 1 &&
            newsItem.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Photo ${index}`}
                className="news__bottom__block-image"
                loading="lazy"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
