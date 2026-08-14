import type { TopicContentDef } from '../../../topicContentTypes'
import { NodalAnalysisSolver } from '../../../../widgets/NodalAnalysisSolver'

export const nodalAnalysisContent: TopicContentDef = {
  intro: (
    <>
      <p>
        <strong>Node voltage analysis</strong> is the mirror image of mesh analysis: instead of loop currents, you
        assign an unknown voltage to every node except one reference node (normally the − terminal of the main
        source, taken as 0 V). You then write one KCL equation per non-reference node.
      </p>
      <p>
        The trick is to assume <em>all</em> branch currents at a node are leaving it. Each such current through a
        resistor R, from this node (voltage V) to a neighbouring node (voltage V′), is written as (V − V′)/R. Set the
        sum of all these leaving currents (plus any source currents, with sign) equal to zero, and you get one linear
        equation per node.
      </p>
      <p>
        With N non-reference nodes you get N simultaneous equations — solvable by substitution, elimination, or
        Cramer's rule for larger systems. Once you know every node voltage, every branch current follows immediately
        from Ohm's law.
      </p>
    </>
  ),
  formulas: [
    { label: 'Branch current (leaving)', expr: 'I = (V_node − V_other) / R' },
    { label: 'KCL at a node', expr: 'Σ I(leaving) = Σ I(source, entering)' },
    { label: 'Equation count', expr: 'N non-reference nodes → N equations' },
  ],
  tip: <>Watch how a direct source-to-source branch (the 5 A source here) changes both node equations — it's easy to miss on a first pass.</>,
  widgetTitle: 'Worked example: 2-node circuit',
  Widget: NodalAnalysisSolver,
}
