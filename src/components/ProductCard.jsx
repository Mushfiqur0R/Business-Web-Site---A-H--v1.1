// src/components/ProductCard.jsx

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="group relative h-[28rem] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out">
      {/* 1. Background Image Layer */}
      <div 
        style={{ backgroundImage: `url(${product.backgroundUrl})` }}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
      ></div>
      
      {/* 2. Gradient Overlay Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/30"></div>
      
      {/* 3. Content Layer */}
      <div className="relative h-full flex flex-col items-center justify-between p-8 text-center text-gray-800">
        
        {/* Top text (Category) */}
        <div className="w-full transition-opacity duration-300 group-hover:opacity-0">
          <p className="text-sm font-medium text-gray-600">{product.category}</p>
        </div>

        {/* Product Image - Increased size */}
        <div className="relative w-full flex-grow flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            // Increased the height of the image for better visibility
            className="h-56 md:h-64 w-auto object-contain"
          />
        </div>

        {/* Bottom Text (Product Name & Learn More) */}
        <div className="w-full transition-transform duration-500 group-hover:translate-y-4">
          <h3 className="text-3xl font-semibold mb-2">{product.name}</h3>
          <div className="flex items-center justify-center text-md font-medium text-gray-600 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            Learn More
            <span className="ml-2">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;