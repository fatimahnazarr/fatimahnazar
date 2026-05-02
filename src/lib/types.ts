export type ProjectSection = {
  type:    'problem' | 'goal' | 'audience' | 'solution' | 'features' | 'outcome' | 'process' | 'gallery';
  title:   string;
  content: string | string[];
  images?: string[];
};

export type ProjectType = 'mobile' | 'web' | 'design' | 'development' | 'both';

export type Project = {
  id:          string;
  slug:        string;
  title:       string;
  titleAr?:    string;
  role:        string;
  year:        string;
  tags:        string[];
  type:        ProjectType;
  desc:        string;
  overview:    string;
  color:       string;
  accent:      string;
  liveUrl?:    string;
  figmaUrl?:   string;
  images?:     string[];
  sections?:   ProjectSection[];
  visible:     boolean;
  comingSoon?:  boolean;
  featured?:   boolean;
  order:       number;
  roleAr?:     string;
  descAr?:     string;
  overviewAr?: string;
};