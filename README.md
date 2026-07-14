<div align="center">

# QuickAI

### AI-powered content creation, image editing, resume review, and activity management in one full-stack platform.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open_App-6C63FF?style=for-the-badge&logo=vercel&logoColor=white)](https://quick-ai-taupe-six.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/IamProgrammer24/QuickAI)

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?style=flat-square&logo=vercel)

</div>

---

## Overview

**QuickAI** is a full-stack AI productivity platform that brings multiple creation and editing tools into a single authenticated workspace.

Users can generate articles and blog titles, create images from text prompts, remove image backgrounds or unwanted objects, review resumes with AI, and revisit previous creations from a centralized dashboard. The platform also includes a community experience for viewing and liking published image creations.

The project demonstrates end-to-end application development with a React frontend, Node.js and Express backend, MongoDB persistence, Clerk authentication, AI service integrations, file uploads, cloud media storage, and REST APIs.

## Live Application

**Live demo:** https://quick-ai-taupe-six.vercel.app/

**Repository:** https://github.com/IamProgrammer24/QuickAI

> Some AI and image-processing features depend on third-party API availability and valid environment configuration.

---

## Screenshots

### Landing Page

![QuickAI landing page](https://raw.githubusercontent.com/IamProgrammer24/QuickAI/main/client/src/assets/cover.PNG)

### User Dashboard

![QuickAI dashboard](https://raw.githubusercontent.com/IamProgrammer24/QuickAI/main/client/src/assets/homeScreen.PNG)

---

## Features

### AI Writing Tools

- Generate long-form articles from a prompt.
- Create blog-title ideas for a selected topic or category.
- Render generated text in a readable interface.
- Save generated content for later access.

### AI Image Tools

- Generate images from text prompts.
- Remove image backgrounds.
- Remove selected or unwanted objects from uploaded images.
- Upload processed media to Cloudinary.
- Optionally publish generated images to the community.

### AI Resume Review

- Upload a resume in PDF format.
- Extract and analyse resume content.
- Receive AI-generated feedback and improvement suggestions.
- Store review history in the user dashboard.

### Authentication and Access

- User sign-up and sign-in through Clerk.
- Protected API routes and user-specific content.
- Plan-aware feature access and usage limits.
- Secure separation between client-side and server-side credentials.

### Dashboard and Activity History

- View recent AI creations from one dashboard.
- Access articles, blog titles, generated images, and resume reviews.
- Retrieve user-specific creation history.
- Keep activities organised by creation type.

### Community

- Explore published image creations.
- Like or unlike community creations.
- Track engagement through stored like data.

---

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React 19, Vite, JavaScript, Tailwind CSS |
| Routing and UI | React Router, Lucide React, React Hot Toast, React Markdown |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | Clerk |
| AI Text Generation | Google Gemini through an OpenAI-compatible API client |
| AI Image Generation | ClipDrop API |
| Media Management | Cloudinary |
| File Handling | Multer, Data URI utilities |
| Resume Parsing | PDF parsing utilities |
| HTTP Client | Axios |
| Deployment | Vercel configuration for client and server |
| Developer Tools | Git, GitHub, ESLint, npm, Nodemon |

---

## Architecture

```text
Browser
   |
   v
React + Vite Client
   |
   | Clerk authentication token
   | REST API requests
   v
Node.js + Express API
   |
   |-- Clerk authentication middleware
   |-- AI controllers
   |-- File upload middleware
   |-- User and community routes
   |
   |----> Gemini API
   |----> ClipDrop API
   |----> Cloudinary
   |
   v
MongoDB
```

### Application Flow

1. A user signs in through Clerk.
2. The React client sends an authenticated request to the Express API.
3. The backend validates the user and processes the requested tool.
4. External AI or media services generate the result.
5. The result is stored in MongoDB.
6. The frontend displays the response and makes it available in the dashboard.

---

## Project Structure

```text
QuickAI/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── server/
│   ├── Routes/
│   │   ├── aiRoutes.js
│   │   └── userRoutes.js
│   ├── configs/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── services/
│   ├── package.json
│   ├── server.js
│   └── vercel.json
│
├── .gitignore
└── README.md
```

---

## REST API Overview

### AI Routes

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/ai/generate-article` | Generate an AI article |
| `POST` | `/api/ai/generate-blog-title` | Generate blog-title ideas |
| `POST` | `/api/ai/generate-image` | Generate an image from a prompt |
| `POST` | `/api/ai/remove-image-background` | Remove an uploaded image background |
| `POST` | `/api/ai/remove-image-object` | Remove an object from an uploaded image |
| `POST` | `/api/ai/resume-review` | Analyse an uploaded resume |

### User Routes

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/user/get-user-creations` | Fetch the authenticated user's creation history |
| `GET` | `/api/user/get-published-creations` | Fetch published community creations |
| `POST` | `/api/user/toggle-like-creation` | Like or unlike a published creation |

> Application routes are protected through Clerk-based authentication middleware.

---

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js 20 or later
- npm
- MongoDB locally or a MongoDB Atlas connection
- Clerk application credentials
- Gemini API key
- ClipDrop API key
- Cloudinary account credentials

### 1. Clone the Repository

```bash
git clone https://github.com/IamProgrammer24/QuickAI.git
cd QuickAI
```

### 2. Install Client Dependencies

```bash
cd client
npm install
```

### 3. Install Server Dependencies

```bash
cd ../server
npm install
```

---

## Environment Variables

Create separate `.env` files inside the `client` and `server` directories.

### Server Environment

Create `server/.env`:

```env
PORT=4000

MONGODB_URI=mongodb://127.0.0.1:27017/quickai

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

GEMINI_API_KEY=your_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Client Environment

Create `client/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASEURL=http://localhost:4000
```

> Never commit real API keys, passwords, database credentials, or private tokens to GitHub.

---

## Run the Application Locally

Use two terminals.

### Terminal 1: Start the Backend

```bash
cd server
npm start
```

The API will be available at:

```text
http://localhost:4000
```

The root health endpoint should return:

```text
Server is Live
```

### Terminal 2: Start the Frontend

```bash
cd client
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Available Scripts

### Client

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

### Server

| Command | Purpose |
|---|---|
| `npm start` | Start the Express server with Node.js |

---

## Production Build

Create the frontend production build:

```bash
cd client
npm run build
```

The generated files will be available in:

```text
client/dist
```

Before deployment:

- Add all required environment variables to the hosting platform.
- Replace `VITE_BASEURL` with the deployed backend URL.
- Add the production frontend URL to the backend CORS configuration when required.
- Configure Clerk domains and redirect URLs.
- Verify Cloudinary, Gemini, and ClipDrop credentials.
- Confirm that the MongoDB deployment accepts connections from the backend host.

---

## Troubleshooting

### Frontend Cannot Reach the API

- Confirm that the backend is running.
- Confirm that `VITE_BASEURL` matches the backend URL.
- Restart the Vite server after changing `.env`.
- Check the browser console and network tab.

### Authentication Errors

- Verify both Clerk keys.
- Confirm that the publishable key belongs to the same Clerk application as the secret key.
- Check allowed origins and redirect URLs in Clerk.

### MongoDB Connection Errors

- Verify `MONGODB_URI`.
- Confirm that MongoDB is running locally, or check the MongoDB Atlas network-access rules.
- Confirm that the database username and password are URL encoded when required.

### Image or Upload Errors

- Verify ClipDrop and Cloudinary credentials.
- Check the uploaded file type and size.
- Confirm that multipart form data is being sent correctly.

### Environment Changes Are Not Applied

Restart both development servers after editing environment variables.

---

## Engineering Highlights

- Full-stack separation between a Vite client and Express API.
- Reusable React-based interface and page routing.
- Authenticated, user-specific API workflows.
- Multiple third-party AI and media integrations.
- File-upload and PDF-processing flows.
- MongoDB persistence across different creation types.
- Community publishing and like interactions.
- Responsive dashboard and activity management.

---

## Roadmap

- Add automated unit and integration tests.
- Add TypeScript across the client and server.
- Improve validation and centralised error handling.
- Add request rate limiting and security hardening.
- Add pagination and filtering to creation history.
- Add image-comparison previews for editing tools.
- Improve accessibility and mobile navigation.
- Add CI checks for linting, testing, and builds.
- Add API documentation with OpenAPI or Swagger.

---

## Contributing

Contributions, bug reports, and improvement suggestions are welcome.

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes:

```bash
git commit -m "feat: add your feature"
```

4. Push the branch:

```bash
git push origin feature/your-feature-name
```

5. Open a pull request with a clear explanation of the change.

---

## Author

**Brajesh Chhekur**

- GitHub: https://github.com/IamProgrammer24
- LinkedIn: https://www.linkedin.com/in/brajesh-chhekur/
- Email: 281092322419e@gmail.com

---

<div align="center">

Built as a full-stack AI productivity project using React, Node.js, Express, MongoDB, and third-party AI services.

⭐ Star the repository if you find the project useful.

</div>
