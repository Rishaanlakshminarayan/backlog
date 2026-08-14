import type { TopicContentDef } from '../../../topicContentTypes'
import { MeshAnalysisSolver } from '../../../../widgets/MeshAnalysisSolver'

export const meshAnalysisContent: TopicContentDef = {
  intro: (
    <>
      <p>
        <strong>Mesh (loop) current analysis</strong> assigns a fictitious clockwise current to every independent
        loop of a planar circuit, then writes one KVL equation per loop in terms of those currents. Solving the
        resulting simultaneous equations gives every mesh current — and from them, every branch current.
      </p>
      <p>
        Writing the equations is mechanical once you know the pattern: for loop <em>k</em>, the coefficient of{' '}
        <em>iₖ</em> is the sum of all resistances around that loop (self-resistance). The coefficient of any other
        loop's current is <em>minus</em> the resistance shared between the two loops (mutual resistance) — negative
        because the two loop currents flow in opposite directions through that shared branch. The right-hand side is
        the net source voltage around the loop.
      </p>
      <p>
        When a <strong>current source</strong> sits on the boundary shared by two meshes, you can't write Ohm's law
        across it directly — instead you merge the two meshes into a <strong>supermesh</strong>, write one KVL
        equation around its outer boundary, and add a constraint equation stating that the difference of the two
        mesh currents equals the source current.
      </p>
    </>
  ),
  formulas: [
    { label: 'Self term', expr: 'coeff(iₖ) = ΣR around loop k' },
    { label: 'Mutual term', expr: 'coeff(iⱼ) = −R shared with loop j' },
    { label: 'Supermesh', expr: 'i_a − i_b = I_source (constraint)' },
  ],
  tip: <>Reveal the walkthrough one step at a time — try predicting each equation before you click through.</>,
  widgetTitle: 'Worked example: 3-mesh circuit',
  Widget: MeshAnalysisSolver,
}
