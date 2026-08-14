import type { TopicContentDef } from '../../../topicContentTypes'
import { circuitElementsContent } from './circuit-elements'
import { ohmsLawKirchhoffContent } from './ohms-law-kirchhoff'
import { meshAnalysisContent } from './mesh-analysis'
import { nodalAnalysisContent } from './nodal-analysis'

export const basicEngineeringTopics: Record<string, TopicContentDef> = {
  'circuit-elements': circuitElementsContent,
  'ohms-law-kirchhoff': ohmsLawKirchhoffContent,
  'mesh-analysis': meshAnalysisContent,
  'nodal-analysis': nodalAnalysisContent,
}
