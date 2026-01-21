import { useState, useEffect } from 'react';
import BookingForm from '../components/BookingForm';
import { FaCheckCircle, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Booking = () => {
    const [dbServices, setDbServices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/services')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data.length > 0) {
                    setDbServices(data.data.map(s => s.title));
                }
            })
            .catch(err => console.error('Error fetching services for booking page:', err));
    }, []);

    const benefits = [
        'Free initial consultation',
        'Detailed project quotation',
        'Flexible scheduling',
        'Quality guarantee',
        'Professional team',
        'Timely completion'
    ];

    return (
        <div className="section-padding text-reveal">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-primary-800 mb-4 font-display">Book a Service</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ready to start your project? Fill out the form below and our team will contact you
                        within 24 hours to discuss your requirements and provide a detailed quotation.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Booking Form */}
                    <div className="lg:col-span-2">
                        <BookingForm />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Benefits */}
                        <div className="glass rounded-xl p-6">
                            <h3 className="text-xl font-bold text-primary-800 mb-4 font-display">
                                Why Book With Us?
                            </h3>
                            <ul className="space-y-3">
                                {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center space-x-3 text-gray-700">
                                        <FaCheckCircle className="text-primary-600 flex-shrink-0" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="glass-dark rounded-xl p-6 text-white border-l-4 border-accent-400">
                            <h3 className="text-xl font-bold mb-4 font-display">Need Help?</h3>
                            <p className="text-gray-200 mb-6 text-sm">
                                Have questions about our services? Our team is here to help!
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FaPhone className="text-accent-400" />
                                    <a href="tel:+265882770373" className="hover:text-accent-400 transition-colors">+265 882 770 373</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaEnvelope className="text-accent-400" />
                                    <a href="mailto:zaminhassan2317@gmail.com" className="hover:text-accent-400 transition-colors break-all text-xs">zaminhassan2317@gmail.com</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaClock className="text-accent-400" />
                                    <span>Mon-Sat: 8AM - 6PM</span>
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Services List */}
                        <div className="glass rounded-xl p-6">
                            <h3 className="text-xl font-bold text-primary-800 mb-4 font-display">
                                Available Services
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                {dbServices.length > 0 ? (
                                    dbServices.map((s, idx) => <li key={idx} className="font-bold">• {s}</li>)
                                ) : (
                                    <>
                                        <li>• Bridge Construction</li>
                                        <li>• House Construction</li>
                                        <li>• Culvert Systems</li>
                                        <li>• Landscaping Design</li>
                                    </>
                                )}
                                <li>• Custom Projects</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
