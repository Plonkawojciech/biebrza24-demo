import type { CollectionConfig } from 'payload'

export const OFFER_TYPES = [
  { label: 'Tratwy biebrzańskie', value: 'tratwy' },
  { label: 'Kajaki i canoe', value: 'kajaki' },
  { label: 'Noclegi', value: 'noclegi' },
  { label: 'Rowery i wycieczki', value: 'rowery' },
  { label: 'Kuchnia regionalna', value: 'wyzywienie' },
] as const

export const Offers: CollectionConfig = {
  slug: 'offers',
  labels: { singular: 'Pozycja oferty', plural: 'Oferta' },
  admin: {
    useAsTitle: 'name',
    group: 'Treści',
    defaultColumns: ['name', 'type', 'price', 'unit', 'featured', 'order'],
    description: 'Jedna pozycja = jedna karta na stronie. Ta sama treść pokazuje się na wszystkich domenach.',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', label: 'Nazwa', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'slug', label: 'Adres (slug)', type: 'text', required: true, unique: true, admin: { width: '50%', description: 'Np. weekend-na-tratwie → /oferta/weekend-na-tratwie' } },
        { name: 'type', label: 'Dział', type: 'select', required: true, options: [...OFFER_TYPES], admin: { width: '50%' } },
      ],
    },
    { name: 'lead', label: 'Zajawka (1–2 zdania)', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'price', label: 'Cena (zł)', type: 'number', admin: { width: '20%', description: 'Puste = „zapytaj”' } },
        { name: 'priceMax', label: 'Do (zł)', type: 'number', admin: { width: '15%', description: 'Widełki' } },
        { name: 'unit', label: 'Jednostka', type: 'text', admin: { width: '20%', description: 'np. /dzień, /os./doba' } },
        { name: 'priceNote', label: 'Dopisek do ceny', type: 'text', admin: { width: '45%', description: 'np. „pierwszy dzień z transportem 500 zł”' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'capacity', label: 'Liczba osób', type: 'text', admin: { width: '33%', description: 'np. „do 6 osób”' } },
        { name: 'duration', label: 'Czas', type: 'text', admin: { width: '33%', description: 'np. „3 dni”, „2 godziny”' } },
        { name: 'season', label: 'Sezon', type: 'text', admin: { width: '33%', description: 'np. „maj – wrzesień”' } },
      ],
    },
    { name: 'imageUrl', label: 'Zdjęcie (adres URL)', type: 'text', admin: { description: 'W demie zdjęcia pochodzą z biebrza24.pl. Po wdrożeniu — z pola „Zdjęcie” poniżej.' } },
    { name: 'image', label: 'Zdjęcie (plik)', type: 'upload', relationTo: 'media' },
    {
      name: 'sections',
      label: 'Opis',
      type: 'array',
      labels: { singular: 'Akapit', plural: 'Akapity' },
      fields: [
        { name: 'title', label: 'Nagłówek', type: 'text', required: true },
        { name: 'body', label: 'Treść', type: 'textarea', required: true },
      ],
    },
    { name: 'includes', label: 'W cenie', type: 'array', labels: { singular: 'Pozycja', plural: 'Pozycje' }, fields: [{ name: 'text', label: 'Treść', type: 'text', required: true }] },
    { name: 'featured', label: 'Pokaż na stronie głównej', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'bookable', label: 'Można rezerwować online', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'order', label: 'Kolejność', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
