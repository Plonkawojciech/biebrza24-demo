# biebrza24-demo

Demo nowej strony i panelu dla Biebrza24 (wypożyczalnia tratw i kajaków, noclegi; Sztabin). Klient w CRM: „Kajaki”
(biebrza-kajaki.pl). Next.js 16 + Payload CMS 3 (SQLite) w jednej aplikacji: front i panel `/admin`.

- Dev: `pnpm dev` (port 3012). Seed: `pnpm seed` (pomija, gdy dane już są; `--force` dokłada).
- **Zakres celowo mały — to demo, nie migracja.** Strona główna, oferta (5 działów, karta pozycji z formularzem
  rezerwacji), cennik, rezerwacja, kontakt. Dane: 15 pozycji oferty, 23 pozycje cennika (cennik 01/02/2026).
- Argument sprzedażowy: pięć domen klienta (biebrza24.pl, tratwy.pl, biebrza-kajaki.pl, biebrza-turystyka.pl,
  turystyka-biebrza.pl) prowadzi dziś na trzy różne stare CMS-y; demo pokazuje jedną stronę i jeden panel dla wszystkich.
- Kolekcje: `src/collections/*` (Oferta, Cennik, Rezerwacje, Media, Użytkownicy) + global `Ustawienia strony`.
- Zdjęcia: hotlink z biebrza24.pl (pole `imageUrl`); po wdrożeniu pole `image` (upload) ma pierwszeństwo.
- Design: `docs/plan-demo.md`. System w `src/app/(site)/globals.css` (Bricolage Grotesque + Source Sans 3).
- Zmiana schematu: `pnpm exec payload migrate:create <nazwa>`, commit `src/migrations/`. `push: false`.
- Deploy: Coolify (projekt `biebrza24-demo`, Dockerfile), domena `biebrza24.programo.pl`, wolumen `/data`.
  `scripts/start.sh` robi migrate + seed + start.
- Panel demo: `demo@biebrza24.pl` / `biebrza2026`.
