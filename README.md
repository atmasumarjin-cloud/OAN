# OLIMPIADE ANAK NUSANTARA (OAN)
### Platform Resmi Olimpiade Online Tingkat Nasional Indonesia
**Didukung Penuh oleh: YAYASAN BESARRASA BAGI BANGSA**

---

## 🌟 Ringkasan Aplikasi & Spesifikasi Bisnis
Aplikasi website bisnis kelas atas (*Luxury & Enterprise Grade*) yang 100% responsif dengan pendekatan *Mobile First* untuk kompetisi olimpiade online tingkat nasional di Indonesia.

- **Nama Brand**: OLIMPIADE ANAK NUSANTARA
- **Bidang Usaha**: OLIMPIADE ONLINE YANG DIADAKAN DI SELURUH INDONESIA
- **Dukungan Resmi**: YAYASAN BESARRASA BAGI BANGSA
- **Kontak Resmi WhatsApp**: +62 877-2034-8028
- **Rekening Resmi Pembayaran**: Bank BCA `3843-136-911` a.n. `SRI PRIHATININGSIH SH.`
- **Tiket Final**: Normal Rp 180.000 dicoret menjadi Promo Rp 99.000 (khusus 10 peserta pertama).
- **Akun Media Sosial Resmi**: Instagram, TikTok, YouTube `@olimpiadeanaknusantara`
- **Kategori**:
  - Kategori A: SD/MI Kelas 1 - 3
  - Kategori B: SD/MI Kelas 4 - 6
  - Kategori C: SMP/MTs Kelas 7 - 9
- **Mata Pelajaran**: Matematika Terpadu, IPA/Sains Eksperimental, Bahasa Inggris (English Mastery), Bahasa Indonesia & Literasi.

---

## 🚀 Fitur Utama & Alur Pendaftaran Hingga Final

1. **Integrasi Iklan Meta**: Dilengkapi pengaturan Meta Pixel ID dan injeksi custom script HTML langsung dari Dashboard Admin.
2. **Formulir Pendaftaran Mandiri**: Pengisian data siswa (Nama, Kelas, Sekolah, Kategori, Mapel) dan data orang tua (Nama Wali, WhatsApp aktif, Email) secara mandiri dengan kode unik registrasi otomatis (`OAN-26-XXXX`).
3. **Verifikasi WhatsApp & Wajib Follow Sosmed**: Integrasi tautan WhatsApp panitia dengan format pesan terisi otomatis, serta checklist follow akun Instagram, TikTok, dan YouTube resmi untuk membuka akses simulasi.
4. **Simulasi Ujian Mandiri**: 20 butir soal acak (5 poin/soal = 100 poin) dengan timer 30 menit, navigasi ragu-ragu, dan sistem deteksi Anti-Contek.
5. **Follow-Up Reminder H-2 & H-1**: Notifikasi pengingat via WhatsApp otomatis dan tombol broadcast manual di Dashboard Admin.
6. **Babak Penyisihan & Pengumuman H+2**: Pelaksanaan ujian online resmi, integrasi skor langsung ke dashboard peserta & admin, serta status kelulusan (Lolos/Tidak Lolos).
7. **Pembelian Tiket Babak Final**: Pembayaran Rp 99.000 via BCA No. Rekening 3843-136-911 a.n. SRI PRIHATININGSIH SH, upload konfirmasi transfer, dan tombol chat WhatsApp admin otomatis.
8. **Penandaan Closing Tiket Final**: Status peserta otomatis berlabel `CLOSING TIKET FINAL LUNAS` dan membuka akses ke Ujian Babak Final.
9. **Babak Final & Perebutan Medali**: Ujian 20 butir soal HOTS tingkat lanjut untuk memperebutkan Medali Emas, Perak, Perunggu, dan Honorable Mention.
10. **E-Sertifikat Berdesain Mewah Mandiri**: Dilengkapi border emas ornamen Guilloche, stempel timbul digital emas, QR Code verifikasi unik, dan tanda tangan ganda Ketua Pelaksana & Pembina Yayasan Besarrasa Bagi Bangsa yang dapat langsung dicetak/diunduh PDF.
11. **Dashboard Admin Lengkap (Akses Rahasia: User `ADMIN` / Password `AKUSAYANGKAMU123`)**:
    - Ringkasan statistik pendaftaran dengan filter rentang tanggal.
    - Database peserta & riwayat ujian lengkap dengan seluruh kolom formulir.
    - Tombol hapus satuan dan hapus massal peserta.
    - Tombol WhatsApp follow-up instan (belum simulasi, belum penyisihan, lolos belum bayar tiket final, belum ujian final).
    - Tabel Laporan Pengerjaan Simulasi, Babak Penyisihan, dan Babak Final.
    - Bank Soal: Tambah, edit satuan/massal, hapus satuan/massal, serta fitur Export/Import JSON/CSV.
    - Pengaturan Jadwal Pelaksanaan & Saklar Toggle Fitur Anti-Contek (On/Off).
    - Pengaturan Meta Pixel Ads.
