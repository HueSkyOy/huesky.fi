# huesky.fi

Staattinen sivusto: HTML + CSS, ei build-vaihetta, ei riippuvuuksia.

## Rakenne

- `index.html` – etusivu (FI), sisältää yhteydenottolomakkeen (Netlify Forms)
- `palvelut/<palvelu>/index.html` – palvelusivut (FI)
- `en/` – englanninkieliset sivut samalla rakenteella
- `css/style.css` – kaikki tyylit yhdessä tiedostossa
- `sitemap.xml`, `robots.txt`, `netlify.toml`

## Julkaisu

1. Luo GitHub-repo ja pushaa tämä kansio sen juureen.
2. Netlify: **Add new site → Import an existing project** → valitse repo.
   Build command: tyhjä. Publish directory: `.` (netlify.toml hoitaa tämän).
3. Netlify Forms: lomakkeet (`yhteydenotto`, `contact`) tunnistetaan
   automaattisesti ensimmäisessä deployssa. Kytke sähköposti-ilmoitus:
   Site → Forms → Notifications.
4. Domain: Site → Domain management → lisää huesky.fi ja osoita DNS Netlifyyn.
   HTTPS aktivoituu automaattisesti.
5. Julkaisun jälkeen: Google Search Console → lisää sivusto ja lähetä sitemap.

## Päivitykset

Muokkaa HTML:ää → commit → push → Netlify julkaisee automaattisesti (~30 s).

Muista päivittää molemmat kieliversiot (FI + EN), kun sisältö muuttuu.
Jos lisäät sivun, lisää se myös `sitemap.xml`-tiedostoon.

## Domain ja indeksointi (tehty 24.9.2026)

huesky.fi on kytketty ja se on Netlifyn primary domain; www.huesky.fi ohjautuu
siihen. Indeksointiesto on poistettu: robots.txt sallii indeksoinnin ja
netlify.tomlin X-Robots-Tag-rivi on poistettu. Canonical-tagit, hreflang,
og:url ja sitemap osoittavat osoitteeseen https://huesky.fi/ (ilman www).

Netlify Forms: form detection on kytketty paalle ja sahkoposti-ilmoitus menee
osoitteeseen ville.launiala@huesky.fi. Jos lomakkeisiin tulee muutoksia,
muista etta tunnistus tapahtuu vain deployn yhteydessa.

## Tekemättä (ennen julkaisua)

- Kuvat: etusivun hero-kuva on tehty (`img/hero-bg.webp` + mobiiliversio).
  Palvelusivujen kuvat lisätty 10.10.2026 (ks. Kuvat alla).
- Favicon ja OG-jakokuva (`og:image`).
- Portfolio-osio, jos haluat sen mukaan.

## Kuvat (lisätty 10.10.2026)

- `img/hero/<palvelu>.webp` (1920×960) ja `<palvelu>-m.webp` (900×1098): palvelusivujen
  yläosan taustat. Sivulla `class="hero hero-sub has-photo"` ja inline-muuttujat
  `--hero-img` / `--hero-img-m`.
- `img/video/kirsikkapuisto-loop.mp4` (+ `.webm` varalle): videotuotannon yläosan
  10 s looppi. Ladataan vain työpöydällä; mobiilissa ja vähennetyn liikkeen
  asetuksella näkyy pysäytyskuva.
- `img/galleria/*.webp` (1200 px + `-s` 600 px): palvelusivujen kuvagalleriat.
- `img/kortit/*.webp` (800×450): etusivun palvelukorttien kuvat.
- Kuvat on tehty skriptillä `../kuvat_webp.py` lähdekansiosta
  (`~/Desktop/HueSky-Projects/wwwHueSkyFi`). Skripti rajaa polttopisteen mukaan ja
  poistaa EXIF/GPS-tiedot. Uuden kuvan voi lisätä skriptin listoihin ja ajaa sen uudelleen.
