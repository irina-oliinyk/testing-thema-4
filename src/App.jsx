import { useState, useEffect } from "react";
import axios from "axios";
import ArticleList from "./components/ArticleList/ArticleList";
import { fetchArticlesWithTopic } from "./articles-api";
import SearchForm from "./components/SearchForm/SearchForm";

import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        // 1. Встановлюємо індикатор в true перед запитом
        setLoading(true);
        // 2. Використовуємо HTTP-функцію
        const data = await fetchArticlesWithTopic("react");
        setArticles(data);
      } catch (error) {
        // Тут будемо обробляти помилку
        setError(true);
      } finally {
        // 2. Встановлюємо індикатор в false після запиту
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const handleSearch = (topic) => {
    // ...
    console.log(topic);
  };

  return (
    <div>
      <h1>Latest articles</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Loading data, please wait...</p>}
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
}

export default App;
