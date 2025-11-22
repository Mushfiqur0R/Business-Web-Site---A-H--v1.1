// src/components/ProductPreview.jsx
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductPreview = ({ category, products }) => {
  return (
  <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{category}</h2>
        <Link to={`/${category.toLowerCase()}`} className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors">
          Learn More →
        </Link>
      </div>
      
      {/* --- Using a Custom CSS Class for the Grid --- */}
      <div className="product-grid"> {/* Step 1: Add custom class here */}
        {products.map(product => (
          <div className="product-grid-item" key={product.id}> {/* Step 2: Add custom class here */}
            <Link to={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <ProductCard product={product} />
            </Link>
          </div>
        ))}
      </div>

    </div>
  </section>
);
};

export default ProductPreview;