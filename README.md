
<h1 align="center">Centre-for-Career-Planning-and-Services-Portal</h1>

<p align="center">
A robust Job Portal Application that streamlines job searching, application management, and community interactions for students, alumni, and CCPS professionals.Also Manages the HR Contacts,Logsand their responses(Upcomming).
</p>

<p align="center">
    <img src="https://img.shields.io/badge/Status-Deployed-brightgreen" alt="Status: Deployed" />
    <img src="https://img.shields.io/badge/Development-Ongoing-blue" alt="Development: Ongoing" />
    <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License: MIT" />
</p>
<p align="center"> 
    <img src="https://img.shields.io/github/issues-pr-closed/OpenLake/Centre-for-Career-Planning-and-Services-Portal
?color=success" alt="Pull Requests Merged" />
    <img src="https://img.shields.io/github/issues/OpenLake/Centre-for-Career-Planning-and-Services-Portal
?color=orange" alt="Open Issues" />
    <img src="https://img.shields.io/github/contributors/OpenLake/Centre-for-Career-Planning-and-Services-Portal
" alt="Contributors" />
</p>

---

## Repository Links
- **Main Repository:** [OpenLake](https://github.com/OpenLake)
- **This Project Repository:** [Centre-for-Career-Planning-and-Services-Portal](https://github.com/OpenLake/Centre-for-Career-Planning-and-Services-Portal)

---


## Table of Contents
1. [About the Project](#about-the-project) 
2. [Tech Stack](#tech-stack)  
3. [Architecture](#architecture)   
4. [Features](#features)  
5. [Project Structure](#project-structure)  
6. [Getting Started](#getting-started)  
7. [Maintainers](#maintainers)  
8. [Contributing](#contributing)  
9. [Contact](#contact)  

---

## About the Project
 [↥ Back to top](#table-of-contents)

The **Job Portal Application** is designed to simplify career development and job management for students, alumni, and CCPS professionals.

### Problems Being Solved
- **Job Search Complexity:** Advanced filters and personalized recommendations.
- **Application Tracking:** Monitor application status and updates.
- **Community Engagement:** Networking and alumni interactions.
- **Job Management:** Tools for job postings and placement analytics.
- **User Authentication:** Secure login and registration.

**Target Audience**
- Students (internships, jobs)
- CCPS Professionals (managing placements and analytics)
- Alumni (career guidance, referrals)

---

## Tech Stack 
[↥ Back to top](#table-of-contents)

- **Frontend**: React.js, Axios, React Hot Toast
- **Styling**: Tailwind CSS
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: MongoDB
- **Version Control**: Git and GitHub

---

## Architecture 
[↥ Back to top](#table-of-contents)

### Frontend
- **Components:** Reusable React components (auth, job management, community, analytics).
- **Pages:** Job listings, application status, analytics, community.
- **Styles:** Responsive design using CSS/styled-components.
- **Utils:** API helpers and constants.

### Backend
- **Services:** Business logic for jobs, applications, referrals, community, analytics.
- **Models:** Schemas for users, jobs, applications, referrals, community data.
- **Controllers:** API request handlers.
- **Routes:** Endpoints for jobs, applications, users, community, analytics.
- **Utils:** Database connection, middleware, logging.
- **Config:** Environment variables and secrets.
- **Server:** Initialization and setup.

---

## Features 
[↥ Back to top](#table-of-contents)

- **Job Feed:** Personalized recommendations, search, and filters.  
- **Job Posting Management:** Create, edit, delete jobs with expiry control.  
- **Application Tracking:** Submit, track, and update applications.  
- **Community Interaction:** Alumni connections, discussions, and referrals.  
- **Profile Management:** Edit personal info and preferences.  
- **Analytics & Reporting:** Job performance metrics and application trends.  

---


## Project Structure
[↥ Back to top](#table-of-contents)

```
Centre-for-Career-Planning-and-Services-Portal/
│
├── backend/                     # Node.js + Express backend
│   ├── assets/                  # Static files or uploads 
│   ├── config/                  # Database & app configuration 
│   ├── controllers/             # Functions handling API requests/responses
│   ├── middleware/              # Middleware 
│   ├── models/                  # Mongoose schemas & data models
│   ├── routes/                  # API routes mapping endpoints to controllers
│   ├── utils/                   # Utility/helper functions
│   ├── .env                     # Environment variables 
│   ├── .env.example             # Example env file for setup
│   ├── .gitignore               # Git ignore rules
│   ├── readme.md                # Backend-specific documentation
│   └── server.js                # Entry point for Express server
│
├── frontend/                    # React + Vite frontend
│   ├── public/                  # Static assets served directly
│   └── src/                     # React source code
│       ├── api/                 # API call functions
│       ├── assets/              # Images, icons, fonts
│       ├── components/          # Reusable UI components
│       ├── context/             # React Context
│       ├── pages/               # Page-level components
│       ├── services/            # Service functions 
│       ├── styles/              # Global styles 
│       ├── utils/               # Utility/helper functions for frontend
│       ├── App.jsx              # Root React component
│       ├── index.css            # Global CSS entry
│       └── main.jsx             # React entry file
│
├── .env                         # Environment variables 
├── .env.example                 # Example environment file
├── .gitignore                   # Ignore build artifacts, node_modules, env files
├── eslint.config.js             # ESLint configuration
├── index.html                   # Vite main HTML template
├── package.json                 # Root dependencies & scripts 
├── package-lock.json            # Lockfile for npm dependencies
├── postcss.config.js            # PostCSS config 
├── style.css                    # Global stylesheet
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.js               # Vite bundler config
└── README.md                    # Main project documentation

```

---


## Getting Started
[↥ Back to top](#table-of-contents)

### Prerequisites
- **Node.js**
- **npm**
- **MongoDB Atlas**
- **React.js**

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/OpenLake/Centre-for-Career-Planning-and-Services-Portal
   cd Centre-for-Career-Planning-and-Services-Portal\
   ```

2. **Set up the backend**:

   - Change to the backend directory:
     ```bash
     cd backend
     ```
   - Install backend dependencies:
     ```bash
     npm install
     ```
   - Set up environment variables:
     - Create a `.env` file in the `backend` directory.
     - Add the necessary environment variables as specified in the `.env.example` file.
   
   - Start the backend server:
     ```bash
     node server.js
     ```

3. **Set up the frontend**:

   - Open a new terminal and change to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install frontend dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

4. **Open the application in your browser**:
   - Navigate to `http://localhost:5173` to view the frontend application.
   - The backend server should be running on `http://localhost:5000` (or the port specified in your `.env` file).


   
---

## Maintainers
[↥ Back to top](#table-of-contents)

This project is maintained by:

- [Umap Utkarsh Sharac](https://github.com/UtkarshUmap)
- [Neil Chitale](https://github.com/Neil-ctrl)

---

## Contributing
[↥ Back to top](#table-of-contents)

We welcome contributions! Feel free to open an issue or submit a pull request. Before contributing, please make sure to:

1. Fork the repository.
2. Create a new branch.
3. Submit a pull request with your changes.

---

## Contact
[↥ Back to top](#table-of-contents)

If you have any questions or feedback, feel free to reach out to the maintainers.

