import type { Quiz } from '../../../quizTypes'

export const circuitElementsQuiz: Quiz = {
  id: 'circuit-elements-quiz',
  title: 'Circuit Elements & Sources',
  questions: [
    {
      id: 'ce-1',
      type: 'mcq',
      prompt: 'A resistor has colour bands Yellow, Violet, Red, Gold. What is its resistance?',
      options: ['47 Ω ± 5%', '4700 Ω ± 5%', '470 Ω ± 5%', '4.7 Ω ± 5%'],
      correctIndex: 1,
      explanation: 'Yellow=4, Violet=7 → 47, Red multiplier = ×100 → 4700 Ω, Gold tolerance = ±5%.',
    },
    {
      id: 'ce-2',
      type: 'mcq',
      prompt: 'Which passive element opposes a change in current by storing energy in a magnetic field?',
      options: ['Resistor', 'Capacitor', 'Inductor', 'Voltage source'],
      correctIndex: 2,
      explanation: 'An inductor stores energy in its magnetic field and opposes changes in current (e.m.f. induced by changing flux linkage).',
    },
    {
      id: 'ce-3',
      type: 'mcq',
      prompt: 'An ideal voltage source, when loaded with any finite resistance, maintains:',
      options: [
        'A constant current regardless of voltage',
        'A constant terminal voltage regardless of current drawn',
        'Zero terminal voltage',
        'Infinite internal resistance',
      ],
      correctIndex: 1,
      explanation: 'An ideal voltage source can supply arbitrarily large current without any decrease in its terminal voltage.',
    },
    {
      id: 'ce-4',
      type: 'mcq',
      prompt: 'A current source whose output depends on a voltage elsewhere in the circuit is called a:',
      options: [
        'Voltage-controlled current source (VCCS)',
        'Current-controlled voltage source (CCVS)',
        'Independent current source',
        'Voltage-controlled voltage source (VCVS)',
      ],
      correctIndex: 0,
      explanation: 'A VCCS is a dependent current source controlled by a voltage elsewhere in the network — useful for modelling transistors/amplifiers.',
    },
    {
      id: 'ce-5',
      type: 'numeric',
      prompt: 'A capacitor stores 12 μC of charge when the voltage across it is 4 V. What is its capacitance, in μF?',
      answer: 3,
      tolerance: 0.05,
      unit: 'μF',
      explanation: 'C = Q/V = 12 μC / 4 V = 3 μF.',
    },
  ],
}

export const ohmsKirchhoffQuiz: Quiz = {
  id: 'ohms-kirchhoff-quiz',
  title: "Ohm's Law & Kirchhoff's Laws",
  questions: [
    {
      id: 'ok-1',
      type: 'numeric',
      prompt: 'A conductor of resistance 10 Ω carries a current of 2.5 A. What is the voltage drop across it (in V)?',
      answer: 25,
      tolerance: 0.1,
      unit: 'V',
      explanation: 'V = IR = 2.5 × 10 = 25 V.',
    },
    {
      id: 'ok-2',
      type: 'mcq',
      prompt: "Kirchhoff's Current Law (KCL) is a direct consequence of:",
      options: ['Conservation of energy', 'Conservation of charge', "Ohm's law", 'Faraday’s law'],
      correctIndex: 1,
      explanation: 'KCL — the algebraic sum of currents at a node is zero — follows from conservation of charge.',
    },
    {
      id: 'ok-3',
      type: 'mcq',
      prompt: "Kirchhoff's Voltage Law (KVL) states that around any closed loop:",
      options: [
        'The sum of currents entering equals the sum leaving',
        'The algebraic sum of voltages is zero',
        'Total resistance is minimum',
        'Power is always dissipated, never absorbed',
      ],
      correctIndex: 1,
      explanation: 'KVL: the algebraic sum of voltage rises and drops around any closed loop equals zero.',
    },
    {
      id: 'ok-4',
      type: 'mcq',
      prompt: 'Three currents meet at a node: 5 A and 3 A entering, and I leaving. What is I?',
      options: ['2 A', '8 A', '-8 A', '15 A'],
      correctIndex: 1,
      explanation: 'By KCL, sum entering = sum leaving → I = 5 + 3 = 8 A.',
    },
    {
      id: 'ok-5',
      type: 'mcq',
      prompt: 'Elements placed in parallel always share the same:',
      options: ['Current', 'Voltage drop', 'Power', 'Resistance'],
      correctIndex: 1,
      explanation: 'Parallel-connected elements share the same two nodes, hence the same voltage drop across them.',
    },
  ],
}

