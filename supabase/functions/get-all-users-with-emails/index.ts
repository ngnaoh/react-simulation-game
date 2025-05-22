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
    const { data, error } = await supabaseClient.auth.admin.listUsers();

    if (error) {
      console.error("Error fetching data in Edge Function:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        headers: corsHeaders,
        status: 500,
      });
    }

    return new Response(
      JSON.stringify(
        data.users.map((e) => ({
          id: e.id,
          email: e.email,
          username: e.user_metadata.username,
          permissions: e.user_metadata.permissions,
          created_at: e.created_at,
        }))
      ),
      {
        headers: corsHeaders,
        status: 200,
      }
    );
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

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/get-all-users-with-emails' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjU0MzIxL2F1dGgvdjEiLCJzdWIiOiJjOGM5MzU4ZC1jZTUzLTRiYzAtYjI4Yy1jZDRmZWJjNzc5NDgiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ3ODMxMzE2LCJpYXQiOjE3NDc4Mjc3MTYsImVtYWlsIjoidXNlci10ZWFtLTFAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NDc4Mjc3MTZ9XSwic2Vzc2lvbl9pZCI6ImUxOTI3NGM0LTZhOTQtNDhmZS1hMjgzLThjMTY2M2YxNmRhZSIsImlzX2Fub255bW91cyI6ZmFsc2V9.sPWYLXHT-Ul_jnAdLg3QwGwISsOL-Opm36njDqKvFoU' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
