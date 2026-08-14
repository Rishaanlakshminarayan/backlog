import type { SubjectMeta } from '../../types'

export const basicEngineering: SubjectMeta = {
  id: 'basic-engineering',
  code: 'BAEEE101',
  title: 'Basic Engineering',
  ltpc: '3-0-2-4',
  accent: 'terracotta',
  tagline: 'Circuits, electronics, graphics, manufacturing & bio-inspired design',
  description:
    'A six-module interdisciplinary foundation course spanning electrical circuits & machines, electronics & communication, engineering graphics/CAD, manufacturing & thermal systems, and biomimicry in engineering.',
  objectives: [
    'Introduce fundamental principles of major engineering disciplines.',
    'Create awareness of interdisciplinary engineering systems and their applications.',
  ],
  outcomes: [
    'Analyse electrical circuits, electrical motors and the role of power electronics in industrial applications.',
    'Acquire foundational knowledge of electronic devices and communication systems.',
    'Apply BIS standards to create basic 2D and 3D representations of engineering components.',
    'Explain the fundamental principles and applications of manufacturing processes, energy conversion systems, and mechanical automation technologies.',
    'Analyse real-world examples where bio-inspired solutions have led to breakthroughs in engineering.',
  ],
  status: 'ready',
  modules: [
    {
      id: 'module-1',
      title: 'Principles of Electrical Engineering: Circuits and Power Conversion Equipment',
      hours: 12,
      syllabus:
        'Electric circuit components, mesh current analysis, node voltage analysis, Thevenin’s and superposition theorems, single-phase AC circuits (RL, RC, RLC), power & energy calculations, power factor, electrical safety & earthing. Electromechanical energy conversion — DC motor, induction motor, BLDC motor, single-phase transformer, power electronics & industrial drives.',
      topics: [
        {
          id: 'circuit-elements',
          title: 'Circuit Elements & Sources',
          summary: 'Resistors, capacitors, inductors, resistor colour codes, ideal vs. practical sources, dependent sources.',
          status: 'ready',
          estMinutes: 15,
          quiz: { quizId: 'circuit-elements-quiz' },
        },
        {
          id: 'ohms-law-kirchhoff',
          title: "Ohm's Law & Kirchhoff's Laws",
          summary: 'Ohm’s law, KCL, KVL, sign conventions, nodes/branches/loops.',
          status: 'ready',
          estMinutes: 15,
          quiz: { quizId: 'ohms-kirchhoff-quiz' },
        },
        {
          id: 'mesh-analysis',
          title: 'Mesh Current Analysis',
          summary: 'Setting up mesh equations, supermesh, solving with Cramer’s rule — worked step-through.',
          status: 'ready',
          estMinutes: 20,
          quiz: { quizId: 'mesh-analysis-quiz' },
        },
        {
          id: 'nodal-analysis',
          title: 'Node Voltage Analysis',
          summary: 'Reference node selection, KCL at nodes, solving simultaneous node equations — worked step-through.',
          status: 'ready',
          estMinutes: 20,
          quiz: { quizId: 'nodal-analysis-quiz' },
        },
        {
          id: 'thevenin-superposition',
          title: "Thevenin's & Superposition Theorems",
          summary: 'Coming soon — network reduction techniques for linear circuits.',
          status: 'coming-soon',
        },
        {
          id: 'ac-circuits',
          title: 'Single-Phase AC Circuits (RL, RC, RLC)',
          summary: 'Coming soon — power, energy, power factor, electrical safety & earthing.',
          status: 'coming-soon',
        },
        {
          id: 'machines-drives',
          title: 'Electrical Machines & Power Electronics',
          summary: 'Coming soon — DC motor, induction motor, BLDC, transformer, industrial drives.',
          status: 'coming-soon',
        },
      ],
    },
    {
      id: 'module-2',
      title: 'Foundations of Electronics and Communication Systems',
      hours: 8,
      syllabus:
        'PN junction diode, Zener diode, BJT, MOSFET characteristics, rectifiers & voltage regulators, op-amps, EM spectrum, elements of communication systems, cellular, satellite communication & radar.',
      topics: [
        { id: 'electronics-overview', title: 'Devices, Circuits & Communication Systems', summary: 'Coming soon.', status: 'coming-soon' },
      ],
    },
    {
      id: 'module-3',
      title: 'Engineering Graphics and CAD',
      hours: 9,
      syllabus:
        'BIS standards, orthographic projections, first & third angle projection, isometric & perspective projections, freehand sketching, residential floor plans (IS SP7), intro to CAD.',
      topics: [
        { id: 'graphics-overview', title: 'Engineering Drawing & CAD Fundamentals', summary: 'Coming soon.', status: 'coming-soon' },
      ],
    },
    {
      id: 'module-4',
      title: 'Manufacturing Processes, Energy Conversions and Mechanical Automation',
      hours: 9,
      syllabus:
        'Metal casting, forming, joining, cutting, CNC machining, 3D printing, thermal engineering, IC engines, power plants, refrigeration & A/C, fuel cells, mechanisms, robotics & automation.',
      topics: [
        { id: 'manufacturing-overview', title: 'Manufacturing, Thermal Systems & Automation', summary: 'Coming soon.', status: 'coming-soon' },
      ],
    },
    {
      id: 'module-5',
      title: 'Bio-Inspired Design in Engineering',
      hours: 5,
      syllabus:
        'Biomimicry core principles — Velcro, self-healing materials, termite-mound ventilation, insect-inspired drones, neural networks. Identifying a problem and brainstorming a bio-inspired solution.',
      topics: [
        { id: 'biomimicry-overview', title: 'Biomimicry Case Studies', summary: 'Coming soon.', status: 'coming-soon' },
      ],
    },
    {
      id: 'module-6',
      title: 'Contemporary Topics',
      hours: 2,
      syllabus: 'Guest lectures by industry or research experts.',
      topics: [],
    },
  ],
}
