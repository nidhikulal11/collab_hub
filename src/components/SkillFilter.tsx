import { Skill, SkillCategory } from '@/types/project';
import { allSkills } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { SkillBadge } from '@/components/SkillBadge';

const categories: { key: SkillCategory; label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'design', label: 'Design' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'data', label: 'Data' },
  { key: 'ai', label: 'AI/ML' },
  { key: 'devops', label: 'DevOps' },
  { key: 'other', label: 'Other' },
];

interface SkillFilterProps {
  selectedSkills: Skill[];
  onSkillToggle: (skill: Skill) => void;
  onClear: () => void;
}

export function SkillFilter({ selectedSkills, onSkillToggle, onClear }: SkillFilterProps) {
  const isSelected = (skill: Skill) => 
    selectedSkills.some(s => s.name === skill.name);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Filter by Skills</h3>
        {selectedSkills.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-auto py-1 px-2 text-xs">
            Clear all
            <X className="w-3 h-3 ml-1" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {categories.map((category) => {
          const skills = allSkills.filter(s => s.category === category.key);
          if (skills.length === 0) return null;
          
          return (
            <div key={category.key}>
              <p className="text-xs font-medium text-muted-foreground mb-2">{category.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    skill={skill}
                    size="sm"
                    onClick={() => onSkillToggle(skill)}
                    selected={isSelected(skill)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
