# HyaGo — From Water to Worth.

Prototipe edukasi interaktif untuk eksplorasi eceng gondok, contoh proses fermentasi pupuk organik cair (POC), dan pemantauan berbasis sensor. Bahasa Indonesia menjadi default; English menerjemahkan seluruh konten utama dan kontrol.

## Menjalankan

Prasyarat: Node.js 22.18+ (atau Node 24/26) dan npm.

```sh
npm install
npm run dev
```

Buka URL lokal yang ditampilkan Vite (biasanya http://127.0.0.1:5173). Tidak membutuhkan backend, API key, atau layanan berbayar. Aset botani, logo, drum, dan grafik adalah SVG lokal; tidak bergantung pada layanan gambar atau font eksternal. Pretendard digunakan bila tersedia di sistem, dengan fallback sans-serif.

```sh
npm test
npm run build
npm run preview
```

Build produksi berada di `dist/` dan dapat disajikan oleh hosting statis. Tidak ada deployment publik yang dibuat.

## Struktur

- `src/styles.css`: design tokens, Tailwind, layout responsif, fokus keyboard, reduced motion.
- `src/App.tsx`: navigasi, bahasa, hero dan satu reducer bersama; satu timer dengan cleanup.
- `src/components/`: ilustrasi botani, hotspot, grafik, dashboard, simulator, proses, arsitektur dan referensi.
- `src/data/science.ts`: konten ilmiah bilingual dan referensi dengan cakupan klaim.
- `src/data/scenarios.ts`: skenario deterministik tanpa angka acak.
- `src/data/architecture.ts`: node sistem demo dan rencana perangkat nyata.
- `src/lib/simulation.ts`: validasi input, transisi state, riwayat dan analisis aturan.
- `src/lib/presentation.ts`: format angka dan teks analisis bilingual.
- `tests/simulation.test.ts`: pengujian transisi, waktu, disconnect/reconnect, reset dan validasi.

## Data simulasi

Semua pembacaan adalah sintetis, bukan hasil percobaan. Saat berjalan, setiap 2 detik nyata menghasilkan 6 jam virtual dan menambah 0,25 hari umur proses. Kontrol manual menambah satu menit pada waktu pencatatan virtual; umur proses dapat diatur sebagai input independen. Riwayat menyimpan 240 sampel terakhir. Mode manual mempertahankan nilai input selama timer berjalan; mode otomatis menggunakan pola deterministik. Mengganti mode atau skenario menjeda timer. Skenario gangguan memutus sensor pada langkah 3–6 dan menyambungkan kembali pada langkah 7.

Analisis membandingkan dua pembacaan tersambung berurutan. Selisih absolut suhu ≥3 °C atau pH ≥0,7 memicu label pemeriksaan; angka tersebut adalah ambang demonstrasi, bukan standar biologis atau standar pupuk. Saat terputus, nilai terbaru menjadi null, grafik memiliki celah dan analisis terkini berhenti. Waktu pembacaan valid terakhir tetap terlihat. Analisis tidak membandingkan melintasi celah. Reset mengembalikan input, waktu, timer, koneksi, mode, skenario, catatan, grafik dan rentang grafik.

Catatan manual hanya berada di memori halaman dan tidak dianalisis otomatis. Refresh menghapus sesi.

## Sumber ilmiah yang dibaca

1. Tibebe et al. (2022), *Compost preparation, chemical analyses and users’ perception in the utilization of water hyacinth, Ethiopia*. https://link.springer.com/article/10.1186/s13065-022-00851-9 — penelitian kompos padat; bukan bukti hasil POC.
2. Rop et al. (2019), *Biodegradable water hyacinth cellulose-graft-poly(ammonium acrylate-co-acrylic acid) polymer hydrogel for potential agricultural application*. https://pmc.ncbi.nlm.nih.gov/articles/PMC6441838/ — biomassa/selulosa dan penelitian hidrogel; bukan validasi pupuk cair.
3. Sasidharan et al. (2013), *Water hyacinth for heavy metal scavenging and utilization as organic manure*. https://indianjournals.com/article/ijws-45-3-014 — abstrak tersedia dan dibaca; mendukung kehati-hatian terhadap logam.
4. University of Minnesota Extension, *Quick guide to fertilizing plants*. https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/quick-guide-to-fertilizing-plants — fungsi umum unsur hara.
5. University of Florida/IFAS, *Pontederia crassipes*. https://plant-directory.ifas.ufl.edu/plant-directory/pontederia-crassipes/ — morfologi tanaman; nama Eichhornia crassipes dicantumkan sebagai nama yang digunakan di literatur.

Tidak ada persentase NPK, pie chart komposisi, dosis, resep atau kriteria kematangan yang diekstrapolasi ke POC. Interpretasi dan langkah eksperimen merupakan rancangan edukasi yang masih memerlukan validasi. Kandungan bahan baku tidak otomatis menunjukkan nutrisi tersedia pada produk akhir.

## Belum terintegrasi

Perangkat sensor, ESP32, pengiriman data, penyimpanan permanen, dataset beberapa batch dan model AI terlatih belum tersedia. Suhu dan pH tidak mengukur NPK atau logam berat. Mutu, kematangan, keamanan serta efektivitas produk memerlukan pengujian yang sesuai. Pemisahan data model harus dilakukan per batch; TinyML hanya opsi setelah pelatihan dan evaluasi perangkat.

## Hasil pemeriksaan implementasi

- Build produksi dan pemeriksaan TypeScript berhasil.
- Tujuh pengujian logika simulasi lulus, mencakup perubahan manual, waktu, mode otomatis, gangguan sensor, pemulihan koneksi, reset, validasi angka dan pembatasan riwayat.
- Rasio kontras pasangan utama: Ink/Porcelain 15,47:1; putih/Jade 6,42:1; teks sekunder/Porcelain 5,14:1; Ink/Lime 13,77:1; teks dashboard/Ink 8,57:1; Jade/Mint 5,33:1.
- Server Vite berhasil memulai pada alamat lokal. Pemeriksaan visual desktop/ponsel, interaksi DOM dan console belum terverifikasi: alat browser menolak akses URL lokal karena kebijakan akses. Pemeriksaan HTTP terpisah juga dibatasi akses socket lingkungan. Ini bukan bukti kegagalan aplikasi.
- Masih perlu pemeriksaan browser nyata untuk memastikan tidak ada overflow pada 375px/768px/1440px, fokus keyboard, menu ponsel, navigasi anchor, seluruh terjemahan, hotspot, grafik, kontrol, reset dan console.

## Pembaruan Inside the Hyacinth

Section kandungan kini menggunakan breadcrumb lima lapisan: tanaman, jaringan, senyawa/ion, pengolahan dan peran agronomis. Tiga hotspot menyorot daun, tangkai daun dan akar serta memperbarui inset jaringan. Semua inset bersifat skematis; tidak ada klaim lokasi/kadar senyawa khusus organ. Garis permukaan air ditampilkan dan bentuk tangkai dijelaskan sebagai bervariasi.

Delapan panel bilingual meliputi selulosa, hemiselulosa, lignin, protein/N organik, fosfor, kalium, Ca/Mg dan bahan humik. Mode Ringkas mempertahankan batas interpretasi dan bukti; Mendalam menambahkan mekanisme dan kondisi. Konteks POC/kompos tidak menghitung konsentrasi atau kinetika. Bahan humik berada pada lapisan hasil pengolahan.

Empat jalur (karbon, nitrogen, fosfor, kalium) memiliki empat tahap, detail yang bisa dibuka, Sebelumnya/Berikutnya, Putar penjelasan dan Ulangi. Putar menyorot tahap aktif selama animasi singkat; tidak menggulir atau memindahkan tahap. Tidak ada timer autoplay. Reduced motion menonaktifkan animasi. Diagram berupa formula dan representasi berlabel, bukan struktur molekul lengkap atau data pengukuran.

File baru:
- `src/data/chemistry.ts`: kategori kimia, konteks sampel, tujuh bagian informasi, bukti, batasan dan konteks bilingual.
- `src/data/chemistryReferences.ts`: sumber tambahan R6–R19 dan cakupan yang dibaca; ditampilkan bersama referensi lama.
- `src/data/journeys.ts`: tahapan naratif dan detail empat jalur.
- `src/lib/explorer.ts`: transisi navigasi tanpa akses ke state sensor.
- `src/components/ScientificVisuals.tsx`: inset jaringan dan representasi polimer/ion.
- `tests/explorer.test.ts`: pilihan organ, breadcrumb, konteks, kedalaman bacaan, semua jalur, batas tahap, restart dan kelengkapan sumber/bahasa.

Pengujian pembaruan: build TypeScript/Vite berhasil; 12 tes lulus (5 eksplorasi baru dan 7 regresi simulasi). Pemeriksaan visual desktop/ponsel dan console masih belum terverifikasi karena kebijakan alat browser yang memblokir akses lokal. CSS responsif, fokus keyboard, elemen tombol semantik dan reduced motion diperiksa melalui kode; ini tidak menggantikan pemeriksaan browser.

Batas bukti: sebagian sumber (artikel lignin, bab NCBI dan OSHA) dibaca melalui teks terindeks yang tersedia; akses langsungnya terbatas, dan hal itu ditandai di referensi. Persentase penelitian campuran tidak diterapkan sebagai komposisi eceng gondok murni. Komposisi monomer/keluarga hemiselulosa spesifik organ, spesiasi/kadar POC, fraksi humat/fulvat, laju penguraian dan manfaat agronomis HyaGo tetap membutuhkan pengujian. Suhu/pH tidak menjadi pengganti analisis tersebut.

