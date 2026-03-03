import { useState, useEffect } from 'react'
import geneImage from '../assets/gene.jpg'

const TYPING = [
  'Detecting ctDNA mutations...',
  'Profiling tumor biomarkers...',
  'Analyzing cfRNA signatures...',
  'Predicting treatment response...',
]

function TypeWriter() {
  const [idx, setIdx] = useState(0)
  const [char, setChar] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const cur = TYPING[idx]
    const t = setTimeout(() => {
      if (!del) {
        setChar(c => c + 1)
        if (char + 1 === cur.length) setTimeout(() => setDel(true), 1800)
      } else {
        setChar(c => c - 1)
        if (char - 1 === 0) { setDel(false); setIdx(i => (i + 1) % TYPING.length) }
      }
    }, del ? 35 : 65)
    return () => clearTimeout(t)
  }, [char, del, idx])

  return (
    <span className="font-sans text-sm text-blue-600 font-medium">
      {TYPING[idx].slice(0, char)}<span className="cursor text-blue-400">|</span>
    </span>
  )
}

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-b from-[#f0f7ff] via-white to-[#f8faff] overflow-hidden flex items-center">

      {/* Blob decorations */}
      <div className="bg-blob w-[500px] h-[500px] bg-blue-100 opacity-40 top-[-100px] right-[-100px]" />
      <div className="bg-blob w-[300px] h-[300px] bg-sky-100  opacity-50 bottom-[50px] left-[-80px]" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div style={{ animation: 'fadeInUp 0.8s ease forwards' }}>

          <span className="pill mb-5 block w-fit">
            AI-Powered Liquid Biopsy
          </span>

          <h1 className="font-display font-800 text-5xl lg:text-[3.6rem] leading-[1.08] tracking-tight text-slate-900 mb-5">
            We Provide a
            <br />
            <span className="text-gradient">Comprehensive Range</span>
            <br />
            of Biopsy Services
          </h1>

          <p className="font-sans text-base text-slate-500 leading-relaxed mb-6 max-w-md font-light">
            Advanced AI platform for liquid biopsy analysis — detecting circulating tumor DNA, cfRNA biomarkers, and methylation signatures with clinical-grade precision.
          </p>

          <div className="inline-flex items-center gap-3 bg-white border border-blue-100 rounded-full px-5 py-3 shadow-card mb-8">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <span className="font-sans text-xs text-slate-400">BiopsAI ~$</span>
            <TypeWriter />
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button className="btn-primary">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Schedule Analysis
            </button>
            <button className="btn-outline">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor"/>
              </svg>
              Watch Demo
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="avatar-stack flex">
              {['#3b82f6','#0ea5e9','#6366f1'].map((c, i) => (
                <div key={i} className="avatar w-9 h-9 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold"
                     style={{ background: c }}>
                  {['Dr','MD','Ph'][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="font-display font-700 text-slate-800">
                125<span className="text-blue-500">k+</span>
              </div>
              <div className="text-xs text-slate-400">Trusted clinicians</div>
            </div>
          </div>
        </div>

        {/* Right — Image Replacement */}
        <div className="flex justify-center" style={{ animation: 'fadeInUp 0.8s ease 0.2s forwards', opacity: 0 }}>
        <img
          src={geneImage}
          alt="Hero Visual"
          className="w-[420px] h-[420px] object-contain"
        />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-sans text-xs text-slate-400 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-300 to-transparent" />
      </div>
    </section>
  )
}