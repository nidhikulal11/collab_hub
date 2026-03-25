import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { mockProjects } from '@/data/mockData';

interface StatsContextValue {
  projectsCount: number;
  studentsCount: number;
  teamsFormedCount: number;
  recordProjectCreated: () => void;
  recordStudentJoined: () => void;
}

const StatsContext = createContext<StatsContextValue | undefined>(undefined);

function calculateInitialStats() {
  const projectsCount = mockProjects.length;

  const memberIds = new Set<string>();
  mockProjects.forEach((project) => {
    project.teamMembers.forEach((member) => {
      memberIds.add(member.id);
    });
  });

  const studentsCount = memberIds.size;

  // Treat each project that has at least one team member as a "formed team"
  const teamsFormedCount = mockProjects.filter(
    (project) => project.teamMembers.length > 0
  ).length;

  return { projectsCount, studentsCount, teamsFormedCount };
}

export function StatsProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(() => calculateInitialStats(), []);

  const [projectsCount, setProjectsCount] = useState(initial.projectsCount);
  const [studentsCount, setStudentsCount] = useState(initial.studentsCount);
  const [teamsFormedCount, setTeamsFormedCount] = useState(initial.teamsFormedCount);

  const recordProjectCreated = () => {
    setProjectsCount((prev) => prev + 1);
    // ❌ Removed incorrect teamsFormedCount increment
  };

  const recordStudentJoined = () => {
    setStudentsCount((prev) => prev + 1);
  };

  const value: StatsContextValue = {
    projectsCount,
    studentsCount,
    teamsFormedCount,
    recordProjectCreated,
    recordStudentJoined,
  };

  return (
    <StatsContext.Provider value={value}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const ctx = useContext(StatsContext);
  if (!ctx) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return ctx;
}
