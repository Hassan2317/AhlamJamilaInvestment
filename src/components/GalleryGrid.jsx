import { useState } from 'react';

const GalleryGrid = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState('All');

    const categories = ['All', ...new Set(images.map(img => img.category))];

    const filteredImages = filter === 'All'
        ? images
        : images.filter(img => img.category === filter);

    return (
        <div>
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${filter === category
                                ? 'bg-primary-700 text-white shadow-lg'
                                : 'glass text-gray-700 hover:bg-primary-100'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image) => (
                    <div
                        key={image.id}
                        onClick={() => setSelectedImage(image)}
                        className="glass rounded-xl overflow-hidden cursor-pointer card-hover group"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={image.image}
                                alt={image.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400x300/4CAF50/ffffff?text=' + encodeURIComponent(image.title);
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-4 text-white">
                                    <h3 className="font-bold text-lg">{image.title}</h3>
                                    <p className="text-sm text-gray-200">{image.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
                >
                    <div className="max-w-5xl w-full">
                        <img
                            src={selectedImage.image}
                            alt={selectedImage.title}
                            className="w-full h-auto rounded-lg shadow-2xl"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/800x600/4CAF50/ffffff?text=' + encodeURIComponent(selectedImage.title);
                            }}
                        />
                        <div className="glass-dark mt-4 p-4 rounded-lg text-white">
                            <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                            <p className="text-gray-300">{selectedImage.description}</p>
                            <p className="text-accent-400 mt-2 text-sm">{selectedImage.category}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryGrid;
