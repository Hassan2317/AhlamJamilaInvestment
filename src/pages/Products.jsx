import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { products as staticProducts } from '../data/products';
import { API_BASE } from '../config';

const Products = () => {
    const [products, setProducts] = useState(staticProducts);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetch(`${API_BASE}/products`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const dbProducts = data.data;
                    const dbNames = new Set(dbProducts.map(p => p.name));
                    const uniqueStatic = staticProducts.filter(p => !dbNames.has(p.name));
                    setProducts([...dbProducts, ...uniqueStatic]);
                }
            })
            .catch(err => console.error('Error fetching products:', err))
            .finally(() => setLoading(false));
    }, []);

    const categories = ['All', ...new Set(products.map(p => p.category))];
    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.category === filter);

    return (
        <div className="section-padding">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in text-reveal">
                    <h1 className="text-primary-800 mb-4 font-display">Our Premium Products</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Quality materials for every project. From beautiful trees to durable construction materials,
                        we provide everything you need to bring your vision to life.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-xl font-bold transition-all duration-300 ${filter === cat
                                ? 'bg-primary-700 text-white shadow-lg scale-105'
                                : 'glass text-gray-700 hover:bg-primary-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex justify-center p-20"><div className="spinner"></div></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id || product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* CTA Section */}
                <div className="glass rounded-2xl p-8 md:p-12 mt-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-4 font-display">
                        Need Help Choosing?
                    </h2>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                        Our expert team is here to help you select the perfect products for your needs.
                        Contact us for personalized recommendations and quotes.
                    </p>
                    <a href="/contact" className="btn-primary inline-block">
                        Contact Our Team
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Products;
