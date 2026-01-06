
import { Project, Experience, Achievement } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'vibetribe',
    title: 'VibeTribe',
    description: 'A robust social community platform featuring real-time interactions and secure Firebase integration.',
    fullDescription: 'VibeTribe is a high-performance Single Page Application (SPA) designed to foster community engagement through real-time updates and secure data management.',
    tech: ['React', 'Django', 'SQL', 'Firebase', 'Tailwind'],
    link: 'https://vibetribe.vercel.app/',
    github: 'https://github.com/Shiv24angi/VIBETRIBE',
    status: 'live',
    features: ['Real-time messaging', 'Firebase Authentication', 'Dynamic content feed', 'Responsive Dashboard']
  },
  {
    id: 'payzen',
    title: 'PayZen',
    description: 'AI-driven loan risk assessment dashboard leveraging SHAP for model explainability.',
    fullDescription: 'A fintech solution that uses machine learning to predict loan defaults and provides clear visualizations for decision-making using SHAP values.',
    tech: ['Python', 'Streamlit', 'Scikit-learn', 'SHAP', 'Pandas'],
    github: 'https://github.com/Shiv24angi/loan_tracker',
    status: 'github',
    features: ['Predictive Risk Scoring', 'SHAP Explainability', 'Automated Recovery Suggestions', 'Interactive Dashboards']
  },
  {
    id: 'nivaran',
    title: 'Nivaran (SIH)',
    description: 'Comprehensive legal and welfare information hub built for Smart India Hackathon.',
    fullDescription: 'A massive platform designed to make legal rights accessible to the common man, featuring multi-lingual support and AI-driven document assistance.',
    tech: ['Streamlit', 'Flask', 'Twilio', 'gTTS', 'GCP'],
    github: 'https://github.com/vanshaggarwal27/Nivaran',
    status: 'github',
    features: ['Multilingual AI Assistant', 'SMS/Voice Integration', 'Legal Document Generation']
  },
  {
    id: 'gg-gyaan',
    title: 'Ghar Ghar Gyaan',
    description: 'AI-powered legal & health rights advisor delivering support via web and SMS.',
    fullDescription: 'An inclusive advisory tool that helps citizens understand their basic rights using simplified AI models and Twilio integration.',
    tech: ['AI/ML', 'Twilio', 'Flask', 'GCP'],
    github: 'https://github.com/harshitb206/GharGharGyaan',
    status: 'github'
  },
  {
    id: 'ecoverse',
    title: 'EcoVerse',
    description: 'Dedicated to environmental awareness and sustainable lifestyle tracking.',
    fullDescription: 'A platform where users can track their carbon footprint, engage in sustainability challenges, and learn about eco-friendly practices.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    github: 'https://github.com/Shiv24angi/EcoVerse',
    status: 'github'
  },
  {
    id: 'hand-ar',
    title: 'Hand Filter AR',
    description: 'Augmented reality experience using computer vision to apply filters on hand movements.',
    tech: ['OpenCV', 'Python', 'MediaPipe'],
    github: 'https://github.com/Shiv24angi',
    status: 'github'
  },
  {
    id: 'magic-drums',
    title: 'Magic Drums',
    description: 'Interactive virtual drum kit triggered by hand motions and computer vision.',
    tech: ['OpenCV', 'Python', 'PyGame'],
    github: 'https://github.com/Shiv24angi',
    status: 'github'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    company: 'Trantor Software',
    title: 'ML Intern',
    details: [
      'Developed House Price Prediction & Credit Card Fraud models.',
      'Optimized classification workflows for performance.',
      'Built deployment pipelines using Flask and Streamlit.'
    ],
    date: 'Jun 2025 - Jul 2025'
  },
  {
    id: 'exp-2',
    company: 'Ycotes',
    title: 'AI/ML Intern',
    details: [
      'Implemented learning models for specialized education apps.',
      'Data preprocessing and model optimization in an agile startup environment.'
    ],
    date: 'Sept 2025 - Present'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    event: 'Hackowasp 7.0 (Thapar University)',
    title: '2nd Place Winners',
    result: 'Ideathon Winners for Ghar Ghar Gyaan project.',
    date: 'April 2025'
  },
  {
    id: 'ach-2',
    event: 'HackOrbit (MITS Gwalior)',
    title: 'Finalist - FreshForge',
    result: '36-hour national-level hackathon finalist.',
    date: 'June 2025'
  },
  {
    id: 'ach-3',
    event: 'Internal SIH Hackathon',
    title: 'Top 20 Finalist',
    result: 'Ranked in Top 20 for Smart India Hackathon internal rounds.',
    date: 'Sep 2025'
  }
];

export const SKILLS_CATEGORIES = [
  {
    name: 'Programming',
    skills: ['C/C++', 'Java', 'Python', 'JavaScript', 'TypeScript']
  },
  {
    name: 'Frontend',
    skills: ['HTML/CSS', 'Tailwind CSS', 'ReactJS', 'Three.js']
  },
  {
    name: 'Backend & DB',
    skills: ['NodeJS', 'ExpressJS', 'REST API', 'MongoDB', 'Oracle SQL', 'MySQL']
  },
  {
    name: 'AI/ML',
    skills: ['Scikit-Learn', 'OpenCV', 'Pipelines', 'Generative AI', 'Prompt Engineering']
  },
  {
    name: 'Core CS',
    skills: ['DSA', 'OOP', 'OS', 'DBMS', 'COA', 'Software Engineering']
  },
  {
    name: 'Tools',
    skills: ['Git/GitHub', 'Google Cloud', 'VS Code', 'Google Colab']
  }
];
