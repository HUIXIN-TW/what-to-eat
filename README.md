# Lunch Options App: WhatToEat

The WhatToEat App is a web application designed to help users discover and choose lunch options with ease. Built with React, Next.js, and MongoDB, it offers a simple interface where users can click a span to view a curated list of lunch options. This guide will cover how to set up the project, run it locally, and navigate its features.

## Features

- **View Lunch Options:** Users can view a list of available lunch options by clicking a specific UI element.
- **User Authentication:** Secure login functionality for multiple users to access personalized lunch options.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technology Stack

- **Frontend:** React.js, Next.js
- **Backend:** Node.js, Next.js API Routes
- **Database:** MongoDB
- **Authentication:** NextAuth.js (Optional for extended functionality)
- **Styling:** CSS Modules (or Tailwind CSS, styled-components, etc., if used)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v12.x or higher)
- npm (v6.x or higher) or yarn
- MongoDB (Local setup or MongoDB Atlas account)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HUIXIN-TW/WhatToEat.git
cd WhatToEat
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file at the root of your project and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Navigate to `http://localhost:3000` in your browser to see the app running.

## Usage

- **Viewing Lunch Options:** Simply click on the "Show Lunch Options" span on the homepage to display the list of available lunch options.
- **User Authentication:** (If implemented) Use the login/logout buttons to authenticate. Once logged in, you will see personalized lunch options based on your preferences.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
