import type { CollectionConfig } from 'payload'

export const Reservations: CollectionConfig = {
  slug: 'reservations',
  labels: { singular: 'Rezerwacja', plural: 'Rezerwacje' },
  admin: {
    useAsTitle: 'name',
    group: 'Recepcja',
    defaultColumns: ['name', 'offerName', 'dateFrom', 'dateTo', 'persons', 'phone', 'status', 'createdAt'],
    description: 'Każdy formularz ze strony ląduje tutaj. Status zmienia recepcja.',
  },
  access: { create: () => true },
  fields: [
    { name: 'offer', label: 'Pozycja oferty', type: 'relationship', relationTo: 'offers' },
    { name: 'offerName', label: 'Oferta', type: 'text', virtual: 'offer.name', admin: { hidden: true } },
    { name: 'name', label: 'Imię i nazwisko', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'phone', label: 'Telefon', type: 'text', required: true },
        { name: 'email', label: 'E-mail', type: 'email' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'dateFrom', label: 'Od', type: 'date', admin: { width: '33%', date: { displayFormat: 'd MMM yyyy' } } },
        { name: 'dateTo', label: 'Do', type: 'date', admin: { width: '33%', date: { displayFormat: 'd MMM yyyy' } } },
        { name: 'persons', label: 'Liczba osób', type: 'number', admin: { width: '33%' } },
      ],
    },
    { name: 'message', label: 'Wiadomość', type: 'textarea' },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Nowa', value: 'new' },
        { label: 'Oddzwoniono', value: 'contacted' },
        { label: 'Potwierdzona', value: 'confirmed' },
        { label: 'Anulowana', value: 'cancelled' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'source', label: 'Domena, z której przyszło zgłoszenie', type: 'text', admin: { position: 'sidebar', readOnly: true } },
  ],
}
