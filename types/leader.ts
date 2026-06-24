export interface Leader {
  id: string;
  name: string;
  title: string;
  role: "vc" | "dean" | "director" | "registrar";
  faculty?: string;
  bio: string;
  photo: string;
  email?: string;
  qualifications: string[];
}
