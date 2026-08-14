import type { Semester, SubjectMeta } from './types'
import { basicEngineering } from './subjects/basic-engineering/meta'
import { calculus } from './subjects/calculus/meta'
import { appliedChemistry } from './subjects/applied-chemistry/meta'

function planned(id: string, title: string, tagline: string, accent: SubjectMeta['accent']): SubjectMeta {
  return {
    id,
    title,
    tagline,
    accent,
    status: 'planned',
    description:
      'A best-effort placeholder based on typical VIT B.Tech CSE curriculum patterns — nothing has been confirmed against your actual registered courses yet. Drop your materials in the notes folder when this semester arrives and this page becomes real.',
  }
}

export const curriculum: Semester[] = [
  {
    id: 1,
    label: 'Semester 1',
    note: 'Built from your actual VIT files — Basic Engineering is fully interactive, Calculus & Applied Chemistry are materials-only for now.',
    subjects: [
      basicEngineering,
      calculus,
      appliedChemistry,
      planned('sem1-other', 'Other Sem 1 courses', 'Communicative English, Environmental Sciences, etc. — add as materials arrive', 'gold'),
    ],
  },
  {
    id: 2,
    label: 'Semester 2',
    subjects: [
      planned('diff-eq-transforms', 'Differential Equations & Transforms', 'ODEs, Laplace & Fourier transforms', 'blue'),
      planned('engineering-physics', 'Engineering Physics', 'Modern physics for engineers', 'sage'),
      planned('oop-java', 'Object Oriented Programming', 'Java fundamentals & OOP design', 'purple'),
      planned('environmental-science', 'Environmental Sciences', 'Sustainability & environmental systems', 'terracotta'),
      planned('universal-human-values', 'Universal Human Values', 'Ethics & value education', 'gold'),
    ],
  },
  {
    id: 3,
    label: 'Semester 3',
    subjects: [
      planned('dsa', 'Data Structures & Algorithms', 'Core CS problem-solving toolkit', 'purple'),
      planned('digital-logic', 'Digital Logic & Design', 'Combinational & sequential circuits', 'terracotta'),
      planned('discrete-math', 'Discrete Mathematics', 'Logic, graph theory, combinatorics', 'blue'),
      planned('dbms', 'Database Management Systems', 'Relational model, SQL, normalization', 'sage'),
      planned('probability-stats', 'Probability & Statistics', 'Foundations for ML & data analysis', 'gold'),
    ],
  },
  {
    id: 4,
    label: 'Semester 4',
    subjects: [
      planned('os', 'Operating Systems', 'Processes, memory, concurrency, scheduling', 'purple'),
      planned('daa', 'Design & Analysis of Algorithms', 'Complexity, greedy/DP/graph algorithms', 'terracotta'),
      planned('computer-networks', 'Computer Networks', 'OSI/TCP-IP stack, routing, protocols', 'blue'),
      planned('web-programming', 'Java / Web Programming', 'Full-stack fundamentals', 'sage'),
      planned('toc', 'Theory of Computation', 'Automata, formal languages, computability', 'gold'),
    ],
  },
  {
    id: 5,
    label: 'Semester 5',
    subjects: [
      planned('ai', 'Artificial Intelligence', 'Search, knowledge representation, reasoning', 'purple'),
      planned('software-engineering', 'Software Engineering', 'SDLC, design patterns, testing', 'terracotta'),
      planned('compiler-design', 'Compiler Design', 'Lexing, parsing, codegen', 'blue'),
      planned('prof-elective-1', 'Professional Elective 1', 'Branch elective — TBD', 'sage'),
      planned('open-elective-1', 'Open Elective 1', 'Cross-discipline elective — TBD', 'gold'),
    ],
  },
  {
    id: 6,
    label: 'Semester 6',
    subjects: [
      planned('ml', 'Machine Learning', 'Supervised/unsupervised learning, model eval', 'purple'),
      planned('cloud-computing', 'Cloud Computing', 'Distributed systems, containers, cloud platforms', 'blue'),
      planned('prof-elective-2', 'Professional Elective 2', 'Branch elective — TBD', 'terracotta'),
      planned('prof-elective-3', 'Professional Elective 3', 'Branch elective — TBD', 'sage'),
      planned('mini-project', 'Mini Project', 'Applied team project', 'gold'),
    ],
  },
  {
    id: 7,
    label: 'Semester 7',
    subjects: [
      planned('prof-elective-4', 'Professional Elective 4', 'Branch elective — TBD', 'purple'),
      planned('open-elective-2', 'Open Elective 2', 'Cross-discipline elective — TBD', 'blue'),
      planned('capstone-1', 'Capstone Project — Phase 1', 'Major project proposal & design', 'terracotta'),
      planned('internship', 'Industry Internship', 'Industry-aligned practical experience', 'gold'),
    ],
  },
  {
    id: 8,
    label: 'Semester 8',
    subjects: [
      planned('capstone-2', 'Capstone Project — Phase 2', 'Major project implementation & defence', 'purple'),
      planned('final-internship', 'Internship / Placement Track', 'Final-semester industry track', 'sage'),
    ],
  },
]

export function findSubject(subjectId: string): { subject: SubjectMeta; semester: Semester } | undefined {
  for (const semester of curriculum) {
    const subject = semester.subjects.find((s) => s.id === subjectId)
    if (subject) return { subject, semester }
  }
  return undefined
}

export function findTopic(subjectId: string, topicId: string) {
  const found = findSubject(subjectId)
  if (!found) return undefined
  for (const mod of found.subject.modules ?? []) {
    const topic = mod.topics.find((t) => t.id === topicId)
    if (topic) return { topic, module: mod, subject: found.subject, semester: found.semester }
  }
  return undefined
}
