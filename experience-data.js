/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  EXPERIENCE DATA — edit this file to add or update roles    ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Add new entries at the TOP of the array (newest first).    ║
 * ║  The journey section updates automatically.                 ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Fields per entry:
 *
 *   years        Display string for the year range
 *                e.g. "Now ← 2024"
 *   location     City / country string
 *   company      Company name
 *   role         Role title(s). Use ← to show progression, newest first.
 *                e.g. "Engineering Lead ← Senior Engineer ← Engineer"
 *                Single role entries don't need an arrow.
 *   description  Paragraph text shown below the role
 *   chips        Array of skill / tech tags shown at the bottom
 *   dim          (optional) true to use a dimmed dot — for early-career entries
 */

const EXPERIENCE = [
  {
    years: 'Now ← 2024',
    location: 'Remote, Portugal',
    company: 'AUTODOC',
    role: 'Team Lead · Supplier Integrations',
    description: "Leading the supplier integrations team at one of Europe's largest automotive parts e-commerce platforms. Overseeing end-to-end integration flows between suppliers and the core platform.",
    chips: ['Team Management', 'JIRA', 'Supplier Integrations']
  },
  {
    years: '2024 ← 2018',
    location: 'Porto, Portugal',
    company: 'FARFETCH',
    role: 'Engineering Lead ← Senior Integration Engineer ← Integration Engineer',
    description: "Nearly six years at one of the world's leading luxury fashion platforms. Grew from Integration Engineer to Engineering Lead, building microservice architectures, leading technical roadmapping, and shipping integration infrastructure at scale.",
    chips: ['Microservices', 'Engineering Leadership', 'Tech Roadmapping', 'WSO2', 'Software Engineering']
  },
  {
    years: '2018 ← 2014',
    location: 'London, UK',
    company: 'Cerner Corporation',
    role: 'Interface Architect ← Senior Interface Engineer ← System Engineer',
    description: 'Designed and built HL7 interfaces for national healthcare systems across the UK — including a national maternal and newborn clinical management system and NHS pathology services infrastructure. Progressed from System Engineer to Interface Architect over four years.',
    chips: ['HL7', 'Healthcare IT', 'Interface Architecture', 'Cerner Millennium']
  },
  {
    years: '2014 ← 2013',
    location: 'Lisbon, Portugal',
    company: 'Deloitte',
    role: 'IT Analyst',
    description: 'Consulting and IT analysis, working on enterprise software solutions and engineering projects.',
    chips: ['XPath', 'Software Engineering', 'Enterprise IT']
  },
  {
    years: '2012 ← 2011',
    location: 'Famalicão, Portugal',
    company: 'CeNTI',
    role: 'Research Fellow',
    description: 'Research on simulation tools for human body thermoregulation at the Centre for Nanotechnology and Smart Materials.',
    chips: ['Research', 'Bioinformatics', 'Simulation'],
    dim: true
  }
];
