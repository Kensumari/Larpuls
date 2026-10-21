import { lessons } from '../data/learning'

const STORAGE_KEY = 'larpuls-progress-v1'
const validLessonIds = new Set(lessons.map((lesson) => lesson.id))

export interface LearnerProgress {
  xp: number
  completedIds: string[]
  savedIds: string[]
  quizClaimedIds: string[]
  dailyCompletions: Record<string, string[]>
  streak: number
  lastStudyDate: string | null
}

export const emptyProgress: LearnerProgress = {
  xp: 0,
  completedIds: [],
  savedIds: [],
  quizClaimedIds: [],
  dailyCompletions: {},
  streak: 0,
  lastStudyDate: null,
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : []
}

function decodeProgress(value: unknown): LearnerProgress {
  if (!isRecord(value)) {
    return emptyProgress
  }

  const dailyCompletions: Record<string, string[]> = {}
  if (isRecord(value.dailyCompletions)) {
    for (const [date, ids] of Object.entries(value.dailyCompletions)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        dailyCompletions[date] = stringArray(ids).filter((id) => validLessonIds.has(id))
      }
    }
  }

  return {
    xp: typeof value.xp === 'number' && Number.isFinite(value.xp) && value.xp >= 0 ? value.xp : 0,
    completedIds: stringArray(value.completedIds).filter((id) => validLessonIds.has(id)),
    savedIds: stringArray(value.savedIds).filter((id) => validLessonIds.has(id)),
    quizClaimedIds: stringArray(value.quizClaimedIds).filter((id) => validLessonIds.has(id)),
    dailyCompletions,
    streak: typeof value.streak === 'number' && Number.isInteger(value.streak) && value.streak >= 0 ? value.streak : 0,
    lastStudyDate: typeof value.lastStudyDate === 'string' ? value.lastStudyDate : null,
  }
}

export function readProgress(): { progress: LearnerProgress; warning: string | null } {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return {
      progress: saved ? decodeProgress(JSON.parse(saved) as unknown) : emptyProgress,
      warning: null,
    }
  } catch (error) {
    console.error('Kunde inte läsa Lärpuls sparade framsteg.', error)
    return {
      progress: emptyProgress,
      warning: 'Sparade framsteg kunde inte läsas. Nya framsteg sparas när lagringen fungerar igen.',
    }
  }
}

export function writeProgress(progress: LearnerProgress): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function dateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function previousDateKey(date: Date): string {
  const previous = new Date(date)
  previous.setDate(previous.getDate() - 1)
  return dateKey(previous)
}

export function completeLesson(
  progress: LearnerProgress,
  lessonId: string,
  xp: number,
  now = new Date(),
): LearnerProgress {
  if (progress.completedIds.includes(lessonId)) {
    return progress
  }

  const today = dateKey(now)
  const todayCompletions = progress.dailyCompletions[today] ?? []
  const streak =
    progress.lastStudyDate === today
      ? progress.streak
      : progress.lastStudyDate === previousDateKey(now)
        ? progress.streak + 1
        : 1

  return {
    ...progress,
    xp: progress.xp + xp,
    completedIds: [...progress.completedIds, lessonId],
    dailyCompletions: {
      ...progress.dailyCompletions,
      [today]: [...todayCompletions, lessonId],
    },
    streak,
    lastStudyDate: today,
  }
}

export function claimQuizXp(progress: LearnerProgress, lessonId: string, xp = 5): LearnerProgress {
  if (progress.quizClaimedIds.includes(lessonId)) {
    return progress
  }

  return {
    ...progress,
    xp: progress.xp + xp,
    quizClaimedIds: [...progress.quizClaimedIds, lessonId],
  }
}

export function toggleSaved(progress: LearnerProgress, lessonId: string): LearnerProgress {
  const isSaved = progress.savedIds.includes(lessonId)

  return {
    ...progress,
    savedIds: isSaved
      ? progress.savedIds.filter((id) => id !== lessonId)
      : [...progress.savedIds, lessonId],
  }
}
