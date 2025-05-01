import { AppointmentScheduler } from "@/components/appointment-scheduler";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choisir un créneau - Système de Rendez-vous Hospitaliers",
  description:
    "Sélectionnez une date et un créneau horaire pour votre rendez-vous",
};

export default async function AppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ doctor: string }>;
}) {
  const doctorId = (await searchParams).doctor;

  return (
    <div className="px-4">
      <AppointmentScheduler doctorId={doctorId} />
    </div>
  );
}
