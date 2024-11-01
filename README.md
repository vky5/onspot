
---

# OnSpot - Tech Knowledge Sharing Platform

OnSpot is a blog website designed for tech enthusiasts to share knowledge, insights, and discussions on various technology-related topics. Users can create and share blogs, interact with posts by liking and commenting, and enjoy a smooth experience powered by modern frontend and backend functionalities.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication:** Login and signup functionality.
- **Blog Management:** Create, read, update, and delete blogs.
- **Interaction Features:** Like and comment on blog posts.
- **Modern UI:** Built with a sleek, modern frontend design.

## Tech Stack
- **Frontend:** Vite, React, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **Auth:** Google Authentication, Firebase
- **Hosting:** TBD

## Environment Variables

To run this project, you will need to set the following environment variables in your `.env` file:

```plaintext
# Google OAuth
VITE_GOOGLE_CLIENT_ID=''

# Backend URL
VITE_BACKEND_URL='http://127.0.0.1:3000/api/v1'

# JWT Configuration
VITE_JWT_EXPIRES_IN=90

# Firebase Configurations
VITE_FIREBASE_API_KEY=""
VITE_AUTHDOMAIN=""
VITE_PROJECT_ID=""
VITE_STORAGE_BUCKET=""
VITE_MESSAGING_SENDER_ID=""
VITE_APP_ID=""
VITE_MEASURMENTID=""
```

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or later)
- **npm** (Node Package Manager)
- **MongoDB** (local instance or MongoDB Atlas)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/onspot.git
   ```
   
2. **Navigate into the Project Directory:**
   ```bash
   cd onspot
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add your environment variables as listed above.

### Running Locally

1. **Start the MongoDB Database:**
   Make sure MongoDB is running locally or set up a MongoDB Atlas database.

2. **Start the Backend Server:**
   Assuming you have the backend configured, start it:
   ```bash
   # In the backend directory
   npm run start
   ```

3. **Start the Frontend (Vite) Server:**
   ```bash
   npm run dev
   ```

4. **Open Your Browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

- Sign up or log in using Google authentication.
- Post your own blogs on tech topics, or browse blogs posted by others.
- Like and comment on blogs to engage with the community.

## Contributing

Contributions are welcome! If you’d like to make changes, please fork the repository and submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License.

--- 
