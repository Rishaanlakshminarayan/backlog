import type { TopicContentDef } from './topicContentTypes'
import { basicEngineeringTopics } from './subjects/basic-engineering/topics'

export const topicRegistry: Record<string, Record<string, TopicContentDef>> = {
  'basic-engineering': basicEngineeringTopics,
}

export function findTopicContent(subjectId: string, topicId: string): TopicContentDef | undefined {
  return topicRegistry[subjectId]?.[topicId]
}
