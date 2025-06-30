# Glimmora: AI for Rapid Humanitarian Relief 🧡

> Glimmora is a groundbreaking AI-native platform built in **Next.js**. It's designed for humanitarian relief, predicting refugee needs, mapping critical situations in real-time, coordinating aid distribution, and ensuring fairness in crisis response.


---

## ✨ Key Features

Glimmora provides a suite of powerful AI tools designed to maximize the impact of humanitarian relief efforts.

-   **🤖 AI-Powered Needs Prediction:** Analyzes real-time data from social media and news to accurately forecast refugee needs for food, shelter, and medical supplies.
-   **🗺️ Real-Time Relief Map:** Visualizes refugee clusters, aid points, and critical incidents on an interactive map, complete with dynamic route calculation using Dijkstra's algorithm.
-   **🚚 Coordinated Aid Delivery:** Tracks the status of aid deliveries, optimized for speed and efficiency.
-   **🛡️ AI Fairness & Ethics Audit:** Employs an adversarial AI to continuously monitor aid distribution, ensuring it is equitable, unbiased, and compliant with privacy policies like GDPR.
-   **🗣️ Multilingual Voice Chatbot (Eevee):** Provides critical information to refugees via a voice-based assistant, even in low-connectivity scenarios, by converting text-to-speech.
-   **🚨 Automated Alerts:** A real-time log of all alerts dispatched to volunteers and coordinators.

## 🛠️ Tech Stack

Glimmora is built with a modern, AI-first technology stack:

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **UI:** [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/)
-   **Generative AI:** [Google Genkit](https://firebase.google.com/docs/genkit), [Gemini Models](https://deepmind.google/technologies/gemini/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Deployment:** [Vercel Hosting](https://vercel.com/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   A Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jadesamlee/glimmora.git
    cd glimmora
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of your project and add your Google AI API key.

    ```env
    # .env
    GOOGLE_API_KEY=your_google_api_key_here
    ```

4.  **Run the development servers:**

    The application requires two processes to run concurrently: the Next.js frontend and the Genkit AI flows.

    -   **In Terminal 1, start the Next.js app:**
        ```bash
        npm run dev
        ```
        This will start the frontend, typically on `http://localhost:9002`.

    -   **In Terminal 2, start the Genkit development flow server:**
        ```bash
        npm run genkit:watch
        ```
        This starts the Genkit server, which listens for requests from the Next.js application to run AI flows.

You can now open the Next.js URL in your browser to see the application.

## 📂 Project Structure

The codebase is organized to separate concerns and make navigation intuitive.

```
/
├── src/
│   ├── ai/
│   │   ├── flows/           # Core Genkit AI flows (e.g., needs prediction, mapping)
│   │   └── genkit.ts        # Genkit configuration
│   ├── app/
│   │   ├── (authed)/        # Authenticated routes and layouts for the dashboard
│   │   ├── login/           # Login page
│   │   ├── globals.css      # Global styles and Tailwind directives
│   │   └── layout.tsx       # Root layout
│   ├── components/
│   │   ├── dashboard/       # High-level components for each feature page
│   │   ├── ui/              # Reusable ShadCN UI components
│   │   └── logo.tsx         # App logo SVG component
│   ├── hooks/               # Custom React hooks (e.g., useToast)
│   └── lib/                 # Utility functions and static mock data
├── DOCUMENTATION.md         # Detailed, in-depth feature documentation
├── next.config.ts           # Next.js configuration
└── package.json             # Project dependencies and scripts
```
