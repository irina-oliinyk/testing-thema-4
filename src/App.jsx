import { useState, useEffect } from "react";
import axios from "axios";
import ArticleList from "./components/ArticleList/ArticleList";

import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        // 1. Встановлюємо індикатор в true перед запитом
        setLoading(true);
        const response = await axios.get(
          "https://hn.algolia.com/api/v1/search?query=react"
        );
        setArticles(response.data.hits);
      } catch (error) {
        // Тут будемо обробляти помилку
      } finally {
        // 2. Встановлюємо індикатор в false після запиту
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Latest articles</h1>
      {loading && <p>Loading data, please wait...</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
}

export default App;
