# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Running the Project Locally

### Prerequisites

- Node.js (v18 or newer)
- pnpm (recommended) or npm
- Supabase CLI

### Setup and Installation

1. **Clone the repository and install dependencies**

   ```bash
   git clone https://github.com/yourusername/finsimco-assignment.git
   cd finsimco-assignment
   pnpm install
   ```

2. **Set up Supabase locally**

   a. Install Supabase CLI if you haven't already:

   ```bash
   # With npm
   npm install -g supabase
   # With pnpm
   pnpm add -g supabase
   ```

   b. Start the local Supabase services:

   ```bash
   supabase start
   ```

   This will start a local Supabase instance with all services (PostgreSQL, Auth, Storage, etc.) running on your machine. The CLI will display URLs and credentials for your local Supabase services.

3. **Configure environment variables**

   Create a `.env.local` file in the project root with the following variables:

   ```
   VITE_SUPABASE_URL=http://127.0.0.1:54321
   VITE_SUPABASE_ANON_KEY=<your-local-anon-key-from-supabase-start-output>
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

   The application will be available at http://localhost:5173

### Using Cloud Supabase

To connect to a Supabase cloud project instead of running locally:

1. **Create a Supabase project**

   - Go to [Supabase](https://supabase.com) and sign up or log in
   - Create a new project and note the URL and API keys

2. **Configure environment variables for production**

   Update your `.env.local` file or create `.env.production` with your cloud Supabase details:

   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Deploy the database schema**

   Push your local migrations to your cloud project:

   ```bash
   supabase link --project-ref your-project-ref
   supabase db push
   ```

4. **Build and serve the production version**
   ```bash
   pnpm build
   pnpm preview
   ```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

```

The README.md now includes a "Running the Project Locally" section with:

1. Prerequisites
2. Detailed setup instructions for both local Supabase development and cloud Supabase usage
3. Environment variable configuration
4. Steps to start local development and deploy to production

This provides clear instructions for running the project with both local and cloud Supabase instances.
```
