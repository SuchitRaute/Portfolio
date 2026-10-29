export type ProjectStatus = "Concept" | "In progress" | "Completed";

export type Project = {
  title: string;
  description: string;
  stack: string[];
  features: string[];
  status: ProjectStatus;
  github?: string;
  demo?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    title: "IT Helpdesk & Ticket Management System",
    description:
      "A practical helpdesk workflow for creating, assigning, prioritizing, and resolving support tickets.",
    stack: [],
    features: [
      "Ticket creation",
      "Technician assignment",
      "Priority and status tracking",
      "Resolution history",
    ],
    status: "In progress",
  },
  {
    title: "Expense Tracker",
    description:
      "An expense-tracking application built with a modern full-stack TypeScript toolkit.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Recharts"],
    features: [],
    status: "In progress",
  },
  {
    title: "CortexX",
    description:
      "An AI email threat detection and forensic intelligence concept.",
    stack: [],
    features: ["Email parsing", "IOC extraction", "Security analysis"],
    status: "Concept",
  },
  {
    title: "FinSight AI",
    description:
      "A concept for financial health, business credit, and loan-readiness for MSMEs.",
    stack: [],
    features: [],
    status: "Concept",
  },
  {
    title: "Amazon Clone",
    description: "A frontend e-commerce interface.",
    stack: [],
    features: [],
    status: "Completed",
  },
];
