// /middleware.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateSession } from "./actions/auth/session";
import { getCurrentUser } from "./lib/auth";

// Configuration des routes protégées par rôle
const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/forgot-password",
  "/reset-password",
  "/",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si la route est publique ou si c'est une ressource statique
  if (
    publicRoutes.some((route) => pathname.startsWith(route)) ||
    pathname.includes("/_next") ||
    pathname.includes("/api/")
  ) {
    return NextResponse.next();
  }

  // Récupérer le token et vérifier l'authentification
  const token = (await cookies()).get("session_token")?.value;

  // Si pas authentifié, rediriger vers la connexion
  if (!token) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // Vérifier les accès selon les rôles
  const user = await getCurrentUser();

  const role = user?.type;

  // Vérifier si l'utilisateur tente d'accéder à une route non autorisée
  if (
    (pathname.startsWith("/dashboard/patient") && role !== "patient") ||
    (pathname.startsWith("/dashboard/doctor") && role !== "doctor") ||
    (pathname.startsWith("/dashboard/reception") && role !== "reception") ||
    (pathname.startsWith("/dashboard/admin") && role !== "admin")
  ) {
    // Rediriger vers la page d'accueil correspondant au rôle
    switch (role) {
      case "patient":
        return NextResponse.redirect(
          new URL("/dashboard/patient", request.url)
        );
      case "doctor":
        return NextResponse.redirect(new URL("/dashboard/doctor", request.url));
      case "reception":
        return NextResponse.redirect(
          new URL("/dashboard/reception", request.url)
        );
      case "admin":
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      default:
        return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// Configurer les routes sur lesquelles le middleware sera exécuté
export const config = {
  matcher: [
    // Exclure les ressources statiques
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
