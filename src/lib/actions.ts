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
  if (name.length > 120 || phone.length > 40 || email.length > 160 || message.length > 3000) return { ok: false, message: 'Któreś pole jest za długie.' }
  if (!(/^\+?[\d\s()-]{7,20}$/.test(phone) && phone.replace(/\D/g, '').length >= 7)) return { ok: false, message: 'Sprawdź numer telefonu.' }
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, message: 'Sprawdź adres e-mail.' }
  if (persons && (persons < 1 || persons > 90)) return { ok: false, message: 'Liczba osób: od 1 do 90.' }
  if (dateFrom && dateTo && dateTo < dateFrom) return { ok: false, message: 'Data „do” jest wcześniejsza niż „od”.' }
  const h = await headers()
  const payload = await db()
  try {
    await payload.create({
      collection: 'reservations',
      data: { name, phone, email: email || undefined, offer, dateFrom, dateTo, persons, message, source: h.get('host') || undefined },
    })
  } catch {
    return { ok: false, message: 'Nie udało się zapisać zgłoszenia. Zadzwoń: 603 225 100.' }
  }
  return { ok: true, message: 'Zgłoszenie trafiło do recepcji. Oddzwonimy, żeby potwierdzić termin.' }
}
