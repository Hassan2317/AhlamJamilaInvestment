import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaEnvelope, FaTrash, FaCheckCircle, FaChartLine, FaLock, FaSignOutAlt, FaPlus, FaBox, FaImages, FaSeedling, FaHammer, FaCopy } from 'react-icons/fa';
import { products as staticProducts } from '../data/products';
import { galleryImages as staticGallery } from '../data/gallery';
import { services as staticServices } from '../data/services';
import { API_BASE, ADMIN_API } from '../config';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [bookings, setBookings] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [products, setProducts] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('bookings');
    const [error, setError] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({});

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'Yatim2317') {
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
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const adminKey = sessionStorage.getItem('adminKey');
            const [bookingsRes, contactsRes, productsRes, galleryRes, servicesRes] = await Promise.all([
                fetch(`${ADMIN_API}/bookings`, { headers: { 'password': adminKey } }),
                fetch(`${ADMIN_API}/contacts`, { headers: { 'password': adminKey } }),
                fetch(`${API_BASE}/products`),
                fetch(`${API_BASE}/gallery`),
                fetch(`${API_BASE}/services`)
            ]);

            const bJson = await bookingsRes.json();
            const cJson = await contactsRes.json();
            const pJson = await productsRes.json();
            const gJson = await galleryRes.json();
            const sJson = await servicesRes.json();

            if (bJson.success) setBookings(bJson.data);
            if (cJson.success) setContacts(cJson.data);
            if (pJson.success) setProducts(pJson.data);
            if (gJson.success) setGallery(gJson.data);
            if (sJson.success) setServices(sJson.data);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSeed = async () => {
        if (!window.confirm('This will replace current database content with static data. Proceed?')) return;
        try {
            const adminKey = sessionStorage.getItem('adminKey');
            const res = await fetch(`${ADMIN_API}/seed`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'password': adminKey
                },
                body: JSON.stringify({
                    products: staticProducts.map(({ id, ...rest }) => rest),
                    gallery: staticGallery.map(({ id, ...rest }) => rest),
                    services: staticServices.map(({ id, name, ...rest }) => ({ title: name, ...rest }))
                })
            });
            const data = await res.json();
            if (data.success) {
                alert('Database seeded successfully!');
                fetchData();
            }
        } catch (err) {
            console.error('Seed error:', err);
        }
    };

    const handleSubmitCMS = async (e) => {
        e.preventDefault();
        const adminKey = sessionStorage.getItem('adminKey');
        const endpoint = activeTab;

        try {
            const res = await fetch(`${ADMIN_API}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'password': adminKey
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                if (activeTab === 'products') setProducts([data.data, ...products]);
                else if (activeTab === 'gallery') setGallery([data.data, ...gallery]);
                else if (activeTab === 'services') setServices([data.data, ...services]);
                setShowForm(false);
                setFormData({});
            }
        } catch (err) {
            console.error('Submit error:', err);
        }
    };

    const deleteItem = async (type, id) => {
        if (!window.confirm('Are you sure you want to delete this?')) return;
        try {
            const adminKey = sessionStorage.getItem('adminKey');
            const res = await fetch(`${ADMIN_API}/${type}/${id}`, {
                method: 'DELETE',
                headers: { 'password': adminKey }
            });
            const data = await res.json();
            if (data.success) {
                if (type === 'bookings') setBookings(bookings.filter(b => b._id !== id));
                else if (type === 'contacts') setContacts(contacts.filter(c => c._id !== id));
                else if (type === 'products') setProducts(products.filter(p => p._id !== id));
                else if (type === 'gallery') setGallery(gallery.filter(g => g._id !== id));
                else if (type === 'services') setServices(services.filter(s => s._id !== id));
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const updateBookingStatus = async (id, newStatus) => {
        try {
            const adminKey = sessionStorage.getItem('adminKey');
            const res = await fetch(`${ADMIN_API}/bookings/${id}`, {
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
                    <h1 className="text-4xl font-bold text-primary-800 font-display">Admin CMS</h1>
                    <div className="flex gap-4">
                        <button onClick={handleSeed} className="btn-outline flex items-center gap-2 text-xs py-2">
                            <FaSeedling /> Force Master Sync
                        </button>
                        <button onClick={handleLogout} className="btn-outline flex items-center gap-2 text-xs py-2 border-red-200 text-red-600 hover:bg-red-50">
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>

                {/* Updated Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
                    <StatCard icon={<FaCalendarAlt />} label="Bookings" val={bookings.length} color="blue" />
                    <StatCard icon={<FaEnvelope />} label="Inquiries" val={contacts.length} color="green" />
                    <StatCard icon={<FaBox />} label="Products" val={products.length} color="orange" />
                    <StatCard icon={<FaImages />} label="Gallery" val={gallery.length} color="purple" />
                    <StatCard icon={<FaHammer />} label="Services" val={services.length} color="pink" />
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 bg-white/20 p-2 rounded-2xl backdrop-blur-sm">
                    {['bookings', 'contacts', 'products', 'gallery', 'services', 'media'].map(t => (
                        <button
                            key={t}
                            onClick={() => { setActiveTab(t); setShowForm(false); }}
                            className={`px-6 py-2 rounded-xl font-bold transition-all capitalize ${activeTab === t ? 'bg-primary-700 text-white shadow-lg' : 'hover:bg-white/40 text-gray-700'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Content Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-primary-800 capitalize">{activeTab} List</h2>
                    {(activeTab !== 'bookings' && activeTab !== 'contacts' && activeTab !== 'media') && (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="btn-primary flex items-center gap-2 py-2 px-4 text-sm"
                        >
                            <FaPlus /> Add New {activeTab.slice(0, -1)}
                        </button>
                    )}
                </div>

                {/* Dynamic Form */}
                {showForm && (
                    <div className="glass p-8 rounded-2xl mb-8 animate-slide-up">
                        <form onSubmit={handleSubmitCMS} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {activeTab === 'products' ? (
                                <>
                                    <input type="text" placeholder="Name" required onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    <input type="text" placeholder="Category" required onChange={e => setFormData({ ...formData, category: e.target.value })} />
                                    <input type="text" placeholder="Image URL" required onChange={e => setFormData({ ...formData, image: e.target.value })} />
                                    <textarea placeholder="Description" onChange={e => setFormData({ ...formData, description: e.target.value })} className="md:col-span-2" />
                                </>
                            ) : activeTab === 'gallery' ? (
                                <>
                                    <input type="text" placeholder="Title" required onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                    <input type="text" placeholder="Category" required onChange={e => setFormData({ ...formData, category: e.target.value })} />
                                    <input type="text" placeholder="Image URL" required onChange={e => setFormData({ ...formData, image: e.target.value })} />
                                    <textarea placeholder="Description" onChange={e => setFormData({ ...formData, description: e.target.value })} className="md:col-span-2" />
                                </>
                            ) : (
                                <>
                                    <input type="text" placeholder="Service Title" required onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                    <input type="text" placeholder="Icon Emoji (e.g. 🏗️)" required onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                                    <textarea placeholder="Description" required onChange={e => setFormData({ ...formData, description: e.target.value })} className="md:col-span-2" />
                                </>
                            )}
                            <div className="md:col-span-2 flex justify-end gap-4">
                                <button type="button" onClick={() => setShowForm(false)} className="btn-outline py-2">Cancel</button>
                                <button type="submit" className="btn-primary py-2 px-8">Save {activeTab.slice(0, -1)}</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Content Tables */}
                <div className="glass rounded-2xl overflow-hidden animate-fade-in shadow-xl border border-white/40">
                    {loading ? (
                        <div className="p-20 text-center"><div className="spinner mx-auto mb-4"></div><p>Loading...</p></div>
                    ) : (
                        <div className="overflow-x-auto">
                            {activeTab === 'bookings' && <BookingsTable data={bookings} updateStatus={updateBookingStatus} deleteItem={deleteItem} />}
                            {activeTab === 'contacts' && <ContactsTable data={contacts} deleteItem={deleteItem} />}
                            {activeTab === 'products' && <ProductsTable data={products} deleteItem={deleteItem} />}
                            {activeTab === 'gallery' && <GalleryTable data={gallery} deleteItem={deleteItem} />}
                            {activeTab === 'services' && <ServicesTable data={services} deleteItem={deleteItem} />}
                            {activeTab === 'media' && <MediaTable products={products} gallery={gallery} services={services} />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Sub-Components ---

const StatCard = ({ icon, label, val, color }) => (
    <div className={`glass p-6 rounded-2xl flex items-center gap-4 border-b-4 ${color === 'blue' ? 'border-blue-500' :
        color === 'green' ? 'border-green-500' :
            color === 'orange' ? 'border-orange-500' :
                color === 'purple' ? 'border-purple-500' :
                    'border-pink-500'
        }`}>
        <div className={`bg-${color}-100 p-4 rounded-xl text-${color}-600`}>{icon}</div>
        <div>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{label}</p>
            <h3 className="text-xl font-black text-gray-800">{val}</h3>
        </div>
    </div>
);

const BookingsTable = ({ data, updateStatus, deleteItem }) => (
    <table className="w-full text-left">
        <thead className="bg-primary-50 text-primary-800 uppercase text-xs font-bold">
            <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Service</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
            </tr>
        </thead>
        <tbody>
            {data.map(item => (
                <tr key={item._id} className="border-t border-gray-100/50 hover:bg-white/40 transition-colors">
                    <td className="p-4">
                        <p className="font-bold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.email} • {item.phone}</p>
                    </td>
                    <td className="p-4">
                        <span className="text-xs font-bold bg-white/50 px-2 py-1 rounded border border-gray-200">{item.service}</span>
                    </td>
                    <td className="p-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${item.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {item.status}
                        </span>
                    </td>
                    <td className="p-4">
                        <div className="flex gap-2">
                            {item.status !== 'Completed' && (
                                <button onClick={() => updateStatus(item._id, 'Completed')} className="text-green-600 hover:scale-110 transition-transform"><FaCheckCircle /></button>
                            )}
                            <button onClick={() => deleteItem('bookings', item._id)} className="text-red-400 hover:text-red-600"><FaTrash /></button>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const ContactsTable = ({ data, deleteItem }) => (
    <table className="w-full text-left">
        <thead className="bg-primary-50 text-primary-800 uppercase text-xs font-bold">
            <tr>
                <th className="p-4">From</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Message</th>
                <th className="p-4">Actions</th>
            </tr>
        </thead>
        <tbody>
            {data.map(item => (
                <tr key={item._id} className="border-t border-gray-100/50 hover:bg-white/40">
                    <td className="p-4"><p className="font-bold">{item.name}</p><p className="text-xs text-gray-500">{item.email}</p></td>
                    <td className="p-4 text-xs font-bold">{item.subject}</td>
                    <td className="p-4"><p className="text-sm line-clamp-2 max-w-xs">{item.message}</p></td>
                    <td className="p-4"><button onClick={() => deleteItem('contacts', item._id)} className="text-red-400"><FaTrash /></button></td>
                </tr>
            ))}
        </tbody>
    </table>
);

const ProductsTable = ({ data, deleteItem }) => (
    <table className="w-full text-left">
        <thead className="bg-primary-50 text-primary-800 uppercase text-xs font-bold">
            <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Description</th>
                <th className="p-4">Actions</th>
            </tr>
        </thead>
        <tbody>
            {data.map(item => (
                <tr key={item._id} className="border-t border-gray-100/50 hover:bg-white/40">
                    <td className="p-4 flex items-center gap-3">
                        <img src={item.image} alt="" className="w-10 h-10 rounded object-cover border" />
                        <span className="font-bold">{item.name}</span>
                    </td>
                    <td className="p-4 text-xs">{item.category}</td>
                    <td className="p-4 text-xs text-gray-500 max-w-xs truncate">{item.description}</td>
                    <td className="p-4"><button onClick={() => deleteItem('products', item._id)} className="text-red-400"><FaTrash /></button></td>
                </tr>
            ))}
        </tbody>
    </table>
);

const GalleryTable = ({ data, deleteItem }) => (
    <table className="w-full text-left">
        <thead className="bg-primary-50 text-primary-800 uppercase text-xs font-bold">
            <tr>
                <th className="p-4">Preview</th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Actions</th>
            </tr>
        </thead>
        <tbody>
            {data.map(item => (
                <tr key={item._id} className="border-t border-gray-100/50 hover:bg-white/40">
                    <td className="p-4"><img src={item.image} alt="" className="w-12 h-8 rounded object-cover shadow-sm" /></td>
                    <td className="p-4 font-bold">{item.title}</td>
                    <td className="p-4 text-xs">{item.category}</td>
                    <td className="p-4"><button onClick={() => deleteItem('gallery', item._id)} className="text-red-400"><FaTrash /></button></td>
                </tr>
            ))}
        </tbody>
    </table>
);

const ServicesTable = ({ data, deleteItem }) => (
    <table className="w-full text-left">
        <thead className="bg-primary-50 text-primary-800 uppercase text-xs font-bold">
            <tr>
                <th className="p-4">Service</th>
                <th className="p-4">Description</th>
                <th className="p-4">Actions</th>
            </tr>
        </thead>
        <tbody>
            {data.map(item => (
                <tr key={item._id} className="border-t border-gray-100/50 hover:bg-white/40">
                    <td className="p-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.icon}</span>
                            <span className="font-bold">{item.title}</span>
                        </div>
                    </td>
                    <td className="p-4 text-xs text-gray-500">{item.description}</td>
                    <td className="p-4"><button onClick={() => deleteItem('services', item._id)} className="text-red-400"><FaTrash /></button></td>
                </tr>
            ))}
        </tbody>
    </table>
);

const MediaTable = ({ products, gallery, services }) => {
    // Collect all unique images from products, gallery, and services
    const allImages = [];
    const seen = new Set();

    const addImage = (path, source) => {
        if (path && !seen.has(path)) {
            seen.add(path);
            allImages.push({ path, source });
        }
    };

    products.forEach(p => addImage(p.image, 'Product'));
    gallery.forEach(g => addImage(g.image, 'Gallery'));
    services.forEach(s => addImage(s.image, 'Service'));

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Image path copied: ' + text);
    };

    return (
        <table className="w-full text-left">
            <thead className="bg-primary-50 text-primary-800 uppercase text-xs font-bold">
                <tr>
                    <th className="p-4">Preview</th>
                    <th className="p-4">Path</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                {allImages.map((img, idx) => (
                    <tr key={idx} className="border-t border-gray-100/50 hover:bg-white/40">
                        <td className="p-4">
                            <img src={img.path} alt="" className="w-12 h-12 rounded object-cover border p-1 bg-white shadow-sm" />
                        </td>
                        <td className="p-4 font-mono text-[10px] break-all max-w-[200px]">{img.path}</td>
                        <td className="p-4">
                            <span className="text-[10px] font-bold bg-white/60 px-2 py-1 rounded border border-gray-200 uppercase">{img.source}</span>
                        </td>
                        <td className="p-4">
                            <button
                                onClick={() => copyToClipboard(img.path)}
                                className="text-primary-600 hover:text-primary-800 flex items-center gap-1 text-xs font-bold transition-colors"
                            >
                                <FaCopy /> Copy Path
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Admin;
