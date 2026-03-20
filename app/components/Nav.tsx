'use client'
import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogoMark, FlagUK, FlagSpain } from './Icons'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState<'en' | 'es'>('en')
  const [ready, setReady] = useState(false)

  // Load Google Translate and hide its UI
  useEffect(() => {
    // Add styles to hide Google Translate bar/banner
    const style = document.createElement('style')
    style.textContent = `
      .goog-te-banner-frame, #goog-gt-tt, .goog-te-balloon-frame,
      .skiptranslate, #google_translate_element { display: none !important; }
      body { top: 0 !important; }
    `
    document.head.appendChild(style)

    // Check if already loaded
    if (document.querySelector('#gt-script')) return

    // Create hidden container
    const div = document.createElement('div')
    div.id = 'google_translate_element'
    div.style.display = 'none'
    document.body.appendChild(div)

    // Define init callback
    ;(window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,es', autoDisplay: false },
        'google_translate_element'
      )
      // Give GT a moment to create its select
      setTimeout(() => setReady(true), 500)
    }

    // Load script
    const script = document.createElement('script')
    script.id = 'gt-script'
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)

    // Detect current language from cookie
    const match = document.cookie.match(/googtrans=\/en\/(.*?)(;|$)/)
    if (match && match[1] === 'es') setLang('es')
  }, [])

  const switchLanguage = useCallback((targetLang: 'en' | 'es') => {
    setLang(targetLang)

    if (targetLang === 'en') {
      // Remove translation — set cookie back to English and reload
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname
      // Try the select approach first
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
      if (select) {
        select.value = 'en'
        select.dispatchEvent(new Event('change'))
        // If page doesn't revert, reload
        setTimeout(() => {
          if (document.cookie.includes('googtrans=/en/es')) {
            window.location.reload()
          }
        }, 500)
      } else {
        window.location.reload()
      }
    } else {
      // Translate to Spanish
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
      if (select) {
        select.value = 'es'
        select.dispatchEvent(new Event('change'))
      } else {
        // Fallback: set cookie and reload
        document.cookie = 'googtrans=/en/es; path=/'
        document.cookie = `googtrans=/en/es; path=/; domain=.${window.location.hostname}`
        window.location.reload()
      }
    }
  }, [])

  const toggleLanguage = () => switchLanguage(lang === 'en' ? 'es' : 'en')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5 notranslate">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="/" className="flex items-center gap-2.5">
            <LogoMark size={36} />
            <span className="text-cc-charcoal font-extrabold text-lg tracking-tight notranslate" style={{ fontFamily: 'var(--font-heading)' }}>Conectados</span>
          </a>
          <div className="hidden md:flex items-center gap-7">
            {[{ l: 'Events', h: '/events' }, { l: 'About', h: '/about' }, { l: 'Contact', h: '/contact' }].map(i => (
              <a key={i.l} href={i.h} className="text-cc-grey hover:text-cc-blue text-sm font-medium transition-colors">{i.l}</a>
            ))}
            <button 
              onClick={toggleLanguage} 
              className="flex items-center gap-2 text-cc-grey hover:text-cc-blue text-sm font-medium transition-colors border border-black/10 rounded-full px-3 py-1.5"
            >
              {lang === 'en' ? <FlagUK size={18} /> : <FlagSpain size={18} />}
              <span className="notranslate">{lang === 'en' ? 'EN' : 'ES'}</span>
            </button>
            <a href="/events" className="bg-cc-yellow hover:bg-cc-yellow-dark text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-md shadow-cc-yellow/20">
              Explore Events
            </a>
          </div>
          <button className="md:hidden text-cc-charcoal" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden bg-white border-t border-black/5">
            <div className="px-6 py-4 flex flex-col gap-3">
              {[{ l: 'Events', h: '/events' }, { l: 'About', h: '/about' }, { l: 'Contact', h: '/contact' }].map(i => (
                <a key={i.l} href={i.h} className="text-cc-grey text-base py-2 font-medium" onClick={() => setOpen(false)}>{i.l}</a>
              ))}
              <button 
                onClick={toggleLanguage} 
                className="flex items-center gap-2 text-cc-grey text-base py-2 font-medium"
              >
                {lang === 'en' ? <FlagSpain size={20} /> : <FlagUK size={20} />}
                <span className="notranslate">{lang === 'en' ? 'Español' : 'English'}</span>
              </button>
              <a href="/events" className="bg-cc-yellow text-white px-5 py-3 rounded-full text-center font-bold mt-2" onClick={() => setOpen(false)}>Explore Events</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
