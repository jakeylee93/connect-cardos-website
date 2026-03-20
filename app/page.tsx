'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, MessageSquare, Navigation } from 'lucide-react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { IconMail, IconWineGlass, IconPalette, IconPeople, IconHeart, IconStar, IconCoffee } from './components/Icons'
import SuggestionBox from './components/SuggestionBox'
import { EVENTS, CATEGORY_META } from './data/events'

function formatDate(d: string) { 
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) 
}

const TESTIMONIALS = [
  { text: "Moved to Spain knowing nobody. After one Conectados event, I had a whole group of friends.", name: 'Sarah M.', from: 'Moved from London', icon: IconPeople, about: 'Community' },
  { text: "The paint night unlocked something. Three glasses of wine later, I'd made a painting AND three new friends.", name: 'Tom R.', from: '6 months in Madrid', icon: IconPalette, about: 'Paint & Wine Night' },
  { text: "The cheese and wine was next level — local Spanish producers, incredible pairings, and the most welcoming group.", name: 'Emma K.', from: '2 years in Spain', icon: IconWineGlass, about: 'Cheese & Wine' },
  { text: "As a solo expat, I was terrified to go. Now I look forward to Conectados events every week!", name: 'Jessica L.', from: '3 months in Madrid', icon: IconHeart, about: 'Solo Traveller' },
  { text: "Found my business partner at a networking event. You never know who you'll meet!", name: 'Markus B.', from: '1 year in Madrid', icon: IconStar, about: 'Business' },
  { text: "The best part? It's not awkward. Lucy makes everyone feel like old friends immediately.", name: 'Priya S.', from: 'Moved from Singapore', icon: IconCoffee, about: 'The Vibe' },
  { text: "I've tried other meetup groups — Conectados is different. Quality people, quality events.", name: 'Daniel R.', from: '4 months in Madrid', icon: IconPeople, about: 'Quality' },
  { text: "From lonely to fully booked social calendar. These events changed my Madrid experience.", name: 'Lena K.', from: '6 months in Madrid', icon: IconPalette, about: 'New Life' },
]

const PARTNERS = [
  { name: 'Walk & Eat Spain', color: '#E8636F' },
  { name: 'Madrid Wine Tours', color: '#9B59B6' },
  { name: 'Studio Arty', color: '#2B7A9E' },
  { name: 'Yoga Madrid', color: '#7B9E87' },
  { name: 'Tapas Trail', color: '#F5B731' },
  { name: 'Local Makers', color: '#C4654A' },
]

/* ============================================
   HERO — Glowing Flip Card (Next Event)
   ============================================ */

