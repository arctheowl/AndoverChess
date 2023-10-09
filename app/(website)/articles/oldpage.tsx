import React from "react";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  content: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "First Article",
    content: "This is the content of the first article",
  },
  {
    id: 2,
    title: "Second Article",
    content: "This is the content of the second article",
  },
  {
    id: 3,
    title: "Third Article",
    content: "This is the content of the third article",
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="bg-slate-200 text-black text-lg text-center pt-24 h-screen lg:overflow-hidden">
      <h1>Recent Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={""}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
