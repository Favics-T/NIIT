export interface AdmissionStep {
  number: number;
  title: string;
  description: string;
}

export const ADMISSION_STEPS: AdmissionStep[] = [
  {
    number: 1,
    title: "Choose Your Faculty and Program",
    description:
      "Browse our wide range of accredited programs and select the faculty that aligns with your career goals.",
  },
  {
    number: 2,
    title: "Review Admission Requirements",
    description:
      "Check the entry requirements for your chosen program including O-level results, JAMB score, and post-UTME criteria.",
  },
  {
    number: 3,
    title: "Submit Document Requirements",
    description:
      "Prepare and upload certified copies of your academic certificates, WAEC/NECO results, birth certificate, and passport photographs.",
  },
  {
    number: 4,
    title: "Application Review and Interview",
    description:
      "Our admissions committee will review your application and invite you for a screening or interview where applicable.",
  },
  {
    number: 5,
    title: "Receive Your Admission Decision",
    description:
      "Successful candidates receive their admission letter via email. Proceed to complete registration and pay acceptance fees.",
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Industry-Connected Learning",
    description:
      "Our curriculum is designed in partnership with top industry leaders ensuring you graduate job-ready.",
    icon: "Briefcase",
  },
  {
    title: "Cutting-edge Campus Facilities",
    description:
      "State-of-the-art labs, libraries, and innovation hubs that foster creativity and research.",
    icon: "Building2",
  },
  {
    title: "Your Mentors to Success",
    description:
      "World-class faculty with decades of academic and professional experience guiding your journey.",
    icon: "Users",
  },
  {
    title: "Collaborative Research",
    description:
      "Engage in groundbreaking research projects with cross-disciplinary teams and global partners.",
    icon: "FlaskConical",
  },
];
