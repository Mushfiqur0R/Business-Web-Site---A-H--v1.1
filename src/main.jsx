import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import TextilePage from './pages/TextilePage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx'; // Re-enable this import
import './index.css';
import NewsDetailPage from './pages/NewsDetailPage.jsx';

import AboutPage from './pages/AboutPage.jsx';
import PackagingPage from './pages/PackagingPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NewsPage from './pages/NewsPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'textile',
        element: <TextilePage />,
      },
      {
        path: 'packaging',
        element: <PackagingPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetailPage />,
      },
      {
        path: 'news', // --- NEW ROUTE for View All News ---
        element: <NewsPage />,
      },
      {
        path: 'news/:newsId',
        element: <NewsDetailPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);