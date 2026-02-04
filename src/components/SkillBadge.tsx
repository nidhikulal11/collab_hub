import { Skill, SkillCategory } from '@/types/project';
import { cn } from '@/lib/utils';

const categoryStyles: Record<SkillCategory, string> = {
  frontend: 'bg-skill-frontend/15 text-skill-frontend border-skill-frontend/30',
  backend: 'bg-skill-backend/15 text-skill-backend border-skill-backend/30',
  design: 'bg-skill-design/15 text-skill-design border-skill-design/30',
  mobile: 'bg-skill-mobile/15 text-skill-mobile border-skill-mobile/30',
  data: 'bg-skill-data/15 text-skill-data border-skill-data/30',
  devops: 'bg-skill-devops/15 text-skill-devops border-skill-devops/30',
  ai: 'bg-skill-ai/15 text-skill-ai border-skill-ai/30',
  other: 'bg-skill-other/15 text-skill-other border-skill-other/30',
};

interface SkillBadgeProps {
  skill: Skill;
  size?: 'sm' | 'md';
  onClick?: () => void;
  selected?: boolean;
}

export function SkillBadge({ skill, size = 'md', onClick, selected }: SkillBadgeProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center border font-medium rounded-full transition-all',
        categoryStyles[skill.category],
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        onClick && 'cursor-pointer hover:scale-105',
        selected && 'ring-2 ring-offset-2 ring-primary'
      )}
    >
      {skill.name}
    </span>
  );
}
