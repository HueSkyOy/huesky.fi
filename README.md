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
  Palvelusivujen kuvat puuttuvat vielä (lisää `img/`-kansioon WebP-muodossa,
  käytä `loading="lazy"`).
- Favicon ja OG-jakokuva (`og:image`).
- Portfolio-osio, jos haluat sen mukaan.