12. **Konsultan Akademik AI (Gemini @google/genai)**: Asisten cerdas terintegrasi via endpoint Express `/api/recommendation` yang memahami detail produk dan kisi-kisi lomba secara persuasif.

---

## 🛠️ Tech Stack & Konfigurasi

- **Frontend**: React 18+ (Vite), Tailwind CSS v4, Google Fonts (Cinzel & Plus Jakarta Sans), Lucide React Icons.
- **Backend**: Express.js (Node.js) + SDK Resmi Google Gen AI (`@google/genai`).
- **Configuration-Driven Whitelabel**: Dikelola secara terpusat melalui file `appConfig.js`.

---

## 💻 Panduan Menjalankan di Lingkungan Lokal (Local Development)

### 1. Prasyarat
- Node.js versi 18+ atau 20+ LTS
- npm atau bun/pnpm

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment (`.env`)
Salin atau buat file `.env` di direktori root:
```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
PORT=3000
```

### 4. Menjalankan Server Pengembangan (Vite Dev)
```bash
npm run dev
```
Akses di browser pada: `http://localhost:3000`

---

## 🌐 Panduan Deployment cPanel Shared Hosting (Satelitweb / Provider Lainnya)

Aplikasi ini telah dirancang secara *future-proof* menggunakan standar cPanel Node.js Selector:

### 1. Build Static Asset di Komputer Lokal
Jalankan perintah build untuk menghasilkan folder `dist`:
```bash
npm run build
```

### 2. Siapkan File untuk Diunggah ke cPanel
Pastikan file berikut siap diunggah ke folder aplikasi di cPanel (misal di folder `/home/username/olimpiade/`):
- `app.js` (Entry point Node.js cPanel)
- `server.js`
- `appConfig.js`
- `package.json`
- `dist/` (Folder hasil build frontend)
- `.env` (Berisi `GEMINI_API_KEY` dan konfigurasi environment)

### 3. Konfigurasi Node.js Selector di cPanel
1. Masuk ke cPanel Hosting Anda (contoh: Satelitweb cPanel).
2. Cari dan klik menu **"Setup Node.js App"**.
3. Klik tombol **"Create Application"**.
4. Isi parameter konfigurasi:
   - **Node.js version**: Pilih versi **18.x** atau **20.x** LTS.
   - **Application mode**: Pilih **Production**.
   - **Application root**: Isi nama folder proyek Anda (misal: `olimpiade`).
   - **Application URL**: Pilih domain atau subdomain Anda (misal: `olimpiade.domainanda.com`).
   - **Application startup file**: Ketik `app.js`.
5. Klik **"Create"**.

### 4. Instal Dependensi di cPanel
1. Pada halaman aplikasi Node.js cPanel yang baru dibuat, klik **"Run NPM Install"**.
2. Atau masuk via Terminal SSH cPanel dan jalankan:
   ```bash
   cd /home/username/olimpiade
   npm install --production
   ```

### 5. Restart Aplikasi Node.js
Klik tombol **"Restart"** pada panel Node.js Selector di cPanel.
Aplikasi Anda kini telah aktif 100% dengan dukungan SPA catch-all route, backend API `/api/recommendation`, dan performa tinggi!

---

## 🔒 Informasi Kredensial Administrator
- **Username**: `ADMIN`
- **Password**: `AKUSAYANGKAMU123`
*(Catatan: Kredensial ini bersifat rahasia dan tidak ditampilkan pada tampilan antarmuka form login demi keamanan).*
