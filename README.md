# MAL-PERSONAL-DASHBOARD (malmetrics)

A sleek, modern, and personal dashboard to visualize your MyAnimeList (MAL) data and explore community statistics. Built with React, Vite, and Tailwind CSS, this application provides a dynamic and responsive user experience for tracking your anime-watching habits.

## ✨ Features

- **Personalized Dashboard**: View your own anime list statistics at a glance.
- **Seasonal Anime Browser**: Discover new and upcoming anime for the current and future seasons.
- **Advanced Scoring Analysis**: Dive deep into your scoring patterns and compare them with community averages.
- **Community & Franchise Insights**: Explore rankings, popular franchises, and community-wide statistics.
- **Dynamic Theming**: Switch between light and dark modes for comfortable viewing.
- **Internationalization**: Support for multiple languages.
- **Responsive Design**: A seamless experience across desktop and mobile devices.

## 🏛️ Software Architecture

The project follows a modern frontend architecture based on components, hooks, and a clear separation of concerns.

- **Framework**: [React](https://react.dev/) (with [Vite](https://vitejs.dev/)) for a fast and efficient development experience.
- **Routing**: [React Router](https://reactrouter.com/) (`HashRouter`) is used for all client-side routing.
- **State Management**:
  - **Client State**: [Zustand](https://github.com/pmndrs/zustand) is used for lightweight global state management (e.g., UI state).
  - **Server State**: [TanStack Query](https://tanstack.com/query/latest) handles all asynchronous operations, including data fetching, caching, and re-fetching from the MAL API.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) is used for utility-first styling, enabling rapid and consistent UI development.
- **Data Visualization**: [Recharts](https://recharts.org/) and [D3](https://d3js.org/) are used to create interactive and informative charts.
- **API Communication & CORS Resolution**: A dedicated API layer manages communication with the MyAnimeList API. To circumvent strict Cross-Origin Resource Sharing (CORS) restrictions without a proprietary backend, network requests are bifurcated algorithmically:
  - **Development**: Utilizes a Vite middleware proxy.
  - **Production**: Routes requests through a custom Serverless proxy deployed on Cloudflare Workers. This proxy acts strictly as a secure passthrough for the required `X-MAL-CLIENT-ID` header, ensuring data ingestion without exposing proprietary server infrastructure.

### Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── api/             # MyAnimeList API client and data fetching logic
│   ├── components/      # Reusable UI components (cards, layout, etc.)
│   ├── hooks/           # Custom React hooks for business logic
│   ├── locales/         # i18n translation files
│   ├── pages/           # Top-level page components for each route
│   ├── store/           # Zustand store for global client state
│   └── utils/           # Helper functions and utilities
├── .env.example         # Example environment variables (if any)
├── index.html           # Main HTML entry point
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration
```

### Security Model (Zero-Backend)

This system operates strictly under a Zero-Backend architecture (Client-Side Rendering). It does not rely on developer-owned servers for data processing or database storage.

- **Decentralized Authentication:** Cryptographic responsibility is delegated to the user. The application requires the user to input their own MyAnimeList `Client ID`.
- **Data Isolation:** The Client ID and all subsequent data fetched from the API are processed and stored exclusively in the user's local browser memory (`localStorage`). The Cloudflare Serverless proxy does not log, intercept, or store user credentials.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (or a compatible package manager like yarn or pnpm)
- A MyAnimeList API Client ID. You can get one by following the instructions on the [MAL API documentation](https://myanimelist.net/apiconfig).

### 1. Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/Afard-max/malmetrics.git
cd malmetrics
```

Install the required dependencies:

```bash
npm install
```

### 2. Authentication (Important!)

This project does **not** use a `.env` file for the MyAnimeList Client ID. Instead, it is configured directly within the application.

1.  Run the application locally:
    ```bash
    npm run dev
    ```
2.  The application will open to a login screen.
3.  Enter your **Username** and your **MAL Client ID** into the respective fields.
4.  The application will save these credentials to your browser's `localStorage` and grant you access to the dashboard.

### 3. Running the Application

After the initial setup, you can run the app at any time with:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Bundles the application for production.
- `npm run preview`: Serves the production build locally for testing.
- `npm run deploy`: Deploys the application to GitHub Pages.

---
