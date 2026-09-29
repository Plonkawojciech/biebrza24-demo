import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Ustawienia strony',
  admin: { group: 'Treści' },
  access: { read: () => true },
  fields: [
    { name: 'banner', label: 'Pasek na górze strony', type: 'text', admin: { description: 'Np. „Sezon tratw trwa do końca października”' } },
    { name: 'heroTitle', label: 'Nagłówek strony głównej', type: 'text' },
    { name: 'heroText', label: 'Tekst pod nagłówkiem', type: 'textarea' },
    { name: 'heroImageUrl', label: 'Zdjęcie w tle (URL)', type: 'text' },
    { name: 'heroImage', label: 'Zdjęcie w tle (plik)', type: 'upload', relationTo: 'media' },
    { name: 'about', label: 'O ośrodku (2–3 zdania)', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'phone', label: 'Telefon komórkowy', type: 'text' },
        { name: 'phone2', label: 'Telefon stacjonarny', type: 'text' },
        { name: 'email', label: 'E-mail', type: 'email' },
      ],
    },
    { name: 'address', label: 'Adres', type: 'textarea' },
    { name: 'hours', label: 'Godziny recepcji', type: 'text' },
    { name: 'directions', label: 'Dojazd', type: 'textarea' },
    { name: 'mapUrl', label: 'Link do mapy Google', type: 'text' },
    {
      name: 'domains',
      label: 'Domeny prowadzące na tę stronę',
      type: 'array',
      labels: { singular: 'Domena', plural: 'Domeny' },
      fields: [
        { type: 'row', fields: [
          { name: 'host', label: 'Domena', type: 'text', required: true },
          { name: 'note', label: 'Co dziś tam jest', type: 'text' },
        ] },
      ],
    },
    { type: 'row', fields: [
      { name: 'facebook', label: 'Facebook (URL)', type: 'text' },
      { name: 'youtube', label: 'YouTube (URL)', type: 'text' },
      { name: 'instagram', label: 'Instagram (URL)', type: 'text' },
    ] },
  ],
}
