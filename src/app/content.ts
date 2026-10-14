// Single source of truth for all portfolio content. Edit here, the UI updates everywhere.

export const profile = {
  name: 'Ankita Soni',
  title: 'Full Stack Software Engineer',
  location: 'Bengaluru, Karnataka, India',
  email: 'ankita.anku.soni@gmail.com',
  phone: '+91 84093 68859',
  phoneHref: 'tel:+918409368859',
  company: 'Capgemini',
  startYear: 2022,
  resumeUrl: 'Ankita_Soni_Resume.pdf',
  // Paste your profile URLs below; links are hidden while empty.
  github: 'https://github.com/ankita-2631',
  linkedin: 'https://www.linkedin.com/in/ankita-soni-612a641a4/',
  roles: [
    'Full Stack Engineer (.NET + Angular)',
    'Azure & Cloud Practitioner',
    'Power Platform Automation Builder',
    'Python & AI Explorer',
  ],
  summary:
    'I build scalable enterprise applications end to end: Angular front ends, .NET APIs and well-tuned SQL Server back ends. I also automate business processes with the Power Platform and I am growing deeper into Python, AI and cloud engineering.',
}

export const stats = [
  { value: 0, suffix: '+', label: 'Years in enterprise engineering', years: true },
  { value: 5, suffix: '', label: 'Microsoft & Google certifications' },
  { value: 30, suffix: '%', label: 'Faster data retrieval via SQL tuning' },
  { value: 40, suffix: '%', label: 'Less manual work via automation' },
]

export type SkillCategory = 'Backend' | 'Frontend' | 'Cloud & DevOps' | 'Data' | 'Low-Code' | 'AI & Python'

export interface Skill {
  name: string
  category: SkillCategory
  growing?: boolean
}

export const skillCategories: SkillCategory[] = [
  'Backend',
  'Frontend',
  'Cloud & DevOps',
  'Data',
  'Low-Code',
  'AI & Python',
]

export const skills: Skill[] = [
  { name: 'C#', category: 'Backend' },
  { name: '.NET Framework', category: 'Backend' },
  { name: 'REST APIs', category: 'Backend' },
  { name: 'Core Java', category: 'Backend' },
  { name: 'C / C++', category: 'Backend' },
  { name: 'Angular', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'HTML5', category: 'Frontend' },
  { name: 'CSS3', category: 'Frontend' },
  { name: 'Azure', category: 'Cloud & DevOps' },
  { name: 'Azure AD', category: 'Cloud & DevOps' },
  { name: 'Docker', category: 'Cloud & DevOps', growing: true },
  { name: 'Google Cloud', category: 'Cloud & DevOps' },
  { name: 'SQL Server', category: 'Data' },
  { name: 'SQL', category: 'Data' },
  { name: 'PL/SQL', category: 'Data' },
  { name: 'Query Optimization', category: 'Data' },
  { name: 'Power Apps', category: 'Low-Code' },
  { name: 'Power Automate', category: 'Low-Code' },
  { name: 'Copilot Studio', category: 'Low-Code' },
  { name: 'SharePoint', category: 'Low-Code' },
  { name: 'Python', category: 'AI & Python', growing: true },
  { name: 'Azure AI Services', category: 'AI & Python', growing: true },
  { name: 'Generative AI', category: 'AI & Python', growing: true },
]

export const experience = {
  role: 'Full Stack Software Engineer',
  company: 'Capgemini',
  period: '2022 – Present',
  location: 'Bengaluru, Karnataka',
  groups: [
    {
      title: 'Full-stack development',
      points: [
        'Designed, developed and maintained end-to-end enterprise web applications with C# .NET Framework, Angular and SQL Server.',
        'Built RESTful .NET APIs powering Angular front ends and third-party integrations.',
        'Developed responsive UI components with Angular, JavaScript, HTML5 and CSS3.',
      ],
    },
    {
      title: 'ERP & data performance',
      points: [
        'Worked on ERP modules covering inventory management, billing and financial operations.',
        'Optimized SQL queries, stored procedures and database performance to speed up data retrieval.',
      ],
    },
    {
      title: 'Automation & workflows',
      points: [
        'Implemented business process automation with Power Apps and Power Automate, reducing manual effort.',
        'Developed automated approval workflows and compliance tracking systems.',
      ],
    },
    {
      title: 'Quality & collaboration',
      points: [
        'Worked with cross-functional teams to turn business requirements into scalable technical solutions.',
        'Upheld security, performance and maintainability through code reviews, debugging and best practices.',
        'Supported production issues, performance tuning and enhancements in enterprise environments.',
      ],
    },
  ],
}

export interface Project {
  id: string
  title: string
  tagline: string
  stack: string[]
  metric: { value: string; label: string }
  problem: string
  approach: string[]
  outcomes: string[]
  flow: string[]
}

