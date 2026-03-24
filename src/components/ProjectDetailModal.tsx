import { Project } from '@/types/project';
import { SkillBadge } from './SkillBadge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Calendar, MessageCircle, UserPlus } from 'lucide-react';
import { useStats } from '@/context/StatsContext';

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, open, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  const spotsLeft = project.maxTeamSize - project.teamMembers.length;
  const { recordStudentJoined } = useStats();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="shrink-0">
              {project.category}
            </Badge>
            <Badge 
              variant={project.status === 'recruiting' ? 'default' : 'secondary'}
              className={project.status === 'recruiting' ? 'bg-accent text-accent-foreground shrink-0' : 'shrink-0'}
            >
              {project.status === 'recruiting' ? 'Recruiting' : project.status === 'in-progress' ? 'In Progress' : 'Completed'}
            </Badge>
          </div>
          <DialogTitle className="font-display text-2xl mt-2">{project.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Description */}
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">About this project</h4>
            <p className="text-foreground leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>

          {/* Skills Needed */}
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-3">Skills needed</h4>
            <div className="flex flex-wrap gap-2">
              {project.skillsNeeded.map((skill, idx) => (
                <SkillBadge key={idx} skill={skill} />
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm text-muted-foreground">
                Current team ({project.teamMembers.length}/{project.maxTeamSize})
              </h4>
              <span className="text-sm text-accent font-medium">
                {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} available
              </span>
            </div>
            <div className="grid gap-3">
              {project.teamMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {member.skills.slice(0, 2).map((skill, idx) => (
                      <SkillBadge key={idx} skill={skill} size="sm" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground border-t pt-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Posted {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              {project.teamMembers.length} member{project.teamMembers.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 transition-colors"
              onClick={recordStudentJoined}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Request to Join
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message Team
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
