import type { SubjectMeta } from '../../types'

export const calculus: SubjectMeta = {
  id: 'calculus',
  code: 'BAMAT101',
  title: 'Calculus',
  accent: 'blue',
  tagline: 'Limits, continuity, partial differentiation & more',
  description:
    'Materials are available in your notes (limits & continuity, partial differentiation, CAT 1 question banks with keys) but interactive tutorials haven’t been built yet — ask to expand this subject once you’re ready to focus on it.',
  status: 'materials-only',
  materials: [
    'Introduction to syllabus',
    'Limits and Continuity',
    'Partial Differentiation',
    'Question bank — Module 1 (with key)',
    'CAT 1 question paper + key (2 slot variants)',
  ],
}
