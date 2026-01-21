import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaClipboardList } from 'react-icons/fa';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        serviceType: '',
        preferredDate: '',
        description: ''
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [isLoading, setIsLoading] = useState(false);
    const [services, setServices] = useState([]);

    useState(() => {
        fetch('http://localhost:5000/api/services')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data.length > 0) {
                    setServices(data.data.map(s => s.title));
                }
            })
            .catch(err => console.error('Error fetching services for booking:', err));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.fullName || !formData.email || !formData.phone || !formData.serviceType) {
            setToastMessage('Please fill in all required fields');
            setToastType('error');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    service: formData.serviceType,
                    date: formData.preferredDate,
                    details: formData.description
                }),
            });

            const data = await response.json();

            if (data.success) {
                setToastMessage(data.message);
                setToastType('success');
                // Reset form
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    serviceType: '',
                    preferredDate: '',
                    description: ''
                });
            } else {
                setToastMessage(data.message || 'Failed to submit booking request.');
                setToastType('error');
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            setToastMessage('Something went wrong. Please try again later.');
            setToastType('error');
        } finally {
            setIsLoading(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
                {/* Full Name */}
                <div>
                    <label htmlFor="fullName" className="flex items-center space-x-2">
                        <FaUser className="text-primary-600" />
                        <span>Full Name *</span>
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
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

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="flex items-center space-x-2">
                        <FaPhone className="text-primary-600" />
                        <span>Phone Number *</span>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+123 456 7890"
                        required
                    />
                </div>

                {/* Service Type */}
                <div>
                    <label htmlFor="serviceType" className="flex items-center space-x-2">
                        <FaClipboardList className="text-primary-600" />
                        <span>Service Type *</span>
                    </label>
                    <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a service</option>
                        {services.length > 0 ? (
                            services.map((s, idx) => (
                                <option key={idx} value={s.toLowerCase().replace(/\s+/g, '-')}>{s}</option>
                            ))
                        ) : (
                            <>
                                <option value="bridge-construction">Bridge Construction</option>
                                <option value="house-construction">Culvert & House Construction</option>
                                <option value="landscaping">Landscaping & Garden Design</option>
                            </>
                        )}
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Preferred Date */}
                <div>
                    <label htmlFor="preferredDate" className="flex items-center space-x-2">
                        <FaCalendar className="text-primary-600" />
                        <span>Preferred Start Date</span>
                    </label>
                    <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description">
                        Project Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Tell us about your project requirements..."
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn-primary w-full text-lg disabled:opacity-50 flex items-center justify-center space-x-2"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="spinner-small"></div>
                    ) : (
                        'Submit Booking Request'
                    )}
                </button>
            </form>

            {/* Toast Notification */}
            {showToast && (
                <div className={`toast ${toastType === 'success' ? 'toast-success' : 'toast-error'}`}>
                    <p className="font-semibold">{toastMessage}</p>
                </div>
            )}
        </div>
    );
};

export default BookingForm;
