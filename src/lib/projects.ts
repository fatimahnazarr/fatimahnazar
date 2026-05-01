export type CaseStudySection = {
  type:    'problem' | 'goal' | 'audience' | 'solution' | 'features' | 'outcome' | 'process' | 'gallery';
  title:   string;
  content: string | string[];
  images?: string[];
};

export type Project = {
  slug:        string;
  id:          string;
  title:       string;
  titleAr?:    string;
  role:        string;
  year:        string;
  tags:        string[];
  desc:        string;
  color:       string;
  accent:      string;
  liveUrl?:    string;
  figmaUrl?:   string;
  overview:    string;
  sections:    CaseStudySection[];
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    slug:     'kutubly',
    id:       '01',
    title:    'Kutubly',
    titleAr:  'كُتُبلي',
    role:     'UI/UX Designer & Front-End Developer',
    year:     '2026',
    tags:     ['Web App', 'Arabic-First', 'Prototype', '7 Days'],
    desc:     'A modern Arabic reading tracker — designed and developed in 7 days. Helps Arab readers document their journey, discover books, and connect with other readers.',
    color:    '#111210',
    accent:   '#c9b99a',
    liveUrl:  'https://your-kutubly-link.com', // ← replace with your real URL
    overview: 'Kutubly is a modern Arabic-first web platform designed to help Arab readers track their reading journey, discover new books, and interact with other readers — in a simpler, smarter way. Built as a fully functional prototype in 7 days, the project reimagines the traditional reading tracker experience with a more personal, interactive feel.',
    sections: [
      {
        type:    'problem',
        title:   'The Problem',
        content: [
          'Arab readers lack a modern, easy-to-use platform that helps them track books and discover new reads.',
          'Most existing solutions are overly complex and uncomfortable to use.',
          'They are not well-suited for Arabic-speaking users.',
          'They focus on rating systems rather than the actual reading experience.',
          'They ignore the behavior and habits of the Arab reader.',
        ],
      },
      {
        type:    'goal',
        title:   'The Goal',
        content: [
          'Simplify the experience of searching for and discovering books.',
          'Reduce complexity in how users interact with their reading lists.',
          'Deliver a smooth, fast, and frictionless experience from day one.',
        ],
      },
      {
        type:    'audience',
        title:   'Target Audience',
        content: [
          'Arab readers between the ages of 18–35.',
          'Students and young professionals.',
          'Book lovers and avid readers.',
          'People actively searching for trusted reading recommendations.',
        ],
      },
      {
        type:    'solution',
        title:   'The Solution',
        content: [
          'A simple, intuitive interface that feels native to Arabic users.',
          'Smart and fast book discovery tailored to reading preferences.',
          'A lightweight social layer — connect with readers without the noise.',
          'Arabic-first design: language, layout direction, and UX all built for Arabic.',
        ],
      },
      {
        type:    'features',
        title:   'Key Features',
        content: [
          'Comprehensive book library with clear, structured details.',
          'Smart, fast search by title, author, or ISBN.',
          'Save and organize books by reading status.',
          'Simple interaction system — no complex rating mechanics.',
          'Share quotes directly from books.',
        ],
      },
      {
        type:    'outcome',
        title:   'Outcome',
        content: [
          'Delivered a complete, focused platform in 7 days — from research to working prototype.',
          'Improved the digital reading experience for Arabic users.',
          'Made book discovery faster and more enjoyable.',
          'Turned reading tracking into a simple, sustainable daily habit.',
        ],
      },
    ],
  },
  {
    slug:     'sooq-app',
    id:       '02',
    title:    'Sooq App',
    role:     'Product Designer',
    year:     '2024',
    tags:     ['Admin Dashboard', 'Figma', 'UI/UX'],
    desc:     'Admin and Merchant dashboards for a marketplace platform. Structured system management workflows for platform owners and merchants.',
    color:    '#1a1a1a',
    accent:   '#c9b99a',
    overview: 'Designed the Admin and Merchant dashboards for Sooq App — a marketplace platform. The focus was on structuring complex system management workflows into clear, usable interfaces for both platform owners and merchants managing products and orders.',
    sections: [],
    comingSoon: true,
  },
  {
  slug:     'hi-influencer',
  id:       '03',
  title:    'Hi Influencer',
  role:     'Product Designer',
  year:     '2025',
  tags:     ['Multi-role Dashboard', 'UX Restructuring', 'Iraqi Market', 'MVP Redesign'],
  desc:     'Four interconnected dashboards — Admin, Influencer, Merchant, and Affiliate — with analytics and a redesigned platform UX.',
  color:    '#141414',
  accent:   '#a09a90',
  overview: 'Hi Influencer addresses a major gap in the Iraqi market — lack of reliable influencer analytics, no structured affiliate monetization system, and limited performance tracking for brands. I joined at the MVP stage to completely restructure the user experience and redesign the interface to support scalability, clarity, and adoption for three distinct user groups.',
  sections: [
    {
      type:    'problem',
      title:   'The Problem',
      content: [
        'The product had functional features, but user flows were not optimized.',
        'Affiliate onboarding was especially broken — a relatively new and unfamiliar concept in the Iraqi market.',
        'No reliable influencer analytics for brands to make decisions.',
        'No structured affiliate monetization system.',
        'Limited performance tracking across user roles.',
      ],
    },
    {
      type:    'process',
      title:   'Process',
      content: [
        'Product Audit — Reviewed the existing MVP to identify UX friction points, structural gaps, and scalability limitations.',
        'Data Validation — Analyzed internal platform data and verified assumptions about user behavior and business goals.',
        'UX Restructuring — Redefined user journeys for three user types (Brands, Affiliates, Customers) with clear segmentation.',
        'Flow Optimization — Simplified complex affiliate onboarding and commission logic to reduce cognitive load.',
        'UI Redesign — Applied a modern minimalist design system to improve clarity, trust, and cross-role usability.',
      ],
    },
    {
      type:    'solution',
      title:   'Solutions',
      content: [
        'Clear Role Segmentation — Redesigned the platform architecture to cleanly separate the experience for Brands, Affiliates, and Customers. Reduced confusion and improved navigation clarity.',
        'Simplified Affiliate Onboarding — Transformed a complex commission model into a guided, step-by-step flow. Reduced cognitive load and increased trust in a new market concept.',
        'Scalable Dashboard Structure — Designed role-based dashboards highlighting relevant KPIs per user type. Enabled focused decision-making and performance tracking.',
        'Modern Minimal UI System — Applied a clean, minimal design system aligned with brand identity. Enhanced usability and prepared the product for scale.',
      ],
    },
    {
      type:   'gallery',
      title:  'UI Design',
      content: 'A modern minimalist interface designed for clarity across all user roles — Brands, Affiliates, and Customers.',
      images: [
        '/projects/hi-influencer/1.png',
        '/projects/hi-influencer/2.png',
        '/projects/hi-influencer/3.png',
        '/projects/hi-influencer/4.png',
        '/projects/hi-influencer/5.png',
      ],
    },
  ],
},
  {
    slug:     'hayat-travel',
    id:       '04',
    title:    'Hayat Travel Agency',
    role:     'Product Designer',
    year:     '2026',
    tags:     ['Booking Platform', 'Iraqi Airways', 'End-to-End UX'],
    desc:     'Two full-scale platforms from scratch — a booking platform for the Iraqi market and a ticket distribution system with Iraqi Airways.',
    color:    '#121212',
    accent:   '#c9b99a',
    overview: 'Led the end-to-end design of two full-scale platforms for Hayat Travel Agency — a booking platform tailored for the Iraqi market, and a ticket distribution platform in collaboration with Iraqi Airways. Covered the full experience for Admin, Clients, Customers, and Staff.',
    sections: [],
    comingSoon: true,
  },
 
  {
  slug:     'arab-professionals',
  id:       '06',
  title:    'Mihnati',
  titleAr:  'يتنهم',
  role:     'Lead Designer',
  year:     '2025',
  tags:     ['Mobile App', 'UI/UX Competition', 'Team of 5', 'Arabic-First', 'Middle East'],
  desc:     'Led a cross-regional team of 5 designers to build a platform combining LinkedIn and freelance features for Arab professionals.',
  color:    '#131313',
  accent:   '#c9b99a',
  overview: 'Mihnati (يتنهم) is an Arabic-first professional platform that unifies employment, freelancing, communication, and reputation into one safe and simple place. Designed by a cross-regional team of 5 designers from across the Middle East in a regional UI/UX competition — covering the full design process from research to high-fidelity interactive prototypes.',
  sections: [
    {
      type:    'problem',
      title:   'The Problem',
      content: [
        'Arab professionals lack a single trusted platform that combines networking, employment, and freelancing.',
        'Existing platforms are scattered — users juggle LinkedIn for networking, Upwork for freelancing, and local tools for payments.',
        'Weak skill presentation mechanisms make it hard for professionals to stand out.',
        'Poor communication and project management tools create friction between clients and freelancers.',
        'No smart tools to guide users through the hiring or freelancing process.',
        'Lack of social interaction features limits growth and professional development opportunities.',
      ],
    },
    {
      type:    'process',
      title:   'Design Process',
      content: [
        'Empathize — User interviews and surveys with Arab professionals to understand pain points, behaviors, and unmet needs.',
        'Define — User personas, empathy mapping, competitive analysis (LinkedIn, Upwork, Freelancer, Khamsat), and affinity mapping.',
        'Ideate — Feature prioritization, value proposition mapping, user journey mapping, and information architecture.',
        'Design — Design system creation, wireframes, visual design, and interactive high-fidelity prototypes.',
      ],
    },
    {
      type:    'solution',
      title:   'The Solution',
      content: [
        'One unified place for work, communication, and professional reputation — safe and simple.',
        'Integrated marketplace with contract, payment, escrow, and project management in one flow.',
        'Escrow payment system that prevents fake projects and protects both parties before work is delivered.',
        'Verified identity and account documentation to build trust between professionals and clients.',
        'Smart notification system and effective messaging that supports voice calls.',
        'AI-powered tools to guide users through the platform and surface relevant opportunities.',
      ],
    },
    {
      type:    'features',
      title:   'Key Features',
      content: [
        'Job opportunities and professional network building for both employed and freelance users.',
        'Safe professional environment with full dark mode support.',
        'Arabic-first interface with Arabic language support and local payment options.',
        'Competitive, transparent pricing with no hidden fees.',
        'Portfolio showcase for professionals to display their work.',
        'Escrow payment protection — funds held securely until work is delivered.',
        'Smart AI-assisted notifications and recommendations.',
      ],
    },
    {
      type:   'gallery',
      title:  'UI Design',
      content: 'An Arabic-first mobile interface — clean, professional, and built for the Arab market. Designed as a team of 5 across the Middle East.',
      images: [
        '/projects/arab-professionals/1.png',
        '/projects/arab-professionals/2.png',
        '/projects/arab-professionals/3.png',
        '/projects/arab-professionals/4.png',
        '/projects/arab-professionals/5.png',
        '/projects/arab-professionals/6.png',
        '/projects/arab-professionals/7.png',
        '/projects/arab-professionals/8.png',
        '/projects/arab-professionals/9.png',
        '/projects/arab-professionals/10.png',
      ],
    },
  ],
},
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}