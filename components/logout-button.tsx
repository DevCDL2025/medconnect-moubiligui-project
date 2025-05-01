"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton({ className }: { className: string }) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <Button variant="ghost" onClick={handleLogout} className={cn(className)}>
      <LogOut className="h-5 w-5" />
      Déconnexion
    </Button>
  );
}
