import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Bookmark,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  Flame,
  Home,
  Layers3,
  Lightbulb,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { InstallButton } from './components/InstallButton'
import { LessonCard } from './components/LessonCard'
import { LessonDialog } from './components/LessonDialog'
import { lessons, topics, type LearningCard, type TopicId } from './data/learning'
import { topicIcons } from './lib/topicIcons'
import {
  claimQuizXp,
  completeLesson,
  dateKey,
  readProgress,
  toggleSaved,
  writeProgress,
  type LearnerProgress,
} from './lib/progress'
import './App.css'

type PageId = 'today' | 'explore' | 'saved' | 'progress'

const pageItems: { id: PageId; label: string; icon: LucideIcon }[] = [
  { id: 'today', label: 'Idag', icon: Home },
  { id: 'explore', label: 'Upptäck', icon: Compass },
  { id: 'saved', label: 'Sparat', icon: Bookmark },
  { id: 'progress', label: 'Min resa', icon: TrendingUp },
]

const dailyGoal = 3
const xpPerLevel = 250
const levelNames = ['Nyfiken', 'Utforskare', 'Idébyggare', 'Vardagsproffs', 'Kunskapskraft']
const lessonsPerPage = 24
const lessonSearchIndex = new Map<string, string>()
const topicSearchTerms = new Map(
  topics.map((topic) => [topic.id, `${topic.label} ${topic.shortLabel} ${topic.description}`] as const),
)

function getSearchableText(lesson: LearningCard): string {
  const cached = lessonSearchIndex.get(lesson.id)
  if (cached !== undefined) return cached

  const searchableText = [
    topicSearchTerms.get(lesson.topicId),
    lesson.title,
    lesson.subtitle,
    lesson.deepDive.intro,
    ...lesson.slides.map((slide) => `${slide.title} ${slide.body}`),
    ...lesson.deepDive.sections.map((section) => `${section.title} ${section.body} ${section.bullets.join(' ')}`),
  ].join(' ').toLocaleLowerCase('sv')
  lessonSearchIndex.set(lesson.id, searchableText)
  return searchableText
}

