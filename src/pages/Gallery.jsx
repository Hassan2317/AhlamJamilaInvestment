import { useState, useEffect } from 'react';
import GalleryGrid from '../components/GalleryGrid';
import { API_BASE } from '../config';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/gallery`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setImages(data.data);
                }
            })
            .catch(err => console.error('Error fetching gallery:', err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="section-padding">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in text-reveal">
                    <h1 className="text-primary-800 mb-4 font-display">Project Excellence</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our portfolio of completed projects. From beautiful landscapes to solid infrastructure,
                        see the quality and craftsmanship that defines our work.
                    </p>
                </div>

                {/* Gallery Grid */}
                {loading ? (
                    <div className="flex justify-center p-20"><div className="spinner"></div></div>
                ) : (
                    <GalleryGrid images={images} />
                )}

                {/* CTA Section */}
                <div className="glass rounded-2xl p-8 md:p-12 mt-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-4 font-display">
                        Want to See Your Project Here?
                    </h2>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                        Let's work together to create something amazing. Contact us today to discuss your project
                        and see how we can bring your vision to life.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/booking" className="btn-primary">
                            Book a Service
                        </a>
                        <a href="/contact" className="btn-outline">
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
