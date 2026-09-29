# Demo Biebrza24 — plan (2026-09-29)

Klient: Kajaki / Wypożyczalnia Biebrza24, Jadwiga Siebiedzińska, Sztabin (ul. Polna 50), tel. 603 225 100, biuro@biebrza24.pl.
Notatka z rozmowy (29.09): pięć domen (biebrza24.pl, tratwy.pl, biebrza-kajaki.pl, biebrza-turystyka.pl,
turystyka-biebrza.pl) + panel CMS i „cały system do tego wszystkiego”. Demo do końca tygodnia.

## Co pokazuje demo
- Jedna strona i jeden panel dla pięciu domen: każda domena to dziś osobna, stara Joomla/WordPress
  (biebrza24.pl ma wstrzyknięte linki do kasyn w treści — argument o bezpieczeństwie).
- Oferta w CMS: tratwy, kajaki i canoe, noclegi, rowery, wyżywienie — każda pozycja z ceną z cennika 01/02/2026.
- Cennik z panelu (jedna tabela zamiast pięciu kopii na pięciu stronach).
- Rezerwacja online: formularz trafia do panelu (kolekcja Rezerwacje) ze statusem i terminami.
- Kontakt i dojazd.

## Decyzje projektowe
- Bohater: tratwa biebrzańska — to jedyna taka oferta w Polsce, więc otwiera stronę.
- Paleta z rzeki i turzycowisk, nie z szablonu: mokradło #14302A, turzyca #E7EDE2 (tło), brzoza #FBFBF8,
  sitowie (akcent) #B9891F, woda #2C6F7A, mgła #6C7F78.
- Kroje: Bricolage Grotesque (nagłówki, szeroki i ciepły), Source Sans 3 (tekst).
- Ceny w tabeli jak na tablicy w recepcji: duże liczby, jednostki obok, bez ikon.
- Zdjęcia: wyłącznie z biebrza24.pl (hotlink), sprawdzone curl 200.
- Zero emoji, zero zmyślonych liczb; „od 1999 roku” i wszystkie ceny pochodzą ze strony klienta.

## Zakres techniczny
Next.js 16 + Payload 3 (SQLite), kolekcje: Oferty, Cennik, Rezerwacje, Media, Użytkownicy; global Ustawienia.
Strony: /, /oferta (filtr po typie), /oferta/[slug], /cennik, /kontakt. Panel: /admin (demo@biebrza24.pl / biebrza2026).
