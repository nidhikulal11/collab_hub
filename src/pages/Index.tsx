import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectDetailModal } from '@/components/ProjectDetailModal';
import { Button } from '@/components/ui/button';
import BubbleBackground from '@/components/BubbleBackground';
import { mockProjects } from '@/data/mockData';
import { Project } from '@/types/project';

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featuredProjects = mockProjects.filter(p => p.status === 'recruiting').slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f] text-foreground relative overflow-hidden">
      {/* Futuristic dark blue gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_#1e293b_0,_transparent_55%),radial-gradient(circle_at_bottom,_#0b1120_0,_transparent_55%)] opacity-90" />
      {/* Soft animated bubbles */}
      <BubbleBackground />

      <Header />

      <main className="flex-1 flex flex-col">
        <section className="relative pt-16 md:pt-24 pb-10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-slate-200/90 backdrop-blur-xl mb-5 animate-slide-up">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-glow" />
                Collaborate, learn and build in public
              </p>

              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-50 mb-6 animate-slide-up">
                Build futuristic projects with a
                <span className="text-gradient block">dream student team</span>
              </h1>

              <p className="text-base md:text-lg text-slate-300/90 max-w-2xl mx-auto mb-8 animate-slide-up">
                Discover talented collaborators, launch side projects and grow your skills in a
                minimal, distraction-free workspace designed for student builders.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
                <Button
  asChild
  size="lg"
  className="px-8 rounded-full text-sm md:text-base font-semibold text-white 
  bg-[linear-gradient(135deg,#7c3aed,#6366f1)] 
  shadow-[0_0_12px_rgba(124,58,237,0.25)] 
  transition-all duration-300 ease-out 
  hover:-translate-y-0.5 
  hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]"
>
                  <Link to="/projects">
                    Browse open projects
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[rgba(148,163,184,0.5)] bg-black/20 hover:bg-[rgba(24,24,38,0.85)] text-slate-100 rounded-full backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgba(167,139,250,0.9)] hover:shadow-[0_0_18px_rgba(167,139,250,0.45)]"
                >
                  <Link to="/post-project">Post your idea</Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-slate-400/90 animate-slide-up">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Real projects from real students
                </div>
                <div className="h-4 w-px bg-slate-700/80 hidden md:block" />
                <div>Soft-matched by skills, interests and availability</div>
              </div>
            </div>
          </div>
        </section>

        <HeroSection />
        



        {/* Featured Projects Section */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl px-6 py-8 md:px-10 md:py-10 shadow-lg/30">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-50 mb-2">
                    Featured projects
                  </h2>
                  <p className="text-sm md:text-base text-slate-300/90">
                    Discover teams that are actively recruiting collaborators right now.
                  </p>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  className="hidden sm:inline-flex text-slate-200 hover:text-white hover:bg-white/5"
                >
                  <Link to="/projects">
                    View all projects
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/40" />
                    <div className="relative">
                      <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
                    </div>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant="ghost"
                className="w-full mt-6 sm:hidden text-slate-200 hover:text-white hover:bg-white/5"
              >
                <Link to="/projects">
                  View all projects
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl border border-white/10 bg-[rgba(19,19,31,0.85)] backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(79,70,229,0.18),_transparent_55%)]" />
              <div className="relative">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-[#e8e8f0]">
                  Ready to Build Something Amazing?
                </h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto text-[#a0a0b8]">
                  Join thousands of students who are turning their ideas into reality. 
                  Your next great project is waiting.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="px-8 rounded-full text-sm md:text-base font-semibold text-white bg-[linear-gradient(135deg,#6d28d9,#4f46e5)] shadow-[0_0_14px_rgba(88,28,135,0.45)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(88,28,135,0.6)]"
                >
                  <Link to="/post-project">
                    Post Your Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
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

export default Index;
