# 🚀 Deployment Guide (Render)

Follow these steps to take your Ahlam Jamila Investment platform live.

## 1. Prepare your GitHub
Make sure your latest changes (including the `dist` folder) are pushed:
```bash
git add .
git commit -m "Final production push"
git push origin main
```

## 2. Create a Web Service on Render
1. Go to [Render.com](https://render.com) and log in.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.

## 3. Configure the Build & Start
Use these exact settings to ensure your server can find the frontend:

- **Root Directory**: (Leave blank)
- **Environment**: `Node`
- **Build Command**: `cd server && npm install`
- **Start Command**: `node server/index.js`

## 4. Set Environment Variables
Go to the **Environment** tab in your Render dashboard and add these key-values:

| Key | Value |
| :--- | :--- |
| `NODE_VERSION` | `22.0.0` |
| `MONGODB_URI` | *Your MongoDB Atlas connection string* |
| `SMTP_USER` | `zaminhassan2317@gmail.com` |
| `SMTP_PASS` | *Your Google App Password* |
| `ADMIN_PASSWORD` | `Yatim2317` |
| `BUSINESS_EMAIL` | `zaminhassan2317@gmail.com` |

## 5. Verify the Deploy
1. Render will start the build process. Once it says **"Live"**, click the URL provided at the top.
2. Check your pages.
3. Go to `/admin` and log in to verify the CMS is alive.

---

### 💡 Troubleshooting
- **404 Errors**: If you refresh and get a 404, don't worry—I've already added a "catch-all" route in the code to handle this.
- **Database Connection**: Ensure you have added `0.0.0.0/0` (Allow all) to your IP Whitelist in the MongoDB Atlas dashboard so the Render server can connect.

## 🚀 Option 2: Deploy to Vercel (Fastest)

Vercel is great for high-speed frontend delivery. I've already added a `vercel.json` to make this work.

### 1. Push to GitHub
```bash
git add .
git commit -m "Add Vercel configuration"
git push origin main
```

### 2. Connect to Vercel
1. Go to [Vercel.com](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import your GitHub repository.

### 3. Vercel Settings
Vercel should detect everything automatically. Just ensure:
- **Framework Preset**: `Vite` (or Other)
- **Root Directory**: `./`

### 4. Add Environment Variables
In the Vercel Dashboard (**Settings > Environment Variables**), add the same keys as Render:
- `MONGODB_URI`
- `SMTP_USER`
- `SMTP_PASS`
- `ADMIN_PASSWORD`
- `BUSINESS_EMAIL`

---

### 🏆 Recommendation
- **Use Render**: If you want a traditional, always-on server (Best for your current code).
- **Use Vercel**: If you want the absolute fastest loading times for your users and a great free tier.
