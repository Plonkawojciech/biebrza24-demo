import type { CollectionConfig } from 'payload'

export const PRICE_GROUPS = [
  { label: 'Noclegi', value: 'noclegi' },
  { label: 'Wyżywienie', value: 'wyzywienie' },
  { label: 'Pole namiotowe', value: 'pole' },
  { label: 'Sauna', value: 'sauna' },
  { label: 'Tratwy', value: 'tratwy' },
  { label: 'Kajaki i łódki', value: 'kajaki' },
  { label: 'Rowery', value: 'rowery' },
] as const

export const Prices: CollectionConfig = {
  slug: 'prices',
  labels: { singular: 'Pozycja cennika', plural: 'Cennik' },
  admin: {
    useAsTitle: 'name',
    group: 'Treści',
    defaultColumns: ['name', 'group', 'price', 'unit', 'order'],
    description: 'Jeden cennik dla wszystkich domen. Zmiana tutaj pokazuje się od razu na stronie.',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', label: 'Nazwa', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'group', label: 'Grupa', type: 'select', required: true, options: [...PRICE_GROUPS], admin: { width: '40%' } },
        { name: 'price', label: 'Cena (zł)', type: 'number', admin: { width: '20%' } },
        { name: 'priceMax', label: 'Do (zł)', type: 'number', admin: { width: '20%', description: 'Dla widełek' } },
        { name: 'unit', label: 'Jednostka', type: 'text', admin: { width: '20%' } },
      ],
    },
    { name: 'note', label: 'Uwaga', type: 'textarea' },
    { name: 'order', label: 'Kolejność', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
