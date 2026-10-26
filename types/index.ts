export type DataQualityState =
  | 'DISCOVERED'
  | 'UNVERIFIED'
  | 'PARTIALLY_VERIFIED'
  | 'VERIFIED'
  | 'OUTDATED'
  | 'CONFLICTED'
  | 'REJECTED'
  | 'DEMO_ONLY';

export type ReviewStatus = 'pending_review' | 'approved' | 'rejected' | 'draft' | 'deferred';

export type ResearchTaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';

export type SourceType = 'official_website' | 'government_portal' | 'admissions_portal' | 'third_party';

export type VerificationStatus = 'verified' | 'unverified' | 'needs_review';

export type DegreeLevel = 'Bachelor' | 'Master' | 'Doctorate' | 'Certificate' | 'Diploma';

export type ScholarshipCoverage = 'Full Ride' | 'Full Tuition' | 'Partial Tuition' | 'Living Stipend';

export type ApplicationStatus = 'Saved' | 'Preparing Docs' | 'Submitted' | 'Interview Scheduled' | 'Accepted' | 'Rejected';

export interface ClaimEvidence {
  id: string;
  proposedRecordId?: string;
  entityType: 'university' | 'program' | 'scholarship';
  entityId?: string;
  fieldName: string;
  claimValue: string;
  sourceUrl: string;
  sourceTitle: string;
  sourceType: SourceType;
  evidenceExcerpt: string;
  academicCycle: string;
  verificationStatus: DataQualityState;
  verifiedAt: string;
}

export interface ProposedRecord {
  id: string;
  taskId?: string;
  entityType: 'university' | 'program' | 'scholarship';
  existingEntityId?: string;
  proposedData: Record<string, any>;
  verificationStatus: DataQualityState;
  reviewStatus: ReviewStatus;
  rejectionReason?: string;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  claimEvidences: ClaimEvidence[];
}

export interface ResearchTask {
  id: string;
  instruction: string;
  taskType: string;
  status: ResearchTaskStatus;
  targetInstitution?: string;
  targetCountry: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  logs?: ResearchTaskLog[];
  proposedRecords?: ProposedRecord[];
}

export interface ResearchTaskLog {
  id: string;
  taskId: string;
  logLevel: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface AdminAuditLog {
  id: string;
  adminUserId?: string;
  actionType: string;
  targetEntityType: string;
  targetEntityId?: string;
  changesDiff: Record<string, any>;
  timestamp: string;
}

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
  dataQualityState?: DataQualityState;
  verifiedAt: string;
  sourceUrl: string;
  programsCount?: number;
  featuredPrograms?: AcademicProgram[];
  claimEvidences?: ClaimEvidence[];
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
  academicCycle?: string;
  verificationStatus: VerificationStatus;
  dataQualityState?: DataQualityState;
  verifiedAt: string;
  sourceUrl: string;
  requirements?: AdmissionRequirement[];
  claimEvidences?: ClaimEvidence[];
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
  academicCycle?: string;
  applicationUrl: string;
  verificationStatus: VerificationStatus;
  dataQualityState?: DataQualityState;
  verifiedAt: string;
  sourceUrl: string;
  description: string;
  requirementsList: string[];
  claimEvidences?: ClaimEvidence[];
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
