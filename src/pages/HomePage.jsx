// src/pages/HomePage.jsx

// Step 1: Import all necessary components
import Hero from '../components/Hero';
import ProductPreview from '../components/ProductPreview';
import NewsSection from '../components/NewsSection'; // Ensure this line exists
import ContactForm from '../components/ContactForm';
import { allProducts } from '../data/productsData';

const HomePage = () => {
  // Filter products for preview sections
  const textileProducts = allProducts.filter(p => p.category === 'Textile').slice(0, 3);
  const printerProducts = allProducts.filter(p => p.category === 'Printer').slice(0, 3);
  const inkProducts = allProducts.filter(p => p.category === 'Ink').slice(0, 2);

  return (
    <>
      <Hero />
      <div className="bg-gray-50">
        <ProductPreview category="Textile" products={textileProducts} />
        <ProductPreview category="Printer" products={printerProducts} />
        <ProductPreview category="Ink" products={inkProducts} />
      </div>
      
      {/* Step 2: Ensure the NewsSection component is rendered here */}
      <NewsSection />
      <ContactForm />
      
    </>
  );
};

export default HomePage;