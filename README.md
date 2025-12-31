# Pastebin

Pastebin is a lightweight Pastebin-style web application that allows users to create text pastes and share them via a unique URL.  
Each paste can optionally expire after a specified time (TTL) or after reaching a maximum number of views.

This project was built as part of a company take-home assignment and adheres to the provided API contracts, persistence requirements, and automated testing expectations.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Persistence Layer](#persistence-layer)
- [Design Decisions](#design-decisions)
- [Roadmap & Status](#roadmap--status)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)

---

## Features

- Create a paste containing arbitrary text
- Generate a unique, shareable URL
- View a paste via browser or API
- Optional paste constraints:
  - Time-based expiry (TTL)
  - View-count limit
- Deterministic expiry support for automated testing
- Safe HTML rendering (no script execution)

---

## Technologies Used

### Frontend
- React
- Vite
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Persistence
- Redis (Upstash)

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
│ │ ├── App.jsx
│ │ ├── CreatePaste.jsx
│ │ ├── ViewPaste.jsx
│ │ └── main.jsx
│ ├── index.html
│ ├── vite.config.js
│ └── package.json
│
├── README.md

yaml
Copy code

---

## Installation

Follow the steps below to set up the project locally.

### Prerequisites
- Node.js (v18 or later)
- npm
- Redis (or Upstash Redis URL)

---

### Backend Setup

```bash
cd backend
npm install
npm start
The backend server will start on the configured port.

Frontend Setup (Vite)
bash
Copy code
cd frontend
npm install
npm run dev
The frontend will be available on the Vite development server.

Tailwind CSS Setup
Tailwind CSS is used for styling.

Install Tailwind and the Vite plugin:

bash
Copy code
npm install tailwindcss @tailwindcss/vite
Configure vite.config.js:

js
Copy code
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
Import Tailwind in src/index.css:

css
Copy code
@import "tailwindcss";
Usage
Open the frontend in your browser.

Enter text to create a new paste.

Submit to receive a unique shareable URL.

Open the URL to view the paste.

Pastes automatically expire based on TTL or view limits.

Persistence Layer
This application uses Redis (Upstash) to store paste data.

Ensures data persistence across requests

Compatible with serverless deployment environments

Prevents data loss during automated testing

Design Decisions
RESTful API design to align with automated test requirements

Redis chosen for persistence reliability in serverless setups

Deterministic time support using TEST_MODE for expiry testing

Minimal UI design, as visual styling is not a grading criterion

Roadmap & Status
Current Status: Completed and functional
Planned Enhancements:

User authentication

Syntax highlighting for code pastes

Paste search functionality

Docker support

Contributing
Contributions are welcome.

Fork the repository

Create a new branch

Commit your changes

Open a pull request
