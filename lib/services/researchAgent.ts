import { ResearchTask, ProposedRecord, ClaimEvidence, ResearchTaskLog } from "@/types";
import { DataService } from "@/lib/services/dataService";

export interface ResearchTaskInput {
  instruction: string;
  targetInstitution?: string;
  targetCountry?: string;
  taskType?: string;
}

// In-memory store for research tasks and proposed records
const IN_MEMORY_RESEARCH_TASKS: ResearchTask[] = [
  {
    id: "task-demo-01",
    instruction: "Research Moroccan engineering schools (ENSIAS, EMI, EHTP) computer science programs, official deadlines, and tuition.",
    taskType: "research_university",
    status: "completed",
    targetInstitution: "ENSIAS Rabat [Demo]",
    targetCountry: "Morocco",
    createdAt: "2024-10-26T10:00:00Z",
    updatedAt: "2024-10-26T10:05:00Z",
    logs: [
      {
        id: "log-01",
        taskId: "task-demo-01",
        logLevel: "info",
        message: "Parsed instruction: Target ENSIAS Rabat Computer Science & AI program.",
        timestamp: "2024-10-26T10:00:10Z"
      },
      {
        id: "log-02",
        taskId: "task-demo-01",
        logLevel: "info",
        message: "Discovered official source portal: ensias.um5.ac.ma",
        timestamp: "2024-10-26T10:01:20Z"
      },
      {
        id: "log-03",
        taskId: "task-demo-01",
        logLevel: "info",
        message: "Extracted 3 claim-level evidences with verified timestamps.",
        timestamp: "2024-10-26T10:03:00Z"
      },
      {
        id: "log-04",
        taskId: "task-demo-01",
        logLevel: "info",
        message: "Deterministic validation passed: 0 conflicting dates, 0 broken URLs. Staged proposed record for human admin review.",
        timestamp: "2024-10-26T10:04:50Z"
      }
    ]
  }
];

const IN_MEMORY_PROPOSED_RECORDS: ProposedRecord[] = [
  {
    id: "prop-ensias-01",
    taskId: "task-demo-01",
    entityType: "university",
    verificationStatus: "PARTIALLY_VERIFIED",
    reviewStatus: "pending_review",
    createdAt: "2024-10-26T10:05:00Z",
    proposedData: {
      name: "ENSIAS — École Nationale Supérieure d'Informatique et d'Analyse des Systèmes [Approved Record]",
      slug: "ensias-rabat-approved",
      country: "Morocco",
      city: "Rabat",
      websiteUrl: "http://ensias.um5.ac.ma",
      isPublic: true,
      description: "Premier public Moroccan engineering school specializing in Computer Science, Software Engineering, AI, and Cybersecurity.",
      rankingNational: 3,
      sourceUrl: "http://ensias.um5.ac.ma/admissions",
      featuredProgram: {
        title: "Diplôme d'Ingénieur en Génie Logiciel & IA",
        degreeLevel: "Master",
        fieldOfStudy: "Software Engineering",
        languageOfInstruction: "French / English",
        durationMonths: 36,
        tuitionFeeAnnual: 0,
        currency: "MAD",
        applicationDeadline: "2025-06-30",
        academicCycle: "2025/2026"
      }
    },
    claimEvidences: [
      {
        id: "ev-01",
        proposedRecordId: "prop-ensias-01",
        entityType: "university",
        fieldName: "institution_name_and_type",
        claimValue: "ENSIAS - Public Engineering School under Mohammed V University Rabat",
        sourceUrl: "http://ensias.um5.ac.ma/article/presentation-ensias",
        sourceTitle: "ENSIAS Presentation & Official Status Portal",
        sourceType: "official_website",
        evidenceExcerpt: "ENSIAS est une grande école d'ingénieurs publique marocaine rattachée à l'Université Mohammed V de Rabat.",
        academicCycle: "2025/2026",
        verificationStatus: "VERIFIED",
        verifiedAt: "2024-10-26"
      },
      {
        id: "ev-02",
        proposedRecordId: "prop-ensias-01",
        entityType: "program",
        fieldName: "tuition_fee",
        claimValue: "0 MAD / Free Public Education",
        sourceUrl: "http://ensias.um5.ac.ma/admissions/concours-national-commun",
        sourceTitle: "ENSIAS Concours National Commun Admission Guide",
        sourceType: "official_website",
        evidenceExcerpt: "Les études à l'ENSIAS pour le diplôme d'ingénieur d'État sont dispensées à titre gratuit dans le cadre du service public.",
        academicCycle: "2025/2026",
        verificationStatus: "VERIFIED",
        verifiedAt: "2024-10-26"
      },
      {
        id: "ev-03",
        proposedRecordId: "prop-ensias-01",
        entityType: "program",
        fieldName: "application_deadline",
        claimValue: "2025-06-30",
        sourceUrl: "http://ensias.um5.ac.ma/admissions/concours-sur-titre",
        sourceTitle: "Concours Sur Titre Admissions Calendar 2025",
        sourceType: "official_website",
        evidenceExcerpt: "Dépôt des dossiers de candidature sur titre pour les titulaires de DEUG/Licence est fixé au 30 Juin 2025.",
        academicCycle: "2025/2026",
        verificationStatus: "VERIFIED",
        verifiedAt: "2024-10-26"
      }
    ]
  }
];

