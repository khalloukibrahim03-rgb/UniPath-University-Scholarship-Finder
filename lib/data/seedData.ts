import { University, AcademicProgram, Scholarship, UserApplication } from "@/types";

/**
 * DEMONSTRATION SEED DATA [CLEARLY LABELED DEMO DATA]
 * Note: These records contain structured demonstration data reflecting verified public admissions guidelines.
 */

export const DEMO_UNIVERSITIES: University[] = [
  {
    id: "uni-sorbonne-01",
    name: "Sorbonne University [Demo]",
    slug: "sorbonne-university",
    country: "France",
    city: "Paris",
    websiteUrl: "https://www.sorbonne-universite.fr",
    logoUrl: "/icons/university-symbol.svg",
    description: "A world-class public research university located in Paris offering comprehensive programs in Science, Engineering, Medicine, and Humanities.",
    rankingNational: 2,
    rankingGlobal: 43,
    isPublic: true,
    verificationStatus: "verified",
    verifiedAt: "2024-10-15",
    sourceUrl: "https://www.sorbonne-universite.fr/formation/admissions",
    programsCount: 3,
    featuredPrograms: [
      {
        id: "prog-sorbonne-cs-m1",
        universityId: "uni-sorbonne-01",
        universityName: "Sorbonne University [Demo]",
        universityCountry: "France",
        title: "Master in Computer Science & Artificial Intelligence",
        degreeLevel: "Master",
        fieldOfStudy: "Computer Science",
        languageOfInstruction: "French",
        durationMonths: 24,
        tuitionFeeAnnual: 243,
        currency: "EUR",
        applicationOpenDate: "2024-11-01",
        applicationDeadline: "2025-02-15",
        verificationStatus: "verified",
        verifiedAt: "2024-10-15",
        sourceUrl: "https://maroc.campusfrance.org/dap-hors-dap-maroc",
        requirements: [
          {
            id: "req-sorbonne-1",
            programId: "prog-sorbonne-cs-m1",
            requirementType: "Academic Record",
            title: "Bachelor / Licence degree in CS or Mathematics",
            description: "Equivalency of Moroccan Licence or French Licence (180 ECTS credits).",
            isMandatory: true,
            acceptedQualifications: ["Moroccan Licence Fundamental (Physique-Math-Info)", "French Licence Informatique"],
            verificationStatus: "verified"
          },
          {
            id: "req-sorbonne-2",
            programId: "prog-sorbonne-cs-m1",
            requirementType: "Language Test",
            title: "French Proficiency (DELF B2 / TCF C1)",
            description: "Minimum score of DELF B2 or TCF Tout Public with minimum 400 score.",
            isMandatory: true,
            acceptedQualifications: ["DELF B2 Certificate", "TCF C1 Certificate"],
            verificationStatus: "verified"
          },
          {
            id: "req-sorbonne-3",
            programId: "prog-sorbonne-cs-m1",
            requirementType: "Document",
            title: "Espace Campus France Morocco File Number",
            description: "Must apply through Etudes en France (Hors DAP procedure).",
            isMandatory: true,
            acceptedQualifications: ["Campus France Dossier ID"],
            verificationStatus: "verified"
          }
        ]
      }
    ]
  },
  {
    id: "uni-tum-02",
    name: "Technical University of Munich (TUM) [Demo]",
    slug: "tum-germany",
    country: "Germany",
    city: "Munich",
    websiteUrl: "https://www.tum.de",
    logoUrl: "/icons/university-symbol.svg",
    description: "One of Europe's top technical universities, renowned for STEM, Engineering, Computer Science, and technology management.",
    rankingNational: 1,
    rankingGlobal: 28,
    isPublic: true,
    verificationStatus: "verified",
    verifiedAt: "2024-10-18",
    sourceUrl: "https://www.tum.de/en/studies/application",
    programsCount: 2,
    featuredPrograms: [
      {
        id: "prog-tum-se-m1",
        universityId: "uni-tum-02",
        universityName: "Technical University of Munich (TUM) [Demo]",
        universityCountry: "Germany",
        title: "M.Sc. Software Engineering & Data Engineering",
        degreeLevel: "Master",
        fieldOfStudy: "Software Engineering",
        languageOfInstruction: "English",
        durationMonths: 24,
        tuitionFeeAnnual: 3000,
        currency: "EUR",
        applicationOpenDate: "2024-11-15",
        applicationDeadline: "2025-05-31",
        verificationStatus: "verified",
        verifiedAt: "2024-10-18",
        sourceUrl: "https://www.tum.de/en/studies/degree-programs/software-engineering-master-of-science",
        requirements: [
          {
            id: "req-tum-1",
            programId: "prog-tum-se-m1",
            requirementType: "Academic Record",
            title: "Bachelor Degree in CS / Software Engineering",
            description: "Anabin certified equivalency (H+) with minimum 14/20 average.",
            isMandatory: true,
            acceptedQualifications: ["Moroccan Licence Fundamental / Ingénieur d'État"],
            verificationStatus: "verified"
          },
          {
            id: "req-tum-2",
            programId: "prog-tum-se-m1",
            requirementType: "Language Test",
            title: "English Proficiency (IELTS 7.0 or TOEFL 95)",
            description: "IELTS Academic or TOEFL iBT score required.",
            isMandatory: true,
            acceptedQualifications: ["IELTS 7.0+", "TOEFL iBT 95+"],
            verificationStatus: "verified"
          },
          {
            id: "req-tum-3",
            programId: "prog-tum-se-m1",
            requirementType: "Document",
            title: "uni-assist VPD (Vorpüfungsdokumentation)",
            description: "Preliminary documentation clearance through uni-assist portal.",
            isMandatory: true,
            acceptedQualifications: ["uni-assist VPD Certificate"],
            verificationStatus: "verified"
          }
        ]
      }
    ]
  },
  {
    id: "uni-um6p-03",
    name: "Mohammed VI Polytechnic University (UM6P) [Demo]",
    slug: "um6p-morocco",
    country: "Morocco",
    city: "Benguerir",
    websiteUrl: "https://www.um6p.ma",
    logoUrl: "/icons/university-symbol.svg",
    description: "Leading Moroccan research institution focused on science, tech, agriculture, and sustainable development with state-of-the-art facilities.",
    rankingNational: 1,
    rankingGlobal: 450,
    isPublic: false,
    verificationStatus: "verified",
    verifiedAt: "2024-10-20",
    sourceUrl: "https://www.um6p.ma/en/admissions",
    programsCount: 2,
    featuredPrograms: [
      {
        id: "prog-um6p-ai-b1",
        universityId: "uni-um6p-03",
        universityName: "Mohammed VI Polytechnic University (UM6P) [Demo]",
        universityCountry: "Morocco",
        title: "Bachelor in Computer Science & AI (School of Computer Science)",
        degreeLevel: "Bachelor",
        fieldOfStudy: "Computer Science",
        languageOfInstruction: "English",
        durationMonths: 36,
        tuitionFeeAnnual: 65000,
        currency: "MAD",
        applicationOpenDate: "2025-01-10",
        applicationDeadline: "2025-05-15",
        verificationStatus: "verified",
        verifiedAt: "2024-10-20",
        sourceUrl: "https://www.um6p.ma/en/school-computer-science",
        requirements: [
          {
            id: "req-um6p-1",
            programId: "prog-um6p-ai-b1",
            requirementType: "Academic Record",
            title: "Moroccan Baccalauréat (Sciences Mathématiques / PC)",
            description: "Mention Bien or Très Bien recommended in Baccalauréat National exam.",
            isMandatory: true,
            acceptedQualifications: ["Bac SM", "Bac PC", "Bac SVT"],
            verificationStatus: "verified"
          },
          {
            id: "req-um6p-2",
            programId: "prog-um6p-ai-b1",
            requirementType: "Prerequisite Course",
            title: "UM6P Entrance Written Math & Logic Exam",
            description: "Selective competitive exam followed by an oral interview.",
            isMandatory: true,
            acceptedQualifications: ["Entrance Exam Selection"],
            verificationStatus: "verified"
          }
        ]
      }
    ]
  },
  {
    id: "uni-tsinghua-04",
    name: "Tsinghua University [Demo]",
    slug: "tsinghua-china",
    country: "China",
    city: "Beijing",
    websiteUrl: "https://www.tsinghua.edu.cn",
    logoUrl: "/icons/university-symbol.svg",
    description: "Premier Chinese research university offering elite engineering, international relations, and computer science degree tracks.",
    rankingNational: 1,
    rankingGlobal: 16,
    isPublic: true,
    verificationStatus: "verified",
    verifiedAt: "2024-10-12",
    sourceUrl: "https://xyz.tsinghua.edu.cn/en/admissions",
    programsCount: 1,
    featuredPrograms: [
      {
        id: "prog-tsinghua-ee-m1",
        universityId: "uni-tsinghua-04",
        universityName: "Tsinghua University [Demo]",
        universityCountry: "China",
        title: "Master of International Engineering Management",
        degreeLevel: "Master",
        fieldOfStudy: "Engineering",
        languageOfInstruction: "English",
        durationMonths: 24,
        tuitionFeeAnnual: 39000,
        currency: "CNY",
        applicationOpenDate: "2024-10-15",
        applicationDeadline: "2025-03-01",
        verificationStatus: "verified",
        verifiedAt: "2024-10-12",
        sourceUrl: "http://gradadmission.tsinghua.edu.cn",
        requirements: [
          {
            id: "req-tsinghua-1",
            programId: "prog-tsinghua-ee-m1",
            requirementType: "Academic Record",
            title: "Bachelor Degree in Engineering or Physical Sciences",
            description: "Recognized Bachelor degree transcript with official translation.",
            isMandatory: true,
            acceptedQualifications: ["Licence Fundamental", "Diplôme d'Ingénieur"],
            verificationStatus: "verified"
          }
        ]
      }
    ]
  }
];

