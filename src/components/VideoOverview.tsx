import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, Download, ExternalLink, Pause, Play } from 'lucide-react'
import type { LearningCard, Topic } from '../data/learning'
import { createNotebookLmDownload, type NotebookLmFormat } from '../lib/notebookLm'

interface VideoScene {
  title: string
  narration: string
}

interface VideoOverviewProps {
  lesson: LearningCard
  topic: Topic
  initialFormat: NotebookLmFormat
  onBack: (format: NotebookLmFormat) => void
}

function narrationText(parts: string[]): string {
  const sentences = parts
    .map((part) => part.trim().replace(/[.!?]+$/u, ''))
    .filter(Boolean)
  return sentences.length > 0 ? `${sentences.join('. ')}.` : ''
}

export function VideoOverview({ lesson, topic, initialFormat, onBack }: VideoOverviewProps) {
  const [format, setFormat] = useState(initialFormat)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [playbackMessage, setPlaybackMessage] = useState<string | null>(null)
  const [exportMessage, setExportMessage] = useState<string | null>(null)
  const [canSpeak] = useState(
    () =>
      typeof window !== 'undefined'
      && 'speechSynthesis' in window
      && typeof SpeechSynthesisUtterance !== 'undefined',
  )

  const scenes = useMemo<VideoScene[]>(() => {
    if (format === 'short') {
      return [
        {
          title: 'Välkommen',
          narration: narrationText([topic.label, lesson.title, lesson.subtitle, topic.notice ?? '']),
        },
        ...lesson.slides.map((slide) => ({ title: slide.title, narration: slide.body })),
        { title: 'Prova själv', narration: lesson.deepDive.tryThis },
      ]
    }

    return [
      {
        title: 'Introduktion',
        narration: narrationText([lesson.deepDive.intro, topic.notice ?? '']),
      },
      ...lesson.deepDive.sections.map((section) => ({
        title: section.title,
        narration: narrationText([section.body, ...section.bullets]),
      })),
      { title: 'Prova själv', narration: lesson.deepDive.tryThis },
      { title: 'Tänk efter', narration: `Ta en paus och fundera på frågan: ${lesson.quiz.question}` },
    ]
  }, [format, lesson, topic])

  const scene = scenes[sceneIndex]
  const notebookLmDownload = useMemo(
    () => createNotebookLmDownload(lesson, topic, format),
    [format, lesson, topic],
  )

  useEffect(() => {
    if (!isPlaying || isPaused || canSpeak) return

    const wordCount = scene.narration.trim().split(/\s+/).length
    const timeoutId = window.setTimeout(() => {
      if (sceneIndex >= scenes.length - 1) {
        setIsPlaying(false)
        setIsPaused(false)
        setPlaybackMessage('Videoöversikten är klar.')
      } else {
        setSceneIndex(sceneIndex + 1)
      }
    }, Math.min(18_000, Math.max(3_500, wordCount * 320)))

    return () => window.clearTimeout(timeoutId)
  }, [canSpeak, isPaused, isPlaying, scene, sceneIndex, scenes])

  useEffect(() => {
    if (!isPlaying || !canSpeak) return

    const utterance = new SpeechSynthesisUtterance(scene.narration)
    utterance.lang = 'sv-SE'
    utterance.rate = 0.95
    utterance.onend = () => {
      if (sceneIndex >= scenes.length - 1) {
        setIsPlaying(false)
        setIsPaused(false)
        setPlaybackMessage('Videoöversikten är klar.')
      } else {
        setSceneIndex(sceneIndex + 1)
      }
    }
    utterance.onerror = (event) => {
      if (event.error === 'canceled' || event.error === 'interrupted') return
      console.error('Taluppläsningen av lärstunden misslyckades.', event.error)
      setPlaybackMessage('Taluppläsningen avbröts. Du kan fortsätta med texten och knapparna.')
      setIsPlaying(false)
      setIsPaused(false)
    }

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)

    return () => {
      utterance.onend = null
      utterance.onerror = null
      window.speechSynthesis.cancel()
    }
  }, [canSpeak, isPlaying, scene, sceneIndex, scenes])

  function togglePlayback() {
    if (isPlaying) {
      if (isPaused) {
        if (canSpeak) window.speechSynthesis.resume()
        setIsPaused(false)
        setPlaybackMessage(canSpeak ? 'Svensk taluppläsning fortsätter.' : 'Textpresentationen fortsätter.')
      } else {
        if (canSpeak) window.speechSynthesis.pause()
        setIsPaused(true)
        setPlaybackMessage('Uppspelningen är pausad.')
      }
      return
    }

    setIsPaused(false)
    setPlaybackMessage(
      canSpeak
        ? 'Svensk taluppläsning spelas upp.'
        : 'Talsyntes saknas i webbläsaren; textscenerna spelas upp automatiskt.',
    )
    if (sceneIndex >= scenes.length - 1) setSceneIndex(0)
    setIsPlaying(true)
  }

  function changeScene(nextIndex: number) {
    if (isPaused) {
      setIsPlaying(false)
      setIsPaused(false)
    }
    setSceneIndex(nextIndex)
    setPlaybackMessage(null)
  }

  function changeFormat(nextFormat: NotebookLmFormat) {
    if (nextFormat === format) return
    setIsPlaying(false)
    setIsPaused(false)
    setSceneIndex(0)
    setPlaybackMessage(null)
    setExportMessage(null)
    setFormat(nextFormat)
  }

  return (
    <div className={`video-overview topic-${topic.id}`}>
      <div className="video-overview-toolbar">
        <button className="back-to-reel" type="button" onClick={() => onBack(format)}>
          <ArrowLeft size={15} /> Tillbaka till lärstunden
        </button>
        <div className="video-format-switch" role="group" aria-label="Välj videolängd">
          <button
            className={`video-format-button${format === 'short' ? ' is-active' : ''}`}
            type="button"
            onClick={() => changeFormat('short')}
            aria-pressed={format === 'short'}
          >
            Kort
          </button>
          <button
            className={`video-format-button${format === 'detailed' ? ' is-active' : ''}`}
            type="button"
            onClick={() => changeFormat('detailed')}
            aria-pressed={format === 'detailed'}
          >
            Fördjupning
          </button>
        </div>
      </div>

      <div className="video-stage">
        <div className="video-stage-heading">
          <span className="video-scene-label">{topic.label} · SCEN {String(sceneIndex + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}</span>
          <span className="video-duration">{format === 'short' ? 'Kort videoöversikt' : 'Fördjupad videoöversikt'}</span>
        </div>
        <div className="video-scene" key={`${format}-${sceneIndex}`} aria-live="polite">
          <h3>{scene.title}</h3>
          <p>{scene.narration}</p>
        </div>
        <div className="video-progress" aria-label={`Scen ${sceneIndex + 1} av ${scenes.length}`}>
          <span style={{ width: `${((sceneIndex + 1) / scenes.length) * 100}%` }} />
        </div>
      </div>

      <div className="video-controls" aria-label="Videokontroller">
        <button
          className="video-control-button"
          type="button"
          onClick={() => changeScene(Math.max(0, sceneIndex - 1))}
          disabled={sceneIndex === 0}
          aria-label="Föregående scen"
        >
          <ChevronLeft size={18} />
        </button>
        <button className="video-play-button" type="button" onClick={togglePlayback}>
          {isPlaying && !isPaused ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
          {isPlaying ? isPaused ? 'Fortsätt' : 'Pausa' : 'Spela upp'}
        </button>
        <button
          className="video-control-button"
          type="button"
          onClick={() => changeScene(Math.min(scenes.length - 1, sceneIndex + 1))}
          disabled={sceneIndex === scenes.length - 1}
          aria-label="Nästa scen"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <p className="video-playback-message" role="status">
        {playbackMessage ?? (canSpeak
          ? 'Tryck på Spela upp för svensk taluppläsning.'
          : 'Textpresentationen fungerar även utan talstöd.')}
      </p>

      <aside className="notebooklm-handoff">
        <div>
          <span className="eyebrow">VILL DU SKAPA EN AI-VIDEO?</span>
          <strong>Fortsätt i NotebookLM</strong>
          <p>Hämta valt format som textkälla och lägg till den i NotebookLM för att skapa en Video Overview.</p>
          {exportMessage && <p className="notebooklm-message" role="status">{exportMessage}</p>}
        </div>
        <div className="notebooklm-actions">
          <a
            className="button button-outline"
            href={notebookLmDownload.href}
            download={notebookLmDownload.fileName}
            onClick={() => setExportMessage('Textunderlaget är redo att importeras som källa i NotebookLM.')}
          >
            <Download size={15} /> Hämta underlag
          </a>
          <a
            className="button button-dark"
            href="https://notebooklm.google.com/"
            target="_blank"
            rel="noreferrer"
          >
            Öppna NotebookLM <ExternalLink size={15} />
          </a>
        </div>
      </aside>
    </div>
  )
}
