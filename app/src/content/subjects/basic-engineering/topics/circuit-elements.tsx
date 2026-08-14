import type { TopicContentDef } from '../../../topicContentTypes'
import { ResistorColorDecoder } from '../../../../widgets/ResistorColorDecoder'

export const circuitElementsContent: TopicContentDef = {
  intro: (
    <>
      <p>
        Every electric circuit is built from a small set of passive elements — <strong>resistors</strong>,{' '}
        <strong>capacitors</strong>, and <strong>inductors</strong> — plus <strong>sources</strong> that supply
        energy. Passive elements can only absorb or store energy; active elements (batteries, generators, op-amps)
        can generate it.
      </p>
      <p>
        A <strong>resistor</strong> opposes current flow and dissipates energy as heat. Its resistance is set by the
        colour bands printed on the body — the first two bands give significant digits, the third is a power-of-ten
        multiplier, and the fourth gives the tolerance.
      </p>
      <p>
        A <strong>capacitor</strong> stores energy in an electric field between two plates (C = Q/V, unit: farad). An{' '}
        <strong>inductor</strong> stores energy in a magnetic field and opposes changes in current (unit: henry).
      </p>
      <p>
        Sources come in two flavours: <strong>independent</strong> sources (fixed V or I, unaffected by the rest of
        the circuit) and <strong>dependent</strong> sources (VCVS, CCVS, VCCS, CCCS — their output tracks a voltage
        or current elsewhere in the network, used to model transistors and amplifiers). An <em>ideal</em> voltage
        source holds its voltage constant no matter the current drawn; a <em>practical</em> one droops slightly under
        load.
      </p>
    </>
  ),
  formulas: [
    { label: 'Resistance', expr: 'R = V / I  (Ω)' },
    { label: 'Resistor value', expr: 'R = AB × 10^C ± tol%' },
    { label: 'Capacitance', expr: 'C = Q / V  (F)' },
    { label: 'Inductance', expr: '1 H: 1 V induced per 1 A/s change' },
  ],
  tip: <>Drag the colour swatches below to build a resistor and watch the value update live.</>,
  widgetTitle: 'Resistor colour code decoder',
  Widget: ResistorColorDecoder,
}