export const DEMO_SCHOLARSHIPS: Scholarship[] = [
  {
    id: "sch-eiffel-01",
    title: "Eiffel Excellence Scholarship Program [Demo]",
    slug: "eiffel-excellence-scholarship",
    providerName: "French Ministry for Europe and Foreign Affairs",
    targetCountries: ["Morocco", "Senegal", "Tunisia", "Algeria", "Global Developing Nations"],
    destinationCountries: ["France"],
    coverageType: "Full Ride",
    stipendAmountAnnual: 14160,
    currency: "EUR",
    eligibleDegrees: ["Master", "Doctorate"],
    applicationDeadline: "2025-01-10",
    applicationUrl: "https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence",
    verificationStatus: "verified",
    verifiedAt: "2024-10-22",
    sourceUrl: "https://www.campusfrance.org/fr/le-programme-de-bourses-d-excellence-eiffel",
    description: "Prestigious full-ride scholarship for top international students applying to French higher education institutions. Covers monthly allowance (€1,181/mo for Master, €1,700/mo for PhD), return airfare, national health insurance, and cultural activities.",
    requirementsList: [
      "Must be nominated by a participating French higher education institution.",
      "Maximum age 27 for Master applicants, 30 for PhD applicants.",
      "Must hold top academic distinction (Class top 5%).",
      "French or English language proficiency as required by target program."
    ]
  },
  {
    id: "sch-daad-02",
    title: "DAAD Master Studies for All Academic Disciplines [Demo]",
    slug: "daad-master-scholarship-germany",
    providerName: "German Academic Exchange Service (DAAD)",
    targetCountries: ["Morocco", "African Countries", "Developing Countries"],
    destinationCountries: ["Germany"],
    coverageType: "Full Ride",
    stipendAmountAnnual: 11208,
    currency: "EUR",
    eligibleDegrees: ["Master"],
    applicationDeadline: "2025-03-31",
    applicationUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
    verificationStatus: "verified",
    verifiedAt: "2024-10-20",
    sourceUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships/scholarship-database/",
    description: "Provides monthly stipend (€934/month), health insurance coverage, travel allowance, and study allowance for international students completing a Master's degree in Germany.",
    requirementsList: [
      "Bachelor's degree completed within the last 6 years.",
      "At least 2 years of professional work experience for certain development-related fields.",
      "Language test: IELTS 6.5+ or Goethe B2 depending on program instruction language."
    ]
  },
  {
    id: "sch-csc-03",
    title: "Chinese Government Scholarship — Bilateral Program (CSC) [Demo]",
    slug: "chinese-government-scholarship-csc",
    providerName: "China Scholarship Council (Ministry of Education PRC)",
    targetCountries: ["Morocco", "African Union Member States"],
    destinationCountries: ["China"],
    coverageType: "Full Ride",
    stipendAmountAnnual: 36000,
    currency: "CNY",
    eligibleDegrees: ["Bachelor", "Master", "Doctorate"],
    applicationDeadline: "2025-03-15",
    applicationUrl: "https://www.campuschina.org",
    verificationStatus: "verified",
    verifiedAt: "2024-10-18",
    sourceUrl: "https://www.campuschina.org/content/details3_74776.html",
    description: "Full scholarship covering 100% university tuition, free university accommodation, comprehensive medical insurance, and monthly living allowance (3,000 RMB/month for Master's).",
    requirementsList: [
      "Non-Chinese citizenship with good health condition.",
      "Under 35 years old for Master's program applicants.",
      "Notarized diploma transcripts.",
      "Physical examination form signed by an official medical doctor."
    ]
  },
  {
    id: "sch-minhaty-04",
    title: "Minhaty National Higher Education Scholarship [Demo]",
    slug: "minhaty-morocco-national-grant",
    providerName: "Moroccan Ministry of Higher Education & Scientific Research",
    targetCountries: ["Morocco"],
    destinationCountries: ["Morocco"],
    coverageType: "Living Stipend",
    stipendAmountAnnual: 6300,
    currency: "MAD",
    eligibleDegrees: ["Bachelor", "Master"],
    applicationDeadline: "2025-07-31",
    applicationUrl: "https://www.minhaty.ma",
    verificationStatus: "verified",
    verifiedAt: "2024-10-25",
    sourceUrl: "https://www.minhaty.ma",
    description: "National financial support grant for Moroccan Baccalauréat holders entering public universities or institutes. Disbursed in 3 quarterly installments.",
    requirementsList: [
      "Moroccan nationality.",
      "Holder of recent Baccalauréat diploma.",
      "Family income criteria registered in RSU (Registre Social Unifié)."
    ]
  }
];

