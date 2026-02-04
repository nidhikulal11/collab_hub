import { Project, Skill, TeamMember } from '@/types/project';

export const allSkills: Skill[] = [
  { name: 'React', category: 'frontend' },
  { name: 'Vue.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'CSS/Tailwind', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'GraphQL', category: 'backend' },
  { name: 'UI/UX Design', category: 'design' },
  { name: 'Figma', category: 'design' },
  { name: 'Branding', category: 'design' },
  { name: 'React Native', category: 'mobile' },
  { name: 'Flutter', category: 'mobile' },
  { name: 'iOS/Swift', category: 'mobile' },
  { name: 'Data Analysis', category: 'data' },
  { name: 'Machine Learning', category: 'ai' },
  { name: 'NLP', category: 'ai' },
  { name: 'Docker', category: 'devops' },
  { name: 'AWS', category: 'devops' },
  { name: 'Marketing', category: 'other' },
  { name: 'Business Dev', category: 'other' },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'EcoTrack - Carbon Footprint App',
    description: 'A mobile app that helps users track and reduce their carbon footprint through daily activities and gamification.',
    longDescription: 'EcoTrack is an innovative mobile application designed to make sustainability accessible and engaging for everyone. Users can log their daily activities, from transportation choices to food consumption, and receive personalized insights on their environmental impact. The app features challenges, achievements, and a community leaderboard to encourage positive behavior change.',
    createdAt: '2024-01-15',
    owner: {
      id: 'u1',
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      role: 'Project Lead',
      skills: [{ name: 'React Native', category: 'mobile' }, { name: 'UI/UX Design', category: 'design' }]
    },
    teamMembers: [
      {
        id: 'u1',
        name: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        role: 'Project Lead',
        skills: [{ name: 'React Native', category: 'mobile' }, { name: 'UI/UX Design', category: 'design' }]
      }
    ],
    maxTeamSize: 5,
    skillsNeeded: [
      { name: 'Node.js', category: 'backend' },
      { name: 'Data Analysis', category: 'data' },
      { name: 'React Native', category: 'mobile' }
    ],
    status: 'recruiting',
    category: 'Sustainability',
    tags: ['Mobile', 'Environment', 'Gamification']
  },
  {
    id: '2',
    title: 'StudyBuddy AI',
    description: 'An AI-powered study companion that creates personalized learning paths and provides intelligent tutoring.',
    longDescription: 'StudyBuddy AI leverages the latest in machine learning and natural language processing to create a truly personalized learning experience. The platform analyzes learning patterns, identifies knowledge gaps, and generates custom study materials. Features include smart flashcards, practice quizzes, and an AI tutor that can answer questions in real-time.',
    createdAt: '2024-01-20',
    owner: {
      id: 'u2',
      name: 'Marcus Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      role: 'ML Engineer',
      skills: [{ name: 'Machine Learning', category: 'ai' }, { name: 'Python', category: 'backend' }]
    },
    teamMembers: [
      {
        id: 'u2',
        name: 'Marcus Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
        role: 'ML Engineer',
        skills: [{ name: 'Machine Learning', category: 'ai' }, { name: 'Python', category: 'backend' }]
      },
      {
        id: 'u3',
        name: 'Emily Rodriguez',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        role: 'Frontend Developer',
        skills: [{ name: 'React', category: 'frontend' }, { name: 'TypeScript', category: 'frontend' }]
      }
    ],
    maxTeamSize: 4,
    skillsNeeded: [
      { name: 'NLP', category: 'ai' },
      { name: 'UI/UX Design', category: 'design' }
    ],
    status: 'recruiting',
    category: 'Education',
    tags: ['AI', 'EdTech', 'Machine Learning']
  },
  {
    id: '3',
    title: 'LocalEats Marketplace',
    description: 'A platform connecting local food producers with consumers, supporting small farms and reducing food miles.',
    longDescription: 'LocalEats is revolutionizing how communities access fresh, local food. Our marketplace connects consumers directly with nearby farms, bakeries, and food artisans. Features include subscription boxes, real-time inventory, delivery scheduling, and producer profiles that tell the story behind each product.',
    createdAt: '2024-01-25',
    owner: {
      id: 'u4',
      name: 'Priya Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      role: 'Product Manager',
      skills: [{ name: 'Business Dev', category: 'other' }, { name: 'UI/UX Design', category: 'design' }]
    },
    teamMembers: [
      {
        id: 'u4',
        name: 'Priya Patel',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
        role: 'Product Manager',
        skills: [{ name: 'Business Dev', category: 'other' }, { name: 'UI/UX Design', category: 'design' }]
      }
    ],
    maxTeamSize: 6,
    skillsNeeded: [
      { name: 'React', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'PostgreSQL', category: 'backend' },
      { name: 'React Native', category: 'mobile' }
    ],
    status: 'recruiting',
    category: 'E-Commerce',
    tags: ['Marketplace', 'Food', 'Local Business']
  },
  {
    id: '4',
    title: 'MindfulMinutes',
    description: 'A mental wellness app with guided meditations, mood tracking, and community support features.',
    longDescription: 'MindfulMinutes is designed to make mental wellness practices accessible to everyone. The app offers guided meditations for various needs, from stress relief to better sleep. Users can track their mood over time, join supportive community circles, and access professional resources when needed.',
    createdAt: '2024-02-01',
    owner: {
      id: 'u5',
      name: 'Alex Kim',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      role: 'Full Stack Developer',
      skills: [{ name: 'React', category: 'frontend' }, { name: 'Node.js', category: 'backend' }]
    },
    teamMembers: [
      {
        id: 'u5',
        name: 'Alex Kim',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        role: 'Full Stack Developer',
        skills: [{ name: 'React', category: 'frontend' }, { name: 'Node.js', category: 'backend' }]
      },
      {
        id: 'u6',
        name: 'Jordan Lee',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
        role: 'Designer',
        skills: [{ name: 'UI/UX Design', category: 'design' }, { name: 'Figma', category: 'design' }]
      }
    ],
    maxTeamSize: 4,
    skillsNeeded: [
      { name: 'Flutter', category: 'mobile' },
      { name: 'Data Analysis', category: 'data' }
    ],
    status: 'in-progress',
    category: 'Health & Wellness',
    tags: ['Mental Health', 'Meditation', 'Community']
  },
  {
    id: '5',
    title: 'CodeReview.ai',
    description: 'An automated code review tool that uses AI to provide intelligent suggestions and catch bugs early.',
    longDescription: 'CodeReview.ai integrates seamlessly into your development workflow, providing instant feedback on code quality, security vulnerabilities, and best practices. Our AI has been trained on millions of code reviews to provide suggestions that feel like they come from a senior developer.',
    createdAt: '2024-02-05',
    owner: {
      id: 'u7',
      name: 'David Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      role: 'Backend Lead',
      skills: [{ name: 'Python', category: 'backend' }, { name: 'Machine Learning', category: 'ai' }]
    },
    teamMembers: [
      {
        id: 'u7',
        name: 'David Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        role: 'Backend Lead',
        skills: [{ name: 'Python', category: 'backend' }, { name: 'Machine Learning', category: 'ai' }]
      }
    ],
    maxTeamSize: 5,
    skillsNeeded: [
      { name: 'React', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'DevOps', category: 'devops' },
      { name: 'NLP', category: 'ai' }
    ],
    status: 'recruiting',
    category: 'Developer Tools',
    tags: ['AI', 'DevTools', 'Productivity']
  },
  {
    id: '6',
    title: 'CampusConnect',
    description: 'A social platform for university students to find study groups, events, and campus resources.',
    longDescription: 'CampusConnect brings the university experience together in one app. Find study partners for tough classes, discover campus events, access resources like tutoring and mental health services, and connect with clubs and organizations. Features a map-based interface for finding spaces and people near you.',
    createdAt: '2024-02-10',
    owner: {
      id: 'u8',
      name: 'Maya Thompson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
      role: 'UI/UX Designer',
      skills: [{ name: 'UI/UX Design', category: 'design' }, { name: 'Figma', category: 'design' }]
    },
    teamMembers: [
      {
        id: 'u8',
        name: 'Maya Thompson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
        role: 'UI/UX Designer',
        skills: [{ name: 'UI/UX Design', category: 'design' }, { name: 'Figma', category: 'design' }]
      }
    ],
    maxTeamSize: 5,
    skillsNeeded: [
      { name: 'React', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'PostgreSQL', category: 'backend' },
      { name: 'React Native', category: 'mobile' }
    ],
    status: 'recruiting',
    category: 'Social',
    tags: ['University', 'Social', 'Networking']
  }
];
