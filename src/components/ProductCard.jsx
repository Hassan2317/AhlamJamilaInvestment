import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { optimizeImage } from '../utils/imageOptimizer';

const ProductCard = ({ product }) => {
    return (
        <div className="glass rounded-xl overflow-hidden card-hover group">
            {/* Image */}
            <div className="relative h-64 overflow-hidden image-overlay">
                <img
                    src={optimizeImage(product.image, { width: 600 })}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300/4CAF50/ffffff?text=' + encodeURIComponent(product.name);
                    }}
                />
                <div className="absolute top-4 right-4 bg-accent-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-2xl font-bold text-primary-800 mb-3 font-display">
                    {product.name}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-3">
                    {product.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                    {product.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <FaCheckCircle className="text-primary-600 flex-shrink-0" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <Link
                    to="/contact"
                    className="block text-center btn-outline w-full"
                >
                    Request Quote
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