function FlipEventCard({ event }: { event: typeof EVENTS[0] }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', spots: 1 })
  
  const cat = CATEGORY_META[event.category]
  const remaining = event.totalSpots - event.spotsTaken
  const urgent = remaining <= 5
  const percentFull = (event.spotsTaken / event.totalSpots) * 100

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooked(true)
    setTimeout(() => { setIsFlipped(false); setIsBooked(false); setFormData({ name: '', email: '', spots: 1 }) }, 2000)
  }

  return (
    <div className="relative w-full max-w-[380px] mx-auto" style={{ perspective: '1200px' }}>
      
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* FRONT */}
        <div className="bg-white rounded-3xl overflow-hidden relative z-10 border-2 border-black shadow-[0_8px_30px_rgba(0,0,0,0.12)]" style={{ backfaceVisibility: 'hidden' }}>
          <div className="relative h-56">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 bg-cc-coral rounded-full animate-pulse" />
              <span className="text-xs font-bold text-cc-charcoal">Next Up</span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="bg-white/95 backdrop-blur-sm text-xs font-bold px-2.5 py-1 rounded-full shadow-sm" style={{ color: cat.color }}>
                {cat.emoji} {cat.label}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-cc-charcoal text-2xl font-extrabold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{event.title}</h2>
            <div className="flex items-center gap-2 text-cc-charcoal mb-2">
              <Calendar size={16} className="text-cc-yellow" />
              <span className="text-sm font-medium">{formatDate(event.date)} at {event.time}</span>
            </div>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-cc-warm hover:bg-cc-yellow/20 px-3 py-1.5 rounded-lg text-cc-charcoal text-xs font-medium transition-colors mb-4">
              <Navigation size={12} />{event.location.split(',')[0]}<ArrowRight size={10} className="ml-1" />
            </a>
            <div className="flex items-center justify-between mb-3">
              <span className="text-cc-charcoal font-extrabold text-2xl">{event.currency}{event.price}</span>
              <span className={`text-xs font-bold ${urgent ? 'text-cc-coral' : 'text-cc-blue'}`}>{remaining} spots left</span>
            </div>
            <div className="mb-5">
              <div className="w-full h-2.5 bg-black/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${percentFull}%` }} transition={{ duration: 1, ease: 'easeOut' }} className={`h-full rounded-full ${urgent ? 'bg-cc-coral' : 'bg-cc-yellow'}`} />
              </div>
            </div>
            <button onClick={() => setIsFlipped(true)} className="w-full bg-cc-yellow hover:bg-cc-yellow-dark text-white py-3.5 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-cc-yellow/20">
              Reserve My Spot
            </button>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 bg-cc-charcoal rounded-3xl overflow-hidden shadow-2xl p-6 flex flex-col justify-center z-10" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          {!isBooked ? (
            <>
              <h3 className="text-white text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>You&apos;re in!</h3>
              <p className="text-white/60 text-sm mb-5">Enter your details to reserve your spot</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" required placeholder="Your name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-cc-yellow transition-colors" />
                <input type="email" required placeholder="Your email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-cc-yellow transition-colors" />
                <select value={formData.spots} onChange={e => setFormData({...formData, spots: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-cc-yellow">
                  {[1,2,3,4,5].map(n => <option key={n} value={n} className="text-cc-charcoal">{n} spot{n > 1 ? 's' : ''}</option>)}
                </select>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsFlipped(false)} className="flex-1 py-3 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors">Back</button>
                  <button type="submit" className="flex-1 bg-cc-yellow hover:bg-cc-yellow-dark text-white py-3 rounded-xl font-bold transition-all text-lg">Confirm</button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-cc-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </motion.div>
              <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Booked!</h3>
              <p className="text-white/60 text-sm mt-1">See you at {event.title}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function HeroSection() {
  const nextEvent = EVENTS[0]
  return (
    <section className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center pt-20 pb-12 px-6">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cc-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cc-blue/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-12 lg:gap-16 max-w-5xl mx-auto w-full relative z-10 px-4 sm:px-8">
        {/* Left: Feature Text */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex-1 text-center md:text-left max-w-lg">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-cc-yellow font-bold text-sm tracking-wide uppercase mb-4"
          >
            Madrid&apos;s Community
          </motion.p>
          <h1 className="text-cc-charcoal text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Find your people in Madrid
          </h1>
          <p className="text-cc-grey text-base sm:text-lg mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Community events for expats & locals. Paint nights, food walks, wine socials, and more — no awkward networking, just real connections.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
            <a href="/events" className="bg-cc-yellow hover:bg-cc-yellow-dark text-white px-7 py-3.5 rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-cc-yellow/20 text-sm">View All Events</a>
            <a href="/about" className="bg-white text-cc-charcoal border-2 border-cc-charcoal/10 hover:border-cc-charcoal/20 px-7 py-3.5 rounded-full font-bold transition-all text-sm">Meet Lucy</a>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-cc-grey">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cc-coral" />{EVENTS.length} upcoming events</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cc-blue" />5 categories</span>
            <a href="#suggestion-box" className="flex items-center gap-1.5 hover:text-cc-charcoal transition-colors"><MessageSquare size={13} /> Suggest an event</a>
          </div>
        </motion.div>

        {/* Right: Event Card */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="w-full max-w-[380px] flex-shrink-0">
          <FlipEventCard event={nextEvent} />
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================
   EVENT CARDS (with progress bars)
   ============================================ */

function EventCard({ event }: { event: typeof EVENTS[0] }) {
  const cat = CATEGORY_META[event.category]
  const remaining = event.totalSpots - event.spotsTaken
  const urgent = remaining <= 5
  const percentFull = (event.spotsTaken / event.totalSpots) * 100
  return (
    <a href={`/events/${event.slug}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
        <div className="relative h-44 overflow-hidden">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-2 left-2"><span className="bg-white/95 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: cat.color }}>{cat.emoji} {cat.label}</span></div>
          {urgent && <div className="absolute top-2 right-2"><span className="bg-cc-coral text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">Almost full</span></div>}
        </div>
        <div className="p-4">
          <h3 className="text-cc-charcoal font-bold text-sm mb-1 group-hover:text-cc-blue transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>{event.title}</h3>
          <p className="text-cc-grey text-xs mb-2">{formatDate(event.date)}</p>
          <div className="mb-2">
            <div className="flex justify-between text-[10px] mb-1"><span className="text-cc-grey">{event.spotsTaken} booked</span><span className={urgent ? 'text-cc-coral font-bold' : 'text-cc-blue font-bold'}>{remaining} left</span></div>
            <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all ${urgent ? 'bg-cc-coral' : 'bg-cc-yellow'}`} style={{ width: `${percentFull}%` }} /></div>
          </div>
          <span className="text-cc-charcoal font-extrabold text-sm">{event.currency}{event.price}</span>
        </div>
      </div>
    </a>
  )
}

function UpcomingEventsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const events = EVENTS.slice(1, 7)
  useEffect(() => { const t = setInterval(() => setActiveIndex(i => (i + 1) % events.length), 4000); return () => clearInterval(t) }, [events.length])
  return (
    <div className="relative sm:hidden px-2">
      <div className="overflow-hidden"><div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>{events.map(e => <div key={e.slug} className="w-full flex-shrink-0 px-2"><EventCard event={e} /></div>)}</div></div>
      <div className="flex justify-center gap-2 mt-4">{events.map((_, i) => <button key={i} onClick={() => setActiveIndex(i)} className={`h-2 rounded-full transition-all ${i === activeIndex ? 'bg-white w-6' : 'bg-white/20 w-2'}`} />)}</div>
    </div>
  )
}

function HowItWorksCarousel() {
  const [active, setActive] = useState(0)
  const steps = [{ img: '/images/icon-vibe.png', title: 'Find Your Vibe', desc: 'Browse upcoming events and find something that speaks to you.', n: '01' },{ img: '/images/icon-interest.png', title: 'Show Interest', desc: "Reserve your spot with one tap. We'll confirm your place.", n: '02' },{ img: '/images/icon-connect.png', title: 'Turn Up & Connect', desc: 'Arrive, enjoy, and meet incredible people. No awkward networking.', n: '03' }]
  useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % steps.length), 2000); return () => clearInterval(t) }, [])
  return (
    <div className="sm:hidden">
      <div className="relative bg-white rounded-2xl p-6 shadow-sm overflow-hidden">
        <AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}><div className="text-cc-yellow/10 text-5xl font-extrabold absolute top-2 right-4" style={{ fontFamily: 'var(--font-heading)' }}>{steps[active].n}</div><div className="mb-4 flex justify-center"><div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center"><img src={steps[active].img} alt={steps[active].title} className="w-16 h-16 object-contain" /></div></div><h3 className="text-cc-charcoal font-bold text-lg mb-2 text-center" style={{ fontFamily: 'var(--font-heading)' }}>{steps[active].title}</h3><p className="text-cc-grey text-sm leading-relaxed text-center">{steps[active].desc}</p></motion.div></AnimatePresence>
      </div>
      <div className="flex justify-center gap-2 mt-4">{steps.map((_, i) => <button key={i} onClick={() => setActive(i)} className={`h-2 rounded-full transition-all ${i === active ? 'bg-cc-yellow w-6' : 'bg-black/10 w-2'}`} />)}</div>
    </div>
  )
}

