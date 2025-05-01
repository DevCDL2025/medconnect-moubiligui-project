"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authenticateUser, AuthUser, getCurrentUser } from "@/lib/auth";
import { logout as out, login as log } from "@/actions/auth/login";

// Définition des types
type UtilisateurType = "patient" | "doctor" | "receptionniste" | "admin";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isPatient: boolean;
  isMedecin: boolean;
  isReceptionniste: boolean;
  isAdmin: boolean;
  redirectToRoleHome: () => void;
}

// Création du context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Récupérer l'utilisateur au chargement du composant
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        setError("Erreur lors du chargement de l'utilisateur");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userData = await authenticateUser(email, password);
      if (!userData) {
        throw new Error("Une erreur est survenue lors de la connexion");
      }
      setUser(userData);
      router.push(`/dashboard/${userData.type}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue lors de la connexion");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    setLoading(true);
    try {
      await out();
      setUser(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue lors de la déconnexion");
      }
    } finally {
      setLoading(false);
    }
  };

  // Rediriger l'utilisateur vers sa page d'accueil selon son rôle
  const redirectToRoleHome = () => {
    if (!user) return;
    switch (user.type) {
      case "patient":
        router.push("/dashboard/patient");
        break;
      case "doctor":
        router.push("/dashboard/doctor");
        break;
      case "reception":
        router.push("/dashboard/reception");
        break;
      case "admin":
        router.push("/admin/dashboard");
        break;
      default:
        router.push("/");
        break;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    isPatient: user?.type === "patient",
    isMedecin: user?.type === "doctor",
    isReceptionniste: user?.type === "reception",
    isAdmin: user?.type === "admin",
    redirectToRoleHome,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
// HOC pour protéger les routes nécessitant une authentification
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const { user, loading, redirectToRoleHome } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/auth/login");
      }
    }, [user, loading, router]);

    if (loading) {
      return <div>Chargement...</div>;
    }

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
}
// HOC pour limiter l'accès à un rôle spécifique
export function withRole<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles: UtilisateurType[]
): React.FC<P> {
  const RoleProtectedComponent: React.FC<P> = (props) => {
    const { user, loading, redirectToRoleHome } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push("/auth/login");
        } else if (
          user &&
          !allowedRoles.includes(user.type as UtilisateurType)
        ) {
          redirectToRoleHome();
        }
      }
    }, [user, loading, router, redirectToRoleHome]);

    if (loading) {
      return <div>Chargement...</div>;
    }

    if (!user || !allowedRoles.includes(user.type as UtilisateurType)) {
      return null;
    }

    return <Component {...props} />;
  };

  return RoleProtectedComponent;
}
