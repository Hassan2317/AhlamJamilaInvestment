import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            type: 'video',
            video: 'https://www.pexels.com/download/video/26707469/',
            title: 'Welcome to Ahlam Jamila Inv.',
            subtitle: 'Your partner in Construction, Agriculture and Landscaping',
            buttons: [
                { text: 'Products', link: '/products', color: 'bg-green-600 hover:bg-green-700' },
                { text: 'Services', link: '/services', color: 'bg-green-600 hover:bg-green-700' },
                { text: 'Gallery', link: '/gallery', color: 'bg-green-600 hover:bg-green-700' }
            ]
        },
        /*
        {
            type: 'image',
            image: 'https://images.pexels.com/photos/7174/summer-grass.jpg',
            title: 'Building Dreams, Growing Futures',
            subtitle: 'Quality agricultural and construction solutions',
            cta: 'Explore Products',
            link: '/products'
        },
        {
            type: 'image',
            image: 'https://images.pexels.com/photos/11573787/pexels-photo-11573787.jpeg',
            title: 'Premium Trees & Plants',
            subtitle: 'Orchard trees, natural trees, and beautiful flowers',
            cta: 'View Products',
            link: '/products'
        },
        {
            type: 'image',
            image: 'https://images.pexels.com/photos/19688828/pexels-photo-19688828.jpeg',
            title: 'Professional Construction Services',
            subtitle: 'Bridges, houses, and culvert systems',
            cta: 'Our Services',
            link: '/services'
        },
        {
            type: 'image',
            image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200',
            title: 'Transform Your Outdoor Space',
            subtitle: 'Expert landscaping and garden design',
            cta: 'Book Now',
            link: '/booking'
        }
        */
    ];

    useEffect(() => {
        if (slides.length <= 1) return; // Don't cycle if only one slide
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        if (slides.length <= 1) return;
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        if (slides.length <= 1) return;
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-2xl mx-4 mt-4">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {slide.type === 'video' ? (
                        <div className="w-full h-full relative">
                            {/* Fallback image or blank background while loading can be added here if needed */}
                            <video
                                src={slide.video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                                onTimeUpdate={(e) => {
                                    if (e.target.currentTime >= 5) {
                                        e.target.currentTime = 0;
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                        <div className="max-w-4xl animate-fade-in">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-display drop-shadow-lg">
                                {slide.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-md">
                                {slide.subtitle}
                            </p>

                            {slide.buttons ? (
                                <div className="flex flex-wrap justify-center gap-4">
                                    {slide.buttons.map((btn, i) => (
                                        <Link
                                            key={i}
                                            to={btn.link}
                                            className={`inline-block ${btn.color} text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl`}
                                        >
                                            {btn.text}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <Link
                                    to={slide.link}
                                    className="inline-block bg-accent-700 hover:bg-accent-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                                >
                                    {slide.cta}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
                aria-label="Previous slide"
            >
                <FaChevronLeft className="text-2xl" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
                aria-label="Next slide"
            >
                <FaChevronRight className="text-2xl" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroBanner;
