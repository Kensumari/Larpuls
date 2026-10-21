import type { LearningCard, Topic } from '../data/learning'

export type NotebookLmFormat = 'short' | 'detailed'

export interface NotebookLmDownload {
  href: string
  fileName: string
}

export function buildNotebookLmSource(
  lesson: LearningCard,
  topic: Topic,
  format: NotebookLmFormat,
): string {
  const formatName = format === 'short' ? 'Kort version' : 'Fördjupad version'
  const duration = format === 'short' ? 'cirka 1–2 minuter' : 'cirka 4–6 minuter'
  const lines = [
    `# Lärpuls – ${lesson.title}`,
    `Ämne: ${topic.label}`,
    `Videoformat: ${formatName}`,
    '',
    '## Instruktion till NotebookLM',
    `Skapa en pedagogisk videoöversikt på svenska på ${duration}. Utgå från källan, förklara begreppen tydligt och hitta inte på fakta utanför materialet.`,
    '',
  ]

  if (format === 'short') {
    lines.push(
      '## Snabbkortets insikter',
      ...lesson.slides.flatMap((slide, index) => [
        `### Insikt ${index + 1}: ${slide.title}`,
        slide.body,
        '',
      ]),
    )
  } else {
    lines.push('## Fördjupning', lesson.deepDive.intro, '')
    for (const section of lesson.deepDive.sections) {
      lines.push(
        `### ${section.title}`,
        section.body,
        ...section.bullets.map((bullet) => `- ${bullet}`),
        '',
      )
    }
  }

  lines.push('## Prova själv', lesson.deepDive.tryThis, '')

  if (topic.notice) {
    lines.push('## Viktig information', topic.notice, '')
  }

  lines.push(
    '## Kunskapskoll',
    lesson.quiz.question,
    ...lesson.quiz.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`),
    `Facit: ${lesson.quiz.options[lesson.quiz.correctIndex]}`,
    lesson.quiz.explanation,
    '',
    '## Läs vidare',
    ...topic.resources.map((resource) => `- ${resource.label}: ${resource.url}`),
  )

  return lines.join('\n')
}

export function createNotebookLmDownload(
  lesson: LearningCard,
  topic: Topic,
  format: NotebookLmFormat,
): NotebookLmDownload {
  const content = buildNotebookLmSource(lesson, topic, format)
  const suffix = format === 'short' ? 'kort' : 'fordjupning'

  return {
    href: `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`,
    fileName: `larpuls-${lesson.id}-${suffix}.txt`,
  }
}
