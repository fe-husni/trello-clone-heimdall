// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// definisi route publik (setara `publicRoutes` + `auth.isPublicRoute`)
const isPublicRoute = createRouteMatcher([
  "/",              // landing
  "/sign-in(.*)",   // sign-in
  "/sign-up(.*)",   // sign-up
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId, redirectToSignIn } = await auth();
  const pathname = req.nextUrl.pathname;
  const isPublic = isPublicRoute(req);

  // User belum login & route bukan public → paksa ke sign-in
  if (!userId && !isPublic) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // User sudah login & sedang di route public (misal "/")
  //    → arahkan ke select-org / organization/:id
  if (userId && isPublic) {
    let path = "/select-org";

    if (orgId) {
      path = `/organization/${orgId}`;
    }

    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection);
  }

  // User login tapi belum punya org, dan bukan di /select-org
  //    → paksa ke /select-org (flow pilih org)
  if (userId && !orgId && pathname !== "/select-org") {
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
