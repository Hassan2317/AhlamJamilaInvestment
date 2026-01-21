// Central API Configuration
// This helps the frontend switch between local development and production automatically.
const isProduction = window.location.hostname !== 'localhost';

export const API_BASE = isProduction
    ? '/api'
    : 'http://localhost:5000/api';

export const ADMIN_API = isProduction
    ? '/api/admin'
    : 'http://localhost:5000/api/admin';
