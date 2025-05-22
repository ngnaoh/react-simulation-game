// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", // Use the service role key here!
  {
    auth: {
      persistSession: false,
    },
  }
);

Deno.serve(async () => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Allows requests from any origin. For production, replace '*' with your specific frontend domain (e.g., 'https://your-app.com')
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE", // List all HTTP methods your function will accept
    "Access-Control-Allow-Headers":
      "Authorization, Content-Type, Accept, Range, x-client-info, apikey", // List all custom headers your client might send
    "Content-Type": "application/json", // Or 'text/plain' or whatever your function returns
  };

  try {
    await Promise.all([
      supabaseClient.auth.admin.createUser({
        email: "user-team-1@gmail.com",
        password: "test@123",
        email_confirm: true,
        user_metadata: {
          username: "user-team-1",
          permissions: "dashboard:view",
        },
      }),
      supabaseClient.auth.admin.createUser({
        email: "user-team-2@gmail.com",
        password: "test@123",
        email_confirm: true,
        user_metadata: {
          username: "user-team-2",
          permissions: "dashboard:view",
        },
      }),
      supabaseClient.auth.admin.createUser({
        email: "user-team-3@gmail.com",
        password: "test@123",
        email_confirm: true,
        user_metadata: {
          username: "user-team-3",
          permissions: "dashboard:view",
        },
      }),
      supabaseClient.auth.admin.createUser({
        email: "user-team-4@gmail.com",
        password: "test@123",
        email_confirm: true,
        user_metadata: {
          username: "user-team-4",
          permissions: "dashboard:view",
        },
      }),
      supabaseClient.auth.admin.createUser({
        email: "admin@gmail.com",
        password: "test@123",
        email_confirm: true,
        user_metadata: {
          username: "admin",
          permissions:
            "dashboard:view,dashboard:create,dashboard:edit,dashboard:delete",
        },
      }),
    ]);

    return new Response(JSON.stringify("Let's goooooooooo!"), {
      headers: corsHeaders,
      status: 200,
    });
  } catch (err) {
    console.error("Unhandled error in Edge Function:", err.message);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: corsHeaders,
      status: 500,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-admin-and-test-users' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
