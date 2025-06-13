export type ExperienceTypes = {
  id: string;
  company: string;
  title: string;
  location: string | null;
  slug: string;
  url: string;
  isRemote: boolean | null;
  startDate: string;
  endDate?: string | null;
  description: string | null;
  duties: string[];
  technologies: string[];
  imageUrl?: string | null;
  createdAt: string;

  projects: {
    id: string;
    title: string;
    url: string;
  }[];
};
