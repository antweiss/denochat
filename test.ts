import { serve } from "https://deno.land/std/http/server.ts";

function handler( req: Request) {
  console.log(new URL(req.url).pathname); // POST


  return new Response(null, { status: 200 });
}

console.log("Listening on http://localhost:8000");
serve(handler);
