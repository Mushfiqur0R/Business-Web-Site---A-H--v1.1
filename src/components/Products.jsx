import { products } from '../data/productsData';
import ProductCard from './ProductCard';

const Products = () => {
  return (
    <section id="products" className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Our Flagship Products
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the technology that is shaping the future of digital printing.
          </p>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Loop through the products data and render a ProductCard for each one */}
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Products;