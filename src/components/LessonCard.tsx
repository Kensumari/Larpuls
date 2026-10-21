import { ArrowUpRight, Bookmark, Check, Clock3, Sparkles } from 'lucide-react'
import { getTopic, type LearningCard } from '../data/learning'
import { topicIcons } from '../lib/topicIcons'

interface LessonCardProps {
  lesson: LearningCard
  isCompleted: boolean
  isSaved: boolean
  onOpen: () => void
  onToggleSaved: () => void
}

export function LessonCard({
  lesson,
  isCompleted,
  isSaved,
  onOpen,
  onToggleSaved,
}: LessonCardProps) {
  const topic = getTopic(lesson.topicId)
  const Icon = topicIcons[lesson.topicId]

  return (
    <article className={`lesson-card topic-${topic.id}`}>
      <div className="lesson-card-art">
        <span className="lesson-art-orbit lesson-art-orbit-one" aria-hidden="true" />
        <span className="lesson-art-orbit lesson-art-orbit-two" aria-hidden="true" />
        <span className="lesson-art-icon" aria-hidden="true">
          <Icon size={30} strokeWidth={1.7} />
        </span>
        <span className="lesson-topic-pill">{topic.shortLabel}</span>
        <button
          className={`bookmark-button${isSaved ? ' is-saved' : ''}`}
          type="button"
          onClick={onToggleSaved}
          aria-label={isSaved ? `Ta bort ${lesson.title} från sparat` : `Spara ${lesson.title}`}
          aria-pressed={isSaved}
        >
          <Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
        {isCompleted && (
          <span className="completed-pill">
            <Check size={12} strokeWidth={3} />
            Klar
          </span>
        )}
        <span className="art-caption" aria-hidden="true">{lesson.title}</span>
      </div>

      <button className="lesson-card-content" type="button" onClick={onOpen}>
        <span className="lesson-meta">
          <span>{lesson.level}</span>
          <span className="meta-dot" />
          <span><Clock3 size={13} /> {lesson.minutes} min</span>
        </span>
        <span className="lesson-card-title">{lesson.title}</span>
        <span className="lesson-card-subtitle">{lesson.subtitle}</span>
        <span className="lesson-card-footer">
          <span className="xp-caption"><Sparkles size={13} /> +{lesson.xp} XP</span>
          <span className="open-lesson">
            Lär dig
            <ArrowUpRight size={15} />
          </span>
        </span>
      </button>
    </article>
  )
}
