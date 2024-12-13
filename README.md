# AppExert - Hire Web App Revamp

This is a [Next.js](https://nextjs.org) project for revamping the AppExert Hire web application. The project is bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and is a work in progress. Documentation will be updated as the project grows.

## Getting Started

To get a local copy of the project up and running, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 18 or higher recommended)

- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/) or [bun](https://bun.sh/)

### Installation

1\. **Clone the repository:**

   ```bash

   git clone https://github.com/yourusername/hire-web-app-revamp.git

   ```

2\. **Navigate to the project directory:**

   ```bash

   cd hire-web-app-revamp

   ```

3\. **Install dependencies:**

   Using npm:

   ```bash

   npm install

   ```

   Or using yarn:

   ```bash

   yarn install

   ```

   Or using pnpm:

   ```bash

   pnpm install

   ```

4\. **Set up environment variables:**

   Create a

.env.local

 file in the root directory and add any necessary environment variables. At a minimum, you may need to set up the

NEXT_PUBLIC_API_URL

 variable:

   ```env

   NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

   ```

   Adjust the URL as needed for your API server.

### Running the Development Server

Start the development server:

Using npm:

```bash

npm run dev

```

Or using yarn:

```bash

yarn dev

```

Or using pnpm:

```bash

pnpm dev

```

Or using bun:

```bash

bun dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

The app supports hot reloading, so any changes you make to the code will automatically refresh the page.

## Project Structure

The project follows the Next.js App Router paradigm, with the main application code located in the

app

 directory.

```bash

├── app/

│   ├── (admin)/

│   ├── (auth)/

│   ├── fonts/

│   ├── globals.css

│   ├── layout.tsx

│   ├── page.tsx

│   └── providers.tsx

├── components/

│   ├── ui/

├── config/

│   └── api.ts

├── hooks/

├── lib/

├── services/

├── public/

├── types/

├── .env.local

├── .eslintrc.json

├── .gitignore

├── middleware.ts

├── next.config.mjs

├── package.json

├── postcss.config.mjs

├── tailwind.config.ts

└── tsconfig.json

```

### Key Directories and Files

app

: Contains the Next.js application pages, layouts, and components grouped by route segments.

  - `(admin)/`: Admin-specific routes and pages.

  - `(auth)/`: Authentication-related routes and pages.

  -

globals.css

: Global CSS styles.

  -

layout.tsx

: Root layout file that wraps all pages.

  -

providers.tsx

: Context and provider components.

components

: Reusable UI components.

  - `ui/`: UI-specific components, often built using Radix UI and Tailwind CSS.

config

: Configuration files for the application.

  -

api.ts

: API configuration with endpoints and base URLs.

hooks

: Custom React hooks.

lib

: Utility libraries and helper functions.

services

: API service functions for data fetching and mutations.

public

: Static assets like images and fonts.

types

: TypeScript type definitions and interfaces.

middleware.ts

: Next.js middleware for handling requests.

tailwind.config.ts

: Tailwind CSS configuration file.

tsconfig.json

: TypeScript configuration file.

## Core Technologies and Packages

- **Next.js**: React framework for server-rendered applications and static websites.

- **React**: JavaScript library for building user interfaces.

- **TypeScript**: Superset of JavaScript that adds static type definitions.

- **Tailwind CSS**: Utility-first CSS framework for rapidly building custom user interfaces.

- **React Hook Form**: For building performant and flexible forms with React.

- **Radix UI**: Unstyled, accessible components for building high-quality design systems and web apps.

- **Class Variance Authority (CVA)**: For creating style variants with Tailwind CSS.

- **clsx**: Utility for constructing

className

 strings conditionally.

- **Lucide Icons**: Icon library for React applications.

- **Axios**: Promise-based HTTP client for making API requests.

- **React Query (TanStack Query)**: Data fetching library for React providing caching, synchronization, and other features.

- **Zustand**: Small, fast, and scalable state management solution.

- **Zod**: TypeScript-first schema validation with static type inference.

- **Shadcn/UI**: Library for generating UI components built with Radix UI and Tailwind CSS.

## Development Workflow

- **Linting**: The project uses ESLint for linting. Run `npm run lint` to check for linting errors.

- **Type Checking**: TypeScript is used for static type checking.

- **Styling**: Tailwind CSS is used for styling components.

- **API Interaction**: Axios and React Query are used for data fetching and caching.

## Contributing

As this project is a work in progress, contributions are welcome. Please follow the standard GitHub flow:

1\. Fork the repository.

2\. Create a new branch for your feature or bugfix.

3\. Commit your changes to the branch.

4\. Open a pull request to the main repository.

## Future Updates

Documentation and features are continually being updated. Please check back regularly for updates.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please open an issue or contact the project maintainers.

---

This README provides the necessary steps for cloning and running the project locally and gives an overview of the project's structure and core technologies used.