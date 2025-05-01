import Image from "next/image";
import { MapPin, Phone, Clock, Calendar, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Données fictives des médecins généralistes
const doctors = [
  {
    id: 1,
    name: "Dr. MOUNGA",
    image: "/doctor/12-1.jpg",
    speciality: "Médecin Généraliste",
    languages: ["Fang", "Kota"],
    availability: "Disponible aujourd'hui",
    phone: "+241 77630000",
  },
  {
    id: 2,
    name: "Dr. MAPANGOU",
    image: "/doctor/13-1.jpg",
    speciality: "Médecin Généraliste",
    languages: ["Fang", "Punu"],
    availability: "Disponible aujourd'hui",
    phone: "+241 77630000",
  },
  {
    id: 3,
    name: "Dr. MOUNIEVI Negg",
    image: "",
    speciality: "Médecin Généraliste",
    experience: "12 ans d'expérience",
    languages: ["Fang", "Punu"],
    availability: "Disponible aujourd'hui",
    phone: "+241 77630000",
  },
];

// Informations de la clinique
const clinicInfo = {
  name: "Centre Diagnostic de Libreville",
  address: "Carrefour Bessieux , Immeuble Cofina",
  phone: "077630000",
  email: "info@centre-diagnostic.com",
  hours: "Ouvert 24h/24, 7j/7",
};

export default function GeneralPractitionersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16 h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              Nos Médecins Généralistes
            </h1>
            <div className="text-2xl font-medium mb-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              Nos équipes sont prêtes à vous recevoir 24h/24 et 7j/7 sans prise
              de rendez-vous
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
              <div className="flex items-center justify-center gap-2 bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
                <Phone className="h-5 w-5" />
                <span className="font-semibold">{clinicInfo.phone}</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">{clinicInfo.address}</span>
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-center">
              <Link href="#more" scroll={true}>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  En savoir plus
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant={"ghost"}>
                  Retour
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Informations Section */}
      <section id="more" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-blue-50 p-6 rounded-xl flex flex-col items-center text-center">
                <Clock className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Disponibilité 24/7
                </h3>
                <p className="text-gray-600">
                  Nos médecins généralistes sont disponibles à tout moment, jour
                  et nuit, pour répondre à vos besoins médicaux urgents.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl flex flex-col items-center text-center">
                <Calendar className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sans rendez-vous</h3>
                <p className="text-gray-600">
                  Présentez-vous directement à notre centre médical sans avoir
                  besoin de prendre rendez-vous au préalable.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl flex flex-col items-center text-center">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Facilement accessible
                </h3>
                <p className="text-gray-600">
                  Notre centre médical est idéalement situé et facilement
                  accessible en transports en commun ou en voiture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors List Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Notre équipe de médecins généralistes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top
"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 hover:bg-green-600">
                      {doctor.availability}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {doctor.speciality}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {doctor.languages.map((language) => (
                      <Badge
                        key={language}
                        variant="outline"
                        className="bg-gray-100"
                      >
                        {language}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">{doctor.phone}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="w-full">Contacter</Button>
                    <Button variant="outline" className="w-full">
                      Plus d'infos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Notre localisation
            </h2>
            <div className="bg-gray-200 rounded-xl overflow-hidden h-96 mb-8">
              {/* Placeholder for map */}
              <div className="h-full w-full flex items-center justify-center bg-gray-300">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">
                    Carte interactive - {clinicInfo.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-2xl font-bold mb-4">
                  Informations de contact
                </h3>
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-gray-600">{clinicInfo.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-gray-600">{clinicInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Horaires</p>
                      <p className="text-gray-600">{clinicInfo.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
