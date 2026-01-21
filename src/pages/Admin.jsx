import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaEnvelope, FaTrash, FaCheckCircle, FaChartLine, FaLock, FaSignOutAlt } from 'react-icons/fa';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [bookings, setBookings] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('bookings');
    const [error, setError] = useState('');

    const API_BASE = 'http://localhost:5000/api/admin';

    const handleLogin = (e) => {
        e.preventDefault();
        // For simplicity, we check directly. In production, this would be a real session/token.
        if (password === 'admin123') {
            setIsAuthenticated(true);
            setError('');
            sessionStorage.setItem('adminKey', password);
        } else {
            setError('Invalid password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
        sessionStorage.removeItem('adminKey');
    };

    useEffect(() => {
        const savedKey = sessionStorage.getItem('adminKey');
        if (savedKey === 'admin123') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const adminKey = sessionStorage.getItem('adminKey');
            const [bookingsRes, contactsRes] = await Promise.all([
                fetch(`${API_BASE}/bookings`, { headers: { 'password': adminKey } }),
                fetch(`${API_BASE}/contacts`, { headers: { 'password': adminKey } })
            ]);

            const bookingsData = await bookingsRes.json();
            const contactsData = await contactsRes.json();

            if (bookingsData.success) setBookings(bookingsData.data);
            if (contactsData.success) setContacts(contactsData.data);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateBookingStatus = async (id, newStatus) => {
        try {
            const adminKey = sessionStorage.getItem('adminKey');
            const res = await fetch(`${API_BASE}/bookings/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'password': adminKey
                },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await res.json();
            if (data.success) {
                setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
            }
        } catch (err) {
            console.error('Update error:', err);
        }
    };

    const deleteItem = async (type, id) => {
        if (!window.confirm('Are you sure you want to delete this?')) return;
        try {
            const adminKey = sessionStorage.getItem('adminKey');
            const res = await fetch(`${API_BASE}/${type}/${id}`, {
                method: 'DELETE',
                headers: { 'password': adminKey }
            });
            const data = await res.json();
            if (data.success) {
                if (type === 'bookings') {
                    setBookings(bookings.filter(b => b._id !== id));
                } else {
                    setContacts(contacts.filter(c => c._id !== id));
                }
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center section-padding">
                <div className="glass p-10 rounded-2xl max-w-md w-full animate-slide-up">
                    <div className="text-center mb-8">
                        <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaLock className="text-3xl text-primary-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-primary-800 font-display">Admin Login</h2>
                        <p className="text-gray-600">Enter password to access dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <input
                            type="password"
                            placeholder="Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-center text-lg tracking-widest"
                            autoFocus
                        />
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button type="submit" className="btn-primary w-full text-lg">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="section-padding min-h-screen">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <h1 className="text-4xl font-bold text-primary-800 font-display">Business Dashboard</h1>
                    <button onClick={handleLogout} className="btn-outline flex items-center gap-2">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="glass p-6 rounded-2xl flex items-center gap-4">
                        <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
                            <FaCalendarAlt className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Total Bookings</p>
                            <h3 className="text-2xl font-bold">{bookings.length}</h3>
                        </div>
                    </div>
                    <div className="glass p-6 rounded-2xl flex items-center gap-4">
                        <div className="bg-green-100 p-4 rounded-xl text-green-600">
                            <FaEnvelope className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">New Inquiries</p>
                            <h3 className="text-2xl font-bold">{contacts.length}</h3>
                        </div>
                    </div>
                    <div className="glass p-6 rounded-2xl flex items-center gap-4">
                        <div className="bg-purple-100 p-4 rounded-xl text-purple-600">
                            <FaChartLine className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Pending Conversion</p>
                            <h3 className="text-2xl font-bold">
                                {bookings.filter(b => b.status === 'Pending').length}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'bookings' ? 'bg-primary-700 text-white shadow-lg' : 'glass text-gray-700'}`}
                    >
                        Bookings
                    </button>
                    <button
                        onClick={() => setActiveTab('contacts')}
                        className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'contacts' ? 'bg-primary-700 text-white shadow-lg' : 'glass text-gray-700'}`}
                    >
                        Inquiries
                    </button>
                </div>

                {/* Content */}
                <div className="glass rounded-2xl overflow-hidden animate-fade-in">
                    {loading ? (
                        <div className="p-20 text-center">
                            <div className="spinner mx-auto mb-4"></div>
                            <p>Loading your data...</p>
                        </div>
                    ) : activeTab === 'bookings' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-primary-50">
                                    <tr>
                                        <th className="p-4">Customer</th>
                                        <th className="p-4">Service</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map(item => (
                                        <tr key={item._id} className="border-t border-gray-100 hover:bg-white/40 transition-colors">
                                            <td className="p-4">
                                                <p className="font-bold">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.email}</p>
                                                <p className="text-xs text-gray-500">{item.phone}</p>
                                            </td>
                                            <td className="p-4">
                                                <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                    {item.service.replace('-', ' ')}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm font-medium">{item.date || 'TBD'}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    {item.status !== 'Completed' && (
                                                        <button
                                                            onClick={() => updateBookingStatus(item._id, 'Completed')}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                                            title="Mark Completed"
                                                        >
                                                            <FaCheckCircle />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteItem('bookings', item._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                        title="Delete"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {bookings.length === 0 && (
                                        <tr><td colSpan="5" className="p-10 text-center text-gray-500">No bookings found yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-primary-50">
                                    <tr>
                                        <th className="p-4">Sender</th>
                                        <th className="p-4">Subject</th>
                                        <th className="p-4">Message</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map(item => (
                                        <tr key={item._id} className="border-t border-gray-100 hover:bg-white/40 transition-colors">
                                            <td className="p-4">
                                                <p className="font-bold">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.email}</p>
                                            </td>
                                            <td className="p-4 font-bold text-sm">{item.subject}</td>
                                            <td className="p-4">
                                                <p className="text-sm text-gray-600 max-w-md line-clamp-2">{item.message}</p>
                                            </td>
                                            <td className="p-4 text-sm whitespace-nowrap">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">
                                                <button
                                                    onClick={() => deleteItem('contacts', item._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {contacts.length === 0 && (
                                        <tr><td colSpan="5" className="p-10 text-center text-gray-500">No inquiries found yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
