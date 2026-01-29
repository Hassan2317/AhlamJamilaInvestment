# Ahlam Jamila Investment Platform

A professional, full-stack web application designed for Ahlam Jamila Investment, a premier agricultural and construction company based in Zomba, Malawi.

## 🚀 Features

- **Dynamic CMS**: Manage Products, Gallery projects, and Services directly from a secure Admin Dashboard.
- **Service Booking**: Interactive booking system with dynamic service selection and email notifications.
- **Premium UI/UX**: Modern, responsive design featuring glassmorphism, scroll-based animations, and a custom interactive process timeline.
- **Recent Projects section**: Automatically showcases the latest work from the gallery on the home page.
- **Deployment Ready**: Optimized for production with environment-aware API configuration and unified backend serving.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, React Router, React Icons.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (Mongoose).
- **Emailing**: Nodemailer with SMTP integration.

## 📂 Project Structure

```
AhlamJamilaInvestment/
├── server/                 # Backend (Node/Express)
│   ├── models/             # Mongoose Schemas (Product, Gallery, Service, etc.)
│   ├── index.js            # Main server file & API endpoints
│   └── .env                # Environment variables (Sensitive!)
├── src/                    # Frontend (React)
│   ├── components/         # Reusable UI components
│   ├── pages/              # Main page views (Home, Admin, Gallery, etc.)
│   ├── data/               # Static fallback data files
│   ├── config.js           # Environment-aware API configuration
│   └── App.jsx             # Main Application entry and Routing
├── public/                 # Static assets (Favicon, Logo, Social Preview)
├── dist/                   # Production build (Generated after build)
└── tailwind.config.js      # CSS configuration
```

## ⚙️ Installation & Setup

### 1. Prerequisite
- Node.js (v18 or higher)
- MongoDB Atlas account

### 2. Local Setup
1. **Clone the repository**:
   ```bash
   git clone [your-repository-url]
   cd AhlamJamilaInvestment
   ```

2. **Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Backend Dependencies**:
   ```bash
   cd server
   npm install
   ```

4. **Run Locally**:
   - Start Backend: `cd server && npm run dev`
   - Start Frontend: `npm run dev` (in the root folder)

## 🌐 Production Deployment

This project is configured to be served as a unified package.

1. **Build the Frontend**:
   ```bash
   npm run build
   ```
   This creates a `dist` folder.

2. **Server Configuration**:
   The `server/index.js` is set up to serve the `dist` folder automatically in production.

3. **Deploy**:
   Upload the entire root directory to your host (Render, Heroku, etc.) and ensure you add the **Environment Variables** in your host's dashboard.

---

### 📞 Contact & Support
For any inquiries regarding the platform, please contact **Ahlam Jamila Investment** at [ahlamjamilainvestiment@gmail.com](mailto:ahlamjamilainvestiment@gmail.com).

© 2024 Ahlam Jamila Investment. All rights reserved.
