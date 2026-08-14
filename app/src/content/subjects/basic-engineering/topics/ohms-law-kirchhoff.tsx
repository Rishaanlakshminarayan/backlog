import type { TopicContentDef } from '../../../topicContentTypes'
import { OhmsLawAndKclWidget } from '../../../../widgets/OhmsLawAndKclWidget'

export const ohmsLawKirchhoffContent: TopicContentDef = {
  intro: (
    <>
      <p>
        <strong>Ohm's Law</strong>: with physical conditions constant, the potential drop across a conductor is
        directly proportional to the current through it — V = IR, where R = ρℓ/A depends on the material, length,
        and cross-section.
      </p>
      <p>
        <strong>Kirchhoff's Current Law (KCL)</strong> follows from conservation of charge: the sum of currents
        entering a node equals the sum leaving it. <strong>Kirchhoff's Voltage Law (KVL)</strong> follows from
        conservation of energy: the algebraic sum of voltage rises and drops around any closed loop is zero.
      </p>
      <p>
        Sign convention matters. Through a source: current flowing from − to + is a potential <em>rise</em> (+ve).
        Through a resistor: going around the loop from + to − (i.e. in the direction of current) is a potential{' '}
        <em>drop</em> (−ve). Elements placed in parallel always share the same voltage.
      </p>
      <p>
        A <strong>node</strong> is a connection point of two or more elements, a <strong>branch</strong> is a
        two-terminal element between two nodes, and a <strong>loop</strong> is any closed path that doesn't repeat a
        node.
      </p>
    </>
  ),
  formulas: [
    { label: "Ohm's law", expr: 'V = IR' },
    { label: 'KCL', expr: 'ΣI(entering) = ΣI(leaving)' },
    { label: 'KVL', expr: 'ΣV(around a loop) = 0' },
    { label: 'Power', expr: 'P = VI = I²R = V²/R' },
  ],
  tip: <>Practice reading the current directions carefully — a wrong sign is the #1 source of mistakes in CAT-style circuit problems.</>,
  widgetTitle: 'Ohm’s law calculator & KCL practice',
  Widget: OhmsLawAndKclWidget,
}