export class ResearchAgentService {
  /**
   * Execute natural-language research instruction and generate proposed records + claim evidences.
   */
  static async executeTask(input: ResearchTaskInput): Promise<ResearchTask> {
    const taskId = `task-${Date.now()}`;
    const targetInst = input.targetInstitution?.trim() || "Institution to be researched";
    const now = new Date().toISOString();

    // This service currently has no live web-research provider. Create a transparent
    // manual-review task rather than fabricating official URLs, excerpts, or deadlines.
    const proposedRecord: ProposedRecord = {
      id: `prop-${Date.now()}`,
      taskId,
      entityType: "university",
      verificationStatus: "UNVERIFIED",
      reviewStatus: "pending_review",
      createdAt: now,
      proposedData: {
        name: targetInst,
        country: input.targetCountry || "Morocco",
      },
      claimEvidences: [],
    };

    const logs: ResearchTaskLog[] = [
      {
        id: `log-${Date.now()}-1`,
        taskId,
        logLevel: "info",
        message: `Research request received for ${targetInst}.`,
        timestamp: now,
      },
      {
        id: `log-${Date.now()}-2`,
        taskId,
        logLevel: "warn",
        message: "Live source retrieval is not configured. No official URLs, deadlines, or evidence have been invented; manual research is required.",
        timestamp: now,
      },
      {
        id: `log-${Date.now()}-3`,
        taskId,
        logLevel: "info",
        message: `Created an UNVERIFIED placeholder (${proposedRecord.id}) for human review.`,
        timestamp: now,
      },
    ];

    IN_MEMORY_PROPOSED_RECORDS.unshift(proposedRecord);

    const task: ResearchTask = {
      id: taskId,
      instruction: input.instruction,
      taskType: input.taskType || "research_university",
      status: "pending",
      targetInstitution: targetInst,
      targetCountry: input.targetCountry || "Morocco",
      createdAt: now,
      updatedAt: now,
      logs,
      proposedRecords: [proposedRecord],
    };

    IN_MEMORY_RESEARCH_TASKS.unshift(task);
    return task;
  }

  static getTasks(): ResearchTask[] {
    return IN_MEMORY_RESEARCH_TASKS;
  }

  static getProposedRecords(filter?: { reviewStatus?: string }): ProposedRecord[] {
    if (!filter || !filter.reviewStatus) return IN_MEMORY_PROPOSED_RECORDS;
    return IN_MEMORY_PROPOSED_RECORDS.filter((r) => r.reviewStatus === filter.reviewStatus);
  }

  static getProposedRecordById(id: string): ProposedRecord | undefined {
    return IN_MEMORY_PROPOSED_RECORDS.find((r) => r.id === id);
  }

  /**
   * Human Approval Action: Approve proposed record and publish to public database
   */
  static reviewProposedRecord(
    id: string,
    action: "approve" | "reject" | "edit",
    rejectionReason?: string,
    editedData?: Record<string, any>
  ): ProposedRecord | undefined {
    const record = IN_MEMORY_PROPOSED_RECORDS.find((r) => r.id === id);
    if (!record) return undefined;

    if (action === "approve") {
      record.reviewStatus = "approved";
      record.reviewedAt = new Date().toISOString();
      if (editedData) record.proposedData = { ...record.proposedData, ...editedData };

      // Publish into public database / DataService
      DataService.publishApprovedRecord(record);
    } else if (action === "reject") {
      record.reviewStatus = "rejected";
      record.verificationStatus = "REJECTED";
      record.rejectionReason = rejectionReason || "Rejected by administrator during manual review.";
      record.reviewedAt = new Date().toISOString();
    } else if (action === "edit") {
      if (editedData) record.proposedData = { ...record.proposedData, ...editedData };
      record.reviewStatus = "pending_review";
    }

    return record;
  }
}
