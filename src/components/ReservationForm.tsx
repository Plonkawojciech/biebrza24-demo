'use client'
import { useActionState } from 'react'
import { createReservation, type FormState } from '@/lib/actions'

type Offer = { id: number; name: string }

export function ReservationForm({ offers, selected, compact }: { offers: Offer[]; selected?: number; compact?: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(createReservation, { ok: false, message: '' })
  if (state.ok) return <div className="done" role="status"><strong>Dziękujemy.</strong> {state.message}</div>
  return (
    <form action={action} className="form">
      {!compact && (
        <label>Czego dotyczy rezerwacja
          <select name="offer" defaultValue={selected || ''}>
            <option value="">Jeszcze nie wiem, proszę o kontakt</option>
            {offers.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
          </select>
        </label>
      )}
      {compact && selected && <input type="hidden" name="offer" value={selected} />}
      <div className="form-row">
        <label>Od<input name="dateFrom" type="date" /></label>
        <label>Do<input name="dateTo" type="date" /></label>
      </div>
      <div className="form-row">
        <label>Liczba osób<input name="persons" type="number" min={1} max={90} inputMode="numeric" /></label>
        <label>Telefon<input name="phone" type="tel" required autoComplete="tel" /></label>
      </div>
      <label>Imię i nazwisko<input name="name" required autoComplete="name" /></label>
      <label>E-mail<input name="email" type="email" autoComplete="email" /></label>
      <label>Wiadomość<textarea name="message" rows={3} placeholder="Skąd startujecie, czy potrzebny transport, dzieci w grupie" /></label>
      {state.message && !state.ok && <p className="form-err" role="alert">{state.message}</p>}
      <button className="btn btn-solid" disabled={pending}>{pending ? 'Wysyłanie…' : 'Wyślij zgłoszenie'}</button>
      <p className="note">Zgłoszenie trafia do panelu recepcji. Termin potwierdzamy telefonicznie, zaliczka dopiero po rozmowie.</p>
    </form>
  )
}
