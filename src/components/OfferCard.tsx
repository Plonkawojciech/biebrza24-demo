import Link from 'next/link'
import { pic, zl, TYPE_LABEL } from '@/lib/data'

export function OfferCard({ o }: { o: any }) {
  const img = pic(o)
  return (
    <Link href={`/oferta/${o.slug}`} className="card">
      <span className="card-ph">{img && <img src={img} alt="" loading="lazy" referrerPolicy="no-referrer" />}</span>
      <span className="card-body">
        <span className="card-type">{TYPE_LABEL[o.type]}</span>
        <span className="card-name">{o.name}</span>
        <span className="card-lead">{o.lead}</span>
        <span className="card-foot">
          <span className="card-price">{o.price ? <>{zl(o.price)}<small>{o.unit}</small></> : 'Zapytaj o cenę'}</span>
          {o.capacity && <span className="card-meta">{o.capacity}</span>}
        </span>
      </span>
    </Link>
  )
}
