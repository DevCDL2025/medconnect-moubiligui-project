"use server";

import { AuthUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function createSession(userId: number) {
  // Génération d'un token unique
  const token = jwt.sign({ userID: userId }, "SECRET_KEY", {
    expiresIn: "2 days",
  });

  // Création de la session en base de données
  const session = await prisma.session.create({
    data: {
      token,
      utilisateur_id: userId,
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 semaine
    },
  });

  return session;
}

export async function deleteSession(token: string) {
  try {
    await prisma.session.delete({
      where: { token },
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de la session:", error);
  }
}

export async function validateSession(token: string): Promise<AuthUser | null> {
  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        utilisateur: {
          include: {
            Patient: { select: { id: true } },
            Medecin: { select: { id: true } },
            Receptionniste: { select: { id: true } },
          },
        },
      },
    });

    if (!session || session.expires_at < new Date()) {
      return null;
    }

    return {
      id: session.utilisateur_id,
      email: session.utilisateur.email,
      type: session.utilisateur.role,
      fullname: session.utilisateur.nom + " " + session.utilisateur.prenom,
      patientId: session.utilisateur.Patient?.id,
      medecinId: session.utilisateur.Medecin?.id,
      receptionnisteId: session.utilisateur.Receptionniste?.id,
    };
  } catch (error) {
    console.error("Erreur lors de la validation de la session:", error);
    return null;
  }
}
