// src/pages/NewsDetailPage.jsx
import { useParams, Link } from 'react-router-dom';
import { newsItems } from '../data/newsData';

const NewsDetailPage = () => {
  const { newsId } = useParams();
  const newsItem = newsItems.find(item => item.id === parseInt(newsId));

  if (!newsItem) {
    return <div className="text-center py-40"><h2>News not found!</h2></div>;
  }

  return (
    <div className="pt-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-gray-500 text-sm">Created on: {newsItem.date}</p>
        <h1 className="text-4xl md:text-5xl font-bold my-4">{newsItem.title}</h1>
        {newsItem.imageUrl && <img src={newsItem.imageUrl} alt={newsItem.title} className="w-full rounded-lg my-8" />}
        <div className="prose lg:prose-xl max-w-none">
          <p>{newsItem.summary}</p>
          {/* Add more detailed content here */}
        </div>
        <Link to="/" className="text-blue-600 hover:underline mt-12 inline-block">← Back to Home</Link>
      </div>
    </div>
  );
};

export default NewsDetailPage;