export const meshAnalysisQuiz: Quiz = {
  id: 'mesh-analysis-quiz',
  title: 'Mesh Current Analysis',
  questions: [
    {
      id: 'ma-1',
      type: 'mcq',
      prompt: 'In mesh analysis, the number of independent mesh equations needed equals:',
      options: ['The number of nodes', 'The number of branches', 'The number of independent loops (meshes)', 'The number of resistors'],
      correctIndex: 2,
      explanation: 'One equation is written per independent mesh (window pane) of the planar circuit.',
    },
    {
      id: 'ma-2',
      type: 'mcq',
      prompt: 'When writing the mesh equation for loop 1, the coefficient of I1 equals:',
      options: [
        'The resistance shared with loop 2 only',
        'The sum of all resistances around loop 1',
        'Zero',
        'The source voltage in loop 1',
      ],
      correctIndex: 1,
      explanation: 'The self-resistance term (coefficient of I1) is the sum of all resistances in loop 1.',
    },
    {
      id: 'ma-3',
      type: 'mcq',
      prompt: 'A "supermesh" is required when:',
      options: [
        'Two meshes share only a resistor',
        'A current source lies on the boundary shared by two meshes',
        'A circuit has only one loop',
        'All sources are voltage sources',
      ],
      correctIndex: 1,
      explanation: 'When a current source is shared between two meshes, its mesh current can’t be written directly from Ohm’s law — the two meshes are merged into a supermesh, and the source value gives a constraint equation between the two mesh currents.',
    },
    {
      id: 'ma-4',
      type: 'numeric',
      prompt: 'Given mesh equations 12i1 − 2i2 = 6 and −2i1 + 7i2 = −8 (2-mesh circuit, i3 term = 0), solve for i1 (in A). Round to 2 decimals.',
      answer: 0.33,
      tolerance: 0.03,
      unit: 'A',
      explanation: 'Solving simultaneously: i1 ≈ 0.329 A (matches the worked example i1 = 0.329 A).',
    },
    {
      id: 'ma-5',
      type: 'mcq',
      prompt: 'Mesh currents are conventionally assumed to flow in which direction, unless stated otherwise?',
      options: ['Counter-clockwise', 'Clockwise', 'Radially outward', 'Toward the reference node'],
      correctIndex: 1,
      explanation: 'The standard convention (used throughout the worked examples) is to assume every mesh current flows clockwise.',
    },
  ],
}

export const nodalAnalysisQuiz: Quiz = {
  id: 'nodal-analysis-quiz',
  title: 'Node Voltage Analysis',
  questions: [
    {
      id: 'na-1',
      type: 'mcq',
      prompt: 'In nodal analysis, which node is conventionally chosen as the reference (0 V) node?',
      options: [
        'The node with highest voltage',
        'The negative terminal of the main source (ground)',
        'Any node with only one branch',
        'The node farthest from the source',
      ],
      correctIndex: 1,
      explanation: 'The reference node is normally taken as the negative terminal of the source, assigned 0 V.',
    },
    {
      id: 'na-2',
      type: 'mcq',
      prompt: 'When applying KCL at a node in nodal analysis, the standard assumption is that:',
      options: [
        'All currents are entering the node',
        'All currents are leaving the node',
        'Only source currents are considered',
        'Current direction does not matter',
      ],
      correctIndex: 1,
      explanation: 'The convention used is to assume all branch currents are leaving the node, and each branch current is written as (node voltage − far-end voltage) / resistance.',
    },
    {
      id: 'na-3',
      type: 'mcq',
      prompt: 'For a resistor R between node voltage V1 and a neighbouring node voltage V2, the current leaving V1 through R is:',
      options: ['(V1 + V2) / R', '(V1 − V2) / R', 'V1 × V2 × R', 'V1 / (V1 − V2)'],
      correctIndex: 1,
      explanation: 'Current = (voltage at this node − voltage at the far end) / resistance, by Ohm’s law.',
    },
    {
      id: 'na-4',
      type: 'numeric',
      prompt: 'Given node equations 3v1 − v2 = 20 and −3v1 + 5v2 = 60, solve for v2 (in V).',
      answer: 20,
      tolerance: 0.2,
      unit: 'V',
      explanation: 'Using Cramer’s rule: Δ = 12, Δ2 = 240, v2 = 240/12 = 20 V (matches the worked example).',
    },
    {
      id: 'na-5',
      type: 'mcq',
      prompt: 'How many node equations are needed for a circuit with N non-reference nodes?',
      options: ['N', 'N − 1', 'N + 1', '2N'],
      correctIndex: 0,
      explanation: 'One KCL equation is written for each of the N non-reference (unknown-voltage) nodes.',
    },
  ],
}

export const module1Quizzes = [circuitElementsQuiz, ohmsKirchhoffQuiz, meshAnalysisQuiz, nodalAnalysisQuiz]
