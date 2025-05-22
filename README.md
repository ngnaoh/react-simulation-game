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
   pnpm add -g supabase
   ```

   b. Start the local Supabase services:

   ```bash
   supabase start
   ```

   This will start a local Supabase instance with all services (PostgreSQL, Auth, Storage, etc.) running on your machine. The CLI will display URLs and credentials for your local Supabase services.

3. **Configure environment variables**

   Create a `.env` file in the project root with the following variables:

   ```
   VITE_SUPABASE_URL=http://127.0.0.1:54321
   VITE_SUPABASE_ANON_KEY=<your-local-anon-key-from-supabase-start-output>
   ```

   Create a `.env` file in the directory supabase/functions with the following variables:

   ```
   SUPABASE_URL=http://127.0.0.1:54321
   SUPABASE_SERVICE_ROLE_KEY=<your-local-service-role-key-from-supabase-start-output>
   ```

   Using command below to get environments of your local

   ```bash
   supabase status
   ```

4. **Start migration**

   a. Start migration

   ```bash
   supabase db reset
   ```

   b. Seed data

   make sure your service functions is running or do this

   ```bash
   supabase functions serve
   ```

   ```bash
   curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-admin-and-test-users' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

   The application will be available at http://localhost:5173
