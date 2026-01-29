const express = require('express');
const cors = require('cors');
const { Resend } = require('resend'); // Reverted to Resend
const mongoose = require('mongoose');
const path = require('path');
const Booking = require('./models/Booking');
const Contact = require('./models/Contact');
const Product = require('./models/Product');
const Gallery = require('./models/Gallery');
const Service = require('./models/Service');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
    console.warn('WARNING: RESEND_API_KEY is missing from environment variables.');
}
const resend = new Resend(resendApiKey || 'missing_key');

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Ahlam Jamila Investment Backend is running!');
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // 1. Save to Database
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();

        // 2. Send Email via Resend
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: process.env.BUSINESS_EMAIL,
            subject: `New Contact Form Submission: ${subject}`,
            reply_to: email,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        console.log('Contact email sent via Resend:', data);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error handling contact form:', error);
        res.status(500).json({ success: false, message: 'Process failed. Please try again.' });
    }
});

// Booking Form Endpoint
app.post('/api/booking', async (req, res) => {
    const { name, email, phone, service, date, details } = req.body;

    try {
        // 1. Save to Database
        const newBooking = new Booking({
            name, email, phone, service, date, details
        });
        await newBooking.save();

        // 2. Send Email via Resend
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: process.env.BUSINESS_EMAIL,
            subject: `New Service Booking: ${service}`,
            reply_to: email,
            html: `
                <h3>New Booking Request</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Preferred Date:</strong> ${date}</p>
                <p><strong>Details:</strong> ${details}</p>
            `
        });

        console.log('Booking email sent via Resend:', data);
        res.status(200).json({ success: true, message: 'Booking request sent successfully!' });
    } catch (error) {
        console.error('Error handling booking request:', error);
        res.status(500).json({ success: false, message: 'Process failed. Please try again.' });
    }
});

// --- Admin API Endpoints (Private) ---

// Basic middleware to check admin password
const adminAuth = (req, res, next) => {
    const { password } = req.headers;
    if (password === process.env.ADMIN_PASSWORD) {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized: Invalid admin password' });
    }
};

// Admin Login Verification
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
});

// GET all bookings
app.get('/api/admin/bookings', adminAuth, async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET all contacts
app.get('/api/admin/contacts', adminAuth, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PATCH update booking status
app.patch('/api/admin/bookings/:id', adminAuth, async (req, res) => {
    try {
        const { status } = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json({ success: true, data: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE a booking
app.delete('/api/admin/bookings/:id', adminAuth, async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE a contact inquiry
app.delete('/api/admin/contacts/:id', adminAuth, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Inquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- CMS Endpoints (Products) ---

// GET all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST add product
app.post('/api/admin/products', adminAuth, async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE product
app.delete('/api/admin/products/:id', adminAuth, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- CMS Endpoints (Gallery) ---

// GET all gallery images
app.get('/api/gallery', async (req, res) => {
    try {
        const items = await Gallery.find().sort({ createdAt: -1 });
        res.json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST add gallery item
app.post('/api/admin/gallery', adminAuth, async (req, res) => {
    try {
        const item = new Gallery(req.body);
        await item.save();
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE gallery item
app.delete('/api/admin/gallery/:id', adminAuth, async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Gallery item deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- CMS Endpoints (Services) ---

// GET all services
app.get('/api/services', async (req, res) => {
    try {
        const items = await Service.find().sort({ createdAt: 1 });
        res.json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST add service
app.post('/api/admin/services', adminAuth, async (req, res) => {
    try {
        const item = new Service(req.body);
        await item.save();
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE service
app.delete('/api/admin/services/:id', adminAuth, async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- UPDATE Endpoints (PUT) ---

// PUT update product
app.put('/api/admin/products/:id', adminAuth, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT update gallery item
app.put('/api/admin/gallery/:id', adminAuth, async (req, res) => {
    try {
        const updatedItem = await Gallery.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ success: true, data: updatedItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT update service
app.put('/api/admin/services/:id', adminAuth, async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ success: true, data: updatedService });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- UTILITY: Seed Database ---
// This is for the first run to migrate data from local files
app.post('/api/admin/seed', adminAuth, async (req, res) => {
    const { products, gallery, services } = req.body;
    try {
        if (products) {
            await Product.deleteMany({});
            await Product.insertMany(products);
        }
        if (gallery) {
            await Gallery.deleteMany({});
            await Gallery.insertMany(gallery);
        }
        if (services) {
            await Service.deleteMany({});
            await Service.insertMany(services);
        }
        res.json({ success: true, message: 'Database seeded successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*all', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export for Vercel compatibility
