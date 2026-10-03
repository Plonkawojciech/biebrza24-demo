import type { Metadata } from 'next'
import { Bricolage_Grotesque, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { Header } from '@/components/Header'
import { db } from '@/lib/data'

const display = Bricolage_Grotesque({ subsets: ['latin', 'latin-ext'], variable: '--font-display' })
const body = Source_Sans_3({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600'], variable: '--font-body' })

export const metadata: Metadata = {
  title: { default: 'Biebrza24 — tratwy, kajaki i noclegi nad Biebrzą', template: '%s — Biebrza24' },
  description: 'Rodzinna baza turystyczna w Sztabinie, w Górnym Basenie Biebrzańskiego Parku Narodowego. Spływy tratwami i kajakami, noclegi, regionalna kuchnia, rowery.',
  openGraph: { siteName: 'Biebrza24', locale: 'pl_PL', type: 'website' },
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const payload = await db()
  const s = await payload.findGlobal({ slug: 'settings' })
  const tel = (s.phone || '').replace(/[\s-]/g, '')
  return (
    <html lang="pl" className={`${display.variable} ${body.variable}`}>
      <body>
        {s.banner && <div className="topline"><div className="wrap"><span>{s.banner}</span><a href={`tel:${tel}`}>{s.phone}</a></div></div>}
        <Header phone={s.phone || ''} />
        <main>{children}</main>
        <footer className="foot"><div className="wrap">
          <div className="foot-brand">
            <p className="foot-name">Biebrza24</p>
            <p className="foot-txt">{s.about}</p>
            <p className="foot-addr">{(s.address || '').split('\n').map((l) => <span key={l}>{l}</span>)}</p>
          </div>
          <div>
            <p className="foot-h">Oferta</p>
            <ul>
              <li><Link href="/tratwy">Tratwy biebrzańskie</Link></li>
              <li><Link href="/kajaki">Kajaki i canoe</Link></li>
              <li><Link href="/noclegi">Noclegi</Link></li>
              <li><Link href="/rowery">Rowery i wycieczki</Link></li>
              <li><Link href="/cennik">Cennik</Link></li>
            </ul>
          </div>
          <div>
            <p className="foot-h">Recepcja</p>
            <ul>
              <li><a href={`tel:${tel}`}>{s.phone}</a></li>
              {s.phone2 && <li><a href={`tel:${(s.phone2 || '').replace(/[\s-]/g, '')}`}>{s.phone2}</a></li>}
              <li><a href={`mailto:${s.email}`}>{s.email}</a></li>
              {s.hours && <li>{s.hours}</li>}
              {s.facebook && <li><a href={s.facebook} rel="noopener">Facebook</a></li>}
              {s.youtube && <li><a href={s.youtube} rel="noopener">YouTube</a></li>}
            </ul>
          </div>
          {s.domains && s.domains.length > 0 && (
            <div className="foot-domains">
              <p className="foot-h">Jedna strona, jeden panel, pięć adresów</p>
              <ul>{s.domains.map((d) => <li key={d.id}><span>{d.host}</span>{d.note && <small>{d.note}</small>}</li>)}</ul>
            </div>
          )}
          <div className="cr"><span>© 1999–{new Date().getFullYear()} Biebrza24, Sztabin</span><span>Wersja demonstracyjna nowej strony · {/* eslint-disable-next-line @next/next/no-img-element */}<a href="https://programo.pl"><img src="/programo-logo-white.svg" alt="Programo s.j." width={90} height={16} style={{ height: 16, width: "auto", verticalAlign: "middle" }} /></a></span></div>
        </div></footer>
      </body>
    </html>
  )
}
