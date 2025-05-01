"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Home, ArrowRight, Info } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  options?: Array<{
    label: string;
    value: string;
    action: () => void;
  }>;
};

type DoctorInfo = {
  id: string;
  name: string;
  specialty: string;
};

// Base de données des médecins
const doctors: Record<string, DoctorInfo> = {
  "dr-ngoua": {
    id: "dr-ngoua",
    name: "Dr. Jean-Baptiste Ngoua",
    specialty: "cardiology",
  },
  "dr-mbadinga": {
    id: "dr-mbadinga",
    name: "Dr. Léonie Mbadinga",
    specialty: "gynecology",
  },
  "dr-essono": {
    id: "dr-essono",
    name: "Dr. Paul Essono",
    specialty: "neurology",
  },
  "dr-owondo": {
    id: "dr-owondo",
    name: "Dr. Sarah Owondo",
    specialty: "pediatrics",
  },
  "dr-mboumba": {
    id: "dr-mboumba",
    name: "Dr. Daniel Mboumba",
    specialty: "surgery",
  },
  "dr-ndong": {
    id: "dr-ndong",
    name: "Dr. Marie Ndong",
    specialty: "dermatology",
  },
  "dr-biyoghe": {
    id: "dr-biyoghe",
    name: "Dr. Marc Biyoghé",
    specialty: "ophthalmology",
  },
  "dr-ntutume": {
    id: "dr-ntutume",
    name: "Dr. Laura Ntutume",
    specialty: "internal-medicine",
  },
  "dr-okoue": {
    id: "dr-okoue",
    name: "Dr. Jacques Okué",
    specialty: "radiology",
  },
  "dr-missambo": {
    id: "dr-missambo",
    name: "Dr. Amina Missambo",
    specialty: "infectiology",
  },
};

export function ChatInterface({ doctorId }: { doctorId: string }) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const doctor = doctors[doctorId] || {
    name: "notre spécialiste",
    specialty: "médecine",
  };

  // Fonction pour rediriger vers la page de choix de créneau
  const redirectToAppointment = () => {
    router.push(`/appointment/new/appointment?doctor=${doctorId}`);
  };

  // Fonction pour rediriger vers la page d'information sur les généralistes
  const redirectToGeneralPractitionerInfo = () => {
    router.push("/general-practitioner-info");
  };

  // Fonction pour ajouter un message utilisateur
  const addUserMessage = (content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  // Fonction pour passer à la question suivante
  const goToNextQuestion = (userResponse: string) => {
    // Ajouter la réponse de l'utilisateur
    addUserMessage(userResponse);

    // Attendre un peu pour simuler un délai de réponse
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 500);
  };

  // Définition des questions en dehors des effets pour une meilleure organisation
  const questions = [
    {
      id: "welcome",
      content: `Bonjour ! 👋 Je suis votre assistant virtuel. Je vais vous poser quelques questions pour préparer votre rendez-vous avec ${doctor.name} en ${doctor.specialty}.`,
      delay: 0,
    },
    {
      id: "question-1",
      content: "Êtes-vous déjà suivi par un spécialiste ? 🩺",
      delay: 1000,
      options: [
        {
          label: "Oui",
          value: "Oui",
          action: () => {
            goToNextQuestion("Oui");
            redirectToAppointment();
          },
        },
        {
          label: "Non",
          value: "Non",
          action: () => goToNextQuestion("Non"),
        },
      ],
    },
    {
      id: "question-2",
      content: "Avez-vous été orienté par un médecin généraliste ? 📋",
      options: [
        {
          label: "Oui",
          value: "Oui",
          action: () => {
            goToNextQuestion("Oui");
            redirectToAppointment();
          },
        },
        {
          label: "Non",
          value: "Non",
          action: () => goToNextQuestion("Non"),
        },
      ],
    },
    {
      id: "question-3",
      content: "Venez-vous de vous-même ? 🤔",
      options: [
        {
          label: "Oui",
          value: "Oui",
          action: () => goToNextQuestion("Oui"),
        },
        {
          label: "Non",
          value: "Non",
          action: () => goToNextQuestion("Non"),
        },
      ],
    },
    {
      id: "recommendation",
      content:
        "Nous vous recommandons de consulter d'abord un médecin généraliste. Nos généralistes sont disponibles 24h/24 et peuvent vous orienter vers le bon spécialiste si nécessaire. ⏰",
      options: [
        {
          label: "Voir les généralistes",
          value: "info",
          action: redirectToGeneralPractitionerInfo,
        },
        {
          label: "Continuer quand même",
          value: "continue",
          action: redirectToAppointment,
        },
      ],
    },
  ];

  // Effet pour afficher les messages initiaux
  useEffect(() => {
    // Message de bienvenue
    const welcomeMessage: Message = {
      id: questions[0].id,
      content: questions[0].content,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);

    // Afficher la première question après un court délai
    const timer = setTimeout(() => {
      const firstQuestion: Message = {
        id: questions[1].id,
        content: questions[1].content,
        sender: "bot",
        timestamp: new Date(),
        options: questions[1].options,
      };
      setMessages((prev) => [...prev, firstQuestion]);
    }, questions[1].delay);

    return () => clearTimeout(timer);
  }, [doctor.name, doctor.specialty]);

  // Effet pour afficher les questions suivantes en fonction de l'étape actuelle
  useEffect(() => {
    if (currentStep > 0 && currentStep < questions.length - 1) {
      const questionIndex = currentStep + 1;
      const currentQuestion = questions[questionIndex];

      const timer = setTimeout(() => {
        const newMessage: Message = {
          id: currentQuestion.id,
          content: currentQuestion.content,
          sender: "bot",
          timestamp: new Date(),
          options: currentQuestion.options,
        };
        setMessages((prev) => [...prev, newMessage]);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Effet pour scroller vers le bas quand les messages changent
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="flex flex-col h-[600px]">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Assistant Virtuel
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-0">
          <ScrollArea className="h-[calc(100%-2rem)] px-4">
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.sender === "user"
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-primary flex items-center justify-center text-white">
                      {message.sender === "user" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.content}

                      {message.options && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {message.options.map((option) => (
                            <Button
                              key={option.value}
                              variant={
                                option.value === "info" ? "outline" : "default"
                              }
                              size="sm"
                              onClick={option.action}
                              className="gap-2"
                            >
                              {option.value === "info" && (
                                <Info className="h-4 w-4" />
                              )}
                              {option.value === "continue" && (
                                <ArrowRight className="h-4 w-4" />
                              )}
                              {option.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4 justify-center">
          <p className="text-sm text-muted-foreground">
            Veuillez répondre aux questions ci-dessus pour continuer
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
