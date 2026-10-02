# Undangan Pernikahan Fakari & Aghita

Undangan digital elegan dengan tema floral untuk pernikahan Fakari & Aghita pada 20 Desember 2025.

## Fitur

- **Cover animasi** - Amplop terbuka dengan parallax layered
- **Countdown timer** - Hitung mundur ke hari H
- **Bilingual** - Indonesia/English dengan toggle
- **Event details** - Akad & Resepsi dengan Google Maps embed
- **Add to Calendar** - Generate file .ics
- **Photo Gallery** - Grid + lightbox native
- **RSVP Form** - Simpan ke Google Sheets via Apps Script
- **Guestbook** - Tampilkan ucapan tamu
- **Digital Envelope** - Info rekening + copy to clipboard
- **Background Music** - Autoplay muted + toggle
- **Floating petals** - Animasi CSS murni
- **Scroll animations** - IntersectionObserver reveal
- **Responsive** - Mobile-first design
- **Accessible** - prefers-reduced-motion, semantic HTML

## Teknologi

- HTML5 / CSS3 / Vanilla JS (ES6+)
- Zero dependencies
- Google Fonts (Cormorant Garamond, Lato)
- Google Maps Embed
- Google Apps Script + Sheets (backend gratis)

## Struktur Project

```
nikah_fakari&aghita/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── data/
│   └── config.js
├── assets/
│   ├── img/
│   │   ├── groom.jpg
│   │   ├── bride.jpg
│   │   └── gallery/
│   ├── fonts/
│   └── music/
│       └── bg-music.mp3
├── google-apps-script/
│   └── Code.gs
��── README.md
```

## Setup & Customization

### 1. Edit Data (`data/config.js`)

Ganti semua placeholder dengan data asli:
- Nama mempelai, nama orang tua
- Tanggal, waktu, venue, alamat
- Koordinat Google Maps / embed URL
- Nomor rekening bank
- Foto prewedding (taruh di `assets/img/gallery/`)
- Foto mempelai (`assets/img/groom.jpg`, `bride.jpg`)
- Background music (`assets/music/bg-music.mp3`)

### 2. Setup Google Apps Script (Backend RSVP & Guestbook)

1. Buka [Google Sheets](https://sheets.google.com), buat spreadsheet baru
2. Buat 2 sheet: **RSVP** dan **Guestbook**
3. Header RSVP: `timestamp`, `name`, `attendance`, `guests`, `message`
4. Header Guestbook: `timestamp`, `name`, `attendance`, `guests`, `message`
5. Buka **Extensions > Apps Script**
6. Hapus kode default, paste isi `google-apps-script/Code.gs`
7. Ganti `SPREADSHEET_ID` dengan ID spreadsheet Anda (ada di URL)
8. **Deploy > New deployment > Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
9. Copy **Web App URL**
10. Update `CONFIG.googleAppsScript.rsvpUrl` dan `guestbookUrl` di `config.js`

### 3. Google Maps Embed

1. Buka Google Maps, cari venue
2. **Share > Embed a map**
3. Copy `src` dari iframe
4. Update `mapsEmbed` di `config.js` untuk akad & resepsi

## Local Development

Buka `index.html` langsung di browser, atau pakai live server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .

# PHP
php -S localhost:8000
```

## Deploy ke Vercel/Netlify

### Vercel (Recommended)

1. Push ke GitHub repo
2. Buka [vercel.com](https://vercel.com), import project
3. Framework: **Other** / **Static**
4. Deploy

### Netlify

1. Push ke GitHub repo
2. Buka [netlify.com](https://netlify.com), **New site from Git**
3. Build command: **none** (kosongkan)
4. Publish directory: **.** (root)
5. Deploy

## Custom Domain (Opsional)

Di dashboard Vercel/Netlify:
1. **Settings > Domains > Add**
2. Arahkan DNS (CNAME ke `cname.vercel-dns.com` atau `netlify.app`)
3. Tunggu propagasi SSL

## Accessibility Checklist

- [x] Semantic HTML5
- [x] Alt text semua gambar
- [x] Focus visible states
- [x] Color contrast (WCAG AA)
- [x] prefers-reduced-motion support
- [x] ARIA labels pada interactive elements
- [x] Keyboard navigable
- [x] Screen reader friendly

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Mobile Safari/Chrome

## Credits

- Fonts: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), [Lato](https://fonts.google.com/specimen/Lato) via Google Fonts
- Inspiration: Elegant floral wedding invitations

## License

Personal use only for Fakari & Aghita wedding.