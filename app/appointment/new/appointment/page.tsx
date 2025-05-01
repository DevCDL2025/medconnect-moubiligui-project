import { AppointmentScheduler } from "@/components/appointment-scheduler";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choisir un créneau - Système de Rendez-vous Hospitaliers",
  description:
    "Sélectionnez une date et un créneau horaire pour votre rendez-vous",
};

export default function AppointmentPage({
  searchParams,
}: {
  searchParams: { doctor: string };
}) {
  const doctorId = searchParams.doctor || "";

  return (
    <div className="py-12 px-4">
      <AppointmentScheduler doctorId={doctorId} />
    </div>
  );
}
