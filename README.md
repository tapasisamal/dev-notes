# DevNotes

A notes application where users can securely create, edit, and manage personal notes.

## 🌐 Live Demo

🔗 [Click here to use DevNotes](https://dev-notes-nu.vercel.app)

## 🚀 Features

* Authentication (Signup & Login)
* Secure user-specific notes (each user sees only their data)
* Create, update, delete notes
* Search notes by title and content
* Protected routes for authenticated users

## 🛠️ Tech Stack

* React, Tailwind CSS
* Redux Toolkit
* Appwrite
* React Hook Form

## ⚙️ Setup

```bash
git clone <https://github.com/tapasisamal/dev-notes>
cd dev-notes
npm install
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
```

---
