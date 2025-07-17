# AuraGrove - EcoChic E-Commerce Platform

Welcome to AuraGrove, a modern e-commerce application built with a focus on sustainability and ethical products. This project serves as a showcase for a beautiful, responsive, and feature-rich online store.

## About The Project

AuraGrove is a curated marketplace for conscious consumers. The platform allows users to browse and purchase a variety of eco-friendly products, from apparel to home goods. Key features include:

- **Product Discovery**: A clean, filterable shop page to easily find products by category, brand, and sustainability score.
- **AI-Powered Suggestions**: An intelligent assistant on the product detail page that suggests more sustainable alternatives.
- **3D Eco-Concept Studio**: A unique feature where users can describe a sustainable product idea and see an AI-generated 3D rendering of it.
- **User Authentication**: Secure user sign-up and login using Firebase Authentication.
- **Community Forum**: A space for users to connect, ask questions, and share their sustainability journey.
- **Full E-commerce Flow**: Complete shopping cart, multi-step checkout with multiple payment options, and user account management.

## Tech Stack

This project is built with a modern, production-ready technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (using the App Router)
- **UI Library**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) (for product suggestions and image generation)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en) (version 18 or later) and npm installed on your machine.

### Installation

1.  **Clone the repository** (or download the project files).
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install NPM packages**.
    ```sh
    npm install
    ```

3.  **Set up environment variables**.
    Create a new file named `.env` in the root of your project and add your Firebase project configuration. You can get these from your Firebase project settings.

    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

### Running the Application

This application requires two separate processes to run concurrently in development: the Next.js frontend and the Genkit AI flows.

1.  **Run the Next.js development server**:
    Open a terminal and run:
    ```sh
    npm run dev
    ```
    This will start the web application on [http://localhost:3000](http://localhost:3000).

2.  **Run the Genkit development server**:
    Open a *second* terminal and run:
    ```sh
    npm run genkit:dev
    ```
    This will start the Genkit development UI, which allows you to inspect and test your AI flows.

You can now open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
