import { getPayload } from 'payload'
import config from '@payload-config'

export const db = () => getPayload({ config })

export type Img = { url?: string | null; alt?: string | null; sizes?: { thumb?: { url?: string | null }; card?: { url?: string | null } } } | number | null | undefined

export const imgUrl = (m: Img, size: 'thumb' | 'card' | 'full' = 'card') => {
  if (!m || typeof m === 'number') return ''
  if (size === 'full') return m.url || ''
  return m.sizes?.[size]?.url || m.url || ''
}

/** Zdjęcie pozycji: plik z panelu ma pierwszeństwo, w demie zwykle adres z biebrza24.pl. */
export const pic = (doc: { image?: Img; imageUrl?: string | null }, size: 'thumb' | 'card' | 'full' = 'card') => imgUrl(doc.image, size) || doc.imageUrl || ''

export const zl = (n: number | null | undefined, digits = 0) =>
  typeof n === 'number' ? n.toLocaleString('pl-PL', { minimumFractionDigits: digits, maximumFractionDigits: digits }) + ' zł' : ''

export const dateLong = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

export const TYPE_LABEL: Record<string, string> = {
  tratwy: 'Tratwy biebrzańskie',
  kajaki: 'Kajaki i canoe',
  noclegi: 'Noclegi',
  rowery: 'Rowery i wycieczki',
  wyzywienie: 'Kuchnia regionalna',
}
export const TYPE_ORDER = ['tratwy', 'kajaki', 'noclegi', 'rowery', 'wyzywienie']
