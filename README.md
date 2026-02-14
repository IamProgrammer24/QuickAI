# QuickAI – Create Amazing content by using AI

<p align="center">
  <img src="./client/src/assets/cover.png" alt="Image 1" width="45%" />
  <img src="./client/src/assets/homeScreen.png" alt="Image 2" width="45%" />
</p>

## 📝 Project Description

**QuickAI** is an AI-powered productivity platform that helps users generate articles, blog titles, and images from text prompts, along with advanced image editing features like object and content removal. It also provides AI-based resume review with improvement suggestions. A centralized dashboard lets users track and manage all their activities in one place.

---

## 🚀 Live Demo

Check out the live version of QuickAI here:

🔗 [View Live Site](https://quick-ai-taupe-six.vercel.app/)

---

## 🚀 Features

### 🤖 AI Content Creation

- Generate full-length articles by providing a simple topic or prompt
- Create engaging blog titles instantly using AI
- AI-powered text generation designed to boost productivity

### 🎨 AI Image Tools

- Generate images from text prompts
- Remove unwanted objects from images
- Erase specific parts or elements from images with AI editing

### 📄 AI Resume Review

- Upload resumes for instant AI analysis
- Get smart suggestions and improvement tips
- Enhance resume quality and professional presentation

### 📊 Dashboard & Activity Tracking

- Centralized dashboard to view all generated content
- Track past actions and AI creations in one place
- Organized history for easy access and management

---

## 🛠️ Tech Stack

| Layer          | Technology                                |
| -------------- | ----------------------------------------- |
| Frontend       | React.js, HTML, CSS, JavaScript           |
| Backend        | Node.js, Express.js                       |
| Database       | MongoDB                                   |
| Authentication | Clerk                                     |
| Tools          | Clerk, Gemini, Clipdro, Cloudinary        |
| Deployment     | Vercel                                    |

---

## 🛠️ How to Clone and Run Locally

Follow these steps to clone and run PingUp locally on your machine:

### Step 1: Clone the repository

```bash
git clone https://github.com/IamProgrammer24/QuickAI.git
```

### Step 2: Navigate into the project folder

```bash
cd QuickAI
```

### Step 3: Install client dependencies

```bash
cd client
```

```bash
npm install
```

### Step 4: Install server dependencies

```bash
cd server
```

```bash
npm install
```

### Step 5: Run the application

```bash
npm run dev
```

```bash
npm run server
```

## Now open your browser and go to:

http://localhost:5173

---

## 🔐 Environment Variable Setup

Before running the application locally, make sure to configure environment variables by creating `.env` files in both the **backend** and **frontend** directories.

---

### 📁 Server (`/server/.env`)

```env
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

```env
CLERK_SECRET_KEY=your_clerk_secret_key
```

```env
GEMINI_API_KEY=your_gemini_key
```

```env
CLIPDROP_API_KEY=clipdrop_api
```

```env
CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name
```

```env
CLOUDINARY_API_KEY=cloudinary_api_key
```

```env
CLOUDINARY_API_SECRET=cloudinary_api_secret
```

```env
MONGODB_URI=mongodb://localhost:27017/pingup_db
```

### 📁 client (`/client/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

```env
VITE_BASEURL=http://localhost:4000
```

---

## Contributing

Contributions are welcome! If you'd like to help improve this project, feel free to:

- 🔧 Fix bugs.
- 💡 Suggest or add new features
- 🧪 Improve design or responsiveness
- 📝 Enhance documentation

---

## 👨‍💻 Author

**Brajesh Chhekur**

📧 Email: 281092322419e@gmail.com  
If you like this project, feel free to ⭐ star it, fork it, or open an issue!