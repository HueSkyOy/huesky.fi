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

## Domainin kytkennan yhteydessa (PAKOLLINEN)

Kun huesky.fi osoittaa tanne, tee molemmat TAI sivusto ei nay Googlessa:

1. `robots.txt`: `Disallow: /` -> `Allow: /`
2. `netlify.toml`: poista rivi `X-Robots-Tag = "noindex"`

Indeksointi on nyt estetty tarkoituksella, koska canonical-tagit osoittavat
osoitteeseen www.huesky.fi joka ei viela palvele sisaltoa.

## Tekemättä (ennen julkaisua)

- Kuvat: hero- ja palvelusivujen kuvat puuttuvat vielä (lisää `img/`-kansioon
  WebP-muodossa, käytä `loading="lazy"`).
- Favicon ja OG-jakokuva (`og:image`).
- Portfolio-osio, jos haluat sen mukaan.
