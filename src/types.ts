export type CategoryId = 'A' | 'B' | 'C';

export type SubjectId =
  | 'matematika'
  | 'ipa_sains'
  | 'bahasa_inggris'
  | 'bahasa_indonesia';

export type ExamType = 'simulasi' | 'penyisihan' | 'final';

export type MedalType = 'Emas' | 'Perak' | 'Perunggu' | 'Honorable Mention' | 'Peserta';

export interface Question {
  id: string;
  category: CategoryId;
  subject: SubjectId;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  points: number; // default 5
}

export interface ExamSession {
  examType: ExamType;
  startedAt: string;
  finishedAt: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  violationsCount?: number;
}

export interface Participant {
  id: string; // e.g. OAN-2026-1042
  registeredAt: string; // ISO date string
  fullName: string;
  parentName: string;
  category: CategoryId;
  subject: SubjectId;
  grade: string;
  schoolName: string;
  city: string;
  province: string;
  whatsapp: string;
  email: string;
  socialFollowed: boolean;
  
  // Exam progress & scores
  simulationDone: boolean;
  simulationScore: number | null;
  simulationDate: string | null;

  preliminaryDone: boolean;
  preliminaryScore: number | null;
  preliminaryDate: string | null;
  isPassedPreliminary: boolean;

  finalTicketPaid: boolean;
  finalTicketPaidAt: string | null;
  paymentProofUrl?: string;

  finalDone: boolean;
  finalScore: number | null;
  finalDate: string | null;
  medal: MedalType | null;

  notes?: string;
}

export interface MetaPixelConfig {
  pixelId: string;
  customScript: string;
  isEnabled: boolean;
}

export interface ScheduleConfig {
  registrationDeadline: string;
  simulationStartDate: string;
  simulationEndDate: string;
  preliminaryDate: string;
  preliminaryAnnouncementDate: string;
  finalDate: string;
  finalAnnouncementDate: string;
  antiCheatEnabled: boolean;
}
