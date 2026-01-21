const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Booking = require('./models/Booking');
const Contact = require('./models/Contact');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false // Helps avoid local certificate issues
    }
});

// Routes
app.get('/', (req, res) => {
    res.send('Ahlam Jamila Investment Backend is running!');
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.BUSINESS_EMAIL,
        subject: `New Contact Form Submission: ${subject}`,
        text: `
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            Message: ${message}
        `
    };

    try {
        // 1. Save to Database
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();

        // 2. Send Email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Message sent and saved successfully!' });
    } catch (error) {
        console.error('Error handling contact form:', error);
        res.status(500).json({ success: false, message: 'Process failed. Please try again.' });
    }
});

// Booking Form Endpoint
app.post('/api/booking', async (req, res) => {
    const { name, email, phone, service, date, details } = req.body;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.BUSINESS_EMAIL,
        subject: `New Service Booking: ${service}`,
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Service: ${service}
            Preferred Date: ${date}
            Details: ${details}
        `
    };

    try {
        // 1. Save to Database
        const newBooking = new Booking({
            name, email, phone, service, date, details
        });
        await newBooking.save();

        // 2. Send Email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Booking request sent and saved successfully!' });
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
