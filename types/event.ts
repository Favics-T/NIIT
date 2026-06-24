export interface UniversityEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  location: string;
  startDate: string; // ISO date string
  endDate: string;
  category: string;
  isFeatured: boolean;
  registrationLink?: string;
}
