import { Project } from '@/types/project';
import { SkillBadge } from './SkillBadge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const spotsLeft = project.maxTeamSize - project.teamMembers.length;
  
  return (
    <Card 
      className="group cursor-pointer border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <Badge variant="secondary" className="mb-2 text-xs font-medium">
              {project.category}
            </Badge>
            <h3 className="font-display font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {project.title}
            </h3>
          </div>
          <div className="flex -space-x-2">
            {project.teamMembers.slice(0, 3).map((member) => (
              <Avatar key={member.id} className="w-8 h-8 border-2 border-card">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
            ))}
            {project.teamMembers.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-card">
                +{project.teamMembers.length - 3}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {project.description}
        </p>
        
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Looking for:</p>
            <div className="flex flex-wrap gap-1.5">
              {project.skillsNeeded.slice(0, 3).map((skill, idx) => (
                <SkillBadge key={idx} skill={skill} size="sm" />
              ))}
              {project.skillsNeeded.length > 3 && (
                <span className="text-xs text-muted-foreground px-2 py-0.5">
                  +{project.skillsNeeded.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 border-t border-border/50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity p-0 h-auto text-primary">
            View <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