function currentDateLabel(): string {
  const label = new Intl.DateTimeFormat('sv-SE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())
  return label.charAt(0).toLocaleUpperCase('sv') + label.slice(1)
}

function previousDateKey(key: string): string {
  const [year, month, day] = key.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  date.setDate(date.getDate() - 1)
  return dateKey(date)
}

function levelForXp(xp: number): { level: number; name: string; progress: number; remaining: number } {
  const level = Math.floor(xp / xpPerLevel) + 1
  const progress = xp % xpPerLevel
  return {
    level,
    name: levelNames[Math.min(level - 1, levelNames.length - 1)],
    progress,
    remaining: xpPerLevel - progress,
  }
}

function PageNav({
  activePage,
  onNavigate,
  location,
}: {
  activePage: PageId
  onNavigate: (page: PageId) => void
  location: 'sidebar' | 'mobile'
}) {
  return (
    <nav className={`page-nav page-nav-${location}`} aria-label="Huvudmeny">
      {pageItems.map(({ id, label, icon: Icon }) => (
        <button
          className={`nav-item${activePage === id ? ' is-active' : ''}`}
          type="button"
          onClick={() => onNavigate(id)}
          aria-current={activePage === id ? 'page' : undefined}
          key={id}
        >
          <Icon size={19} strokeWidth={activePage === id ? 2.2 : 1.8} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

function App() {
  const [initialLoad] = useState(readProgress)
  const [progress, setProgress] = useState<LearnerProgress>(initialLoad.progress)
  const [storageWarning, setStorageWarning] = useState<string | null>(initialLoad.warning)
  const [today, setToday] = useState(() => dateKey(new Date()))
  const [activePage, setActivePage] = useState<PageId>('today')
  const [activeTopic, setActiveTopic] = useState<TopicId | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [lessonPage, setLessonPage] = useState(1)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const completedIdSet = useMemo(() => new Set(progress.completedIds), [progress.completedIds])
  const savedIdSet = useMemo(() => new Set(progress.savedIds), [progress.savedIds])

  useEffect(() => {
    if (!toastMessage) return
    const timeoutId = window.setTimeout(() => setToastMessage(null), 2600)
    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  useEffect(() => {
    const now = new Date()
    const nextMidnight = new Date(now)
    nextMidnight.setHours(24, 0, 0, 0)
    const timeoutId = window.setTimeout(
      () => setToday(dateKey(new Date())),
      nextMidnight.getTime() - now.getTime() + 1000,
    )
    return () => window.clearTimeout(timeoutId)
  }, [today])

  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId)
  const completedToday = progress.dailyCompletions[today]?.length ?? 0
  const todayLesson = lessons.find((lesson) => !completedIdSet.has(lesson.id)) ?? lessons[0]
  const level = levelForXp(progress.xp)
  const streakDate = progress.lastStudyDate
  const displayedStreak =
    streakDate === today || streakDate === previousDateKey(today) ? progress.streak : 0

  const matchingLessons = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('sv')
    return lessons.filter((lesson) => {
      const matchesTopic = !activeTopic || lesson.topicId === activeTopic
      const matchesSaved = activePage !== 'saved' || savedIdSet.has(lesson.id)
      return matchesTopic && matchesSaved && (!query || getSearchableText(lesson).includes(query))
    })
  }, [activePage, activeTopic, savedIdSet, searchQuery])

  const openLesson = useCallback((lesson: LearningCard) => {
    setSelectedLessonId(lesson.id)
  }, [])

  const closeLesson = useCallback(() => {
    setSelectedLessonId(null)
  }, [])

  function navigate(page: PageId) {
    setActivePage(page)
    setSearchQuery('')
    setLessonPage(1)
    if (page !== 'explore') setActiveTopic(null)
  }

  function openTopic(topicId: TopicId) {
    setActiveTopic(topicId)
    setSearchQuery('')
    setActivePage('explore')
    setLessonPage(1)
  }

  function filterByTopic(topicId: TopicId | null) {
    setActiveTopic(topicId)
    setLessonPage(1)
  }

  function toggleLessonSaved(lesson: LearningCard) {
    const wasSaved = progress.savedIds.includes(lesson.id)
    saveProgress(toggleSaved(progress, lesson.id))
    setToastMessage(wasSaved ? 'Borttagen från dina sparade' : 'Sparad till senare')
  }

  function markLessonComplete(lesson: LearningCard) {
    if (progress.completedIds.includes(lesson.id)) return
    saveProgress(completeLesson(progress, lesson.id, lesson.xp))
    setToastMessage(`+${lesson.xp} XP · Lärstund klar!`)
  }

  function rewardQuiz(lesson: LearningCard) {
    if (progress.quizClaimedIds.includes(lesson.id)) return
    saveProgress(claimQuizXp(progress, lesson.id))
    setToastMessage('+5 XP · Snyggt svar!')
  }

  function saveProgress(updated: LearnerProgress) {
    setProgress(updated)
    try {
      writeProgress(updated)
      setStorageWarning(null)
    } catch (error) {
      console.error('Kunde inte spara Lärpuls framsteg.', error)
      setStorageWarning('Dina framsteg kunde inte sparas på den här enheten. Kontrollera webbläsarens lagringsinställningar.')
    }
  }

  function renderLessonGrid(items: LearningCard[]) {
    const pageCount = Math.ceil(items.length / lessonsPerPage)
    const currentPage = Math.min(lessonPage, pageCount)
    const firstItem = (currentPage - 1) * lessonsPerPage
    const visibleItems = items.slice(firstItem, firstItem + lessonsPerPage)

    return (
      <>
        <div className="lesson-grid">
          {visibleItems.map((lesson) => (
            <LessonCard
              lesson={lesson}
              isCompleted={completedIdSet.has(lesson.id)}
              isSaved={savedIdSet.has(lesson.id)}
              onOpen={() => openLesson(lesson)}
              onToggleSaved={() => toggleLessonSaved(lesson)}
              key={lesson.id}
            />
          ))}
        </div>
        {pageCount > 1 && (
          <nav className="lesson-pagination" aria-label="Sidnavigering för lärstunder">
            <button
              className="lesson-page-button"
              type="button"
              onClick={() => setLessonPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={15} /> Föregående
            </button>
            <span className="lesson-pagination-status">
              Visar {firstItem + 1}–{Math.min(firstItem + lessonsPerPage, items.length)} av {items.length} · sida {currentPage} av {pageCount}
            </span>
            <button
              className="lesson-page-button"
              type="button"
              onClick={() => setLessonPage((page) => Math.min(pageCount, page + 1))}
              disabled={currentPage === pageCount}
            >
              Nästa <ChevronRight size={15} />
            </button>
          </nav>
        )}
      </>
    )
  }

  const renderTodayPage = () => {
    const recommended = lessons
      .filter((lesson) => !completedIdSet.has(lesson.id))
      .slice(0, 3)
    const suggestions = recommended.length > 0 ? recommended : lessons.slice(0, 3)

    return (
      <>
        <section className="welcome-row">
          <div>
            <span className="eyebrow">{currentDateLabel()} · DIN LÄRSTUND VÄNTAR</span>
            <h1>Lite klokare, <span>varje dag.</span></h1>
            <p>Små insikter som gör plats för stora idéer.</p>
          </div>
          <div className="welcome-mark" aria-hidden="true"><span>LP</span></div>
        </section>

        <section className="hero-card" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <span className="hero-kicker"><Sparkles size={14} /> DAGENS LÄRPULS</span>
            <h2 id="hero-heading">En ny tanke.<br /><em>På bara några minuter.</em></h2>
            <p>{todayLesson.title} — börja med tre snabba insikter och gå djupare när du vill.</p>
            <div className="hero-actions">
              <button className="button button-lime" type="button" onClick={() => openLesson(todayLesson)}>
                Starta dagens lärstund <ArrowRight size={17} />
              </button>
              <span className="hero-duration"><Clock3 size={14} /> {todayLesson.minutes} min <span>·</span> +{todayLesson.xp} XP</span>
            </div>
          </div>
          <div className="hero-illustration" aria-hidden="true">
            <div className="hero-sunburst" />
            <div className="hero-ring hero-ring-outer" />
            <div className="hero-ring hero-ring-inner" />
            <div className="hero-orbit-dot" />
            <div className="hero-orbit-label"><span>5</span><small>MIN</small></div>
            <div className="hero-floating-note">
              <span className="floating-spark"><Lightbulb size={15} /></span>
              <span><small>DAGENS PÅMINNELSE</small><strong>Nyfikenhet räknas.</strong></span>
            </div>
            <span className="hero-star hero-star-one">✳</span>
            <span className="hero-star hero-star-two">✳</span>
          </div>
        </section>

        <section className="daily-strip" aria-label="Dagens framsteg">
          <div className="daily-strip-copy">
            <span className="daily-icon"><Target size={19} /></span>
            <div>
              <strong>Ditt dagliga mål</strong>
              <span>{completedToday >= dailyGoal ? 'Mål nått – vilken fin vana!' : `${completedToday} av ${dailyGoal} lärstunder klara`}</span>
            </div>
          </div>
          <div className="daily-progress-wrap">
            <div className="daily-progress-track" aria-label={`${Math.min(completedToday, dailyGoal)} av ${dailyGoal} lärstunder`}>
              <span style={{ width: `${Math.min(completedToday / dailyGoal, 1) * 100}%` }} />
            </div>
            <span className="daily-progress-count">{Math.min(completedToday, dailyGoal)}<small>/{dailyGoal}</small></span>
          </div>
        </section>

        <section className="stats-row" aria-label="Din snabba överblick">
          <div className="stat-card streak-stat">
            <span className="stat-icon"><Flame size={18} /></span>
            <div><strong>{displayedStreak} <small>dagar</small></strong><span>{displayedStreak > 0 ? 'Du håller lågan vid liv' : 'Starta en ny svit i dag'}</span></div>
            <span className="stat-decoration" aria-hidden="true">✳</span>
          </div>
          <div className="stat-card xp-stat">
            <span className="stat-icon"><Sparkles size={18} /></span>
            <div><strong>{progress.xp} <small>XP</small></strong><span>Nivå {level.level} · {level.name}</span></div>
            <span className="stat-decoration" aria-hidden="true">↗</span>
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">VÄLJ DIN NYFIKENHET</span>
              <h2>Vad vill du lära dig?</h2>
            </div>
            <button className="text-link" type="button" onClick={() => navigate('explore')}>
              Alla ämnen <ArrowRight size={15} />
            </button>
          </div>
          <div className="topic-grid">
            {topics.map((topic) => {
              const Icon = topicIcons[topic.id]
              const count = lessons.filter((lesson) => lesson.topicId === topic.id).length
              return (
                <button
                  className={`topic-card topic-${topic.id}`}
                  type="button"
                  key={topic.id}
                  onClick={() => openTopic(topic.id)}
                >
                  <span className="topic-card-icon"><Icon size={19} /></span>
                  <span className="topic-card-text"><strong>{topic.label}</strong><small>{count} kort · {topic.description}</small></span>
                  <ChevronRight size={17} className="topic-card-arrow" />
                </button>
              )
            })}
          </div>
        </section>

        <section className="content-section recommendations-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">KURATERAT FÖR DIG</span>
              <h2>En bra plats att börja</h2>
            </div>
            <span className="lesson-total">{lessons.length} kort att upptäcka</span>
          </div>
          {renderLessonGrid(suggestions)}
          <button className="discover-more-button" type="button" onClick={() => navigate('explore')}>
            Hitta nästa aha-ögonblick <ArrowUpRight size={16} />
          </button>
        </section>
      </>
    )
  }

  const renderExplorePage = () => (
    <>
      <section className="page-heading">
        <span className="eyebrow">ETT BIBLIOTEK AV BRA IDÉER</span>
        <h1>Upptäck <span>något nytt.</span></h1>
        <p>Filtrera ämnen, välj en lärstund och följ nyfikenheten vidare.</p>
      </section>

      <div className="explore-controls">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            placeholder="Sök ämne, färdighet eller fråga…"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value)
              setLessonPage(1)
            }}
            aria-label="Sök bland alla lärstunder"
          />
          {searchQuery && (
            <button type="button" onClick={() => { setSearchQuery(''); setLessonPage(1) }} aria-label="Rensa sökning">
              <X size={16} />
            </button>
          )}
        </label>
        <div className="topic-filters" aria-label="Filtrera efter ämne">
          <button
            className={`filter-chip${activeTopic === null ? ' is-active' : ''}`}
            type="button"
            onClick={() => filterByTopic(null)}
            aria-pressed={activeTopic === null}
          >
            Alla ämnen
          </button>
          {topics.map((topic) => (
            <button
              className={`filter-chip${activeTopic === topic.id ? ' is-active' : ''}`}
              type="button"
              onClick={() => filterByTopic(topic.id)}
              aria-pressed={activeTopic === topic.id}
              key={topic.id}
            >
              {topic.shortLabel}
            </button>
          ))}
        </div>
      </div>

      <section className="content-section explore-results">
        <div className="section-heading result-heading">
          <div>
            <span className="eyebrow">{activeTopic ? topics.find((topic) => topic.id === activeTopic)?.label : 'HELA BIBLIOTEKET'}</span>
            <h2>{matchingLessons.length} lärstunder</h2>
          </div>
          <span className="result-note"><BookOpen size={15} /> 2–4 min per kort</span>
        </div>
        {matchingLessons.length > 0 ? renderLessonGrid(matchingLessons) : (
          <div className="empty-state search-empty">
            <span className="empty-state-icon"><Search size={24} /></span>
            <h3>Inget napp den här gången</h3>
            <p>Testa ett bredare sökord eller välj ett annat ämne.</p>
            <button className="button button-dark" type="button" onClick={() => { setSearchQuery(''); filterByTopic(null) }}>
              Rensa filter <X size={15} />
            </button>
          </div>
        )}
      </section>
    </>
  )

  const renderSavedPage = () => (
    <>
      <section className="page-heading">
        <span className="eyebrow">DIN PERSONLIGA ATT-KOMMA-TILLBAKA-TILL-LISTA</span>
        <h1>Sparat <span>för sen.</span></h1>
        <p>Samla lärstunder du vill utforska när du har en minut över.</p>
      </section>
      {matchingLessons.length > 0 ? (
        <section className="content-section explore-results">
          <div className="section-heading result-heading">
            <div><span className="eyebrow">DIN KUNSKAPSHYLLA</span><h2>{matchingLessons.length} sparade kort</h2></div>
          </div>
          {renderLessonGrid(matchingLessons)}
        </section>
      ) : (
        <div className="empty-state saved-empty">
          <span className="empty-state-icon"><Bookmark size={24} /></span>
          <h3>Här börjar din kunskapshylla</h3>
          <p>Tryck på bokmärket på ett kort så finns det kvar här till nästa gång.</p>
          <button className="button button-dark" type="button" onClick={() => navigate('explore')}>
            Utforska lärstunder <ArrowRight size={16} />
          </button>
        </div>
      )}
    </>
  )

  const renderProgressPage = () => {
    const completedLessons = lessons.filter((lesson) => completedIdSet.has(lesson.id))
    const completedTopics = new Set(completedLessons.map((lesson) => lesson.topicId))
    const badgeList = [
      { title: 'Första lärpulsen', detail: 'Klart första kortet', icon: Sparkles, unlocked: progress.completedIds.length >= 1 },
      { title: 'Fem lärstunder', detail: 'Fem kort avklarade', icon: BookOpen, unlocked: progress.completedIds.length >= 5 },
      { title: 'Tre dagar i rad', detail: 'Håll din nyfikenhet levande', icon: Flame, unlocked: displayedStreak >= 3 },
      { title: 'Bred nyfikenhet', detail: 'Lär dig inom fyra ämnen', icon: Layers3, unlocked: completedTopics.size >= 4 },
      { title: 'Quizklok', detail: 'Få rätt på fem kunskapskoll', icon: CheckCircle2, unlocked: progress.quizClaimedIds.length >= 5 },
      { title: 'Kunskapssamlaren', detail: `Slutför alla ${lessons.length} kort`, icon: Award, unlocked: completedLessons.length >= lessons.length },
    ]
    const weekDays = Array.from({ length: 7 }, (_, index) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - index))
      const key = dateKey(date)
      return {
        key,
        label: new Intl.DateTimeFormat('sv-SE', { weekday: 'short' }).format(date).replace('.', ''),
        count: progress.dailyCompletions[key]?.length ?? 0,
        isToday: key === today,
      }
    })
    const maxDailyCount = Math.max(...weekDays.map((day) => day.count), 1)

    return (
      <>
        <section className="page-heading">
          <span className="eyebrow">SMÅ STEG. STOR UTVECKLING.</span>
          <h1>Din resa <span>hittills.</span></h1>
          <p>Framsteg är inte en tävling. Men det är fint att se hur långt du kommit.</p>
        </section>

        <section className="journey-level-card">
          <div className="level-card-copy">
            <span className="level-spark"><Sparkles size={18} /></span>
            <span className="eyebrow">NIVÅ {level.level}</span>
            <h2>{level.name}</h2>
            <p>{level.remaining === xpPerLevel ? 'Varje lärstund bygger vidare.' : `${level.remaining} XP till nästa nivå.`}</p>
            <div className="level-progress-track"><span style={{ width: `${(level.progress / xpPerLevel) * 100}%` }} /></div>
            <span className="level-progress-label">{level.progress} / {xpPerLevel} XP</span>
          </div>
          <div className="level-emblem" aria-hidden="true"><div><span>{level.level}</span></div><small>DIN NIVÅ</small></div>
        </section>

        <section className="journey-stats-grid" aria-label="Dina lärframsteg">
          <div className="journey-stat">
            <span className="journey-stat-icon"><BookOpen size={18} /></span>
            <strong>{completedLessons.length}</strong><span>lärstunder klara</span>
          </div>
          <div className="journey-stat">
            <span className="journey-stat-icon"><Sparkles size={18} /></span>
            <strong>{progress.xp}</strong><span>XP samlade</span>
          </div>
          <div className="journey-stat">
            <span className="journey-stat-icon"><Flame size={18} /></span>
            <strong>{displayedStreak}</strong><span>dagar i följd</span>
          </div>
          <div className="journey-stat">
            <span className="journey-stat-icon"><Layers3 size={18} /></span>
            <strong>{completedTopics.size}<small> / {topics.length}</small></strong><span>ämnen utforskade</span>
          </div>
        </section>

        <section className="journey-panel">
          <div className="section-heading">
            <div><span className="eyebrow">LITE VARJE DAG RÄCKER</span><h2>Din senaste vecka</h2></div>
            <span className="week-legend"><span /> Lärstunder</span>
          </div>
          <div className="week-chart">
            {weekDays.map((day) => (
              <div className={`week-day${day.isToday ? ' is-today' : ''}`} key={day.key}>
                <span className="week-count">{day.count > 0 ? day.count : ''}</span>
                <div className="week-bar-track">
                  <span style={{ height: `${day.count === 0 ? 5 : Math.max((day.count / maxDailyCount) * 100, 18)}%` }} />
                </div>
                <span className="week-day-label">{day.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section badge-section">
          <div className="section-heading">
            <div><span className="eyebrow">SMÅ SEGRAR ATT FIRA</span><h2>Dina märken</h2></div>
            <span className="lesson-total">{badgeList.filter((badge) => badge.unlocked).length} av {badgeList.length} upplåsta</span>
          </div>
          <div className="badge-grid">
            {badgeList.map(({ title, detail, icon: Icon, unlocked }) => (
              <article className={`badge-card${unlocked ? ' is-unlocked' : ''}`} key={title}>
                <span className="badge-icon"><Icon size={20} /></span>
                <span className="badge-copy"><strong>{title}</strong><small>{detail}</small></span>
                {unlocked ? <Check size={16} className="badge-check" /> : <span className="badge-lock">Låst</span>}
              </article>
            ))}
          </div>
        </section>

        <section className="content-section topic-progress-section">
          <div className="section-heading">
            <div><span className="eyebrow">BREDD GER PERSPEKTIV</span><h2>Så fördelar sig din nyfikenhet</h2></div>
          </div>
          <div className="topic-progress-list">
            {topics.map((topic) => {
              const Icon = topicIcons[topic.id]
              const topicLessons = lessons.filter((lesson) => lesson.topicId === topic.id)
              const topicCompleted = topicLessons.filter((lesson) => completedIdSet.has(lesson.id)).length
              return (
                <button className={`topic-progress-row topic-${topic.id}`} type="button" key={topic.id} onClick={() => openTopic(topic.id)}>
                  <span className="topic-progress-icon"><Icon size={17} /></span>
                  <span className="topic-progress-name">{topic.label}</span>
                  <span className="topic-progress-bar"><span style={{ width: `${(topicCompleted / topicLessons.length) * 100}%` }} /></span>
                  <span className="topic-progress-count">{topicCompleted}/{topicLessons.length}</span>
                  <ChevronRight size={15} />
                </button>
              )
            })}
          </div>
        </section>

        {completedLessons.length > 0 && (
          <section className="content-section completed-section">
            <div className="section-heading">
              <div><span className="eyebrow">DU HAR REDAN LÄRT DIG DET HÄR</span><h2>Senaste lärstunderna</h2></div>
            </div>
            <div className="completed-list">
              {completedLessons.slice(-4).reverse().map((lesson) => (
                <button className="completed-row" type="button" key={lesson.id} onClick={() => openLesson(lesson)}>
                  <span className={`completed-row-icon topic-${lesson.topicId}`}><Check size={16} /></span>
                  <span><strong>{lesson.title}</strong><small>{topics.find((topic) => topic.id === lesson.topicId)?.label}</small></span>
                  <ArrowUpRight size={16} />
                </button>
              ))}
            </div>
          </section>
        )}
      </>
    )
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand-lockup" type="button" onClick={() => navigate('today')} aria-label="Lärpuls, gå till startsidan">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-line" />
            <span className="brand-mark-dot" />
          </span>
          <span className="brand-name">lärpuls<span>.</span></span>
        </button>
        <span className="sidebar-section-label">DIN PLATS</span>
        <PageNav activePage={activePage} onNavigate={navigate} location="sidebar" />

        <div className="sidebar-bottom">
          <div className="sidebar-goal">
            <div className="sidebar-goal-head">
              <span><Target size={15} /> Dagens mål</span>
              <strong>{Math.min(completedToday, dailyGoal)}/{dailyGoal}</strong>
            </div>
            <div className="sidebar-goal-track"><span style={{ width: `${Math.min(completedToday / dailyGoal, 1) * 100}%` }} /></div>
            <small>{completedToday >= dailyGoal ? 'Du gjorde det! 🎉' : 'Lite nyfikenhet räcker.'}</small>
          </div>
          <div className="offline-note"><span /> Fungerar även offline</div>
          <p className="sidebar-footer">Små steg. Mer du.</p>
        </div>
      </aside>

      <main className="main-shell">
        <header className="topbar">
          <button className="mobile-brand-lockup" type="button" onClick={() => navigate('today')} aria-label="Lärpuls, gå till startsidan">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark-line" />
              <span className="brand-mark-dot" />
            </span>
            <span className="brand-name">lärpuls<span>.</span></span>
          </button>
          <div className="topbar-greeting">
            <span className="eyebrow">VÄLKOMMEN TILL DIN NYA VANA</span>
            <span className="topbar-date">{currentDateLabel()}</span>
          </div>
          <div className="topbar-actions">
            <span className="streak-chip"><Flame size={16} /> <strong>{displayedStreak}</strong> <span>dagars svit</span></span>
            <InstallButton />
            <button className="profile-button" type="button" onClick={() => navigate('progress')} aria-label="Visa din resa">
              <span>LP</span>
              <span className="profile-indicator" />
            </button>
          </div>
        </header>

        <div className="page-content">
          {storageWarning && (
            <div className="storage-warning" role="status">
              <span>{storageWarning}</span>
              <button type="button" onClick={() => setStorageWarning(null)} aria-label="Stäng meddelandet"><X size={16} /></button>
            </div>
          )}
          {activePage === 'today' && renderTodayPage()}
          {activePage === 'explore' && renderExplorePage()}
          {activePage === 'saved' && renderSavedPage()}
          {activePage === 'progress' && renderProgressPage()}
          <footer className="app-footer">
            <span className="footer-brand">lärpuls<span>.</span></span>
            <span>Byggd för nyfikenhet, en lärstund i taget.</span>
            <span>Allt innehåll sparas på din enhet.</span>
          </footer>
        </div>
      </main>

      <PageNav activePage={activePage} onNavigate={navigate} location="mobile" />

      {selectedLesson && (
        <LessonDialog
          lesson={selectedLesson}
          isCompleted={completedIdSet.has(selectedLesson.id)}
          isQuizClaimed={progress.quizClaimedIds.includes(selectedLesson.id)}
          onClose={closeLesson}
          onComplete={() => markLessonComplete(selectedLesson)}
          onQuizCorrect={() => rewardQuiz(selectedLesson)}
        />
      )}

      {toastMessage && <div className="toast-message" role="status"><CheckCircle2 size={17} /> {toastMessage}</div>}
    </div>
  )
}

export default App
