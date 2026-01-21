const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
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
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Booking request sent successfully!' });
    } catch (error) {
        console.error('Error sending booking email:', error);
        res.status(500).json({ success: false, message: 'Failed to send booking request.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
