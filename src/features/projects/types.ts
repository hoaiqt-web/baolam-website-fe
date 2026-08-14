export const PROJECT_BLOCK_TYPES = [
  "highlights",
  "imageText",
  "gallery",
  "process",
  "technical",
  "testimonial",
] as const;

export type ProjectBlockType = (typeof PROJECT_BLOCK_TYPES)[number];

export type ProjectBlockData = {
  heading?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  items?: string[];
  images?: Array<{ url: string; alt?: string; caption?: string }>;
  steps?: Array<{ title: string; description?: string; image?: string }>;
  quote?: string;
  author?: string;
};

export type ProjectBlockInput = {
  id?: string;
  type: ProjectBlockType;
  variant?: string;
  isVisible: boolean;
  data: ProjectBlockData;
};
