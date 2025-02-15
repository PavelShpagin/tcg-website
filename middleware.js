import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // retrieve the current response
  const res = await updateSession(request);

  // add the CORS headers to the response
  res.headers.append('Access-Control-Allow-Credentials', "true");
  res.headers.append('Access-Control-Allow-Origin', '*'); // replace this with your actual origin
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
