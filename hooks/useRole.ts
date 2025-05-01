"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Hook pour rediriger l'utilisateur s'il n'a pas le rôle requis
 * @param allowedRoles Tableau des rôles autorisés
 * @param redirectTo Chemin de redirection si rôle non autorisé (défaut: basé sur le rôle de l'utilisateur)
 */
export function useRequireRole(
  allowedRoles: Array<"patient" | "doctor" | "receptionniste" | "admin">,
  redirectTo?: string
) {
  const { user, loading, redirectToRoleHome } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (!allowedRoles.includes(user.type)) {
        if (redirectTo) {
          router.push(redirectTo);
        } else {
          redirectToRoleHome();
        }
      }
    }
  }, [user, loading, router, redirectToRoleHome, allowedRoles, redirectTo]);

  return {
    user,
    loading,
    hasRequiredRole: user && allowedRoles.includes(user.type),
  };
}

/**
 * Hook pour vérifier si l'utilisateur peut accéder à une fonctionnalité spécifique
 * @param checkFn Fonction de vérification personnalisée
 * @returns Si l'utilisateur a accès à la fonctionnalité
 */
export function usePermission(
  checkFn: (user: NonNullable<ReturnType<typeof useAuth>["user"]>) => boolean
) {
  const { user } = useAuth();

  if (!user) {
    return false;
  }

  return checkFn(user);
}
