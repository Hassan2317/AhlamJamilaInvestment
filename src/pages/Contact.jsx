import ContactForm from '../components/ContactForm';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="section-padding">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-primary-800 mb-4 font-display">Contact Us</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Have questions or need assistance? We'd love to hear from you.
                        Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div>
                        <ContactForm />
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        {/* Contact Details */}
                        <div className="glass rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-primary-800 mb-6 font-display">
                                Get in Touch
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-100 p-3 rounded-lg">
                                        <FaMapMarkerAlt className="text-primary-700 text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                                        <p className="text-gray-600">Nkhotakota, near Taba Masjid</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-100 p-3 rounded-lg">
                                        <FaPhone className="text-primary-700 text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                                        <p className="text-gray-600">0999007432</p>
                                        <p className="text-gray-600">0990119138</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-100 p-3 rounded-lg">
                                        <FaEnvelope className="text-primary-700 text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                                        <p className="text-gray-600">ahlamjamilainvestiment@gmail.com</p>
                                        <p className="text-gray-600">phwataabdul@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-100 p-3 rounded-lg">
                                        <FaClock className="text-primary-700 text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Business Hours</h4>
                                        <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                                        <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                                        <p className="text-gray-600">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="glass rounded-xl overflow-hidden h-64">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15485.457878347466!2d34.2961!3d-12.9234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1901a61c2a1c6a2b%3A0x6b7b6b6b6b6b6b6b!2sNkhotakota!5e0!3m2!1sen!2smw!4v1768990086621!5m2!1sen!2smw"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Company Location"
                            ></iframe>
                        </div>

                        {/* Quick Links */}
                        <div className="glass-dark rounded-xl p-6 text-white">
                            <h3 className="text-xl font-bold mb-4 font-display">Quick Links</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <a href="/products" className="hover:text-accent-400 transition-colors">
                                    → Products
                                </a>
                                <a href="/services" className="hover:text-accent-400 transition-colors">
                                    → Services
                                </a>
                                <a href="/booking" className="hover:text-accent-400 transition-colors">
                                    → Book Now
                                </a>
                                <a href="/gallery" className="hover:text-accent-400 transition-colors">
                                    → Gallery
                                </a>
                                <a href="/about" className="hover:text-accent-400 transition-colors">
                                    → About Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
