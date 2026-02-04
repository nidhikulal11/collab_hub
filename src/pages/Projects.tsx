import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectDetailModal } from '@/components/ProjectDetailModal';
import { SkillFilter } from '@/components/SkillFilter';
import { mockProjects } from '@/data/mockData';
import { Project, Skill } from '@/types/project';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleSkillToggle = (skill: Skill) => {
    setSelectedSkills(prev => {
      const exists = prev.some(s => s.name === skill.name);
      if (exists) {
        return prev.filter(s => s.name !== skill.name);
      }
      return [...prev, skill];
    });
  };

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Skills filter
      const matchesSkills = selectedSkills.length === 0 ||
        selectedSkills.some(selectedSkill =>
          project.skillsNeeded.some(needed => needed.name === selectedSkill.name)
        );

      return matchesSearch && matchesSkills;
    });
  }, [searchQuery, selectedSkills]);

  const FilterContent = () => (
    <SkillFilter
      selectedSkills={selectedSkills}
      onSkillToggle={handleSkillToggle}
      onClear={() => setSelectedSkills([])}
    />
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Browse Projects</h1>
            <p className="text-muted-foreground">
              Find projects that match your skills and interests
            </p>
          </div>

          {/* Search and filters */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Mobile filter button */}
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden shrink-0">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {selectedSkills.length > 0 && (
                    <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {selectedSkills.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Active filters */}
          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedSkills.map((skill) => (
                <button
                  key={skill.name}
                  onClick={() => handleSkillToggle(skill)}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  {skill.name}
                  <X className="w-3 h-3" />
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 p-4 rounded-xl bg-card border border-border/50">
                <FilterContent />
              </div>
            </aside>

            {/* Projects grid */}
            <div className="flex-1">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No projects found matching your criteria.</p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('');
                    setSelectedSkills([]);
                  }}>
                    Clear filters
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => setSelectedProject(project)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <ProjectDetailModal
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Projects;
