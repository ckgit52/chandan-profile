import { PROFILE } from "@/data/profile";
import { PROJECTS_DATA } from "@/data/projects";
import { WORK_COMPANIES } from "@/data/work-experiences";
import { SKILL_GROUPS } from "@/data/skills";
import { EDUCATION } from "@/data/education";

const FIRST_NAME = PROFILE.name.split(" ")[0];

const projectLines = PROJECTS_DATA.map(
  (p) => `- ${p.title} (${p.techStack.join(", ")}): ${p.description}`,
).join("\n");

const skillLines = SKILL_GROUPS.map(
  (g) => `- ${g.title}: ${g.items.join(", ")}`,
).join("\n");

const jobs = WORK_COMPANIES.map(
  (w) => `${w.role} at ${w.companyName} (${w.duration})`,
).join("; ");

const school = EDUCATION.map(
  (e) => `${e.degree}, ${e.institution}, ${e.duration}, CGPA ${e.cgpa}`,
).join("; ");

/**
 * Everything the assistant is allowed to say about the portfolio owner,
 * generated from the same data files that drive the site.
 */
export const SYSTEM_PROMPT = `
You are ${FIRST_NAME}'s AI assistant on ${PROFILE.name}'s portfolio website.

About ${PROFILE.name}:
- ${PROFILE.role}. ${PROFILE.about}
- Experience: ${jobs}
- Education: ${school}
- Contact: ${PROFILE.email}, or the contact form on this site

Projects:
${projectLines}

Skills:
${skillLines}

Rules:
- Keep answers short, friendly and concrete (2-4 sentences).
- Refer to ${FIRST_NAME} by name. Do not use gendered pronouns.
- Only state facts listed above. If something isn't covered, say you don't know and point to the contact form or ${PROFILE.email}.
- If a question is unrelated to ${FIRST_NAME}'s work, politely steer back to it.
`;

const answer = {
  who: `${PROFILE.name} is a ${PROFILE.role}. ${PROFILE.about}`,
  projects: `${FIRST_NAME} has built ${PROJECTS_DATA.map((p) => p.title).join(", ")}. Check the Projects page for the architecture behind each one.`,
  stack: `${FIRST_NAME} works mainly in Rust with ${SKILL_GROUPS[1].items.join(", ")}, plus ${SKILL_GROUPS[2].items.join(", ")} for data and messaging.`,
  experience: `${FIRST_NAME} has been a ${WORK_COMPANIES[0].role} since 2023 at ${WORK_COMPANIES[0].companyName}, building production REST APIs, microservices and trading infrastructure.`,
  education: `${EDUCATION[0].degree} from ${EDUCATION[0].institution} (${EDUCATION[0].duration}), CGPA ${EDUCATION[0].cgpa}.`,
  contact: `You can reach ${FIRST_NAME} at ${PROFILE.email} or through the contact form on this site.`,
  greeting: `Hi! I'm ${FIRST_NAME}'s AI assistant. Ask me about projects, tech stack or experience.`,
  thanks: `You're welcome! Let me know if you'd like to know more about ${FIRST_NAME}'s work.`,
};

/** Checked in order; patterns use word boundaries so "architecture" never matches "hi". */
const PREDEFINED: { pattern: RegExp; reply: string }[] = [
  { pattern: /\b(thanks|thank you)\b/i, reply: answer.thanks },
  {
    pattern: /\b(contact|email|reach|hire|hiring|available|availability)\b/i,
    reply: answer.contact,
  },
  {
    pattern:
      /\b(education|degree|college|university|school|pec|cgpa|stud(y|ied)|graduat\w*|b\.?tech)\b/i,
    reply: answer.education,
  },
  { pattern: /\b(projects?|built|portfolio)\b/i, reply: answer.projects },
  {
    pattern: /\b(skills?|tech(nolog(y|ies))?|stack|languages?|tools?)\b/i,
    reply: answer.stack,
  },
  {
    pattern: /\b(experience|worked|work|job|company|role)\b/i,
    reply: answer.experience,
  },
  {
    pattern: /\b(who (is|are)|tell me about|about you|introduce)\b/i,
    reply: answer.who,
  },
  { pattern: /^\s*(hi|hello|hey)\b/i, reply: answer.greeting },
];

export function getPredefinedAnswer(message: string): string | null {
  return PREDEFINED.find(({ pattern }) => pattern.test(message))?.reply ?? null;
}
