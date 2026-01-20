import { useState } from 'react';
import { FaUser, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setToastMessage('Please fill in all fields');
            setToastType('error');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        }

        // Simulate form submission
        console.log('Contact form submitted:', formData);
        setToastMessage('Message sent successfully! We will get back to you soon.');
        setToastType('success');
        setShowToast(true);

        // Reset form
        setFormData({
            name: '',
            email: '',
            message: ''
        });

        setTimeout(() => setShowToast(false), 5000);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="flex items-center space-x-2">
                        <FaUser className="text-primary-600" />
                        <span>Your Name *</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="flex items-center space-x-2">
                        <FaEnvelope className="text-primary-600" />
                        <span>Email Address *</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                    />
                </div>

                {/* Message */}
                <div>
                    <label htmlFor="message" className="flex items-center space-x-2">
                        <FaPaperPlane className="text-primary-600" />
                        <span>Your Message *</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="How can we help you?"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn-primary w-full text-lg flex items-center justify-center space-x-2">
                    <FaPaperPlane />
                    <span>Send Message</span>
                </button>
            </form>

            {/* Toast Notification */}
            {showToast && (
                <div className={`toast ${toastType === 'success' ? 'toast-success' : 'toast-error'}`}>
                    <p className="font-semibold">{toastMessage}</p>
                </div>
            )}
        </>
    );
};

export default ContactForm;
