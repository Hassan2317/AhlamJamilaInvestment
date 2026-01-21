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
                            <div className="bg-primary-600 p-2 rounded-lg shadow-lg">
                                <FaLeaf className="text-white text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-display tracking-tight">Ahlam Jamila</h3>
                                <p className="text-xs text-accent-400 font-bold uppercase tracking-widest">Investment</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Building dreams and growing futures with quality agricultural and construction products and services across Malawi.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-all duration-300 hover:-translate-y-1">
                                <FaFacebook className="text-white" />
                            </a>
                            <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-all duration-300 hover:-translate-y-1">
                                <FaTwitter className="text-white" />
                            </a>
                            <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-all duration-300 hover:-translate-y-1">
                                <FaInstagram className="text-white" />
                            </a>
                            <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-all duration-300 hover:-translate-y-1">
                                <FaLinkedin className="text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 font-display border-b border-primary-500/30 pb-2 inline-block">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-accent-400 transition-colors duration-300 flex items-center space-x-2 group"
                                    >
                                        <span className="text-primary-500 group-hover:translate-x-1 transition-transform">›</span>
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 font-display border-b border-primary-500/30 pb-2 inline-block">Our Services</h4>
                        <ul className="space-y-3">
                            {serviceLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-accent-400 transition-colors duration-300 flex items-center space-x-2 group"
                                    >
                                        <span className="text-primary-500 group-hover:translate-x-1 transition-transform">›</span>
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 font-display border-b border-primary-500/30 pb-2 inline-block">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-gray-400">
                                <FaMapMarkerAlt className="text-accent-500 mt-1 flex-shrink-0" />
                                <span className="text-sm">Zomba, Malawi</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <FaPhone className="text-accent-500 flex-shrink-0" />
                                <a href="tel:+265882770373" className="text-sm hover:text-accent-400 transition-colors">
                                    +265 882 770 373
                                </a>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <FaEnvelope className="text-accent-500 flex-shrink-0" />
                                <a href="mailto:zaminhassan2317@gmail.com" className="text-sm hover:text-accent-400 transition-colors break-all">
                                    zaminhassan2317@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 mt-12 pt-6 text-center">
                    <p className="text-gray-500 text-xs">
                        &copy; {currentYear} Ahlam Jamila Investment. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-[10px] mt-1 font-bold uppercase tracking-widest">
                        Excellence in Construction & Agriculture
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