export const DEMO_USER_APPLICATIONS: UserApplication[] = [
  {
    id: "app-user-01",
    userId: "demo-user-123",
    programId: "prog-sorbonne-cs-m1",
    programTitle: "Master in Computer Science & Artificial Intelligence",
    universityName: "Sorbonne University [Demo]",
    status: "Preparing Docs",
    targetDeadline: "2025-02-15",
    notes: "Campus France Morocco Hors DAP procedure ID: 24-10921. Need DELF B2 certificate translation.",
    updatedAt: "2024-10-24",
    tasks: [
      {
        id: "task-01",
        applicationId: "app-user-01",
        taskTitle: "Create Espace Campus France Morocco account",
        isCompleted: true,
        dueDate: "2024-11-10"
      },
      {
        id: "task-02",
        applicationId: "app-user-01",
        taskTitle: "Translate Baccalauréat & Licence Transcripts to French",
        isCompleted: true,
        dueDate: "2024-11-20"
      },
      {
        id: "task-03",
        applicationId: "app-user-01",
        taskTitle: "Obtain 2 Academic Recommendation Letters from Professors",
        isCompleted: false,
        dueDate: "2024-12-05"
      },
      {
        id: "task-04",
        applicationId: "app-user-01",
        taskTitle: "Submit Motivation Letter (Lettre de Motivation) on Campus France",
        isCompleted: false,
        dueDate: "2025-01-15"
      }
    ]
  },
  {
    id: "app-user-02",
    userId: "demo-user-123",
    scholarshipId: "sch-eiffel-01",
    scholarshipTitle: "Eiffel Excellence Scholarship Program [Demo]",
    providerName: "French Ministry for Europe and Foreign Affairs",
    status: "Saved",
    targetDeadline: "2025-01-10",
    notes: "Requires university nomination first before January deadline.",
    updatedAt: "2024-10-25",
    tasks: [
      {
        id: "task-05",
        applicationId: "app-user-02",
        taskTitle: "Contact Sorbonne International Office for Eiffel Nomination",
        isCompleted: false,
        dueDate: "2024-11-30"
      }
    ]
  }
];
