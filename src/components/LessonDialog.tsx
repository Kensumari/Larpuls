import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  ExternalLink,
  LockKeyhole,
  Play,
  X,
} from 'lucide-react'
import { getTopic, type LearningCard } from '../data/learning'
import { VideoOverview } from './VideoOverview'
import type { NotebookLmFormat } from '../lib/notebookLm'

interface LessonDialogProps {
  lesson: LearningCard
  isCompleted: boolean
  isQuizClaimed: boolean
  onClose: () => void
  onComplete: () => void
  onQuizCorrect: () => void
}

export function LessonDialog({
  lesson,
  isCompleted,
  isQuizClaimed,
  onClose,
  onComplete,
  onQuizCorrect,
}: LessonDialogProps) {
  const topic = getTopic(lesson.topicId)
  const [mode, setMode] = useState<'reel' | 'deep' | 'video'>('reel')
  const [videoFormat, setVideoFormat] = useState<NotebookLmFormat>('short')
  const [slideIndex, setSlideIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [completedHere, setCompletedHere] = useState(false)
  const [quizRewardedHere, setQuizRewardedHere] = useState(false)
  const hasCompleted = isCompleted || completedHere

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  function finishLesson() {
    if (!hasCompleted) {
      onComplete()
      setCompletedHere(true)
    }
  }

  function chooseAnswer(index: number) {
    setSelectedAnswer(index)
    if (index === lesson.quiz.correctIndex && !isQuizClaimed) {
      onQuizCorrect()
      setQuizRewardedHere(true)
    }
  }

  function openVideo(format: NotebookLmFormat) {
    setVideoFormat(format)
    setMode('video')
  }

  return (
    <div
      className="dialog-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className={`lesson-dialog${mode === 'deep' ? ' is-deep-dive' : mode === 'video' ? ' is-video-overview' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lesson-dialog-title"
      >
        <header className="dialog-header">
          <div className="dialog-brand">
            <span className={`dialog-topic-icon topic-${topic.id}`} aria-hidden="true">
              <BookOpen size={17} />
            </span>
            <div>
              <span className="eyebrow">
                {mode === 'reel' ? 'EN SNABB LÄRPULS' : mode === 'deep' ? 'FÖRDJUPNING' : 'VIDEOÖVERSIKT'}
              </span>
              <h2 id="lesson-dialog-title">{lesson.title}</h2>
            </div>
          </div>
          <button className="icon-button dialog-close" type="button" onClick={onClose} aria-label="Stäng">
            <X size={20} />
          </button>
        </header>

        {mode === 'reel' ? (
          <div className={`reel-content topic-${topic.id}`}>
            <div className="reel-toolbar">
              <span className="reel-topic">{topic.label}</span>
              <div className="reel-toolbar-actions">
                <span className="reel-time"><Clock3 size={14} /> {lesson.minutes} min</span>
                <button className="video-launch-link" type="button" onClick={() => openVideo('short')}>
                  <Play size={13} /> Spela som video
                </button>
              </div>
            </div>
            <div className="reel-progress" aria-label={`Kort ${slideIndex + 1} av ${lesson.slides.length}`}>
              {lesson.slides.map((slide, index) => (
                <span
                  className={`reel-progress-segment${index <= slideIndex ? ' is-active' : ''}`}
                  key={slide.title}
                />
              ))}
            </div>
            {hasCompleted ? (
              <div className="reel-finished">
                <span className="finished-icon"><CheckCircle2 size={34} /></span>
                <span className="eyebrow">LÄRSTUND KLAR</span>
                <h3>{completedHere ? 'Snyggt jobbat!' : 'Bra att du repeterar.'}</h3>
                <p>
                  {completedHere
                    ? `Du har fått ${lesson.xp} XP och tagit ett steg till.`
                    : 'Du har redan fått XP för den här lärstunden. Repetition är ändå värdefull.'}
                </p>
                <div className="reel-finished-actions">
                  <button className="button button-dark" type="button" onClick={() => setMode('deep')}>
                    Gå på djupet <ArrowUpRight size={16} />
                  </button>
                  <button className="button button-quiet" type="button" onClick={onClose}>
                    Tillbaka till flödet
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="reel-copy" key={slideIndex}>
                  <span className="reel-step">INSIKT {String(slideIndex + 1).padStart(2, '0')}</span>
                  <h3>{lesson.slides[slideIndex].title}</h3>
                  <p>{lesson.slides[slideIndex].body}</p>
                </div>
                <div className="reel-bottom">
                  <p className="reel-nudge">Liten idé. Stor skillnad över tid.</p>
                  <div className="reel-actions">
                    {slideIndex > 0 && (
                      <button
                        className="button button-outline"
                        type="button"
                        onClick={() => setSlideIndex((current) => current - 1)}
                      >
                        <ArrowLeft size={16} /> Tillbaka
                      </button>
                    )}
                    {slideIndex < lesson.slides.length - 1 ? (
                      <button
                        className="button button-dark"
                        type="button"
                        onClick={() => setSlideIndex((current) => current + 1)}
                      >
                        Nästa insikt <ArrowRight size={16} />
                      </button>
                    ) : (
                      <div className="reel-last-actions">
                        <button className="button button-quiet" type="button" onClick={() => setMode('deep')}>
                          Läs mer <ArrowUpRight size={16} />
                        </button>
                        <button className="button button-dark" type="button" onClick={finishLesson}>
                          Markera som klar <Check size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : mode === 'deep' ? (
          <div className="deep-dive-content">
            <div className="deep-dive-top-actions">
              <button className="back-to-reel" type="button" onClick={() => setMode('reel')}>
                <ArrowLeft size={15} /> Tillbaka till snabbkortet
              </button>
              <button className="video-launch-link" type="button" onClick={() => openVideo('detailed')}>
                <Play size={13} /> Spela fördjupningen som video
              </button>
            </div>
            <div className="deep-dive-heading">
              <span className={`deep-dive-icon topic-${topic.id}`} aria-hidden="true">
                <BookOpen size={22} />
              </span>
              <div>
                <span className="eyebrow">{topic.label} · {lesson.minutes} MIN</span>
                <h3>{lesson.title}</h3>
                <p>{lesson.deepDive.intro}</p>
              </div>
            </div>

            {topic.notice && (
              <aside className="content-notice">
                <LockKeyhole size={17} />
                <p>{topic.notice}</p>
              </aside>
            )}

            <div className="deep-dive-sections">
              {lesson.deepDive.sections.map((section, index) => (
                <article className="deep-dive-section" key={section.title}>
                  <span className="section-number">0{index + 1}</span>
                  <div>
                    <h4>{section.title}</h4>
                    <p>{section.body}</p>
                    <ul>
                      {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <aside className="try-this-card">
              <span className="try-this-label">TESTA I DAG</span>
              <p>{lesson.deepDive.tryThis}</p>
            </aside>

            <section className="quiz-card" aria-labelledby="quiz-heading">
              <div className="quiz-title-row">
                <span className="quiz-icon"><CheckCircle2 size={18} /></span>
                <div>
                  <span className="eyebrow">KOLLA ATT DET FASTNAT</span>
                  <h4 id="quiz-heading">{lesson.quiz.question}</h4>
                </div>
              </div>
              <div className="quiz-options">
                {lesson.quiz.options.map((option, index) => {
                  const isSelected = selectedAnswer === index
                  const isCorrect = index === lesson.quiz.correctIndex
                  const resultClass = isSelected
                    ? isCorrect ? ' is-correct' : ' is-incorrect'
                    : selectedAnswer !== null && isCorrect ? ' shows-correct' : ''

                  return (
                    <button
                      className={`quiz-option${resultClass}`}
                      type="button"
                      key={option}
                      onClick={() => chooseAnswer(index)}
                      aria-pressed={isSelected}
                    >
                      <span className="quiz-option-letter">{String.fromCharCode(65 + index)}</span>
                      <span>{option}</span>
                      {isSelected && isCorrect && <Check size={16} />}
                    </button>
                  )
                })}
              </div>
              {selectedAnswer !== null && (
                <p className={`quiz-feedback${selectedAnswer === lesson.quiz.correctIndex ? ' is-right' : ' is-wrong'}`}>
                  {selectedAnswer === lesson.quiz.correctIndex
                    ? `${lesson.quiz.explanation}${quizRewardedHere ? ' +5 XP till dig!' : ' Du har redan hämtat bonusen.'}`
                      : 'Inte riktigt – läs snabbkortets sista insikt och prova igen.'}
                </p>
              )}
            </section>

            <section className="resource-section">
              <span className="eyebrow">LÄS VIDARE</span>
              <div className="resource-links">
                {topic.resources.map((resource) => (
                  <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}>
                    {resource.label} <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            </section>

            <div className="deep-dive-footer">
              <span className="xp-caption"><CheckCircle2 size={16} /> {hasCompleted ? 'Lärstunden är klar' : `+${lesson.xp} XP när du markerar den som klar`}</span>
              <button
                className={`button ${hasCompleted ? 'button-completed' : 'button-dark'}`}
                type="button"
                onClick={finishLesson}
                disabled={hasCompleted}
              >
                {hasCompleted ? 'Klar' : 'Markera som klar'} <Check size={16} />
              </button>
            </div>
          </div>
        ) : (
          <VideoOverview
            lesson={lesson}
            topic={topic}
            initialFormat={videoFormat}
            onBack={(format) => setMode(format === 'short' ? 'reel' : 'deep')}
          />
        )}
      </section>
    </div>
  )
}
