import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { optimizeImage } from '../utils/imageOptimizer';

const ServiceCard = ({ service }) => {
    return (
        <div className="glass rounded-xl overflow-hidden card-hover group">
            {/* Image */}
            <div className="relative h-72 overflow-hidden image-overlay">
                <img
                    src={optimizeImage(service.image, { width: 800 }) || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80'}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
                <div className="absolute top-4 left-4 text-6xl opacity-80">
                    {service.icon}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-2xl font-bold text-primary-800 mb-3 font-display">
                    {service.name}
                </h3>
                <p className="text-gray-700 mb-4">
                    {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                    {service.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                            <FaCheckCircle className="text-primary-600 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <Link
                    to="/booking"
                    className="flex items-center justify-center space-x-2 btn-primary w-full group"
                >
                    <span>Book This Service</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>
        </div>
    );
};

export default ServiceCard;
