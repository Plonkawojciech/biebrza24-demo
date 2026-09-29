import Link from 'next/link'
import { db, pic, zl, TYPE_LABEL } from '@/lib/data'
import { OfferCard } from '@/components/OfferCard'

export default async function Home() {
  const payload = await db()
  const [s, featured, prices] = await Promise.all([
    payload.findGlobal({ slug: 'settings' }),
    payload.find({ collection: 'offers', where: { featured: { equals: true } }, sort: 'order', limit: 6, depth: 1 }),
    payload.find({ collection: 'prices', where: { group: { in: ['tratwy', 'kajaki', 'noclegi'] } }, sort: 'order', limit: 8 }),
  ])
  const raft = featured.docs.find((o) => o.type === 'tratwy') || featured.docs[0]
  const rest = featured.docs.filter((o) => o.id !== raft?.id)
  const hero = pic({ image: s.heroImage, imageUrl: s.heroImageUrl }, 'full')
  return (
    <>
      <section className="hero">
        {hero && <img className="hero-img" src={hero} alt="" fetchPriority="high" referrerPolicy="no-referrer" />}
        <div className="wrap hero-in">
          <p className="hero-where">Sztabin · Górny Basen Biebrzy · od 1999 roku</p>
          <h1 className="display">{s.heroTitle}</h1>
          <p className="lead">{s.heroText}</p>
          <div className="cta-row">
            <Link className="btn btn-solid" href="/tratwy">Spływy tratwą</Link>
            <Link className="btn btn-line" href="/rezerwacja">Zarezerwuj termin</Link>
          </div>
        </div>
        <div className="hero-strip"><div className="wrap">
          <Link href="/tratwy"><b>Tratwy</b><span>2 godziny do 7 dni na rzece</span></Link>
          <Link href="/kajaki"><b>Kajaki i canoe</b><span>Biebrza i Kanał Augustowski</span></Link>
          <Link href="/noclegi"><b>Noclegi</b><span>pokoje, domek, szałasy, pole</span></Link>
          <Link href="/rowery"><b>Rowery i piesze</b><span>szlaki Biebrzańskiego PN</span></Link>
        </div></div>
      </section>

      {raft && (
        <section className="section"><div className="wrap feature">
          <div className="feature-media"><img src={pic(raft)} alt={raft.name} loading="lazy" referrerPolicy="no-referrer" /></div>
          <div className="feature-body">
            <p className="kicker">{TYPE_LABEL[raft.type]}</p>
            <h2 className="h2">Tratwa biebrzańska. Dom na wodzie, który płynie z nurtem.</h2>
            <p className="lead">{raft.lead}</p>
            <dl className="facts">
              {raft.capacity && <div><dt>Załoga</dt><dd>{raft.capacity}</dd></div>}
              {raft.duration && <div><dt>Czas</dt><dd>{raft.duration}</dd></div>}
              {raft.price && <div><dt>Cena</dt><dd>{zl(raft.price)}<small>{raft.unit}</small></dd></div>}
            </dl>
            <div className="cta-row"><Link className="btn btn-solid" href={`/oferta/${raft.slug}`}>Zobacz spływ</Link><Link className="btn btn-line" href="/tratwy">Wszystkie spływy tratwą</Link></div>
          </div>
        </div></section>
      )}

      <section className="section tint"><div className="wrap">
        <div className="sechead">
          <div><p className="kicker">Oferta</p><h2 className="h2">Jedno miejsce nad rzeką, kilka sposobów na dzień</h2></div>
          <Link className="textlink" href="/oferta">Cała oferta</Link>
        </div>
        <div className="cards">{rest.map((o) => <OfferCard key={o.id} o={o} />)}</div>
      </div></section>

      <section className="section"><div className="wrap split">
        <div>
          <p className="kicker">Cennik</p>
          <h2 className="h2">Ceny jak na tablicy w recepcji</h2>
          <p className="lead">Jeden cennik dla wszystkich adresów: biebrza24.pl, tratwy.pl, biebrza-kajaki.pl. Zmiana w panelu pokazuje się od razu wszędzie.</p>
          <div className="cta-row"><Link className="btn btn-line" href="/cennik">Pełny cennik</Link></div>
        </div>
        <table className="price">
          <tbody>
            {prices.docs.map((p) => (
              <tr key={p.id}><td>{p.name}</td><td className="num">{p.price ? zl(p.price) : 'zapytaj'}{p.priceMax ? ` – ${zl(p.priceMax)}` : ''}<small>{p.unit}</small></td></tr>
            ))}
          </tbody>
        </table>
      </div></section>

      <section className="section dark"><div className="wrap split">
        <div>
          <p className="kicker">Recepcja</p>
          <h2 className="h2">Zadzwoń albo zostaw zgłoszenie</h2>
          <p className="lead">Termin potwierdzamy telefonicznie. Pomagamy dobrać odcinek rzeki, transport i nocleg, tak żeby cały wyjazd zamknąć w jednej rozmowie.</p>
          <p className="big-tel"><a href={`tel:${(s.phone || '').replace(/[\s-]/g, '')}`}>{s.phone}</a></p>
          <p className="muted">{s.hours}</p>
        </div>
        <div className="cta-col">
          <Link className="btn btn-solid" href="/rezerwacja">Formularz rezerwacji</Link>
          <Link className="btn btn-line" href="/kontakt">Dojazd i kontakt</Link>
        </div>
      </div></section>
    </>
  )
}