export const projects: Project[] = [
  {
    id: 'erp',
    title: 'Enterprise Resource Management System',
    tagline: 'A modular ERP that streamlines inventory, billing and financial operations.',
    stack: ['C#', '.NET Framework', 'Angular', 'SQL Server'],
    metric: { value: '30%', label: 'faster data retrieval' },
    problem:
      'Operations teams needed inventory, billing and finance handled in one reliable system, but slow data access and disconnected processes hurt productivity.',
    approach: [
      'Structured the application into independent modules (inventory, billing, finance) so each can evolve safely.',
      'Exposed the business logic through REST-based .NET APIs consumed by an Angular front end.',
      'Profiled slow queries and tuned SQL and stored procedures to cut data retrieval time.',
    ],
    outcomes: [
      'Data retrieval performance improved by 30% through SQL optimization.',
      'A clean API contract between the Angular UI and .NET services, ready for third-party integrations.',
    ],
    flow: ['Angular UI', '.NET REST API', 'Business modules', 'SQL Server'],
  },
  {
    id: 'automation',
    title: 'Business Process Automation',
    tagline: 'Onboarding and approval automation on the Power Platform, SharePoint and Azure AD.',
    stack: ['Power Apps', 'Power Automate', 'SharePoint', 'Azure AD'],
    metric: { value: '40%', label: 'less manual work' },
    problem:
      'Employee onboarding and approvals relied on manual hand-offs, which cost time and made compliance hard to track.',
    approach: [
      'Architected an onboarding solution with Power Apps forms driving Power Automate flows.',
      'Integrated the flows with SharePoint for data and Azure AD for identity and access.',
      'Implemented automated approval flows with status tracking for compliance visibility.',
    ],
    outcomes: [
      'Manual onboarding work reduced by 40%.',
      'Automated approvals improved compliance tracking and auditability.',
    ],
    flow: ['Power Apps form', 'Power Automate', 'Azure AD + SharePoint', 'Approval & tracking'],
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio Website',
    tagline: 'This site: a content-driven, animated portfolio built with modern Angular and Tailwind CSS.',
    stack: ['Angular', 'TypeScript', 'Tailwind CSS', 'Motion', 'GitHub Actions'],
    metric: { value: '8', label: 'content-driven sections' },
    problem:
      'I needed a fast, accessible portfolio that presents my experience, skills and case studies clearly, and that I can update without touching any component code.',
    approach: [
      'Built it with standalone components, signals and zoneless change detection for a lean, modern Angular codebase.',
      'Centralised all copy and data in a single typed content file so sections render from data.',
      'Styled with Tailwind CSS v4 and added scroll-reveal, tilt and neural-background animations with Motion, respecting reduced-motion preferences.',
      'Added a light/dark theme, keyboard-accessible case-study dialogs and automated deployment via GitHub Actions.',
    ],
    outcomes: [
      'Updating any section is a content-only change in one file.',
      'Accessible, responsive experience with a one-push deploy to GitHub Pages or Azure Static Web Apps.',
    ],
    flow: ['content.ts data', 'Angular components', 'Tailwind + Motion UI', 'GitHub Actions deploy'],
  },
]

export const certifications = [
  { name: 'Azure AI Engineer Associate', code: 'AI-102', issuer: 'Microsoft', level: 'Associate', hue: 'from-sky-400 to-violet-500' },
  { name: 'Azure Fundamentals', code: 'AZ-900', issuer: 'Microsoft', level: 'Fundamentals', hue: 'from-sky-400 to-blue-600' },
  { name: 'AI Fundamentals', code: 'AI-900', issuer: 'Microsoft', level: 'Fundamentals', hue: 'from-violet-400 to-fuchsia-500' },
  { name: 'Power Platform Fundamentals', code: 'PL-900', issuer: 'Microsoft', level: 'Fundamentals', hue: 'from-fuchsia-400 to-rose-500' },
  { name: 'Cloud Digital Leader', code: 'CDL', issuer: 'Google Cloud', level: 'Foundational', hue: 'from-emerald-400 to-sky-500' },
]

export const education = [
  { degree: 'MCA', full: 'Master of Computer Applications', school: 'Chandigarh Group of Colleges', period: '2019 – 2021' },
  { degree: 'BCA', full: 'Bachelor of Computer Applications', school: 'S.M College', period: '2013 – 2016' },
]

export const growthTracks = [
  {
    id: 'python',
    title: 'Python',
    blurb: 'Scripting, automation and the foundation for AI work.',
    done: ['Python in my core skill set'],
    next: ['Build a REST API with FastAPI', 'Automate data tasks with Python scripts'],
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    blurb: 'From certified fundamentals to building real AI solutions.',
    done: ['AI-900 AI Fundamentals', 'AI-102 Azure AI Engineer Associate', 'Copilot Studio'],
    next: ['Ship a RAG chatbot with Azure AI services', 'Add AI features to an enterprise workflow'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    blurb: 'Taking enterprise apps from my machine to production-grade cloud.',
    done: ['AZ-900 Azure Fundamentals', 'Google Cloud Digital Leader', 'Docker'],
    next: ['Containerize a .NET API and deploy to Azure', 'CI/CD with GitHub Actions'],
  },
]