function TestimonialCarousel() {
  const [active, setActive] = useState(0)
  const next = () => setActive(a => (a + 1) % TESTIMONIALS.length)
  const prev = () => setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  useEffect(() => { const t = setInterval(next, 5000); return () => clearInterval(t) }, [])
  const t = TESTIMONIALS[active]
  const Icon = t.icon
  return (
    <div className="max-w-xl mx-auto">
      <div className="relative">
        <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-6 shadow-sm"><div className="flex items-start gap-4"><div className="w-10 h-10 rounded-xl bg-cc-warm flex items-center justify-center flex-shrink-0"><Icon size={20} /></div><div className="flex-1"><p className="text-cc-charcoal text-sm leading-relaxed mb-3" style={{ fontFamily: 'var(--font-heading)' }}>&ldquo;{t.text}&rdquo;</p><p className="text-cc-charcoal font-bold text-xs">{t.name}</p><p className="text-cc-grey/50 text-[10px]">{t.from}</p></div></div></motion.div>
        <button onClick={prev} className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"><ChevronLeft size={16} className="text-cc-charcoal" /></button>
        <button onClick={next} className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"><ChevronRight size={16} className="text-cc-charcoal" /></button>
      </div>
      <div className="flex justify-center gap-2 mt-4">{TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all ${i === active ? 'bg-cc-yellow w-6' : 'bg-black/10 w-1.5'}`} />)}</div>
    </div>
  )
}

/* ============================================
   PAGE
   ============================================ */

export default function HomePage() {
  const [email, setEmail] = useState('')
  const otherEvents = EVENTS.slice(1, 7)
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <HeroSection />

      {/* UPCOMING EVENTS — Dark */}
      <section className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-cc-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8"><div><p className="text-cc-yellow text-sm font-bold tracking-wide mb-1">Coming Up</p><h2 className="text-white text-2xl sm:text-3xl font-extrabold" style={{ fontFamily: 'var(--font-heading)' }}>Upcoming Events</h2></div><a href="/events" className="hidden sm:flex items-center gap-1 text-white/70 hover:text-white text-sm font-bold transition-colors">View All <ArrowRight size={14} /></a></div>
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4">{otherEvents.map(e => <EventCard key={e.slug} event={e} />)}</div>
          <UpcomingEventsCarousel />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-cc-warm">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-cc-coral text-sm font-bold tracking-wide mb-1">It&apos;s Simple</p><h2 className="text-cc-charcoal text-3xl sm:text-4xl font-extrabold mb-10" style={{ fontFamily: 'var(--font-heading)' }}>How It Works</h2>
          <div className="hidden sm:grid grid-cols-3 gap-6">{[{ img: '/images/icon-vibe.png', title: 'Find Your Vibe', desc: 'Browse upcoming events and find something that speaks to you.', n: '01' },{ img: '/images/icon-interest.png', title: 'Show Interest', desc: "Reserve your spot with one tap. We'll confirm your place.", n: '02' },{ img: '/images/icon-connect.png', title: 'Turn Up & Connect', desc: 'Arrive, enjoy, and meet incredible people. No awkward networking.', n: '03' }].map((step, i) => <motion.div key={step.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"><div className="text-cc-yellow/10 text-5xl font-extrabold absolute top-3 right-4" style={{ fontFamily: 'var(--font-heading)' }}>{step.n}</div><div className="mb-4 flex justify-center"><div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center"><img src={step.img} alt={step.title} className="w-16 h-16 object-contain" /></div></div><h3 className="text-cc-charcoal font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{step.title}</h3><p className="text-cc-grey text-sm leading-relaxed">{step.desc}</p></motion.div>)}</div>
          <HowItWorksCarousel />
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-12 px-6 sm:px-8 lg:px-12 bg-white border-y border-black/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-cc-grey text-xs font-bold uppercase tracking-[0.2em] mb-6">Working with excellent partners</p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">{PARTNERS.map((p, i) => <div key={i} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: p.color + '20' }}><span className="text-sm font-bold" style={{ color: p.color }}>{p.name.charAt(0)}</span></div><span className="text-cc-charcoal text-sm font-medium">{p.name}</span></div>)}</div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-cc-warm">
        <div className="max-w-3xl mx-auto"><div className="text-center mb-8"><p className="text-cc-blue text-sm font-bold tracking-wide mb-1">Word on the Street</p><h2 className="text-cc-charcoal text-2xl sm:text-3xl font-extrabold" style={{ fontFamily: 'var(--font-heading)' }}>Stories from the Community</h2></div><TestimonialCarousel /></div>
      </section>

      <div id="suggestion-box"><SuggestionBox /></div>

      {/* NEWSLETTER */}
      <section className="py-6 px-6 sm:px-8 lg:px-12 bg-white border-t border-black/5">
        <div className="max-w-4xl mx-auto"><div className="flex flex-col sm:flex-row items-center justify-between gap-4"><div className="flex items-center gap-3"><IconMail size={24} /><h3 className="text-cc-charcoal font-bold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Never Miss an Event</h3></div><form onSubmit={e => { e.preventDefault(); alert("Thanks! You're on the list."); setEmail('') }} className="flex gap-2 w-full sm:w-auto"><input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 sm:flex-none px-4 py-2 rounded-full border border-black/10 text-sm focus:outline-none focus:border-cc-yellow transition bg-cc-warm min-w-[180px]" /><button type="submit" className="bg-cc-yellow hover:bg-cc-yellow-dark text-white px-5 py-2 rounded-full font-bold text-sm transition-all hover:scale-105 whitespace-nowrap">Join</button></form></div></div>
      </section>

      <Footer />
    </div>
  )
}
