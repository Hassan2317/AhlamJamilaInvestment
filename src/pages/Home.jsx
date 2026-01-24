import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import AnimatedCounter from '../components/AnimatedCounter';
import { FaTree, FaHammer, FaSeedling, FaArrowRight, FaCheckCircle, FaImages } from 'react-icons/fa';
import { API_BASE } from '../config';
import { optimizeImage } from '../utils/imageOptimizer';

const Home = () => {
    const [recentProjects, setRecentProjects] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE}/gallery`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setRecentProjects(data.data.slice(0, 3));
                }
            })
            .catch(err => console.error('Error fetching recent projects:', err));
    }, []);

    const features = [
        {
            icon: <FaTree className="text-4xl text-primary-600" />,
            title: 'Quality Products',
            description: 'Premium trees, plants, and construction materials'
        },
        {
            icon: <FaHammer className="text-4xl text-secondary-600" />,
            title: 'Expert Services',
            description: 'Professional construction and landscaping solutions'
        },
        {
            icon: <FaSeedling className="text-4xl text-accent-700" />,
            title: 'Sustainable Growth',
            description: 'Environmentally conscious practices and materials'
        }
    ];

    const stats = [
        { number: 500, label: 'Projects Completed', suffix: '+' },
        { number: 1000, label: 'Happy Clients', suffix: '+' },
        { number: 15, label: 'Years Experience', suffix: '+' },
        { number: 50, label: 'Expert Team', suffix: '+' }
    ];

    return (
        <div>
            {/* Hero Banner */}
            <HeroBanner />

            {/* Quick Links Section */}
            <section className="section-padding reveal">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link to="/products" className="glass rounded-xl p-8 card-hover group text-center">
                            <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                                <FaTree className="text-4xl text-primary-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary-800 mb-2 font-display">Products</h3>
                            <p className="text-gray-600 mb-4">Explore our range of quality products</p>
                            <span className="text-primary-700 font-semibold flex items-center justify-center space-x-2">
                                <span>View Products</span>
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </Link>

                        <Link to="/services" className="glass rounded-xl p-8 card-hover group text-center">
                            <div className="bg-secondary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 transition-colors duration-300">
                                <FaHammer className="text-4xl text-secondary-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary-800 mb-2 font-display">Services</h3>
                            <p className="text-gray-600 mb-4">Professional construction & landscaping</p>
                            <span className="text-primary-700 font-semibold flex items-center justify-center space-x-2">
                                <span>Our Services</span>
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </Link>

                        <Link to="/gallery" className="glass rounded-xl p-8 card-hover group text-center">
                            <div className="bg-accent-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-200 transition-colors duration-300">
                                <FaSeedling className="text-4xl text-accent-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary-800 mb-2 font-display">Gallery</h3>
                            <p className="text-gray-600 mb-4">View our completed projects</p>
                            <span className="text-primary-700 font-semibold flex items-center justify-center space-x-2">
                                <span>View Gallery</span>
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="section-padding bg-white/30 reveal">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-primary-800 mb-4 font-display">About Ahlam Jamila Investment</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We are a diversified company specializing in high-quality agricultural and construction products and services.
                            With over 15 years of experience, we supply premium orchard trees, natural trees, cement blocks, culvert rings,
                            and beautiful flowers. Our expert team also provides professional construction and landscaping services including
                            building bridges, culverts, houses, and designing stunning outdoor spaces.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="glass rounded-xl p-6 text-center animate-slide-up">
                                <div className="mb-4 flex justify-center">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-primary-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="pt-16 pb-8 reveal">
                <div className="container mx-auto">
                    <div className="glass-dark rounded-2xl p-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {stats.map((stat, index) => (
                                <div key={index} className="animate-scale-in">
                                    <div className="text-4xl md:text-5xl font-bold text-accent-400 mb-2 font-display">
                                        <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-white text-sm md:text-base">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="pt-2 pb-16">
                <div className="container mx-auto">
                    <div className="glass rounded-2xl p-12 text-center">
                        <h2 className="text-primary-800 mb-4 font-display">Ready to Start Your Project?</h2>
                        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                            Let us help you bring your vision to life. Whether you need quality products or professional services,
                            we're here to deliver excellence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/booking" className="btn-primary">
                                Book a Service
                            </Link>
                            <Link to="/contact" className="btn-outline">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
