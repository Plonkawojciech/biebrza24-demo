import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db, pic, zl, TYPE_LABEL, TYPE_ORDER } from '@/lib/data'
import { OfferCard } from '@/components/OfferCard'
import { ReservationForm } from '@/components/ReservationForm'

type Props = { params: Promise<{ slug: string[] }> }
const TYPES = new Set(TYPE_ORDER)
const GROUPS: [string, string][] = [['noclegi', 'Noclegi'], ['wyzywienie', 'Wyżywienie'], ['pole', 'Pole namiotowe'], ['sauna', 'Sauna'], ['tratwy', 'Tratwy'], ['kajaki', 'Kajaki i łódki'], ['rowery', 'Rowery']]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const segs = (await params).slug
  const p = segs.join('/')
  if (TYPES.has(p)) return { title: TYPE_LABEL[p] }
  if (p === 'oferta') return { title: 'Oferta' }
  if (p === 'cennik') return { title: 'Cennik' }
  if (p === 'kontakt') return { title: 'Kontakt i dojazd' }
  if (p === 'rezerwacja') return { title: 'Rezerwacja' }
  if (segs[0] === 'oferta' && segs[1]) {
    const r = await (await db()).find({ collection: 'offers', where: { slug: { equals: segs[1] } }, limit: 1 })
    return r.docs[0] ? { title: r.docs[0].name, description: r.docs[0].lead } : {}
  }
  return {}
}

