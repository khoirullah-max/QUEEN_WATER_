# Queen Water

Website depot air isi ulang **Queen Water**, Pondok Pesantren Nahdlatul Arifin, Kedungkaji, Ambulu, Jember.
Situs statis (HTML, CSS, JavaScript) tanpa proses build, jadi langsung bisa dipakai di GitHub Pages.

## Cara upload ke GitHub

1. Buat repository baru di GitHub, misalnya `queen-water`.
2. Upload semua isi folder ini lewat tombol **Add file → Upload files**, atau lewat terminal:
   ```bash
   git init
   git add .
   git commit -m "Website Queen Water"
   git branch -M main
   git remote add origin https://github.com/USERNAME/queen-water.git
   git push -u origin main
   ```
3. Di repository, buka **Settings → Pages**, lalu pada **Source** pilih **GitHub Actions**.
4. Tunggu proses di tab **Actions** selesai. Situs aktif di `https://USERNAME.github.io/queen-water/`.

## Mengubah isi

| Yang ingin diubah | Berkas |
| --- | --- |
| Teks, alamat, layanan | `index.html` |
| Warna, font, tata letak | `css/style.css` (variabel warna ada di bagian atas) |
| Nomor WhatsApp pada form pesan | `js/main.js` (konstanta `NOMOR`) dan tautan `wa.me` di `index.html` |
| Foto, logo, maskot | folder `assets/` |

## Struktur

```
index.html
css/style.css
js/main.js
assets/            foto, logo, maskot, favicon, gambar pratinjau
.github/workflows/pages.yml
```
