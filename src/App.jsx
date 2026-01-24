import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function ScrollReveal() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top on route change
        window.scrollTo(0, 0);

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        // Slight delay to ensure DOM is updated after route change
        const timer = setTimeout(() => {
            const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
            revealElements.forEach(el => {
                // Remove active class first to re-trigger if navigating back
                el.classList.remove('active');
                observer.observe(el);
            });
        }, 100);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
        };
    }, [pathname]);

    return null;
}

function App() {

    return (
        <Router>
            <div className="min-h-screen flex flex-col relative">
                <ScrollReveal />
                <div className="animated-bg"></div>
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/booking" element={<Booking />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
            </div>
        </Router>
    );
}

export default App;
