import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Lightbulb, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStats } from '@/context/StatsContext';

export function HeroSection() {
  const { projectsCount, studentsCount, teamsFormedCount } = useStats();

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-200 mb-6 animate-slide-up">
            Turn Your Ideas Into{' '}
            <span>Reality</span>
            {' '}With the Right Team
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
            Connect with talented students who share your vision. Post your project, 
            find teammates with complementary skills, and build something amazing together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button
              asChild
              size="lg"
              className="px-8 rounded-full text-sm md:text-base font-semibold text-white bg-primary shadow-[0_0_14px_rgba(88,28,135,0.45)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_0_22px_rgba(88,28,135,0.6)]"
            >
              <Link to="/projects">
                Browse Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[rgba(148,163,184,0.5)] bg-black/20 hover:bg-[rgba(24,24,38,0.85)] text-slate-100 rounded-full backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgba(167,139,250,0.9)] hover:shadow-[0_0_18px_rgba(167,139,250,0.45)]"
            >
              <Link to="/post-project">
                Post Your Idea
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50">
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary">{projectsCount}+</div>
              <div className="text-sm text-muted-foreground mt-1">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary">{studentsCount}+</div>
              <div className="text-sm text-muted-foreground mt-1">Students</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary">{teamsFormedCount}+</div>
              <div className="text-sm text-muted-foreground mt-1">Teams Formed</div>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-skill-frontend/15 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-skill-frontend" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Skill-Based Matching</h3>
            <p className="text-muted-foreground text-sm">
              Find teammates with the exact skills your project needs. Filter by frontend, backend, design, and more.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-skill-design/15 flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-skill-design" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Project Showcase</h3>
            <p className="text-muted-foreground text-sm">
              Pitch your ideas to a community of builders. Get feedback and find people who believe in your vision.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-skill-backend/15 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-skill-backend" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Built-in Collaboration</h3>
            <p className="text-muted-foreground text-sm">
              Message potential teammates, track team formation, and manage your project all in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