export default async function Page({ params }: Props) {
  const segs = (await params).slug
  const p = segs.join('/')
  const payload = await db()

  if (p === 'oferta' || TYPES.has(p)) {
    const type = TYPES.has(p) ? p : undefined
    const r = await payload.find({ collection: 'offers', where: type ? { type: { equals: type } } : {}, sort: 'order', limit: 60, depth: 1 })
    const groups = type ? [type] : TYPE_ORDER
    return (
      <div className="section"><div className="wrap">
        <div className="crumbs"><Link href="/">Start</Link><span>/</span>{type ? <><Link href="/oferta">Oferta</Link><span>/</span><span>{TYPE_LABEL[type]}</span></> : <span>Oferta</span>}</div>
        <h1 className="h1">{type ? TYPE_LABEL[type] : 'Oferta Biebrza24'}</h1>
        <p className="lead">{INTRO[type || 'all']}</p>
        <nav className="pills" aria-label="Działy">
          <Link href="/oferta" className={!type ? 'on' : ''}>Wszystko</Link>
          {TYPE_ORDER.map((t) => <Link key={t} href={`/${t}`} className={type === t ? 'on' : ''}>{TYPE_LABEL[t]}</Link>)}
        </nav>
        {groups.map((g) => {
          const docs = r.docs.filter((o) => o.type === g)
          if (!docs.length) return null
          return (
            <section key={g} className="group">
              {!type && <h2 className="h3">{TYPE_LABEL[g]}</h2>}
              <div className="cards">{docs.map((o) => <OfferCard key={o.id} o={o} />)}</div>
            </section>
          )
        })}
      </div></div>
    )
  }

  if (segs[0] === 'oferta' && segs.length === 2) {
    const r = await payload.find({ collection: 'offers', where: { slug: { equals: segs[1] } }, limit: 1, depth: 1 })
    const o = r.docs[0]
    if (!o) notFound()
    const related = await payload.find({ collection: 'offers', where: { and: [{ type: { equals: o.type } }, { id: { not_equals: o.id } }] }, sort: 'order', limit: 3, depth: 1 })
    const img = pic(o, 'full')
    return (
      <>
        <section className="ohero">
          {img && <img src={img} alt="" referrerPolicy="no-referrer" />}
          <div className="wrap ohero-in">
            <div className="crumbs light"><Link href="/">Start</Link><span>/</span><Link href={`/${o.type}`}>{TYPE_LABEL[o.type]}</Link><span>/</span><span>{o.name}</span></div>
            <h1 className="display">{o.name}</h1>
            <p className="lead">{o.lead}</p>
          </div>
        </section>
        <div className="section"><div className="wrap obody">
          <article>
            <dl className="facts wide">
              {o.capacity && <div><dt>Załoga</dt><dd>{o.capacity}</dd></div>}
              {o.duration && <div><dt>Czas</dt><dd>{o.duration}</dd></div>}
              {o.season && <div><dt>Sezon</dt><dd>{o.season}</dd></div>}
              <div><dt>Cena</dt><dd>{o.price ? <>{zl(o.price)}<small>{o.unit}</small></> : 'zapytaj'}</dd></div>
            </dl>
            {o.priceNote && <p className="note">{o.priceNote}</p>}
            {(o.sections || []).map((sec: any) => <section key={sec.id} className="osec"><h2 className="h3">{sec.title}</h2><p>{sec.body}</p></section>)}
            {o.includes && o.includes.length > 0 && <><h2 className="h3" style={{ marginTop: 40 }}>W cenie</h2><ul className="ticks">{o.includes.map((i: any) => <li key={i.id}>{i.text}</li>)}</ul></>}
          </article>
          <aside className="aside">
            <p className="aside-h">{o.bookable ? 'Zarezerwuj termin' : 'Zapytaj o termin'}</p>
            <ReservationForm offers={[]} selected={o.id} compact />
          </aside>
        </div></div>
        {related.docs.length > 0 && (
          <div className="section tint"><div className="wrap">
            <div className="sechead"><h2 className="h3">Podobne w tym dziale</h2><Link className="textlink" href={`/${o.type}`}>{TYPE_LABEL[o.type]}</Link></div>
            <div className="cards">{related.docs.map((x) => <OfferCard key={x.id} o={x} />)}</div>
          </div></div>
        )}
      </>
    )
  }

  if (p === 'cennik') {
    const r = await payload.find({ collection: 'prices', sort: 'order', limit: 200 })
    return (
      <div className="section"><div className="wrap narrow">
        <div className="crumbs"><Link href="/">Start</Link><span>/</span><span>Cennik</span></div>
        <h1 className="h1">Cennik</h1>
        <p className="lead">Ceny brutto, aktualizacja 1 lutego 2026. Tratwy, kajaki, canoe, łódki i rowery wypożyczamy na dni, nie na doby. Preferujemy płatność gotówką.</p>
        {GROUPS.map(([g, label]) => {
          const rows = r.docs.filter((x) => x.group === g)
          if (!rows.length) return null
          return (
            <section key={g} className="price-group">
              <h2 className="h3">{label}</h2>
              <table className="price"><tbody>
                {rows.map((x) => (
                  <tr key={x.id}>
                    <td>{x.name}{x.note && <small>{x.note}</small>}</td>
                    <td className="num">{x.price ? zl(x.price) : 'zapytaj'}{x.priceMax ? ` – ${zl(x.priceMax)}` : ''}<small>{x.unit}</small></td>
                  </tr>
                ))}
              </tbody></table>
            </section>
          )
        })}
        <div className="infobox">
          <p>Dzieci do lat 2 w pokoju z rodzicami, bez oddzielnego łóżka, nocują bezpłatnie. Dzieci do 12 lat mogą korzystać z porcji dziecięcych tańszych o 10 zł. Doba hotelowa od 14:00 do 11:00. Parking i Wi-Fi bezpłatne. W całym obiekcie obowiązuje zakaz palenia.</p>
          <p>Do cen nie wliczamy usług dodatkowych. Usługa flisacka od 500 zł. Do pierwszego dnia wypożyczenia tratwy doliczamy transport. Sprawdź też cennik opłat Biebrzańskiego Parku Narodowego.</p>
        </div>
      </div></div>
    )
  }

  if (p === 'rezerwacja') {
    const offers = await payload.find({ collection: 'offers', where: { bookable: { equals: true } }, sort: 'order', limit: 60 })
    const s = await payload.findGlobal({ slug: 'settings' })
    return (
      <div className="section"><div className="wrap split">
        <div>
          <div className="crumbs"><Link href="/">Start</Link><span>/</span><span>Rezerwacja</span></div>
          <h1 className="h1">Rezerwacja</h1>
          <p className="lead">Wpisz termin i liczbę osób, resztę ustalimy przez telefon. Zgłoszenie od razu widzi recepcja, niezależnie od tego, z której domeny weszliście.</p>
          <p className="big-tel"><a href={`tel:${(s.phone || '').replace(/[\s-]/g, '')}`}>{s.phone}</a></p>
          <p className="muted">{s.hours}</p>
        </div>
        <div className="aside"><ReservationForm offers={offers.docs.map((o) => ({ id: o.id, name: o.name }))} /></div>
      </div></div>
    )
  }

  if (p === 'kontakt') {
    const s = await payload.findGlobal({ slug: 'settings' })
    return (
      <div className="section"><div className="wrap split">
        <div>
          <div className="crumbs"><Link href="/">Start</Link><span>/</span><span>Kontakt</span></div>
          <h1 className="h1">Kontakt i dojazd</h1>
          <dl className="dl">
            <div><dt>Telefon</dt><dd><a href={`tel:${(s.phone || '').replace(/[\s-]/g, '')}`}>{s.phone}</a>{s.phone2 && <><br /><a href={`tel:${(s.phone2 || '').replace(/[\s-]/g, '')}`}>{s.phone2}</a></>}</dd></div>
            <div><dt>E-mail</dt><dd><a href={`mailto:${s.email}`}>{s.email}</a></dd></div>
            <div><dt>Adres</dt><dd style={{ whiteSpace: 'pre-line' }}>{s.address}</dd></div>
            <div><dt>Recepcja</dt><dd>{s.hours}</dd></div>
          </dl>
          {s.mapUrl && <div className="cta-row"><a className="btn btn-line" href={s.mapUrl} rel="noopener" target="_blank">Otwórz w Mapach Google</a></div>}
        </div>
        <div>
          <h2 className="h3">Jak dojechać</h2>
          <div className="prose" style={{ whiteSpace: 'pre-line' }}>{s.directions}</div>
        </div>
      </div></div>
    )
  }

  notFound()
}

const INTRO: Record<string, string> = {
  all: 'Tratwy, kajaki, noclegi, rowery i regionalna kuchnia w jednym miejscu, 700 metrów od rzeki. Każdą pozycję można zarezerwować z tej strony.',
  tratwy: 'Tratwa biebrzańska to płynący dom: pokład, namiot na górze, grill i prycze. Od dwugodzinnego rejsu po tydzień w najdzikszej części Biebrzy.',
  kajaki: 'Kajaki dwu- i trzyosobowe, jedynki, canoe i łódź wiosłowa. Biebrza od Sztabina do Dębowa, Netta i Kanał Augustowski. Transport sprzętu na start i z mety.',
  noclegi: 'Pokoje z łazienkami w ośrodku i domku, szałasy na palach nad rzeką, pole namiotowe z prywatną linią brzegową, kemping i nocleg na przycumowanej tratwie.',
  rowery: 'Rowery Lazaro Expedition, trasy szlakami Biebrzańskiego Parku Narodowego, wycieczki piesze na Czerwone Bagno. Rekomendacja Miejsca Przyjaznego Rowerzystom Green Velo.',
  wyzywienie: 'Śniadania i obiadokolacje z miejscowych produktów, swojskie wyroby mięsne, sękacz pieczony nad ogniem, kosz wyrobów regionalnych na wynos.',
}
