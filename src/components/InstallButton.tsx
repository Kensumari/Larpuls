import { useEffect, useState } from 'react'
import { ArrowDownToLine, Check, ChevronRight, Share, X } from 'lucide-react'

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

function isInstallPromptEvent(event: Event): event is InstallPromptEvent {
  return 'prompt' in event && typeof event.prompt === 'function' && 'userChoice' in event
}

export function InstallButton() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null)
  const [showGuide, setShowGuide] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS] = useState(
    () => /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
  )

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      if (!isInstallPromptEvent(event)) return
      event.preventDefault()
      setInstallPrompt(event)
    }
    const onAppInstalled = () => {
      setIsInstalled(true)
      setInstallPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  useEffect(() => {
    if (!showGuide) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowGuide(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [showGuide])

  async function installApp() {
    if (!installPrompt) {
      setShowGuide(true)
      return
    }

    try {
      await installPrompt.prompt()
      const choice = await installPrompt.userChoice
      if (choice.outcome === 'accepted') {
        setIsInstalled(true)
      }
      setInstallPrompt(null)
    } catch (error) {
      console.error('Lärpuls kunde inte öppna webbläsarens installationsdialog.', error)
      setInstallPrompt(null)
      setShowGuide(true)
    }
  }

  return (
    <>
      <button className="install-button" type="button" onClick={installApp}>
        {isInstalled ? <Check size={15} /> : <ArrowDownToLine size={15} />}
        <span>{isInstalled ? 'Installerad' : 'Installera'}</span>
      </button>

      {showGuide && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowGuide(false)
        }}>
          <section className="install-dialog" role="dialog" aria-modal="true" aria-labelledby="install-heading">
            <button className="icon-button install-close" type="button" onClick={() => setShowGuide(false)} aria-label="Stäng">
              <X size={19} />
            </button>
            <span className="install-mark"><ArrowDownToLine size={21} /></span>
            <span className="eyebrow">LÄRPULS I FICKAN</span>
            <h2 id="install-heading">Lägg till på hemskärmen</h2>
            <p className="install-intro">Få en egen appikon och öppna dina lärstunder direkt – utan att gå via appbutiken.</p>
            <div className="install-steps">
              {isIOS ? (
                <>
                  <div className="install-step">
                    <span>1</span>
                    <p>Öppna Lärpuls i <strong>Safari</strong>.</p>
                  </div>
                  <div className="install-step">
                    <span>2</span>
                    <p>Tryck på <Share size={14} className="inline-icon" /> <strong>Dela</strong> längst ned.</p>
                  </div>
                  <div className="install-step">
                    <span>3</span>
                    <p>Välj <strong>Lägg till på hemskärmen</strong> och bekräfta.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="install-step">
                    <span>1</span>
                    <p>Öppna webbläsarens meny <strong>⋮</strong> eller installationsikon.</p>
                  </div>
                  <div className="install-step">
                    <span>2</span>
                    <p>Välj <strong>Installera app</strong> eller <strong>Lägg till på startskärmen</strong>.</p>
                  </div>
                  <div className="install-step">
                    <span>3</span>
                    <p>Bekräfta – klart! Lärpuls går att öppna som en vanlig app.</p>
                  </div>
                </>
              )}
            </div>
            <button className="button button-dark install-done" type="button" onClick={() => setShowGuide(false)}>
              Jag fattar <ChevronRight size={16} />
            </button>
          </section>
        </div>
      )}
    </>
  )
}
