# SwapEx - Social Trading Platform

## Overview

**SwapEx** is a hands-on project aimed at building a social trading platform that promotes **barter exchange** and facilitates **communication** between users. It serves as a space where users can list items for trade, communicate with each other, and exchange goods directly through a barter system. The platform is designed with user experience and scalability in mind, focusing on **database design** and **query workflow** to handle real-time data and user interactions efficiently.

## Technologies Used

- **React.js**: For building the user interface and handling the user interactions.
- **TypeScript**: Provides type safety throughout the codebase for easier debugging and scalability.
- **Vite**: For fast development with optimized builds and a smooth developer experience.
- **Shadcn**: Component library for flexible and modern UI design.
- **Tailwind CSS**: Utility-first CSS framework for styling with ease and consistency.
- **Appwrite**: Backend-as-a-Service for database management, user authentication, and real-time features.
- **Tanstack Query**: For managing asynchronous data fetching, caching, and synchronization with the backend.

## Core Features

1. **User Profiles**: Each user has a detailed profile with personal information, listed products, and items available for barter.
2. **Barter Exchange**: Users can propose and accept trade deals, which promotes a direct exchange system for goods.
3. **Real-time Communication**: Users can chat with each other to negotiate deals and discuss trades.
4. **Product Listings**: A marketplace-like feature where users can list items they are willing to barter.
5. **Advanced Search and Filters**: Find specific products based on categories, conditions, and user preferences.

## Database and Query Workflow

The key strength of SwapEx lies in the design of its **database** and the efficient use of **Tanstack Query** for interacting with the Appwrite backend. The database design ensures that:

- **Efficient storage of user data and chat history**.
- **Optimized queries** to fetch relevant data in real-time (e.g., latest messages, user chats).
- **Caching mechanisms** to improve the performance and minimize unnecessary requests to the backend.

## Getting Started

To run this project locally, follow the steps below:

1. Clone the repository:
   ```bash
   git clone https://github.com/username/swappex.git
   cd swappex
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Appwrite as your backend service and configure the environment variables.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```bash
   http://localhost:5173
   ```

## Future Improvements

- **Mobile Optimization**: Enhance the mobile experience for seamless trading on the go.
- **Notification System**: Notify users about new messages or barter requests.
- **Expanded Marketplaces**: Integrate additional features such as wishlist matching and AI-powered recommendations.

---

SwapEx is a complete attempt to bridge communication with the power of barter exchanges, blending modern technology with seamless trading experiences.