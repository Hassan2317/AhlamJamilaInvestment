import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaLeaf, FaLock } from 'react-icons/fa';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/products', label: 'Products' },
        { path: '/services', label: 'Services' },
        { path: '/booking', label: 'Booking' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/contact', label: 'Contact' },
        { path: '/admin', label: 'Admin', icon: <FaLock className="w-3 h-3 mb-0.5" /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 glass animate-slide-down">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-primary-700 p-2 rounded-lg group-hover:bg-primary-800 transition-colors duration-300">
                            <FaLeaf className="text-white text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-primary-800 font-display leading-tight">
                                Ahlam Jamila
                            </h1>
                            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-accent-400">
                                Investment
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive(link.path)
                                    ? 'bg-primary-700 text-white shadow-lg'
                                    : 'text-gray-700 hover:bg-primary-100 hover:text-primary-800'
                                    }`}
                            >
                                <span className="flex items-center gap-1.5">
                                    {link.icon && link.icon}
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button - Desktop */}
                    <Link
                        to="/booking"
                        className="hidden lg:block btn-primary"
                    >
                        Book Now
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-primary-800 text-2xl p-2 hover:bg-primary-100 rounded-lg transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 glass-dark rounded-lg p-4 animate-slide-down">
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive(link.path)
                                        ? 'bg-primary-700 text-white'
                                        : 'text-white hover:bg-primary-600'
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        {link.icon && link.icon}
                                        {link.label}
                                    </span>
                                </Link>
                            ))}
                            <Link
                                to="/booking"
                                onClick={() => setIsMenuOpen(false)}
                                className="btn-secondary text-center mt-2"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
