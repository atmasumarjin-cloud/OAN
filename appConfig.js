export const APP_CONFIG = {
  brandName: "OLIMPIADE ANAK NUSANTARA",
  businessType: "OLIMPIADE ONLINE",
  description: "OLIMPIADE ONLINE YANG DI ADAKAN DI SELURUH INDONESIA",
  tagline: "Membangun Generasi Emas Indonesia Berprestasi & Berakhlak Mulia",
  supportedBy: "YAYASAN BESARRASA BAGI BANGSA",
  themeColor: {
    primary: "#1A1615",  // Dark Executive Accent
    accent: "#D4AF37",   // Gold Luxury Accent
    bgLight: "#FAF8F5",  // Warm Neutral Ivory
    secondaryDark: "#2A2421",
    goldLight: "#F5E7B2",
    goldMuted: "#B8972E",
  },
  contact: {
    whatsapp: "6287720348028",
    whatsappDisplay: "+62 877-2034-8028",
    email: "kontak@olimpiadeanaknusantara.id",
    instagram: "olimpiadeanaknusantara",
    tiktok: "olimpiadeanaknusantara",
    youtube: "OlimpiadeAnakNusantaraOfficial",
    address: "Graha Prestasi Nusantara Lt. 8, Jl. Sudirman Kav. 24, Jakarta",
  },
  payment: {
    bank: "Bank BCA (Bank Central Asia)",
    accountNumber: "3843-136-911",
    accountHolder: "SRI PRIHATININGSIH SH.",
    ticketNormalPrice: 180000,
    ticketPromoPrice: 99000,
    promoSlotLimit: 10,
    currency: "IDR",
  },
  heroImage: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=1600&auto=format&fit=crop",
  images: {
    hero: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=1600&auto=format&fit=crop",
    students: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
    medals: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?q=80&w=1200&auto=format&fit=crop",
    certificate: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1200&auto=format&fit=crop",
    science: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop",
    math: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
    english: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop",
    indonesia: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop",
    trophy: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=1200&auto=format&fit=crop",
    fallback: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },
  categories: [
    {
      id: "A",
      name: "Kategori A",
      level: "SD / MI Kelas 1, 2, dan 3",
      ageRange: "6 - 9 Tahun",
      description: "Tingkat pemula ramah anak dengan fokus logika berpikir dasar, numerasi, observasi sains, dan literasi membaca visual.",
    },
    {
      id: "B",
      name: "Kategori B",
      level: "SD / MI Kelas 4, 5, dan 6",
      ageRange: "9 - 12 Tahun",
      description: "Tingkat menengah yang melatih kemampuan pemecahan masalah (problem solving), analisa saintifik, tata bahasa, dan reading comprehension.",
    },
    {
      id: "C",
      name: "Kategori C",
      level: "SMP / MTs Kelas 7, 8, dan 9",
      ageRange: "12 - 15 Tahun",
      description: "Tingkat lanjutan berbasis HOTS (Higher Order Thinking Skills) setara standar kompetensi sains dan bahasa nasional/internasional.",
    },
  ],
  subjects: [
    {
      id: "matematika",
      name: "Matematika Terpadu",
      shortName: "Matematika",
      icon: "Calculator",
      color: "from-amber-600 to-yellow-500",
      description: "Aritmatika, geometri, logika penalaran, aljabar terapan, dan pemodelan matematika kreatif.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "ipa_sains",
      name: "IPA / Sains Eksperimental",
      shortName: "IPA / Sains",
      icon: "Atom",
      color: "from-emerald-600 to-teal-500",
      description: "Biologi lingkungan, sains alam semesta, fenomena fisika dasar, dan penemuan sains praktis.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "bahasa_inggris",
      name: "Bahasa Inggris (English Mastery)",
      shortName: "Bahasa Inggris",
      icon: "Languages",
      color: "from-blue-600 to-cyan-500",
      description: "Grammar, vocabulary in context, reading comprehension, idioms, dan critical thinking in English.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "bahasa_indonesia",
      name: "Bahasa Indonesia & Literasi",
      shortName: "Bahasa Indonesia",
      icon: "BookOpen",
      color: "from-rose-600 to-red-500",
      description: "Ejaan baku, analisis teks naratif & opini, diksi sastra nusantara, dan pemahaman bacaan kritis.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
    },
  ],
  products: [
    {
      id: "prod-math",
      title: "Olimpiade Matematika Nasional",
      subtitle: "Asah Nalar & Keterampilan Numerasi Generasi Emas",
      description: "Kompetisi matematika berstandar nasional yang dirancang khusus untuk mengasah daya logika anak dari level dasar hingga pemecahan masalah tingkat tinggi (HOTS).",
      benefits: [
        "20 Soal Kurasi Tim Pakar Akademik",
        "Sertifikat Berpenghargaan Resmi",
        "Analisis Hasil Lengkap & Ranking Nasional",
        "Akses Simulasi Mandiri Tanpa Batas"
      ],
      priceTag: "Gratis Pendaftaran Penyisihan",
      badge: "Paling Diminati",
      categoryTarget: "Kategori A, B, dan C",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "prod-science",
      title: "Olimpiade Sains & IPA Terpadu",
      subtitle: "Eksplorasi Keajaiban Alam & Pengetahuan Saintifik",
      description: "Uji rasa ingin tahu dan ketajaman observasi anak dalam memahami prinsip alam, biologi, bumi, dan sains aplikatif dengan soal bergambar kontekstual.",
      benefits: [
        "Pendekatan STEM (Science, Technology, Engineering, Math)",
        "E-Sertifikat Nasional Ber-QR Code Terverifikasi",
        "Medali Emas/Perak/Perunggu Babak Final",
        "Terbuka untuk Siswa Seluruh Nusantara"
      ],
      priceTag: "Gratis Pendaftaran Penyisihan",
      badge: "Favorit Siswa",
      categoryTarget: "Kategori A, B, dan C",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "prod-english",
      title: "National English Championship",
      subtitle: "Bangun Kepercayaan Diri Berbahasa Global",
      description: "Ajang uji kemahiran bahasa Inggris yang komprehensif, menguji penguasaan kosa kata, tata bahasa komunikatif, dan penalaran bacaan berwawasan dunia.",
      benefits: [
        "Kurikulum Selaras Standar CEFR Internasional",
        "Sertifikat Prestasi Portofolio Sekolah",
        "Ujian Online Terpadu dengan Fitur Anti-Contek",
        "Hadiah Trofi & Medali Eksklusif di Final"
      ],
      priceTag: "Gratis Pendaftaran Penyisihan",
      badge: "Prestise Tinggi",
      categoryTarget: "Kategori A, B, dan C",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "prod-indonesia",
      title: "Olimpiade Bahasa & Sastra Indonesia",
      subtitle: "Lestarikan Bahasa Persatuan & Daya Kritis Literasi",
      description: "Tingkatkan literasi membaca dan apresiasi bahasa persatuan. Mengasah kecermatan berbahasa yang baik, benar, dan kaya sudut pandang sastra nusantara.",
      benefits: [
        "Menguatkan Nilai Asesmen Nasional Literasi",
        "Sertifikat Sah Didukung Yayasan Besarrasa Bagi Bangsa",
        "Peluang Meraih Tiket Final Bertabur Hadiah",
        "Dashboard Mandiri untuk Pantau Skor Real-time"
      ],
      priceTag: "Gratis Pendaftaran Penyisihan",
      badge: "Literasi Bangsa",
      categoryTarget: "Kategori A, B, dan C",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
    }
  ],
  faq: [
    {
      q: "Apa itu Olimpiade Anak Nusantara?",
      a: "Olimpiade Anak Nusantara adalah kompetisi online tingkat nasional berskala besar yang diperuntukkan bagi siswa-siswi jenjang SD (Kategori A & B) dan SMP (Kategori C) di seluruh 38 provinsi di Indonesia. Program ini didukung penuh oleh Yayasan Besarrasa Bagi Bangsa guna mencetak generasi unggul berprestasi."
    },
    {
      q: "Bagaimana alur pendaftaran peserta?",
      a: "Pendaftaran dilakukan secara mandiri oleh orang tua/wali atau siswa melalui website resmi ini. Cukup isi formulir pendaftaran lengkap, konfirmasi ke WhatsApp Admin resmi kami, ikuti akun media sosial resmi kami, dan peserta langsung mendapatkan akses Simulasi Ujian secara mandiri."
    },
    {
      q: "Apakah babak pendaftaran & penyisihan dipungut biaya?",
      a: "Pendaftaran awal dan babak penyisihan berlangsung tanpa biaya pendaftaran wajib (GRATIS). Peserta yang berhasil Lolos ke Babak Final dapat mengambil Tiket Final eksklusif dengan harga promo spesial Rp 99.000 (normal Rp 180.000) untuk fasilitas medali, trofi, piagam fisik, dan sertifikat berperingkat nasional."
    },
    {
      q: "Bagaimana cara melakukan pembayaran Tiket Babak Final?",
      a: "Pembayaran dilakukan transfer ke rekening resmi panitia: Bank BCA No. Rekening 3843-136-911 atas nama SRI PRIHATININGSIH SH. Setelah transfer, cukup klik tombol Konfirmasi WhatsApp di dashboard Anda untuk verifikasi instan oleh sistem dan admin kami."
    },
    {
      q: "Apakah peserta bisa mencoba simulasi ujian sebelum babak penyisihan?",
      a: "Ya! Setiap peserta yang telah mendaftar dan mengikuti media sosial resmi dapat mengakses Simulasi Ujian Mandiri kapan saja. Soal simulasi terdiri dari 20 butir soal acak yang setara dengan bobot ujian penyisihan untuk membiasakan peserta dengan sistem online kami."
    },
    {
      q: "Bagaimana teknis pelaksanaan ujian online?",
      a: "Ujian dapat diakses melalui smartphone, tablet, laptop, atau komputer yang tersambung internet stabil. Sistem dilengkapi fitur Anti-Contek modern (pendeteksi perpindahan tab & fullscreen) untuk menjaga integritas dan kejujuran kompetisi."
    },
    {
      q: "Kapan pengumuman hasil babak penyisihan diumumkan?",
      a: "Pengumuman peserta yang Lolos Babak Penyisihan dipublikasikan pada H+2 setelah pelaksanaan ujian. Peserta dapat memeriksa status kelulusan secara mandiri melalui menu 'Cek Status & Pengumuman' di website ini."
    },
    {
      q: "Apakah seluruh peserta mendapatkan sertifikat resmi?",
      a: "Ya! Seluruh peserta yang menyelesaikan ujian berhak mengunduh E-Sertifikat Resmi ber-QR Code dengan tanda tangan pengesahan dari Ketua Panitia dan Pembina Yayasan Besarrasa Bagi Bangsa secara mandiri langsung dari website."
    },
    {
      q: "Bagaimana pembagian kategori usia dan jenjang kelas?",
      a: "Kategori A diperuntukkan bagi SD Kelas 1-3. Kategori B untuk SD Kelas 4-6. Kategori C untuk SMP/MTs Kelas 7-9. Soal pada masing-masing kategori telah disesuaikan dengan tingkat perkembangan nalar dan kurikulum nasional terkini."
    },
    {
      q: "Bolehkah satu peserta mengikuti lebih dari satu mata pelajaran?",
      a: "Tentu boleh! Peserta dipersilakan mendaftar pada lebih dari satu mata pelajaran (misal Matematika dan IPA/Sains) untuk memaksimalkan peluang meraih medali dan pengalaman berprestasi."
    },
    {
      q: "Apa yang harus dilakukan jika mengalami kendala saat mengerjakan ujian?",
      a: "Tim Helpdesk kami siap mendampingi selama 24 jam via kontak WhatsApp Admin di nomor +62 877-2034-8028. Segala kendala teknis akan langsung dibantu oleh panitia."
    }
  ],
  testimonials: [
    {
      name: "Dr. Hendra Wijaya, S.Pd., M.Hum",
      role: "Orang Tua Siswa - Bandung, Jawa Barat",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
      text: "Sistem ujian online Olimpiade Anak Nusantara luar biasa rapi, transparan, dan sangat ramah anak. Fitur anti-conteknya mendidik kejujuran anak sejak dini. Sertifikatnya berbobot dan diakui sekolah!",
      rating: 5,
      studentName: "Keisha (Peraih Emas Matematika Kategori B)"
    },
    {
      name: "Ibu Nurul Aisyah, S.Si",
      role: "Wali Murid & Guru Pembina - Surabaya, Jawa Timur",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
      text: "Anak saya sangat antusias sejak tahap simulasi. Soal-soalnya benar-benar menguji nalar HOTS bukan sekadar hafalan. Pelayanan admin via WhatsApp sangat cepat dan ramah!",
      rating: 5,
      studentName: "Rian (Peraih Perak Sains Kategori A)"
    },
    {
      name: "Bapak Agus Salim Prasetyo",
      role: "Orang Tua Siswa - Medan, Sumatera Utara",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      text: "Platform paling profesional yang pernah kami ikuti. Alur mandiri dari simulasi, penyisihan, tiket final sampai download sertifikat berjalan lancar di handphone tanpa ribet.",
      rating: 5,
      studentName: "Faris (Finalis Bahasa Inggris Kategori C)"
    }
  ]
};
