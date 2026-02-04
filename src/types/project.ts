export type SkillCategory = 
  | 'frontend' 
  | 'backend' 
  | 'design' 
  | 'mobile' 
  | 'data' 
  | 'devops' 
  | 'ai' 
  | 'other';

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  createdAt: string;
  owner: TeamMember;
  teamMembers: TeamMember[];
  maxTeamSize: number;
  skillsNeeded: Skill[];
  status: 'recruiting' | 'in-progress' | 'completed';
  category: string;
  tags: string[];
}
