# Pastebin

Pastebin- is a lightweight Pastebin-style web application that allows users to create text pastes and share them via a unique URL.  
Each paste can optionally expire after a given time (TTL) or after a maximum number of views.

This project was built as part of a company take-home assignment and follows the provided API and testing specifications.

---

## Features

- Create a paste containing arbitrary text
- Generate a unique, shareable URL for each paste
- View a paste via browser or API
- Optional paste constraints:
  - Time-based expiry (TTL)
  - View-count limit
- Deterministic expiry support for automated testing
- Safe HTML rendering (no script execution)

---

## Tech Stack

### Frontend
- React
- React Router
- Fetch API

### Backend
- Node.js
- Express.js

### Persistence Layer
- **Redis (Upstash)**  
  Used to persist paste data across requests and ensure compatibility with serverless environments.

---

## Project Structure

pastebin/
│
├── backend/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── App.js
│ │ ├── CreatePaste.js
│ │ ├── ViewPaste.js
│ │ └── index.js
│ └── package.json
│
├── README.md




Running the Project Locally
Backend:
cd backend
npm install
npm start

Frontend:
cd frontend
npm create vite
select react and javascript 
npm run dev


for styling i have used Tailwind CSS:
1. Install Tailwind CSS
You need the main library and the Vite plugin (assuming you used Vite to create your React app):
npm install tailwindcss @tailwindcss/vite
2. Configure the Vite Plugin
Open your vite.config.js (or .ts) file and add the Tailwind plugin

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
3. Import Tailwind in your CSS
Open your main CSS file (usually src/index.css) and add this single line at the top. This replaces the old @tailwind base; directives:
@import "tailwindcss";

