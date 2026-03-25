import { Skill, SkillCategory } from '@/types/project';
import { allSkills } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { SkillBadge } from '@/components/SkillBadge';

const categories: { key: SkillCategory; label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'other', label: 'Other' },
];

const categoryColors: Record<SkillCategory, string> = {
  frontend: 'bg-skill-frontend text-white hover:bg-skill-frontend/90',
  backend: 'bg-skill-backend text-white hover:bg-skill-backend/90',
  design: 'bg-skill-design text-white hover:bg-skill-design/90',
  mobile: 'bg-skill-mobile text-white hover:bg-skill-mobile/90',
  data: 'bg-skill-data text-white hover:bg-skill-data/90',
  devops: 'bg-skill-devops text-foreground hover:bg-skill-devops/90',
  ai: 'bg-skill-ai text-white hover:bg-skill-ai/90',
  other: 'bg-skill-other text-white hover:bg-skill-other/90',
};

interface SkillFilterProps {
  selectedSkills: Skill[];
  onSkillToggle: (skill: Skill) => void;
}

export function SkillFilter({ selectedSkills, onSkillToggle }: SkillFilterProps) {
  const isSelected = (skill: Skill) =>
    selectedSkills.some((s) => s.name === skill.name);

  return (
    <div>
      {categories.map((category) => {
        const skills = allSkills.filter(
          (skill) => skill.category === category.key
        );

        return (
          <div key={category.key}>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              {category.label}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => onSkillToggle(skill)}
                  className="group"
                >
                  <SkillBadge
                    skill={skill}
                    size="sm"
                    selected={isSelected(skill)}
                    className={cn(
                      'px-2.5 py-1 rounded-full text-xs font-medium transition-all',
                      isSelected(skill)
                        ? categoryColors[skill.category]
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
