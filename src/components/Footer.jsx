import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLeaf } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About Us' },
        { path: '/products', label: 'Products' },
        { path: '/services', label: 'Services' },
    ];

    const serviceLinks = [
        { path: '/booking', label: 'Book a Service' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/contact', label: 'Contact Us' },
    ];

    return (
        <footer className="bg-gradient-to-br from-secondary-800 to-secondary-900 text-white mt-16">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="bg-primary-600 p-2 rounded-lg">
                                <FaLeaf className="text-white text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-display">Ahlam Jamila</h3>
                                <p className="text-sm text-gray-300">Investment</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Building dreams and growing futures with quality agricultural and construction products and services.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-colors duration-300">
                                <FaFacebook className="text-white" />
                            </a>
                            <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-colors duration-300">
                                <FaTwitter className="text-white" />
                            </a>
                            <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-colors duration-300">
                                <FaInstagram className="text-white" />
                            </a>
                            <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-colors duration-300">
                                <FaLinkedin className="text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 font-display">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-300 hover:text-accent-400 transition-colors duration-300 flex items-center space-x-2"
                                    >
                                        <span className="text-accent-500">›</span>
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 font-display">Our Services</h4>
                        <ul className="space-y-2">
                            {serviceLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-300 hover:text-accent-400 transition-colors duration-300 flex items-center space-x-2"
                                    >
                                        <span className="text-accent-500">›</span>
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 font-display">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3 text-gray-300">
                                <FaMapMarkerAlt className="text-accent-500 mt-1 flex-shrink-0" />
                                <span className="text-sm">123 Business Street, City, Country</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-300">
                                <FaPhone className="text-accent-500 flex-shrink-0" />
                                <a href="tel:+1234567890" className="text-sm hover:text-accent-400 transition-colors">
                                    +123 456 7890
                                </a>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-300">
                                <FaEnvelope className="text-accent-500 flex-shrink-0" />
                                <a href="mailto:info@ahlamjamila.com" className="text-sm hover:text-accent-400 transition-colors">
                                    info@ahlamjamila.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-3 pt-2 text-center">
                    <p className="text-gray-400 text-xs leading-tight">
                        &copy; {currentYear} Ahlam Jamila Investment. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs leading-tight">
                        Designed with ❤️ for excellence
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
