// /middleware.ts

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./lib/auth";

// Définir les routes publiques (accessibles sans authentification)
const PUBLIC_ROUTES = [
  "/",
  "/appointment",
  "/auth/login",
  "/auth/register",
  "/forgot-password",
  "/reset-password",
];

// Middleware principal
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorer les ressources publiques ou statiques
  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  const isStatic = pathname.includes("/_next") || pathname.includes("/api/");

  if (isPublic || isStatic) {
    return NextResponse.next();
  }

  // Vérification du token de session
  const token = (await cookies()).get("session_token")?.value;

  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Récupération de l'utilisateur connecté
  const user = await getCurrentUser();
  const role = user?.type;

  // Vérification des autorisations selon le rôle de l'utilisateur
  const roleRouteMap: Record<string, string> = {
    patient: "/dashboard/patient",
    doctor: "/dashboard/doctor",
    reception: "/dashboard/reception",
    admin: "/dashboard/admin",
  };

  // Si l'utilisateur tente d'accéder à une route non autorisée
  const expectedPath = roleRouteMap[role ?? ""];
  if (expectedPath && !pathname.startsWith(expectedPath)) {
    return NextResponse.redirect(new URL(expectedPath, request.url));
  }

  return NextResponse.next();
}

// Configuration du middleware (exclure les fichiers statiques, images, API, etc.)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
