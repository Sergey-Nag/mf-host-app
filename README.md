# E-Shop (host) Next.js Application

This repository contains the source code for an E-Shop built using Next.js.
- [Admin panel](https://github.com/Sergey-Nag/mf-admin-app) (Microfrontend app)
- [API Server](https://github.com/Sergey-Nag/cms-data-api) (GraphQL and REST API server)


## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Sergey-Nag/mf-host-app.git
   cd e-shop-next
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

## Available Scripts

### `npm run dev`

Run the application in development mode using the custom server. This script launches the server defined in `server.js` with the configured `/admin` route that renders the SPA Microfrontend React app.

```bash
npm run dev
```

### `npm run next:dev`

Run the Next.js development server.

```bash
npm run next:dev
```

### `npm run build`

Build the Next.js application for production.

```bash
npm run build
```

### `npm run start`

Start the built Next.js application in production mode.

```bash
npm run start
```

### `npm run lint`

Lint the project using Next.js linting.

```bash
npm run lint
```

### `npm run generate-types`

Generate types using GraphQL code generation. This script uses the configuration defined in `codegen.ts`. (The API Server must be running)

```bash
npm run generate-types
```

## Configuration

The application is configured to launch with a custom server defined in `server.js`. This server handles the `/admin` route, rendering the SPA Microfrontend React app.

### Microfrontend Admin Panel App

For the admin panel, we utilize the [Admin Microfrontend app](https://github.com/Sergey-Nag/mf-admin-app). Ensure it is built and running to access the `/admin` route.

### API Server App

To work with data, you need to run the [API Server app](https://github.com/Sergey-Nag/cms-data-api) first.
