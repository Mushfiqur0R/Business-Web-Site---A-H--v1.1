// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Auth Provider
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages Imports
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import TextilePage from './pages/TextilePage.jsx';
import PackagingPage from './pages/PackagingPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import NewsDetailPage from './pages/NewsDetailPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import PrinterPage from './pages/PrinterPage.jsx'; // NEW
import InkPage from './pages/InkPage.jsx';

// Admin Pages Imports
import LoginPage from './pages/admin/LoginPage.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ManageProducts from './pages/admin/ManageProducts.jsx';
import ProductForm from './pages/admin/ProductForm.jsx';
import ManageNews from './pages/admin/ManageNews.jsx';
import NewsForm from './pages/admin/NewsForm.jsx';
import ManageUsers from './pages/admin/ManageUsers.jsx';
import ManageAbout from './pages/admin/ManageAbout.jsx';
import ManageContact from './pages/admin/ManageContact.jsx';


import './index.css';

const router = createBrowserRouter([
  // --- Public Routes ---
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'textile', element: <TextilePage /> },
      { path: 'packaging', element: <PackagingPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'news/:newsId', element: <NewsDetailPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'products/:productId', element: <ProductDetailPage /> },
      { path: 'textile', element: <TextilePage /> },
      { path: 'packaging', element: <PackagingPage /> },
      { path: 'printer', element: <PrinterPage /> }, // NEW ROUTE
      { path: 'ink', element: <InkPage /> },
      
    ],
  },

  // --- Admin Authentication ---
  {
    path: '/login',
    element: <LoginPage />,
  },

  // --- Protected Admin Dashboard Routes ---
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  // --- Product Management Routes (New) ---
  {
    path: '/admin/products', // ১. সব প্রোডাক্ট দেখার লিস্ট
    element: (
      <ProtectedRoute>
        <ManageProducts />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/products/add', // ২. নতুন প্রোডাক্ট যোগ করার পেজ
    element: (
      <ProtectedRoute>
        <ProductForm />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/products/edit/:id', // ৩. প্রোডাক্ট এডিট করার পেজ (ID সহ)
    element: (
      <ProtectedRoute>
        <ProductForm />
      </ProtectedRoute>
    ),
  },
  // --- News Management Routes ---
  {
    path: '/admin/news',
    element: <ProtectedRoute><ManageNews /></ProtectedRoute>,
  },
  {
    path: '/admin/news/add',
    element: <ProtectedRoute><NewsForm /></ProtectedRoute>,
  },
  {
    path: '/admin/news/edit/:id',
    element: <ProtectedRoute><NewsForm /></ProtectedRoute>,
  },

  // --- User Management Route ---
  {
    path: '/admin/users',
    element: <ProtectedRoute><ManageUsers /></ProtectedRoute>,
  },
  
  { path: '/admin/about', element: <ProtectedRoute><ManageAbout /></ProtectedRoute> },
  
  { path: '/admin/contact', element: <ProtectedRoute><ManageContact /></ProtectedRoute> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* পুরো অ্যাপকে AuthProvider দিয়ে র‍্যাপ করা হলো */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);