import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are public (accessible without login)
const isPublicRoute = createRouteMatcher(["/", "/api/clerk"]);

export default clerkMiddleware((auth, req) => {
  // If the route is public, skip authentication
  if (isPublicRoute(req)) return;

  // Protect all other routes (requires user to be logged in)
  auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
