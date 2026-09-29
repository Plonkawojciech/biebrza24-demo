/* Seed demo Biebrza24 — treści i ceny pochodzą z biebrza24.pl (cennik 01/02/2026), tratwy.pl i biebrza-kajaki.pl.
   Zdjęcia: hotlink z biebrza24.pl. Zakres celowo mały: to demo, nie migracja. */
import { getPayload } from 'payload'
import config from '../src/payload.config'

const U = 'https://www.biebrza24.pl/wp-content/uploads/'

async function main() {
  const payload = await getPayload({ config })
  const existing = await payload.count({ collection: 'offers' })
  if (existing.totalDocs > 0 && !process.argv.includes('--force')) {
    console.log('[seed] dane już są, pomijam')
    process.exit(0)
  }

  if ((await payload.count({ collection: 'users' })).totalDocs === 0) {
    await payload.create({ collection: 'users', data: { email: 'demo@biebrza24.pl', password: 'biebrza2026', name: 'Recepcja Biebrza24' } })
    console.log('[seed] konto demo@biebrza24.pl / biebrza2026')
  }

  const offers: any[] = [
    {
      name: 'Weekend na tratwie', slug: 'weekend-na-tratwie', type: 'tratwy', featured: true, order: 1,
      lead: 'Trzy dni na tratwie wyprawowej w Górnym Basenie Biebrzy. Namiot na górnym pokładzie, grill na dolnym, nocleg na kotwicy w szuwarach.',
      price: 300, unit: '/dzień', priceNote: 'Pierwszy dzień wypożyczenia z transportem 500 zł, każdy kolejny 300 zł. Tratwa dla maksymalnie 6 osób.',
      capacity: 'do 6 osób', duration: '3 dni', season: 'maj – październik',
      imageUrl: U + '2017/03/17-tratwa-splywy-tratwy-biebrza24-sztabin.jpg',
      sections: [
        { title: 'Jak wygląda spływ', body: 'Tratwa ma około 6 metrów długości i 3 szerokości. Na dolnym pokładzie jest miejsce na stół, grill i sprzęt, na górnym rozbija się namiot. Płynie się z nurtem, kilka kilometrów dziennie, z postojami na kąpiel, wędkowanie i obserwację ptaków. Nie trzeba żadnego doświadczenia — przed wypłynięciem pokazujemy, jak sterować i cumować.' },
        { title: 'Skąd i dokąd', body: 'Tratwy wodujemy w miejscach uzgodnionych przy rezerwacji, najczęściej w okolicy Sztabina, a odbieramy w Dębowie albo Jagłowie. Transport tratwy na miejsce wodowania jest doliczany do pierwszego dnia.' },
        { title: 'Co zabrać', body: 'Śpiwory, ubranie na deszcz, latarki, jedzenie na trzy dni (można zamówić u nas kosz wyrobów regionalnych). Kamizelki, wiosła, grill i podstawowe wyposażenie tratwy są w cenie.' },
      ],
      includes: ['Tratwa wyprawowa z wyposażeniem', 'Kamizelki asekuracyjne dla załogi', 'Instruktaż przed wypłynięciem', 'Odbiór tratwy na mecie'],
    },
    {
      name: 'Spływ chatą na tratwie', slug: 'splyw-chata-na-tratwie', type: 'tratwy', order: 2,
      lead: 'Cztery dni na rzece. Wersja dla tych, którzy chcą zobaczyć więcej zakoli i przespać się w najdzikszej części Basenu Górnego.',
      price: 300, unit: '/dzień', priceNote: 'Pierwszy dzień z transportem 500 zł, każdy kolejny 300 zł.', capacity: 'do 6 osób', duration: '4 dni', season: 'maj – październik',
      imageUrl: U + '2017/03/58-tratwa-splywy-tratwy-biebrza24-sztabin.jpg',
      sections: [{ title: 'Dla kogo', body: 'Dla grup znajomych, rodzin z dziećmi od kilku lat i firm, które chcą się wyłączyć na cztery dni. Bez zasięgu na sporych odcinkach, za to z bielikiem nad głową.' }],
      includes: ['Tratwa wyprawowa z wyposażeniem', 'Kamizelki asekuracyjne', 'Instruktaż', 'Odbiór na mecie'],
    },
    {
      name: 'Tydzień na tratwie', slug: 'tydzien-na-tratwie', type: 'tratwy', order: 3,
      lead: 'Siedem dni tratwą biebrzańską przez Basen Górny. Najdłuższy z naszych spływów i najbliżej natury, jak się da.',
      price: 300, unit: '/dzień', priceNote: 'Pierwszy dzień z transportem 500 zł, każdy kolejny 300 zł.', capacity: 'do 6 osób', duration: '7 dni', season: 'maj – wrzesień',
      imageUrl: U + '2017/02/budowa-tratwy-biebrza24-14.jpg',
      sections: [{ title: 'Trasa', body: 'Od Kamiennej Nowej przez Sztabin do Dębowa. Codziennie inny odcinek, co wieczór inne miejsce na kotwicy. W środku tygodnia można dopłynąć do bazy po zakupy i prysznic.' }],
      includes: ['Tratwa wyprawowa z wyposażeniem', 'Kamizelki asekuracyjne', 'Instruktaż', 'Odbiór na mecie'],
    },
    {
      name: 'Piknik na tratwie', slug: 'piknik-na-tratwie', type: 'tratwy', featured: true, order: 4,
      lead: 'Jeden dzień na tratwie biesiadnej: grill, stół na pokładzie i spokojny nurt. Dobre na urodziny, integrację firmową i wypad ze znajomymi.',
      price: 400, priceMax: 500, unit: '/dzień', priceNote: 'Od 400 do 500 zł za tratwę w zależności od odcinka. 6 osób w cenie, każda kolejna 80 zł. Grupy powyżej 6 osób: 70–90 zł od osoby.',
      capacity: '6–10 osób', duration: '1 dzień', season: 'maj – październik',
      imageUrl: U + '2020/05/tratwa-biesiadna-biebrza-5.jpg',
      sections: [{ title: 'Jak to działa', body: 'Rano wodujemy tratwę, wy przynosicie jedzenie albo zamawiacie u nas wyroby regionalne i sękacz. Płyniecie kilka godzin z przerwą na kąpiel. Odbieramy tratwę w umówionym miejscu po południu.' }],
      includes: ['Tratwa biesiadna z grillem i stołem', 'Kamizelki', 'Instruktaż', 'Odbiór tratwy'],
    },
    {
      name: 'Dwugodzinny spływ tratwą', slug: 'dwugodzinny-splyw-tratwa', type: 'tratwy', order: 5,
      lead: 'Przedsmak tratwy dla tych, którzy mają tylko popołudnie. Krótki odcinek przy Sztabinie, bez transportu.',
      capacity: 'do 6 osób', duration: '2 godziny', season: 'maj – październik',
      imageUrl: U + '2020/05/tratwa-biesiadna-biebrza-1.jpg',
      sections: [{ title: 'Kiedy', body: 'W miarę dostępności tratw w danym dniu. Najlepiej zadzwonić rano albo dzień wcześniej.' }],
    },
    {
      name: 'Spływ kajakowy Sztabin – Dębowo', slug: 'splyw-kajakowy-sztabin-debowo', type: 'kajaki', featured: true, order: 10,
      lead: '18 kilometrów Biebrzą przez Basen Górny, sześć do ośmiu godzin spokojnego wiosłowania. Najczęściej wybierany jednodniowy odcinek.',
      price: 50, unit: '/kajak/dzień', priceNote: 'Kajaki dwuosobowe Roteko Eoli, Caribou Adventure, Finder Active Duo II i Luna po 50 zł, trzyosobowy Family 64 po 70 zł, jedynka Fun 40 zł.',
      capacity: '1–3 osoby w kajaku', duration: '6–8 godzin', season: 'kwiecień – październik',
      imageUrl: U + '2017/07/03-Splywy-kajaki-polietylenowe-biebrza-wypozyczalnia-biebrza24.jpg',
      sections: [
        { title: 'Trasa', body: 'Start pod ośrodkiem w Sztabinie, meta w Dębowie przy śluzie. Rzeka płynie leniwie, meandruje między turzycowiskami, po drodze mijacie Jagłowo i ujście Netty. Można też płynąć z Sosnowa Nettą i Kanałem Augustowskim (18,5 km, około 6 godzin).' },
        { title: 'Sprzęt', body: 'Polietylenowe kajaki turystyczne z regulowanymi fotelami, wiosła, kamizelki, siedziska i gąbki. Do dwójki dokładamy trzeci fotel dla dziecka.' },
      ],
      includes: ['Kajak z wiosłami i kamizelkami', 'Transport kajaków na start i z mety', 'Mapa odcinka i instruktaż'],
    },
    {
      name: 'Weekend w kajaku Kamienna Nowa – Dębowo', slug: 'weekend-w-kajaku', type: 'kajaki', order: 11,
      lead: 'Około 35 kilometrów w dwa dni, z noclegiem na polu namiotowym albo w pokoju z wyżywieniem.',
      price: 50, unit: '/kajak/dzień', priceNote: 'Nocleg według cennika: pole namiotowe 25 zł/os., pokój dwuosobowy 200 zł/doba.',
      capacity: 'grupy 2–8 osób', duration: '2 dni', season: 'maj – wrzesień',
      imageUrl: U + '2019/04/nasz-sprzet-biebrza-kajaki-01.jpg',
      sections: [{ title: 'Program', body: 'Dzień pierwszy: Kamienna Nowa – Sztabin, nocleg w bazie. Dzień drugi: Sztabin – Dębowo. Wyżywienie we własnym zakresie albo z naszej kuchni.' }],
      includes: ['Kajaki, wiosła, kamizelki', 'Transport na start i z mety'],
    },
    {
      name: 'Canoe Apacz i łódź wiosłowa', slug: 'canoe-i-lodz', type: 'kajaki', order: 12,
      lead: 'Trzyosobowe canoe na spokojną wodę i sześcioosobowa łódź wiosłowa DarMar 370 Fish na wędkowanie z rodziną.',
      price: 50, unit: '/dzień', priceNote: 'Canoe Apacz 50 zł/dzień, łódź wiosłowa 100 zł/dzień.', capacity: '3 lub 6 osób', duration: 'na dni',
      imageUrl: U + '2017/02/01-camping-pole-biebrza24-biebrzanski-sztabin-podlasie-augustow.jpg',
      sections: [{ title: 'Wędkowanie', body: 'Sprzedajemy licencje wędkarskie Biebrzańskiego Parku Narodowego. Łódź można wypożyczyć na pół dnia rano, zanim ruszy ruch na rzece.' }],
    },
    {
      name: 'Pokoje w ośrodku i domku', slug: 'pokoje', type: 'noclegi', featured: true, order: 20,
      lead: 'Pokoje dwu-, trzy- i czteroosobowe z łazienkami, na poddaszu ośrodka i w osobnym domku z zadaszonymi tarasami. Wi-Fi i parking w cenie.',
      price: 200, unit: '/doba', priceNote: 'Pokój 1-os. 120 zł, 2-os. 200 zł, 3-os. 240 zł, 4-os. 320 zł za dobę. Doba od 14:00 do 11:00.',
      capacity: '1–4 osoby', season: 'cały rok',
      imageUrl: U + '2020/02/Biebrza24-noclegi-biebrza-sztabin.jpg',
      sections: [
        { title: 'Ośrodek', body: 'Przestronne pokoje na poddaszu z niezależnym wejściem, łazienką i bezpłatnym Wi-Fi. Na dole świetlica z kominkiem na około 90 osób i aneks kuchenny do dyspozycji gości.' },
        { title: 'Domek nad Biebrzą', body: 'Osobny budynek z pokojami 2-, 3- i 4-osobowymi, każdy z własnym wejściem i łazienką. Zadaszone tarasy z ławkami na deszczowe wieczory.' },
      ],
      includes: ['Pościel i ręczniki', 'Wi-Fi', 'Parking', 'Aneks kuchenny'],
    },
    {
      name: 'Szałasy na palach nad Biebrzą', slug: 'szalasy-na-palach', type: 'noclegi', featured: true, order: 21,
      lead: 'Drewniane szałasy nad samą rzeką, na polu namiotowym z prywatną linią brzegową. Najbardziej fotografowany nocleg w bazie.',
      price: 30, unit: '/os./doba', capacity: '2–4 osoby', season: 'maj – wrzesień',
      imageUrl: U + '2020/05/Sza%C5%82asy-na-palach-nad-Biebrz%C4%85.jpg',
      sections: [{ title: 'Na miejscu', body: 'Sanitariaty, miejsce na ognisko, boisko do siatkówki, przyłącze elektryczne za dopłatą. Sklep w Sztabinie 700 metrów dalej.' }],
      includes: ['Miejsce w szałasie', 'Dostęp do sanitariatów', 'Miejsce na ognisko'],
    },
    {
      name: 'Pole namiotowe i kemping', slug: 'pole-namiotowe', type: 'noclegi', order: 22,
      lead: 'Namiot, przyczepa albo kamper nad rzeką. Ciepła woda, prąd za dopłatą, sauna 100 metrów dalej.',
      price: 25, unit: '/os./doba', priceNote: 'Przyczepa lub kamper 25 zł/doba, przyłącze elektryczne 20 zł/doba.', season: 'maj – wrzesień',
      imageUrl: U + '2017/02/27-noclegi-pole-namiotowe-biebrza24-szalasy.jpg',
      sections: [{ title: 'Dla kogo', body: 'Dla kajakarzy kończących odcinek w Sztabinie, rowerzystów z Green Velo i rodzin, które chcą być blisko wody.' }],
    },
    {
      name: 'Nocleg na przycumowanej tratwie', slug: 'nocleg-na-tratwie', type: 'noclegi', order: 23,
      lead: 'Sam nocleg na tratwie bez spływu, przy brzegu w bazie. W miarę dostępności tratw, tylko z wcześniejszą rezerwacją.',
      price: 30, unit: '/os./doba', capacity: 'do 6 osób', season: 'maj – wrzesień',
      imageUrl: U + '2017/02/01-osrodek-wypoczynkowy-biebrza24-nocleg.jpg',
    },
    {
      name: 'Rowery Lazaro Expedition', slug: 'rowery', type: 'rowery', featured: true, order: 30,
      lead: 'Rowery turystyczne na szlaki Biebrzańskiego Parku Narodowego i Green Velo. Pokażemy trasy na Czerwone Bagno i do Twierdzy Osowiec.',
      price: 50, unit: '/dzień', season: 'kwiecień – październik',
      imageUrl: U + '2017/02/07-wycieczka-rajd-rowery-szlakami-biebrzanskimi-sciezki-bociani.jpg',
      sections: [{ title: 'Trasy', body: 'Pętla przez Jagłowo i Dolistowo, wypad do carskich umocnień w Osowcu, bunkry Linii Mołotowa. Mapy i opisy dostajecie w recepcji, która jest też Punktem Informacji Turystycznej.' }],
    },
    {
      name: 'Wycieczki piesze z przewodnikiem', slug: 'wycieczki-piesze', type: 'rowery', order: 31,
      lead: 'Czerwone Bagno, Wigierski Park Narodowy, Puszcza Augustowska. Wyjścia z przewodnikiem po rezerwatach, także dla zielonych szkół.',
      season: 'cały rok',
      imageUrl: U + '2017/02/04-wycieczki-piesze-szlaki-biebrzanski-czerwone-bagno-biebrza24.jpg',
      sections: [{ title: 'Grupy', body: 'Obsługujemy grupy szkolne i firmowe. Sprzedajemy bilety wstępu na szlaki BbPN i zezwolenia na spływy.' }],
    },
    {
      name: 'Kuchnia regionalna i sękacz', slug: 'kuchnia-regionalna', type: 'wyzywienie', order: 40,
      lead: 'Śniadania i obiadokolacje z miejscowych produktów, swojska kiełbasa, smalec, chleb na zakwasie i pokaz wypieku sękacza nad ogniem.',
      price: 40, unit: '/os. śniadanie', priceNote: 'Śniadanie 40 zł, obiad lub obiadokolacja 60 zł od osoby (zupa, drugie danie, napój). Kosz wyrobów regionalnych na zamówienie.', season: 'cały rok',
      imageUrl: U + '2017/02/19-wyzywienie-jedzenie-biebrza24-sztabin-regionalne.jpg',
      sections: [{ title: 'Na tratwę i na wynos', body: 'Pakiety piknikowe na spływ, sękacz, wyroby mięsne i napoje ekologiczne. Wyjeżdżając, goście zabierają smaki Podlasia w koszu.' }],
      bookable: false,
    },
  ]
  for (const o of offers) {
    await payload.create({ collection: 'offers', data: { ...o, sections: o.sections, includes: (o.includes || []).map((text: string) => ({ text })) } })
  }
  console.log('[seed] oferta:', offers.length)

  const prices: any[] = [
    ['noclegi', 'Pokój 1-osobowy', 120, null, '/doba'], ['noclegi', 'Pokój 2-osobowy', 200, null, '/doba'], ['noclegi', 'Pokój 3-osobowy', 240, null, '/doba'], ['noclegi', 'Pokój 4-osobowy', 320, null, '/doba'],
    ['noclegi', 'Pobyt zwierzęcia', 30, null, '/doba', 'Wymaga wcześniejszego uzgodnienia; tylko w niektórych pokojach.'], ['noclegi', 'Łóżeczko turystyczne dla niemowląt', 30, null, '/doba'],
    ['wyzywienie', 'Śniadanie', 40, null, '/os.'], ['wyzywienie', 'Obiad / obiadokolacja', 60, null, '/os.', 'Zupa, drugie danie i napój.'],
    ['pole', 'Pobyt na polu namiotowym', 25, null, '/os./doba'], ['pole', 'Nocleg w szałasie na palach', 30, null, '/os./doba'], ['pole', 'Nocleg na przycumowanej tratwie', 30, null, '/os./doba', 'Bez spływu, w miarę dostępności tratw, wymagana rezerwacja.'],
    ['pole', 'Przyczepa kempingowa / kamper', 25, null, '/doba'], ['pole', 'Przyłącze elektryczne', 20, null, '/doba'],
    ['sauna', 'Sauna nad Biebrzą (ruska bania)', 200, null, '/seans', 'Seans 1,5 godziny, do 10 osób.'],
    ['tratwy', 'Tratwa wyprawowa (do 6 os.)', 300, null, '/dzień', 'Pierwszy dzień wypożyczenia z transportem 500 zł, każdy kolejny 300 zł.'],
    ['tratwy', 'Tratwa biesiadna – piknikowa', 400, 500, '/dzień', '6 osób w cenie; spływy grupowe powyżej 6 osób 70–90 zł od osoby zależnie od odcinka.'],
    ['tratwy', 'Transport tratwy', 200, null, '', 'Doliczany do pierwszego dnia wypożyczenia.'],
    ['kajaki', 'Kajak 2-osobowy (Roteko Eoli, Caribou, Finder, Luna)', 50, null, '/dzień'], ['kajaki', 'Kajak 3-osobowy Family 64', 70, null, '/dzień'], ['kajaki', 'Kajak 1-osobowy Fun', 40, null, '/dzień'],
    ['kajaki', 'Canoe Apacz (3 os.)', 50, null, '/dzień'], ['kajaki', 'Łódź wiosłowa (6 os.)', 100, null, '/dzień'],
    ['rowery', 'Rower', 50, null, '/dzień'],
  ]
  let i = 0
  for (const [group, name, price, priceMax, unit, note] of prices) {
    await payload.create({ collection: 'prices', data: { group, name, price, priceMax, unit, note, order: i++ } })
  }
  console.log('[seed] cennik:', prices.length)

  await payload.updateGlobal({ slug: 'settings', data: {
    banner: 'Tratwy i kajaki pływają do końca października. Cennik aktualny od 1 lutego 2026.',
    heroTitle: 'Tratwą, kajakiem albo rowerem przez Biebrzański Park Narodowy',
    heroText: 'Rodzinna baza turystyczna w Sztabinie, nad najdzikszym odcinkiem Biebrzy. Spływy tratwami i kajakami, noclegi nad rzeką, regionalna kuchnia i punkt informacji turystycznej. Od 1999 roku.',
    heroImageUrl: U + '2017/03/17-tratwa-splywy-tratwy-biebrza24-sztabin.jpg',
    about: 'Rodzinna baza turystyczna w Górnym Basenie Biebrzańskiego Parku Narodowego: wypożyczalnia tratw, kajaków i rowerów, noclegi, kuchnia regionalna i Skategoryzowany Punkt Informacji Turystycznej.',
    phone: '603 225 100', phone2: '87 641 21 79', email: 'biuro@biebrza24.pl',
    address: 'Biebrza24\nul. Polna 50\n16-310 Sztabin', hours: 'Codziennie 8:00–20:00',
    directions: 'Od Augustowa: droga krajowa nr 8 (E67) w stronę Białegostoku. Po 25 km wjeżdżasz do Sztabina. Druga ulica w lewo to Polna (przy Delikatesach Groszek). Po 700 m po prawej stronie ośrodek — ostatnie zabudowania na ulicy.\n\nOd Białegostoku: droga krajowa nr 8 (E67) w stronę Augustowa. Po około 64 km przejeżdżasz most na Biebrzy i po kilometrze wjeżdżasz do Sztabina. Druga ulica w prawo to Polna.\n\nW razie pytań: 603 225 100.',
    mapUrl: 'https://goo.gl/maps/qu6NE6KYRzBK5h95A',
    domains: [
      { host: 'biebrza24.pl', note: 'dziś WordPress z obcymi linkami w treści' },
      { host: 'tratwy.pl', note: 'dziś Joomla, osobny cennik' },
      { host: 'biebrza-kajaki.pl', note: 'dziś Joomla z 2015 roku' },
      { host: 'biebrza-turystyka.pl', note: 'przekierowanie' },
      { host: 'turystyka-biebrza.pl', note: 'przekierowanie' },
    ],
    facebook: 'https://www.facebook.com/biebrza24', youtube: 'https://www.youtube.com/channel/UC1o8LZfKcWCq8EX4nH2zQSg',
  } })
  console.log('[seed] gotowe')
  process.exit(0)
}
main().catch((e) => { console.error(e); process.exit(1) })
