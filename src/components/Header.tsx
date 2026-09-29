'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV: [string, string][] = [
  ['Tratwy', '/tratwy'],
  ['Kajaki', '/kajaki'],
  ['Noclegi', '/noclegi'],
  ['Rowery', '/rowery'],
  ['Cennik', '/cennik'],
  ['Kontakt', '/kontakt'],
]

export function Header({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false)
  const path = usePathname()
  useEffect(() => setOpen(false), [path])
  const active = (h: string) => path === h || path.startsWith(h + '/')
  return (
    <>
      <header className="head">
        <div className="wrap">
          <Link href="/" className="brand" aria-label="Biebrza24, strona główna">
            <svg viewBox="0 0 36 36" width="34" height="34" aria-hidden="true"><path d="M3 24c5-4 8 4 13 0s8 4 13 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M3 30c5-4 8 4 13 0s8 4 13 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".5" /><path d="M8 19h20l-2-6H10z" fill="currentColor" /><path d="M18 6v7" stroke="currentColor" strokeWidth="2" /></svg>
            <span><b>Biebrza24</b><small>Sztabin · Biebrzański Park Narodowy</small></span>
          </Link>
          <nav className="nav" aria-label="Główne">
            {NAV.map(([l, h]) => <Link key={h} href={h} className={active(h) ? 'on' : ''} aria-current={active(h) ? 'page' : undefined}>{l}</Link>)}
          </nav>
          <div className="head-act">
            <Link href="/rezerwacja" className="btn btn-solid btn-sm">Zarezerwuj</Link>
            <button className="burger" aria-expanded={open} aria-controls="menu-mobile" aria-label="Menu" onClick={() => setOpen((o) => !o)}><span /><span /><span /></button>
          </div>
        </div>
      </header>
      <nav id="menu-mobile" className={'drawer' + (open ? ' open' : '')} aria-label="Menu mobilne">
        {NAV.map(([l, h]) => <Link key={h} href={h}>{l}</Link>)}
        <a href={`tel:${phone.replace(/[\s-]/g, '')}`}>Zadzwoń: {phone}</a>
      </nav>
    </>
  )
}
