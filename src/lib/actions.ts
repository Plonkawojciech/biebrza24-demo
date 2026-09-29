'use server'
import { headers } from 'next/headers'
import { db } from './data'

export type FormState = { ok: boolean; message: string }

export async function createReservation(_prev: FormState, form: FormData): Promise<FormState> {
  const name = String(form.get('name') || '').trim()
  const phone = String(form.get('phone') || '').trim()
  const email = String(form.get('email') || '').trim()
  const offer = Number(form.get('offer')) || undefined
  const dateFrom = String(form.get('dateFrom') || '') || undefined
  const dateTo = String(form.get('dateTo') || '') || undefined
  const persons = Number(form.get('persons')) || undefined
  const message = String(form.get('message') || '').trim()
  if (!name || !phone) return { ok: false, message: 'Podaj imię i nazwisko oraz numer telefonu.' }
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, message: 'Sprawdź adres e-mail.' }
  const h = await headers()
  const payload = await db()
  await payload.create({
    collection: 'reservations',
    data: { name, phone, email: email || undefined, offer, dateFrom, dateTo, persons, message, source: h.get('host') || undefined },
  })
  return { ok: true, message: 'Zgłoszenie trafiło do recepcji. Oddzwonimy, żeby potwierdzić termin.' }
}
