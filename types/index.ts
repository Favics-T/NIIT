// ============================================================
// types/index.ts
// Shared TypeScript types for all content models
// ============================================================

export interface NewsArticle {
  id: string
  title: string
  description: string
  category: string
  date: string
  slug: string
  image: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: string
  image: string
  registrationOpen: boolean
}

export interface Faculty {
  id: string
  name: string
  description: string
  icon: string
  students: string
  programs: string
  slug: string
}

export interface Leader {
  id: string
  name: string
  title: string
  bio: string
  initials: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: 'campus' | 'events' | 'graduation' | 'sports'
  width: number
  height: number
}

export interface SearchResult {
  id: string
  type: 'news' | 'department' | 'course'
  title: string
  description: string
  href: string
}

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  department: string
  message: string
}

export interface ContactFormErrors {
  firstName?: string
  lastName?: string
  email?: string
  department?: string
  message?: string
}