export type VerificationStatus = 'verified' | 'unverified' | 'needs_review';

export type DegreeLevel = 'Bachelor' | 'Master' | 'Doctorate' | 'Certificate' | 'Diploma';

export type ScholarshipCoverage = 'Full Ride' | 'Full Tuition' | 'Partial Tuition' | 'Living Stipend';

export type ApplicationStatus = 'Saved' | 'Preparing Docs' | 'Submitted' | 'Interview Scheduled' | 'Accepted' | 'Rejected';

export interface University {
  id: string;
  name: string;
  slug: string;
  country: string;
  city: string;
  websiteUrl: string;
  logoUrl?: string;
  description: string;
  rankingNational?: number;
  rankingGlobal?: number;
  isPublic: boolean;
  verificationStatus: VerificationStatus;
  verifiedAt: string;
  sourceUrl: string;
  programsCount?: number;
  featuredPrograms?: AcademicProgram[];
}

export interface AcademicProgram {
  id: string;
  universityId: string;
  universityName?: string;
  universityCountry?: string;
  title: string;
  degreeLevel: DegreeLevel;
  fieldOfStudy: string;
  languageOfInstruction: string;
  durationMonths: number;
  tuitionFeeAnnual: number;
  currency: string;
  applicationOpenDate?: string;
  applicationDeadline?: string;
  verificationStatus: VerificationStatus;
  verifiedAt: string;
  sourceUrl: string;
  requirements?: AdmissionRequirement[];
}

export interface AdmissionRequirement {
  id: string;
  programId: string;
  requirementType: 'Language Test' | 'Academic Record' | 'Document' | 'Prerequisite Course';
  title: string;
  description: string;
  isMandatory: boolean;
  acceptedQualifications: string[];
  verificationStatus: VerificationStatus;
}

export interface Scholarship {
  id: string;
  title: string;
  slug: string;
  providerName: string;
  targetCountries: string[];
  destinationCountries: string[];
  coverageType: ScholarshipCoverage;
  stipendAmountAnnual?: number;
  currency: string;
  eligibleDegrees: DegreeLevel[];
  applicationDeadline: string;
  applicationUrl: string;
  verificationStatus: VerificationStatus;
  verifiedAt: string;
  sourceUrl: string;
  description: string;
  requirementsList: string[];
}

export interface ApplicationTask {
  id: string;
  applicationId: string;
  taskTitle: string;
  isCompleted: boolean;
  dueDate?: string;
}

export interface UserApplication {
  id: string;
  userId: string;
  programId?: string;
  programTitle?: string;
  universityName?: string;
  scholarshipId?: string;
  scholarshipTitle?: string;
  providerName?: string;
  status: ApplicationStatus;
  notes?: string;
  targetDeadline: string;
  tasks: ApplicationTask[];
  updatedAt: string;
}

export interface StudentProfile {
  id: string;
  fullName: string;
  nationality: string;
  currentEducationLevel: string;
  baccalaureateTrack?: string;
  gpaAverage?: number;
  preferredDestinations: string[];
  maxAnnualBudget: number;
  languageSkills: Record<string, string>;
}
