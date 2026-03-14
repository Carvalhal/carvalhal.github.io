/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  COURSES DATA  —  edit this file to add or update courses   ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Add new courses at the TOP of the array (newest first).    ║
 * ║  The main page and the courses page update automatically.   ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Fields per course object:
 *
 *   name          Course title
 *   platform      Platform name, e.g. "Udemy"
 *   date          Display date string, e.g. "January 2026"
 *   year          Numeric year used for grouping on the courses page
 *   credentialId  Certificate / credential ID from the platform
 *   certUrl       (optional) Override the certificate URL directly.
 *                 If omitted, defaults to:
 *                 https://www.udemy.com/certificate/{credentialId}/
 */

const COURSES = [
  {
    name: "Software Architecture: REST API Design — The Complete Guide",
    platform: "Udemy",
    date: "January 2026",
    year: 2026,
    credentialId: "UC-789c1e4c-ff1b-4bab-be24-c8f66fab3a88"
  },
  {
    name: "Business Fundamentals: Corporate Strategy",
    platform: "Udemy",
    date: "January 2026",
    year: 2026,
    credentialId: "UC-cbb5e048-aca2-4d0c-a493-5904ce2716c0"
  },
  {
    name: "Time Management Mastery: Productivity & Goals",
    platform: "Udemy",
    date: "April 2025",
    year: 2025,
    credentialId: "UC-d26085e2-229f-4081-bf1e-0d656282ebad"
  },
  {
    name: "Microservices: Designing Highly Scalable Systems",
    platform: "Udemy",
    date: "July 2023",
    year: 2023,
    credentialId: "UC-dde91481-81e6-44d9-a1be-4c8c3683543f"
  },
  {
    name: "Jira Advanced: Managing and Administrating Jira like a Pro",
    platform: "Udemy",
    date: "June 2023",
    year: 2023,
    credentialId: "UC-b0589dc7-8923-4885-877d-2d93b4ef5a47"
  },
  {
    name: "OpenAPI: Beginner to Guru",
    platform: "Udemy",
    date: "May 2021",
    year: 2021,
    credentialId: "UC-0008612f-5af2-476a-ab5a-cb5718160f51"
  },
  {
    name: "How To Become An Outstanding Solution Architect",
    platform: "Udemy",
    date: "April 2021",
    year: 2021,
    credentialId: "UC-66ec7979-1c0c-4276-a2a6-e37a924a9925"
  },
  {
    name: "Docker for the Absolute Beginner — Hands On DevOps",
    platform: "Udemy",
    date: "March 2021",
    year: 2021,
    credentialId: "UC-fcdfb44b-3e51-46be-b43d-e98acbfee826"
  },
  {
    name: "Maven Crash Course",
    platform: "Udemy",
    date: "April 2020",
    year: 2020,
    credentialId: "UC-729f25b9-32ac-4e53-8c51-82417202c8fe"
  },
  {
    name: "The Secrets of Body Language",
    platform: "Udemy",
    date: "November 2019",
    year: 2019,
    credentialId: "UC-MLDX0Q18"
  },
  {
    name: "Linux Shell Programming for Beginners",
    platform: "Udemy",
    date: "November 2019",
    year: 2019,
    credentialId: "UC-2EK6KFQ6"
  },
  {
    name: "Git Complete: The Definitive, Step-by-Step Guide to Git",
    platform: "Udemy",
    date: "March 2019",
    year: 2019,
    credentialId: "UC-0DKKYQ4L"
  }
];

/** Resolves the certificate URL for a course. */
function getCertUrl(course) {
  if (course.certUrl) return course.certUrl;
  return `https://www.udemy.com/certificate/${course.credentialId}/`;
}
