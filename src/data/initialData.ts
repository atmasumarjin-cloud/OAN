import { Participant, Question, ScheduleConfig, MetaPixelConfig } from '../types';

export const DEFAULT_SCHEDULE: ScheduleConfig = {
  registrationDeadline: '2026-10-15',
  simulationStartDate: '2026-10-01',
  simulationEndDate: '2026-10-17',
  preliminaryDate: '2026-10-18',
  preliminaryAnnouncementDate: '2026-10-20',
  finalDate: '2026-10-28',
  finalAnnouncementDate: '2026-10-30',
  antiCheatEnabled: true,
};

export const DEFAULT_META_PIXEL: MetaPixelConfig = {
  pixelId: '984572183920194',
  customScript: `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '984572183920194');
fbq('track', 'PageView');
</script>
<!-- End Meta Pixel Code -->`,
  isEnabled: true,
};

// Initial participants for rich demo and admin testing
export const INITIAL_PARTICIPANTS: Participant[] = [
  {
    id: 'OAN-26-1001',
    registeredAt: '2026-09-20T08:30:00Z',
    fullName: 'Arsya Pratama Putra',
    parentName: 'Bambang Sudarmono, S.T.',
    category: 'A',
    subject: 'matematika',
    grade: 'Kelas 3 SD',
    schoolName: 'SDIT Al-Hikmah Jakarta',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    whatsapp: '081288991122',
    email: 'bambang.sudarmono@gmail.com',
    socialFollowed: true,
    simulationDone: true,
    simulationScore: 90,
    simulationDate: '2026-09-21T10:15:00Z',
    preliminaryDone: true,
    preliminaryScore: 95,
    preliminaryDate: '2026-09-23T09:00:00Z',
    isPassedPreliminary: true,
    finalTicketPaid: true,
    finalTicketPaidAt: '2026-09-24T14:20:00Z',
    finalDone: true,
    finalScore: 95,
    finalDate: '2026-09-25T11:00:00Z',
    medal: 'Emas',
  },
  {
    id: 'OAN-26-1002',
    registeredAt: '2026-09-21T09:15:00Z',
    fullName: 'Clara Aurelia Wijaya',
    parentName: 'dr. Hendra Wijaya',
    category: 'B',
    subject: 'ipa_sains',
    grade: 'Kelas 5 SD',
    schoolName: 'SD Santa Ursula Bandung',
    city: 'Bandung',
    province: 'Jawa Barat',
    whatsapp: '081399887766',
    email: 'hendra.wijaya@yahoo.com',
    socialFollowed: true,
    simulationDone: true,
    simulationScore: 85,
    simulationDate: '2026-09-22T14:30:00Z',
    preliminaryDone: true,
    preliminaryScore: 85,
    preliminaryDate: '2026-09-23T10:00:00Z',
    isPassedPreliminary: true,
    finalTicketPaid: true,
    finalTicketPaidAt: '2026-09-24T16:00:00Z',
    finalDone: true,
    finalScore: 85,
    finalDate: '2026-09-25T13:30:00Z',
    medal: 'Perak',
  },
  {
    id: 'OAN-26-1003',
    registeredAt: '2026-09-22T11:20:00Z',
    fullName: 'Faris Naufal Hidayat',
    parentName: 'Ibu Ratna Susanti, M.Pd.',
    category: 'C',
    subject: 'bahasa_inggris',
    grade: 'Kelas 8 SMP',
    schoolName: 'SMP Negeri 1 Surabaya',
    city: 'Surabaya',
    province: 'Jawa Timur',
    whatsapp: '081755443322',
    email: 'ratna.susanti@gmail.com',
    socialFollowed: true,
    simulationDone: true,
    simulationScore: 75,
    simulationDate: '2026-09-23T08:00:00Z',
    preliminaryDone: true,
    preliminaryScore: 80,
    preliminaryDate: '2026-09-24T09:30:00Z',
    isPassedPreliminary: true,
    finalTicketPaid: false, // Belum bayar tiket final (perlu follow-up)
    finalTicketPaidAt: null,
    finalDone: false,
    finalScore: null,
    finalDate: null,
    medal: null,
  },
  {
    id: 'OAN-26-1004',
    registeredAt: '2026-09-23T13:40:00Z',
    fullName: 'Nadia Salsabila Putri',
    parentName: 'Ahmad Fauzi',
    category: 'A',
    subject: 'bahasa_indonesia',
    grade: 'Kelas 2 SD',
    schoolName: 'MIN 1 Kota Semarang',
    city: 'Semarang',
    province: 'Jawa Tengah',
    whatsapp: '085211223344',
    email: 'ahmad.fauzi@gmail.com',
    socialFollowed: true,
    simulationDone: true,
    simulationScore: 65,
    simulationDate: '2026-09-24T10:00:00Z',
    preliminaryDone: false, // Belum ujian penyisihan (perlu reminder H-2/H-1)
    preliminaryScore: null,
    preliminaryDate: null,
    isPassedPreliminary: false,
    finalTicketPaid: false,
    finalTicketPaidAt: null,
    finalDone: false,
    finalScore: null,
    finalDate: null,
    medal: null,
  },
  {
    id: 'OAN-26-1005',
    registeredAt: '2026-09-24T15:10:00Z',
    fullName: 'Kenzo Alvaro Gunawan',
    parentName: 'Stevanus Gunawan',
    category: 'B',
    subject: 'matematika',
    grade: 'Kelas 4 SD',
    schoolName: 'SD Bina Nusantara Jakarta Barat',
    city: 'Jakarta Barat',
    province: 'DKI Jakarta',
    whatsapp: '081299001144',
    email: 'stevanus.g@gmail.com',
    socialFollowed: false, // Belum follow & belum simulasi (perlu follow up)
    simulationDone: false,
    simulationScore: null,
    simulationDate: null,
    preliminaryDone: false,
    preliminaryScore: null,
    preliminaryDate: null,
    isPassedPreliminary: false,
    finalTicketPaid: false,
    finalTicketPaidAt: null,
    finalDone: false,
    finalScore: null,
    finalDate: null,
    medal: null,
  },
];

// Rich Question Bank generator helper to ensure 20+ questions per subject/category
export function generateDefaultQuestionBank(): Question[] {
  const bank: Question[] = [];

  // Helper to add questions
  const addQ = (
    category: 'A' | 'B' | 'C',
    subject: 'matematika' | 'ipa_sains' | 'bahasa_inggris' | 'bahasa_indonesia',
    qText: string,
    options: string[],
    correctIndex: number,
    explanation: string
  ) => {
    bank.push({
      id: `Q-${category}-${subject}-${bank.length + 1}`,
      category,
      subject,
      questionText: qText,
      options,
      correctOptionIndex: correctIndex,
      explanation,
      points: 5,
    });
  };

  // --- KATEGORI A: MATEMATIKA (SD 1-3) ---
  addQ('A', 'matematika', 'Berapakah hasil dari 25 + 17 - 12?', ['28', '30', '32', '34'], 1, '25 + 17 = 42, kemudian 42 - 12 = 30.');
  addQ('A', 'matematika', 'Ibu membeli 3 kantong jeruk. Setiap kantong berisi 8 butir jeruk. Berapa total jeruk yang dibeli Ibu?', ['21', '24', '28', '32'], 1, '3 x 8 = 24 butir jeruk.');
  addQ('A', 'matematika', 'Bentuk bangun datar yang memiliki 3 sisi dan 3 titik sudut adalah...', ['Persegi', 'Segitiga', 'Lingkaran', 'Persegi Panjang'], 1, 'Segitiga memiliki 3 sisi dan 3 sudut.');
  addQ('A', 'matematika', 'Urutan bilangan dari yang terkecil: 87, 56, 92, 45, 68 adalah...', ['45, 56, 68, 87, 92', '45, 68, 56, 87, 92', '92, 87, 68, 56, 45', '56, 45, 68, 87, 92'], 0, 'Urutan terkecil ke terbesar dimulai dari 45 hingga 92.');
  addQ('A', 'matematika', 'Pukul berapakah jika jarum panjang menunjuk angka 12 dan jarum pendek menunjuk angka 4?', ['Pukul 12.00', 'Pukul 04.00', 'Pukul 04.12', 'Pukul 02.20'], 1, 'Jarum pendek menunjukkan jam (4) dan jarum panjang di 12 adalah tepat .00.');
  addQ('A', 'matematika', 'Riko memiliki 45 kelereng. Diberikan kepada adiknya 18 kelereng, lalu dibelikan lagi oleh ayahnya 10 kelereng. Berapa kelereng Riko sekarang?', ['37', '35', '27', '43'], 0, '45 - 18 = 27; 27 + 10 = 37.');
  addQ('A', 'matematika', 'Nilai tempat angka 7 pada bilangan 574 adalah...', ['Satuan', 'Puluhan', 'Ratusan', 'Ribuan'], 1, 'Angka 5 adalah ratusan, angka 7 adalah puluhan, angka 4 adalah satuan.');
  addQ('A', 'matematika', 'Berapakah hasil dari 7 x 6?', ['36', '40', '42', '48'], 2, '7 dikali 6 sama dengan 42.');
  addQ('A', 'matematika', 'Sebuah tali panjangnya 100 cm. Panjang tali tersebut setara dengan...', ['1 meter', '10 meter', '0.1 meter', '1000 meter'], 0, '1 meter = 100 cm.');
  addQ('A', 'matematika', 'Pola bilangan: 3, 6, 9, 12, ... Bilangan selanjutnya adalah...', ['14', '15', '16', '18'], 1, 'Pola ditambah 3 setiap langkah: 12 + 3 = 15.');
  addQ('A', 'matematika', 'Hasil pembagian dari 36 : 4 adalah...', ['7', '8', '9', '10'], 2, '36 dibagi 4 adalah 9.');
  addQ('A', 'matematika', 'Ayah berangkat kerja pukul 07.00 dan tiba di kantor pukul 07.45. Berapa menit lama perjalanan Ayah?', ['30 menit', '40 menit', '45 menit', '60 menit'], 2, 'Dari 07.00 ke 07.45 adalah 45 menit.');
  addQ('A', 'matematika', 'Sebuah persegi memiliki panjang sisi 6 cm. Berapakah keliling persegi tersebut?', ['12 cm', '18 cm', '24 cm', '36 cm'], 2, 'Keliling persegi = 4 x sisi = 4 x 6 cm = 24 cm.');
  addQ('A', 'matematika', 'Uang pecahan Rp 10.000 setara dengan berapa lembar uang Rp 2.000?', ['3 lembar', '4 lembar', '5 lembar', '6 lembar'], 2, '10.000 : 2.000 = 5 lembar.');
  addQ('A', 'matematika', 'Setengah dari 40 adalah...', ['10', '15', '20', '25'], 2, '40 : 2 = 20.');
  addQ('A', 'matematika', 'Manakah di bawah ini yang merupakan bilangan genap?', ['15', '21', '38', '43'], 2, '38 berakhiran angka genap (8).');
  addQ('A', 'matematika', 'Berapa banyak titik sudut pada bangun kubus?', ['4', '6', '8', '12'], 2, 'Kubus memiliki 8 buah titik sudut.');
  addQ('A', 'matematika', '15 + 25 + 35 = ...', ['65', '70', '75', '80'], 2, '15 + 25 = 40; 40 + 35 = 75.');
  addQ('A', 'matematika', 'Di sebuah taman ada 14 burung. Datang lagi 8 burung, lalu 5 burung terbang pergi. Berapa burung yang tersisa?', ['17 burung', '19 burung', '21 burung', '22 burung'], 0, '14 + 8 - 5 = 17 burung.');
  addQ('A', 'matematika', 'Jika hari ini adalah hari Rabu, maka 3 hari lagi adalah hari...', ['Kamis', 'Jumat', 'Sabtu', 'Minggu'], 2, 'Rabu + 3 hari = Kamis, Jumat, Sabtu.');

  // --- KATEGORI A: IPA/SAINS (SD 1-3) ---
  addQ('A', 'ipa_sains', 'Hewan yang berkembang biak dengan cara bertelur adalah...', ['Kucing', 'Sapi', 'Ayam', 'Kambing'], 2, 'Ayam adalah unggas yang berkembang biak dengan ovipar (bertelur).');
  addQ('A', 'ipa_sains', 'Bagian tumbuhan yang berfungsi menyerap air dan mineral dari dalam tanah adalah...', ['Daun', 'Batang', 'Akar', 'Bunga'], 2, 'Akar berfungsi menyerap air dan zat hara tanah.');
  addQ('A', 'ipa_sains', 'Benda yang dapat ditarik oleh magnet adalah...', ['Penggaris plastik', 'Paku besi', 'Kertas', 'Kayu'], 1, 'Besi adalah bahan feromagnetik yang dapat ditarik oleh magnet.');
  addQ('A', 'ipa_sains', 'Sumber energi panas dan cahaya terbesar bagi bumi adalah...', ['Bulan', 'Bintang', 'Matahari', 'Lampu'], 2, 'Matahari adalah sumber energi utama bagi bumi.');
  addQ('A', 'ipa_sains', 'Proses perubahan wujud dari air menjadi es batu disebut...', ['Mencair', 'Membeku', 'Menguap', 'Mengembun'], 1, 'Perubahan cair ke padat disebut membeku.');
  addQ('A', 'ipa_sains', 'Panca indra manusia yang berfungsi untuk mencium aroma atau bau adalah...', ['Mata', 'Hidung', 'Telinga', 'Lidah'], 1, 'Hidung adalah indra penciuman.');
  addQ('A', 'ipa_sains', 'Kucing bernapas menggunakan...', ['Insang', 'Paru-paru', 'Trakea', 'Kulit'], 1, 'Kucing termasuk mamalia yang bernapas dengan paru-paru.');
  addQ('A', 'ipa_sains', 'Benda langit yang tampak bersinar terang di malam hari namun memantulkan cahaya matahari adalah...', ['Matahari', 'Bulan', 'Komet', 'Awan'], 1, 'Bulan tidak menghasilkan cahaya sendiri melainkan memantulkan cahaya matahari.');
  addQ('A', 'ipa_sains', 'Zat cair memiliki sifat...', ['Bentuk dan volumenya selalu tetap', 'Bentuknya berubah mengikuti wadah, volume tetap', 'Bentuk dan volumenya selalu berubah', 'Keras dan tidak dapat mengalir'], 1, 'Zat cair bentuknya mengikuti wadah dengan volume tetap.');
  addQ('A', 'ipa_sains', 'Tumbuhan membuat makanannya sendiri melalui proses yang dinamakan...', ['Respirasi', 'Fotosintesis', 'Metamorfosis', 'Adaptasi'], 1, 'Fotosintesis adalah proses memasak makanan pada daun hijau.');
  addQ('A', 'ipa_sains', 'Hewan berikut yang mengalami metamorfosis sempurna adalah...', ['Kupu-kupu', 'Ayam', 'Kucing', 'Kambing'], 0, 'Kupu-kupu melewati telur - ulat - kepompong - kupu-kupu dewasa.');
  addQ('A', 'ipa_sains', 'Untuk menjaga kesehatan gigi, kita sebaiknya menyikat gigi minimal...', ['1 kali seminggu', '1 kali sebulan', '2 kali sehari', '5 kali setahun'], 2, 'Menyikat gigi minimal 2 kali sehari (pagi setelah makan dan malam sebelum tidur).');
  addQ('A', 'ipa_sains', 'Pelangi biasanya muncul di langit setelah...', ['Malam larut', 'Hujan disertai sinar matahari', 'Angin kencang di malam hari', 'Gempa bumi'], 1, 'Pelangi terbentuk akibat pembiasan sinar matahari pada butir-butir air hujan.');
  addQ('A', 'ipa_sains', 'Udara yang kita hirup saat bernapas mengandung gas penting yaitu...', ['Oksigen', 'Karbon monoksida', 'Helium', 'Metana'], 0, 'Oksigen (O2) digunakan oleh tubuh untuk bernapas.');
  addQ('A', 'ipa_sains', 'Hewan pemakan tumbuhan disebut...', ['Karnivora', 'Herbivora', 'Omnivora', 'Insektivora'], 1, 'Herbivora adalah kelompok hewan pemakan tumbuhan seperti sapi dan kambing.');
  addQ('A', 'ipa_sains', 'Bunyi dihasilkan dari benda yang...', ['Diam', 'Bergetar', 'Dingin', 'Panas'], 1, 'Segala benda yang bergetar akan menghasilkan gelombang bunyi.');
  addQ('A', 'ipa_sains', 'Bagian tubuh ikan yang membantunya berenang dan bermanuver di air adalah...', ['Insang', 'Sisik', 'Sirip', 'Mata'], 2, 'Sirip dan ekor ikan digunakan untuk berenang.');
  addQ('A', 'ipa_sains', 'Benda yang tidak tembus cahaya akan menghasilkan...', ['Listrik', 'Bayangan', 'Api', 'Asap'], 1, 'Cahaya yang terhalang benda gelap membentuk bayangan.');
  addQ('A', 'ipa_sains', 'Contoh tumbuhan yang menyimpan cadangan makanannya pada umbi akar adalah...', ['Wortel', 'Mangga', 'Kelapa', 'Jagung'], 0, 'Wortel menyimpan cadangan makanan di umbi akar.');
  addQ('A', 'ipa_sains', 'Sampah daun kering dan sisa sayuran termasuk jenis sampah...', ['Anorganik', 'Organik', 'Elektronik', 'B3'], 1, 'Sampah organik berasal dari makhluk hidup dan dapat terurai secara alami.');

  // --- KATEGORI A: BAHASA INGGRIS (SD 1-3) ---
  addQ('A', 'bahasa_inggris', 'What is the color of the sun?', ['Blue', 'Yellow', 'Green', 'Purple'], 1, 'The sun is typically perceived as yellow.');
  addQ('A', 'bahasa_inggris', 'How do you say "Terima kasih" in English?', ['Good morning', 'I am sorry', 'Thank you', 'Goodbye'], 2, 'Terima kasih in English is "Thank you".');
  addQ('A', 'bahasa_inggris', 'Which animal can fly in the sky?', ['Elephant', 'Bird', 'Crocodile', 'Tiger'], 1, 'Birds have wings and can fly.');
  addQ('A', 'bahasa_inggris', '"I have two ..." (used for seeing).', ['ears', 'eyes', 'hands', 'noses'], 1, 'We use our eyes to see.');
  addQ('A', 'bahasa_inggris', 'What day comes after Monday?', ['Sunday', 'Tuesday', 'Wednesday', 'Friday'], 1, 'Tuesday comes right after Monday.');
  addQ('A', 'bahasa_inggris', 'Look at the word: "A - P - P - L - E". Apple is a kind of...', ['Animal', 'Fruit', 'Vehicle', 'Sport'], 1, 'Apple is a healthy fruit.');
  addQ('A', 'bahasa_inggris', 'What is the opposite of "BIG"?', ['Tall', 'Small', 'Fast', 'Heavy'], 1, 'The opposite of big is small.');
  addQ('A', 'bahasa_inggris', '"Good ..." is said when greeting someone at 7 o\'clock in the morning.', ['Night', 'Afternoon', 'Morning', 'Evening'], 2, 'Good morning is used in the morning.');
  addQ('A', 'bahasa_inggris', 'How many fingers do you have on both hands?', ['Five', 'Ten', 'Twelve', 'Twenty'], 1, 'Humans have 10 fingers on both hands.');
  addQ('A', 'bahasa_inggris', 'Choose the correct sentence: "She ... a glass of milk."', ['drink', 'drinks', 'drinking', 'dranked'], 1, 'For third-person singular "She", the verb takes -s: "drinks".');
  addQ('A', 'bahasa_inggris', 'What do we use to write on a notebook?', ['Pencil', 'Spoon', 'Mirror', 'Towel'], 0, 'We write with a pencil or pen.');
  addQ('A', 'bahasa_inggris', '"The cat is sleeping ... the chair."', ['under', 'between', 'among', 'into'], 0, '"Under the chair" is a natural preposition of place.');
  addQ('A', 'bahasa_inggris', 'What is the English word for "Sekolah"?', ['Hospital', 'School', 'Market', 'Library'], 1, 'Sekolah is school.');
  addQ('A', 'bahasa_inggris', 'Which number is spelled as "FOURTEEN"?', ['4', '14', '40', '44'], 1, '14 is fourteen.');
  addQ('A', 'bahasa_inggris', 'What is an elephant known for?', ['Long trunk', 'Sharp beak', 'Feathers', 'Scales'], 0, 'Elephants have a distinctive long trunk.');
  addQ('A', 'bahasa_inggris', 'Complete the sentence: "My brother likes to ... soccer."', ['play', 'eat', 'read', 'draw'], 0, 'You play soccer.');
  addQ('A', 'bahasa_inggris', 'Which of these is a vehicle that drives on roads?', ['Submarine', 'Car', 'Helicopter', 'Rocket'], 1, 'A car drives on roads.');
  addQ('A', 'bahasa_inggris', '"Happy Birthday to you!" is sung during a...', ['Wedding', 'Birthday party', 'Farewell', 'Competition'], 1, 'It is sung at a birthday party.');
  addQ('A', 'bahasa_inggris', 'What is the color of grass?', ['Red', 'Green', 'Black', 'Pink'], 1, 'Grass is usually green.');
  addQ('A', 'bahasa_inggris', '"This is ... umbrella." Choose the correct article.', ['a', 'an', 'the two', 'many'], 1, 'Umbrella starts with a vowel sound, so we use "an".');

  // --- KATEGORI A: BAHASA INDONESIA (SD 1-3) ---
  addQ('A', 'bahasa_indonesia', 'Lawan kata dari kata "RAJIN" adalah...', ['Pintar', 'Malas', 'Cepat', 'Hemat'], 1, 'Lawan kata (antonim) rajin adalah malas.');
  addQ('A', 'bahasa_indonesia', 'Penulisan huruf kapital yang benar untuk nama kota adalah...', ['kota surabaya', 'Kota Surabaya', 'kota Surabaya', 'KOTA surabaya'], 1, 'Nama kota diawali huruf kapital: Kota Surabaya.');
  addQ('A', 'bahasa_indonesia', 'Tanda baca yang digunakan untuk mengakhiri kalimat tanya adalah...', ['Tanda titik (.)', 'Tanda seru (!)', 'Tanda tanya (?)', 'Tanda koma (,)'], 2, 'Kalimat tanya diakhiri dengan tanda tanya (?).');
  addQ('A', 'bahasa_indonesia', 'Ungkapan "Kutu buku" memiliki arti...', ['Orang yang memelihara kutu', 'Orang yang sangat gemar membaca buku', 'Buku yang kotor', 'Penjual buku keliling'], 1, 'Kutu buku adalah kiasan untuk orang yang senang membaca buku.');
  addQ('A', 'bahasa_indonesia', 'Susunan kalimat yang tepat dari kata acak: "bermain - di lapangan - Budi - bola" adalah...', ['Budi bermain bola di lapangan.', 'Di lapangan bola Budi bermain.', 'Bermain Budi bola di lapangan.', 'Bola Budi bermain di lapangan.'], 0, 'Struktur Subjek + Predikat + Objek + Keterangan.');
  addQ('A', 'bahasa_indonesia', 'Dongeng yang tokoh-tokoh utamanya adalah binatang yang bisa berbicara dinamakan...', ['Fabel', 'Legenda', 'Mite', 'Sage'], 0, 'Fabel adalah cerita fiksi bertokoh binatang.');
  addQ('A', 'bahasa_indonesia', 'Kata tanya yang digunakan untuk menanyakan tempat adalah...', ['Kapan', 'Siapa', 'Di mana', 'Berapa'], 2, 'Di mana digunakan untuk menanyakan tempat atau lokasi.');
  addQ('A', 'bahasa_indonesia', 'Persamaan kata (sinonim) dari "indah" adalah...', ['Buruk', 'Elok', 'Gelap', 'Kecil'], 1, 'Sinonim indah adalah elok atau molek.');
  addQ('A', 'bahasa_indonesia', 'Ibu memasak nasi di dapur. Kata "memasak" berkedudukan sebagai...', ['Subjek', 'Predikat', 'Objek', 'Keterangan'], 1, 'Memasak adalah kata kerja yang berperan sebagai predikat.');
  addQ('A', 'bahasa_indonesia', 'Ungkapan "Panjang tangan" memiliki arti...', ['Suka menolong', 'Suka mencuri', 'Tangannya tinggi', 'Suka memberi'], 1, 'Panjang tangan bermakna suka mengambil milik orang lain (mencuri).');
  addQ('A', 'bahasa_indonesia', 'Budi menolong temannya yang terjatuh. Sikap Budi mencerminkan sifat...', ['Sombong', 'Peduli', 'Kikir', 'Penakut'], 1, 'Menolong teman adalah bentuk kepedulian terhadap sesama.');
  addQ('A', 'bahasa_indonesia', 'Kalimat berikut yang merupakan kalimat perintah adalah...', ['Di mana rumahmu?', 'Tolong ambilkan buku itu!', 'Hari ini cuaca cerah.', 'Saya suka makan buah.'], 1, 'Kalimat perintah ditandai kata tolong dan tanda seru (!).');
  addQ('A', 'bahasa_indonesia', 'Bait dalam pantun umumnya terdiri dari berapa baris?', ['2 baris', '4 baris', '6 baris', '8 baris'], 1, 'Satu bait pantun umumnya terdiri atas 4 baris.');
  addQ('A', 'bahasa_indonesia', 'Kata dasar dari "menari" adalah...', ['Menar', 'Tari', 'Nari', 'Tarian'], 1, 'Imbuhan me- + kata dasar tari = menari.');
  addQ('A', 'bahasa_indonesia', 'Arti dari peribahasa "Rajin pangkal pandai, hemat pangkal..." adalah...', ['Kaya', 'Sombong', 'Miskin', 'Bagus'], 0, 'Peribahasa lengkapnya: hemat pangkal kaya.');
  addQ('A', 'bahasa_indonesia', 'Simbol negara Indonesia adalah burung...', ['Merpati', 'Garuda', 'Elang', 'Cendrawasih'], 1, 'Garuda Pancasila adalah lambang negara Indonesia.');
  addQ('A', 'bahasa_indonesia', 'Kata baku dari "jadwal" atau "jadual" adalah...', ['Jadwal', 'Jadual', 'Jatwal', 'Djadwal'], 0, 'Kata baku menurut KBBI adalah "jadwal".');
  addQ('A', 'bahasa_indonesia', 'Pesan moral yang terdapat dalam sebuah cerita disebut...', ['Alur', 'Amanat', 'Latar', 'Tokoh'], 1, 'Amanat adalah pesan kebaikan yang disampaikan penulis.');
  addQ('A', 'bahasa_indonesia', 'Lengkapilah kalimat: "Siti ... bunga di taman setiap sore."', ['memetik', 'menyiram', 'membuang', 'menginjak'], 1, 'Menyiram bunga adalah tindakan merawat tanaman yang baik.');
  addQ('A', 'bahasa_indonesia', 'Penggunaan kata depan "di" yang tepat dipisah adalah...', ['dimakan', 'dirumah', 'di sekolah', 'ditulis'], 2, 'Kata depan penunjuk tempat seperti "di sekolah" ditulis terpisah.');

  // --- KATEGORI B: MATEMATIKA (SD 4-6) ---
  addQ('B', 'matematika', 'FPB dari bilangan 24 dan 36 adalah...', ['6', '8', '12', '18'], 2, 'Faktor 24: 1,2,3,4,6,8,12,24; faktor 36: 1,2,3,4,6,9,12,18,36. FPB = 12.');
  addQ('B', 'matematika', 'KPK dari bilangan 12 dan 18 adalah...', ['24', '36', '48', '72'], 1, 'Kelipatan 12: 12,24,36; kelipatan 18: 18,36. KPK = 36.');
  addQ('B', 'matematika', 'Hasil dari 3/4 + 2/5 adalah...', ['5/9', '23/20', '13/20', '17/20'], 1, 'Samakan penyebut ke 20: 15/20 + 8/20 = 23/20 atau 1 3/20.');
  addQ('B', 'matematika', 'Sebuah bak penampungan air berbentuk kubus memiliki panjang rusuk 80 cm. Volume bak air tersebut dalam liter adalah...', ['51,2 liter', '512 liter', '5.120 liter', '51.200 liter'], 1, 'Volume = 80 x 80 x 80 = 512.000 cm3. 1 liter = 1.000 cm3, jadi 512 liter.');
  addQ('B', 'matematika', 'Sebuah mobil melaju dengan kecepatan rata-rata 60 km/jam selama 2 jam 30 menit. Jarak yang ditempuh mobil adalah...', ['120 km', '140 km', '150 km', '180 km'], 2, 'Waktu = 2.5 jam. Jarak = Kecepatan x Waktu = 60 x 2.5 = 150 km.');
  addQ('B', 'matematika', 'Luas lingkaran dengan diameter 28 cm (pi = 22/7) adalah...', ['308 cm²', '616 cm²', '88 cm²', '1.232 cm²'], 1, 'Jari-jari r = 14 cm. Luas = 22/7 x 14 x 14 = 616 cm².');
  addQ('B', 'matematika', 'Berapakah 25% dari Rp 240.000?', ['Rp 50.000', 'Rp 60.000', 'Rp 70.000', 'Rp 80.000'], 1, '25/100 x 240.000 = 60.000.');
  addQ('B', 'matematika', 'Nilai rata-rata dari data: 7, 8, 9, 6, 8, 10 adalah...', ['7.5', '8.0', '8.2', '8.5'], 1, 'Jumlah = 48 dibagi 6 data = 8.0.');
  addQ('B', 'matematika', 'Sebuah peta memiliki skala 1 : 500.000. Jika jarak dua kota pada peta 4 cm, jarak sebenarnya adalah...', ['2 km', '20 km', '200 km', '2.000 km'], 1, 'Jarak sebenarnya = 4 x 500.000 cm = 2.000.000 cm = 20 km.');
  addQ('B', 'matematika', 'Hasil dari (-15) + 28 - (-7) adalah...', ['20', '36', '42', '50'], 3, '(-15) + 28 = 13; 13 - (-7) = 13 + 7 = 20.');
  addQ('B', 'matematika', 'Hasil dari 12² + √144 adalah...', ['144', '156', '168', '180'], 1, '12² = 144 dan √144 = 12. 144 + 12 = 156.');
  addQ('B', 'matematika', 'Perbandingan umur Ani dan Budi adalah 3 : 5. Jika jumlah umur keduanya 24 tahun, umur Budi adalah...', ['9 tahun', '12 tahun', '15 tahun', '18 tahun'], 2, 'Umur Budi = 5/(3+5) x 24 = 5/8 x 24 = 15 tahun.');
  addQ('B', 'matematika', 'Berapakah hasil dari 2,5 x 0,4?', ['0,1', '1,0', '10', '0,01'], 1, '25/10 x 4/10 = 100/100 = 1,0.');
  addQ('B', 'matematika', 'Besar sudut satu putaran penuh adalah...', ['90°', '180°', '270°', '360°'], 3, 'Satu putaran lingkaran penuh bernilai 360 derajat.');
  addQ('B', 'matematika', 'Sebuah trapesium memiliki sisi sejajar 10 cm dan 14 cm dengan tinggi 8 cm. Luas trapesium adalah...', ['96 cm²', '104 cm²', '112 cm²', '192 cm²'], 0, 'Luas = (1/2) x (10 + 14) x 8 = 1/2 x 24 x 8 = 96 cm².');
  addQ('B', 'matematika', 'Banyaknya simetri lipat pada persegi adalah...', ['2', '4', '6', '8'], 1, 'Persegi memiliki 4 simetri lipat dan 4 simetri putar.');
  addQ('B', 'matematika', 'Pak Rudi membeli 2 kodi baju. Jumlah seluruh baju yang dibeli adalah...', ['24 buah', '40 buah', '100 buah', '144 buah'], 1, '1 kodi = 20 buah. 2 kodi = 40 buah.');
  addQ('B', 'matematika', 'Bentuk desimal dari pecahan 3/8 adalah...', ['0,375', '0,35', '0,425', '0,625'], 0, '3 dibagi 8 adalah 0,375.');
  addQ('B', 'matematika', 'Volume tabung dengan jari-jari 7 cm dan tinggi 10 cm adalah...', ['1.450 cm³', '1.540 cm³', '1.680 cm³', '2.140 cm³'], 1, 'Volume = 22/7 x 7 x 7 x 10 = 1.540 cm³.');
  addQ('B', 'matematika', 'Berapa banyak rusuk pada bangun prisma segitiga?', ['6', '8', '9', '12'], 2, 'Prisma segitiga memiliki 9 rusuk, 5 sisi, dan 6 titik sudut.');

  // --- KATEGORI B: IPA/SAINS (SD 4-6) ---
  addQ('B', 'ipa_sains', 'Planet terbesar dalam tata surya kita adalah...', ['Mars', 'Bumi', 'Saturnus', 'Yupiter'], 3, 'Yupiter adalah planet terbesar dengan diameter sekitar 142.984 km.');
  addQ('B', 'ipa_sains', 'Peristiwa perpindahan panas secara merambat melalui zat padat tanpa disertai perpindahan partikelnya disebut...', ['Konduksi', 'Konveksi', 'Radiasi', 'Evaporasi'], 0, 'Konduksi adalah hantaran panas pada zat padat.');
  addQ('B', 'ipa_sains', 'Hubungan simbiosis antara lebah madu dan bunga mawar adalah simbiosis...', ['Parasitisme', 'Komensalisme', 'Mutualisme', 'Amensalisme'], 2, 'Saling menguntungkan: lebah mendapat nektar dan bunga dibantu penyerbukannya.');
  addQ('B', 'ipa_sains', 'Lapisan atmosfer bumi yang berfungsi menyaring radiasi ultraviolet berbahaya dari matahari adalah...', ['Troposfer', 'Lapisan Ozon di Stratosfer', 'Mesosfer', 'Termosfer'], 1, 'Ozon (O3) di stratosfer menyerap sinar UV.');
  addQ('B', 'ipa_sains', 'Organ peredaran darah manusia yang memompa darah ke seluruh tubuh adalah...', ['Paru-paru', 'Jantung', 'Hati', 'Ginjal'], 1, 'Jantung berfungsi memompa darah kaya oksigen ke seluruh tubuh.');
  addQ('B', 'ipa_sains', 'Contoh perpindahan energi panas secara radiasi adalah...', ['Air yang mendidih di panci', 'Sendok logam terasa panas saat mengaduk teh', 'Panas matahari sampai ke bumi', 'Terjadinya angin darat dan laut'], 2, 'Radiasi adalah pancaran gelombang elektromagnetik tanpa medium.');
  addQ('B', 'ipa_sains', 'Bunglon mempertahankan diri dari musuhnya dengan cara mengubah warna kulitnya sesuai lingkungan. Kemampuan ini disebut...', ['Kamuflase', 'Mimikri', 'Autotomi', 'Ekolokasi'], 1, 'Mimikri adalah kemampuan mengubah warna kulit untuk berbaur.');
  addQ('B', 'ipa_sains', 'Kelelawar dapat terbang dan mencari mangsa di malam hari tanpa menabrak karena memiliki kemampuan...', ['Mimikri', 'Autotomi', 'Ekolokasi', 'Fotosintesis'], 2, 'Ekolokasi memanfaatkan pantulan gelombang ultrasonik.');
  addQ('B', 'ipa_sains', 'Bagian mata yang berfungsi mengatur banyaknya cahaya yang masuk ke mata adalah...', ['Kornea', 'Pupil', 'Retina', 'Lensa'], 1, 'Pupil membesar dan mengecil untuk mengatur intensitas cahaya.');
  addQ('B', 'ipa_sains', 'Perubahan wujud zat dari gas menjadi cair dinamakan...', ['Menguap', 'Mengembun', 'Menyublim', 'Mengkristal'], 1, 'Gas ke cair disebut mengembun (kondensasi).');
  addQ('B', 'ipa_sains', 'Contoh sumber energi terbarukan (ramah lingkungan) adalah...', ['Minyak bumi', 'Batu bara', 'Tenaga surya dan angin', 'Gas alam cair'], 2, 'Matahari, angin, dan air adalah energi terbarukan.');
  addQ('B', 'ipa_sains', 'Alat perkembangbiakan generatif pada tumbuhan berbunga adalah...', ['Akar dan daun', 'Putik dan benang sari', 'Batang dan tunas', 'Spora dan rhizoma'], 1, 'Putik adalah alat kelamin betina dan benang sari alat kelamin jantan.');
  addQ('B', 'ipa_sains', 'Pembelokan arah rambat cahaya ketika melewati dua medium yang kerapatannya berbeda disebut...', ['Pemantulan', 'Pembiasan', 'Penguraian', 'Penyerapan'], 1, 'Pembiasan cahaya (refraksi) membuat sendok terlihat patah di dalam gelas berisi air.');
  addQ('B', 'ipa_sains', 'Hewan yang membantu proses penyerbukan pada tanaman vanili secara alami di Meksiko adalah...', ['Semut rangrang', 'Lebah Melipona', 'Katak pohon', 'Burung elang'], 1, 'Lebah Melipona adalah penyerbuk alami tanaman vanili.');
  addQ('B', 'ipa_sains', 'Organ pencernaan yang berfungsi menyerap sari-sari makanan ke dalam aliran darah adalah...', ['Lambung', 'Usus halus', 'Usus besar', 'Kerongkongan'], 1, 'Usus halus menyerap nutrisi melalui vili usus.');
  addQ('B', 'ipa_sains', 'Gaya yang bekerja saat kita mengerem sepeda adalah...', ['Gaya pegas', 'Gaya gesek', 'Gaya magnet', 'Gaya gravitasi'], 1, 'Gesekan antara karet rem dan velg roda memperlambat laju sepeda.');
  addQ('B', 'ipa_sains', 'Peristiwa rotasi bumi menyebabkan terjadinya...', ['Pergantian musim', 'Pergantian siang dan malam', 'Gerhana matahari', 'Pasang surut air laut bulanan'], 1, 'Rotasi bumi pada porosnya selama 24 jam mengakibatkan pergantian siang dan malam.');
  addQ('B', 'ipa_sains', 'Gas buang kendaraan bermotor yang sangat beracun dan dapat mengikat hemoglobin dalam darah adalah...', ['Oksigen', 'Karbon monoksida (CO)', 'Nitrogen', 'Hidrogen'], 1, 'Karbon monoksida (CO) mengikat hemoglobin lebih kuat dibanding oksigen.');
  addQ('B', 'ipa_sains', 'Cacing tanah bernapas menggunakan...', ['Paru-paru', 'Insang', 'Permukaan kulit yang lembap', 'Trakea'], 2, 'Cacing tanah bernapas lewat difusi oksigen pada kulit basah.');
  addQ('B', 'ipa_sains', 'Baterai mengubah energi ... menjadi energi listrik.', ['Kimia', 'Panas', 'Kinetik', 'Nuklir'], 0, 'Reaksi kimia di dalam baterai menghasilkan arus listrik.');

  // --- KATEGORI B: BAHASA INGGRIS (SD 4-6) ---
  addQ('B', 'bahasa_inggris', 'Choose the correct superlative form: "Mount Everest is the ... mountain in the world."', ['high', 'higher', 'highest', 'most high'], 2, 'Superlative form of one-syllable adjective "high" is "highest".');
  addQ('B', 'bahasa_inggris', '"They ... playing football in the field right now."', ['is', 'are', 'was', 'am'], 1, 'Subject "They" takes "are" in present continuous tense.');
  addQ('B', 'bahasa_inggris', 'What is the past tense (verb 2) of "GO"?', ['Goed', 'Gone', 'Went', 'Goes'], 2, 'The irregular simple past tense of "go" is "went".');
  addQ('B', 'bahasa_inggris', 'Which sentence uses correct punctuation?', ['Where do you live.', 'Where do you live?', 'Where do you live!', 'Where do you live,'], 1, 'Questions must end with a question mark.');
  addQ('B', 'bahasa_inggris', '"I am thirsty. I need a glass of ..."', ['bread', 'water', 'rice', 'meat'], 1, 'When thirsty, one needs a drink like water.');
  addQ('B', 'bahasa_inggris', 'The synonym of "QUICK" is...', ['Slow', 'Fast', 'Late', 'Heavy'], 1, 'Quick means fast or rapid.');
  addQ('B', 'bahasa_inggris', '"Rani is smarter ... her brother." The correct conjunction is...', ['than', 'then', 'that', 'from'], 0, 'Comparative degrees use "than" (smarter than).');
  addQ('B', 'bahasa_inggris', 'A person who cooks delicious food in a restaurant is called a...', ['Doctor', 'Pilot', 'Chef', 'Dentist'], 2, 'A professional cook in a restaurant is a chef.');
  addQ('B', 'bahasa_inggris', 'Which word is a noun?', ['Beautifully', 'Run', 'Happiness', 'Quickly'], 2, 'Happiness is an abstract noun.');
  addQ('B', 'bahasa_inggris', '"We will visit our grandparents ... Sunday."', ['at', 'on', 'in', 'to'], 1, 'We use "on" for specific days of the week.');
  addQ('B', 'bahasa_inggris', 'What is the plural form of "CHILD"?', ['Childs', 'Children', 'Childrens', 'Childes'], 1, 'Child has the irregular plural "children".');
  addQ('B', 'bahasa_inggris', 'Complete the sentence: "If it rains, I will bring an ..."', ['blanket', 'umbrella', 'sunglasses', 'ice cream'], 1, 'An umbrella protects from rain.');
  addQ('B', 'bahasa_inggris', 'Rearrange into good sentence: "always / he / his teeth / brushes / before bed"', ['He brushes his teeth always before bed.', 'He always brushes his teeth before bed.', 'Always he brushes his teeth before bed.', 'He his teeth always brushes before bed.'], 1, 'Adverbs of frequency come before the main verb.');
  addQ('B', 'bahasa_inggris', '"This book belongs to me. It is ..."', ['mine', 'my', 'me', 'myself'], 0, 'Possessive pronoun for "belong to me" is "mine".');
  addQ('B', 'bahasa_inggris', 'Which of these is healthy breakfast food?', ['French fries with soda', 'Oatmeal with fresh fruits', 'Spicy chips', 'Candy and chocolate'], 1, 'Oatmeal with fresh fruits provides balanced nutrients.');
  addQ('B', 'bahasa_inggris', 'What is the opposite of "CHEAP"?', ['Expensive', 'Easy', 'Clean', 'Narrow'], 0, 'The opposite of cheap is expensive.');
  addQ('B', 'bahasa_inggris', '"She doesn\'t ... meat because she is a vegetarian."', ['eat', 'eats', 'eating', 'ate'], 0, 'After auxiliary "doesn\'t", the base form of the verb is used.');
  addQ('B', 'bahasa_inggris', 'How many months are there in a year?', ['Ten', 'Eleven', 'Twelve', 'Fourteen'], 2, 'There are 12 months in a calendar year.');
  addQ('B', 'bahasa_inggris', 'A place where books are kept for people to read and borrow is a...', ['Supermarket', 'Library', 'Bakery', 'Cinema'], 1, 'A library is for reading and borrowing books.');
  addQ('B', 'bahasa_inggris', 'Choose the correct question tag: "You can swim, ...?"', ['can you', 'can\'t you', 'do you', 'don\'t you'], 1, 'Positive statement takes negative tag: "can\'t you?".');

  // --- KATEGORI B: BAHASA INDONESIA (SD 4-6) ---
  addQ('B', 'bahasa_indonesia', 'Ide pokok yang menjadi inti pembahasan dalam sebuah paragraf disebut...', ['Kalimat penjelas', 'Gagasan utama (pikiran pokok)', 'Kata kunci', 'Latar cerita'], 1, 'Gagasan utama atau pikiran pokok adalah inti permasalahan.');
  addQ('B', 'bahasa_indonesia', 'Kalimat yang menggunakan kata penghubung sebab-akibat yang tepat adalah...', ['Ia tidak masuk sekolah karena demam tinggi.', 'Ia belajar giat meskipun malas.', 'Ibu pergi ke pasar atau ke kantor.', 'Ayah membaca koran sambil tidur.'], 0, '"Karena" adalah konjungsi kausalitas/sebab-akibat.');
  addQ('B', 'bahasa_indonesia', 'Kata baku dari "praktek" dan "antri" adalah...', ['Praktik dan antre', 'Praktek dan antri', 'Praktik dan antri', 'Praktek dan antre'], 0, 'Bentuk baku menurut KBBI adalah "praktik" dan "antre".');
  addQ('B', 'bahasa_indonesia', 'Gaya bahasa yang membandingkan benda mati seolah-olah memiliki sifat hidup seperti manusia disebut majas...', ['Metafora', 'Personifikasi', 'Hiperbola', 'Litotes'], 1, 'Personifikasi menginsankan benda mati, contoh: "angin berbisik".');
  addQ('B', 'bahasa_indonesia', 'Peribahasa "Air beriak tanda tak dalam" bermakna...', ['Orang yang banyak bicara biasanya kurang ilmunya', 'Orang pendiam selalu berbahaya', 'Air yang mengalir sangat jernih', 'Danau yang dalam tidak berombak'], 0, 'Maknanya orang yang banyak cakap biasanya tidak berilmu.');
  addQ('B', 'bahasa_indonesia', 'Sinonim dari kata "evaluasi" dalam konteks penilaian belajar adalah...', ['Pengabaian', 'Penilaian / pengujian', 'Penciptaan', 'Penerbitan'], 1, 'Evaluasi berarti asesmen, penilaian, atau telaah hasil.');
  addQ('B', 'bahasa_indonesia', 'Rima akhir pada pantun yang lazim adalah berpola...', ['a - a - a - a', 'a - b - a - b', 'a - a - b - b', 'b - b - a - a'], 1, 'Pantun klasik berpola sajak silang a-b-a-b.');
  addQ('B', 'bahasa_indonesia', 'Teks yang berisi petunjuk langkah-langkah dalam membuat atau melakukan sesuatu disebut teks...', ['Narasi', 'Prosedur', 'Deskripsi', 'Eksposisi'], 1, 'Teks prosedur memuat langkah-langkah kerja berurutan.');
  addQ('B', 'bahasa_indonesia', 'Penulisan rupiah yang benar menurut kaidah PUEBI adalah...', ['Rp. 50.000,-', 'Rp 50.000,00', 'RP 50.000', 'Rp50.000.-'], 1, 'Rp tanpa titik dan spasi, disertai nilai dan desimal ,00.');
  addQ('B', 'bahasa_indonesia', 'Kalimat berikut yang merupakan fakta adalah...', ['Bunga mawar merah adalah bunga tercantik di dunia.', 'Indonesia memproklamasikan kemerdekaannya pada 17 Agustus 1945.', 'Matematika adalah pelajaran yang paling membosankan.', 'Liburan ke pantai lebih seru daripada ke gunung.'], 1, 'Tanggal proklamasi adalah fakta historis nyata yang dapat diverifikasi.');
  addQ('B', 'bahasa_indonesia', 'Antonim dari kata "skeptis" (ragu-ragu) adalah...', ['Yakin / optimis', 'Bimbang', 'Acuh', 'Marah'], 0, 'Skeptis bermakna meragukan, lawannya adalah yakin.');
  addQ('B', 'bahasa_indonesia', 'Tokoh utama yang berwatak baik dalam cerita disebut tokoh...', ['Antagonis', 'Protagonis', 'Tritagonis', 'Figuran'], 1, 'Protagonis adalah karakter sentral dengan sifat positif.');
  addQ('B', 'bahasa_indonesia', 'Kata berimbuhan "ter-" yang bermakna paling (superlatif) adalah...', ['Tertinggi', 'Tertawa', 'Terbawa', 'Terbakar'], 0, 'Tertinggi bermakna paling tinggi.');
  addQ('B', 'bahasa_indonesia', 'Laporan yang dibuat setelah mengamati objek secara cermat dinamakan teks laporan hasil...', ['Wawancara', 'Observasi', 'Eksperimen fiktif', 'Curahan hati'], 1, 'Teks Laporan Hasil Observasi (LHO).');
  addQ('B', 'bahasa_indonesia', 'Ungkapan "Kambing hitam" bermakna...', ['Hewan peliharaan', 'Orang yang dipersalahkan atas kesalahan orang lain', 'Orang yang berkulit gelap', 'Penjual hewan kurban'], 1, 'Kambing hitam adalah pihak yang dijadikan tumpuan kesalahan.');
  addQ('B', 'bahasa_indonesia', 'Tanda petik ganda ("...") dalam penulisan bahasa Indonesia digunakan untuk mengapit...', ['Petikan langsung dari pembicaraan seseorang', 'Keterangan tambahan', 'Nama kota dan negara', 'Singkatan gelar sarjana'], 0, 'Tanda petik mengapit petikan kalimat langsung.');
  addQ('B', 'bahasa_indonesia', 'Budi menabung uang di bank. Kata "uang" menduduki fungsi sintaksis sebagai...', ['Subjek', 'Predikat', 'Objek', 'Pelengkap'], 2, 'Menabung (P) + uang (O).');
  addQ('B', 'bahasa_indonesia', 'Kata serapan yang tepat untuk istilah "system" adalah...', ['Sistim', 'Sistem', 'Sistematik', 'Cistem'], 1, 'Bentuk baku serapan adalah "sistem".');
  addQ('B', 'bahasa_indonesia', 'Slogan yang efektif untuk pelestarian hutan adalah...', ['Hutan gundul banjir melanda, hijaukan bumiku demi anak cucu!', 'Beli kayu murah sekarang juga!', 'Tebang pohon sebanyak mungkin.', 'Hutan adalah tempat yang menakutkan.'], 0, 'Slogan persuasif mengajak pelestarian lingkungan.');
  addQ('B', 'bahasa_indonesia', 'Majas hiperbola terlihat pada kalimat...', ['Wajahnya bagaikan bulan purnama.', 'Air matanya mengalir menganak sungai mendengar berita duka itu.', 'Pena menari-nari di atas lembaran kertas.', 'Rumah gubuk ini tempat berteduh kami.'], 1, 'Air mata menganak sungai adalah ungkapan melebih-lebihkan (hiperbola).');

  // --- KATEGORI C: SMP (KELAS 7-9) ---
  // Matematika SMP
  addQ('C', 'matematika', 'Bentuk sederhana dari 3(2x - 5) - 4(x - 2) adalah...', ['2x - 7', '2x + 7', '2x - 23', '10x - 23'], 0, '6x - 15 - 4x + 8 = 2x - 7.');
  addQ('C', 'matematika', 'Himpunan penyelesaian dari pertidaksamaan 2x - 6 < 4x + 2 untuk x bilangan bulat adalah...', ['x > -4', 'x < -4', 'x > 4', 'x < 4'], 0, '2x - 4x < 2 + 6 => -2x < 8 => x > -4.');
  addQ('C', 'matematika', 'Persamaan kuadrat x² - 5x + 6 = 0 memiliki akar-akar x1 dan x2. Nilai x1 dan x2 adalah...', ['x = 1 atau x = 6', 'x = 2 atau x = 3', 'x = -2 atau x = -3', 'x = -1 atau x = -6'], 1, '(x - 2)(x - 3) = 0 sehingga x = 2 atau x = 3.');
  addQ('C', 'matematika', 'Sebuah segitiga siku-siku memiliki panjang sisi tegak 9 cm dan 12 cm. Panjang hipotenusa (sisi miring) segitiga tersebut adalah...', ['13 cm', '15 cm', '17 cm', '20 cm'], 1, 'Teorema Pythagoras: √(9² + 12²) = √(81 + 144) = √225 = 15 cm.');
  addQ('C', 'matematika', 'Gradien dari garis dengan persamaan 3x - 6y + 12 = 0 adalah...', ['-2', '2', '1/2', '-1/2'], 2, '6y = 3x + 12 => y = (3/6)x + 2. Gradien m = 3/6 = 1/2.');
  addQ('C', 'matematika', 'Dua buah dadu bermata enam dilempar bersamaan satu kali. Peluang munculnya mata dadu berjumlah 8 adalah...', ['3/36', '4/36', '5/36', '6/36'], 2, 'Pasangan berjumlah 8: (2,6), (3,5), (4,4), (5,3), (6,2) ada 5 dari 36 kemungkinan.');
  addQ('C', 'matematika', 'Jika f(x) = 2x - 3, nilai dari f(5) + f(-2) adalah...', ['0', '-7', '7', '14'], 0, 'f(5) = 2(5) - 3 = 7. f(-2) = 2(-2) - 3 = -7. 7 + (-7) = 0.');
  addQ('C', 'matematika', 'Hasil dari (2³ x 2⁴) : 2⁵ adalah...', ['2', '4', '8', '16'], 1, '2^(3+4-5) = 2² = 4.');
  addQ('C', 'matematika', 'Suku ke-20 dari barisan aritmatika 3, 7, 11, 15, ... adalah...', ['75', '79', '81', '83'], 1, 'a = 3, b = 4. U20 = a + 19b = 3 + 19(4) = 3 + 76 = 79.');
  addQ('C', 'matematika', 'Luas permukaan bola dengan jari-jari 7 cm (pi = 22/7) adalah...', ['154 cm²', '616 cm²', '824 cm²', '1.232 cm²'], 1, 'Luas = 4 x pi x r² = 4 x (22/7) x 7 x 7 = 616 cm².');
  addQ('C', 'matematika', 'Sistem persamaan 2x + y = 8 dan x - y = 1 memiliki penyelesaian nilai x dan y berturut-turut...', ['x = 3, y = 2', 'x = 4, y = 0', 'x = 2, y = 4', 'x = 5, y = -2'], 0, 'Jumlahkan kedua persamaan: 3x = 9 => x = 3. Maka y = 3 - 1 = 2.');
  addQ('C', 'matematika', 'Median dari data: 4, 6, 7, 8, 9, 9, 10 adalah...', ['7', '7.5', '8', '9'], 2, 'Data urut dengan 7 nilai, nilai tengah adalah data ke-4 yaitu 8.');
  addQ('C', 'matematika', 'Nilai dari sin 30° + cos 60° adalah...', ['1/2', '1', '√3/2', '2'], 1, 'sin 30° = 1/2 dan cos 60° = 1/2. 1/2 + 1/2 = 1.');
  addQ('C', 'matematika', 'Sebuah kerucut memiliki jari-jari alas 6 cm dan tinggi 8 cm. Luas selimut kerucut adalah...', ['188,4 cm²', '204,2 cm²', '301,4 cm²', '376,8 cm²'], 0, 'Garis pelukis s = √(6² + 8²) = 10 cm. Luas selimut = pi x r x s = 3,14 x 6 x 10 = 188,4 cm².');
  addQ('C', 'matematika', 'Bentuk notasi ilmiah (baku) dari 0,0000456 adalah...', ['4,56 x 10^-5', '4,56 x 10^-4', '45,6 x 10^-6', '0,456 x 10^-4'], 0, 'Koma digeser 5 kali ke kanan: 4,56 x 10^-5.');
  addQ('C', 'matematika', 'Jika x + 1/x = 4, berapakah nilai dari x² + 1/x²?', ['14', '16', '18', '20'], 0, '(x + 1/x)² = x² + 2 + 1/x² = 16 => x² + 1/x² = 14.');
  addQ('C', 'matematika', 'Banyaknya anggota himpunan bagian dari himpunan P = {a, b, c, d} adalah...', ['4', '8', '16', '32'], 2, 'Banyak himpunan bagian = 2^n = 2^4 = 16.');
  addQ('C', 'matematika', 'Sebuah balok memiliki ukuran panjang 12 cm, lebar 8 cm, dan tinggi 5 cm. Panjang diagonal ruang balok tersebut adalah...', ['√233 cm', '15 cm', '√200 cm', '17 cm'], 0, 'Diagonal ruang = √(12² + 8² + 5²) = √(144 + 64 + 25) = √233 cm.');
  addQ('C', 'matematika', 'Berapakah suku pertama dari deret geometri jika rasio r = 2 dan suku ke-5 adalah 48?', ['2', '3', '4', '6'], 1, 'U5 = a x r^4 = a x 16 = 48 => a = 3.');
  addQ('C', 'matematika', 'Faktorisasi penuh dari 4x² - 9y² adalah...', ['(2x - 3y)(2x - 3y)', '(2x + 3y)(2x - 3y)', '(4x + 9y)(x - y)', '(2x + 9y)(2x - y)'], 1, 'Selisih kuadrat: a² - b² = (a + b)(a - b).');

  // IPA/Sains SMP
  addQ('C', 'ipa_sains', 'Hukum Newton II dirumuskan secara matematis sebagai...', ['F = m x a', 'F = m / a', 'a = F x m', 'W = F x s'], 0, 'Hukum II Newton menyatakan gaya sebanding dengan massa dikali percepatan (F = m x a).');
  addQ('C', 'ipa_sains', 'Organel sel yang dijuluki sebagai "the powerhouse of cell" karena menghasilkan energi ATP adalah...', ['Ribosom', 'Mitokondria', 'Badan Golgi', 'Nukleus'], 1, 'Mitokondria adalah pusat respirasi seluler dan produksi ATP.');
  addQ('C', 'ipa_sains', 'Kuat arus 2 Ampere mengalir pada kawat penghantar berhambatan 10 Ohm. Beda potensial listrik pada ujung kawat adalah...', ['5 Volt', '12 Volt', '20 Volt', '200 Volt'], 2, 'Hukum Ohm: V = I x R = 2 x 10 = 20 Volt.');
  addQ('C', 'ipa_sains', 'Persilangan monohibrid dominan penuh antara tanaman berbunga merah (MM) dan putih (mm) menghasilkan F1 merah (Mm). Jika F1 disilangkan sesamanya, rasio fenotipe F2 adalah...', ['1 : 2 : 1', '3 : 1 (Merah : Putih)', '9 : 3 : 3 : 1', '1 : 1'], 1, 'Rasio fenotipe pada monohibrid dominan penuh F2 adalah 3 Merah : 1 Putih.');
  addQ('C', 'ipa_sains', 'Zat kimia yang ditambahkan pada makanan untuk memberi rasa manis tanpa kalori tinggi seperti sakarin dan aspartam termasuk golongan zat aditif...', ['Pengawet sintetis', 'Pemanis buatan', 'Penyedap rasa', 'Pewarna alami'], 1, 'Aspartam dan sakarin adalah pemanis buatan rendah kalori.');
  addQ('C', 'ipa_sains', 'Cermin yang selalu menghasilkan bayangan bersifat maya, tegak, dan diperkecil serta sering digunakan sebagai spion kendaraan adalah...', ['Cermin cekung', 'Cermin cembung', 'Cermin datar', 'Lensa cekung'], 1, 'Cermin cembung memperluas medan pandang dan selalu menghasilkan bayangan maya, tegak, diperkecil.');
  addQ('C', 'ipa_sains', 'Enzim ptialin (amilase) yang terdapat di dalam rongga mulut berfungsi mengubah...', ['Protein menjadi asam amino', 'Amilum (karbohidrat) menjadi maltosa/glukosa', 'Lemak menjadi asam lemak', 'Kasein menjadi susu kental'], 1, 'Amilase ludah menghidrolisis amilum menjadi disakarida maltosa.');
  addQ('C', 'ipa_sains', 'Asam lambung (HCl) yang diproduksi di lambung berfungsi untuk...', ['Membunuh kuman penyakit dan mengaktifkan pepsinogen', 'Mencerna lemak menjadi gliserol', 'Mengemulsikan garam empedu', 'Menyerap vitamin B12'], 0, 'HCl menciptakan suasana asam untuk membunuh bakteri pathogen dan mengaktifkan pepsin.');
  addQ('C', 'ipa_sains', 'Sebuah mobil bergerak dengan kecepatan 20 m/s. Jika massa mobil 1.000 kg, energi kinetik mobil tersebut adalah...', ['10.000 Joule', '100.000 Joule', '200.000 Joule', '400.000 Joule'], 2, 'Ek = 1/2 x m x v² = 1/2 x 1000 x 400 = 200.000 Joule.');
  addQ('C', 'ipa_sains', 'Unsur kimia dengan lambang Fe dalam tabel periodik adalah...', ['Fluor', 'Fosfor', 'Besi (Ferrum)', 'Emas (Aurum)'], 2, 'Fe adalah lambang unsur Besi (Ferrum).');
  addQ('C', 'ipa_sains', 'Peristiwa pasang perbani (neap tide) terjadi ketika posisi matahari, bumi, dan bulan membentuk sudut...', ['0° (Garis lurus)', '90° (Tegak lurus)', '180°', '45°'], 1, 'Pasang perbani terjadi pada kuartir awal dan akhir saat sudut 90 derajat.');
  addQ('C', 'ipa_sains', 'Pemisahan campuran minyak bumi menjadi fraksi-fraksinya didasarkan pada perbedaan titik didih menggunakan metode...', ['Filtrasi', 'Kromatografi', 'Distilasi bertingkat', 'Kristalisasi'], 2, 'Distilasi fraksionasi / bertingkat.');
  addQ('C', 'ipa_sains', 'Ciri pembuluh darah arteri (nadi) yang membedakannya dari vena adalah...', ['Dinding tebal elastis dan aliran darah meninggalkan jantung', 'Dinding tipis dan aliran darah menuju jantung', 'Memiliki banyak katup di sepanjang pembuluh', 'Terletak dekat permukaan kulit'], 0, 'Arteri mengalirkan darah keluar jantung dengan dinding berotot tebal dan elastis.');
  addQ('C', 'ipa_sains', 'Partikel penyusun inti atom (nukleus) terdiri atas...', ['Proton dan elektron', 'Proton dan neutron', 'Neutron dan elektron', 'Elektron saja'], 1, 'Inti atom disusun oleh nukleon: proton (positif) dan neutron (netral).');
  addQ('C', 'ipa_sains', 'Trakea pada manusia tersusun dari cincin tulang rawan dan dilapisi epitel bersilia yang berfungsi...', ['Menyaring debu dan kotoran yang lolos dari hidung', 'Tempat pertukaran gas O2 dan CO2', 'Mengatur suhu tubuh', 'Menghasilkan suara nyaring'], 0, 'Silia menyapu lendir dan kotoran keluar dari saluran pernapasan.');
  addQ('C', 'ipa_sains', 'Larutan yang mengubah lakmus merah menjadi biru dan memiliki pH > 7 adalah larutan bersifat...', ['Asam', 'Basa', 'Netral', 'Garam dapur'], 1, 'Sifat basa membirukan lakmus merah dan pH > 7.');
  addQ('C', 'ipa_sains', 'Sifat kemagnetan suatu magnet batang dapat hilang atau melemah jika...', ['Didekatkan ke besi lunak', 'Dipanaskan hingga membara atau dipukul berulang-ulang', 'Disimpan di tempat tertutup', 'Dilapisi cat anti karat'], 1, 'Pemanasan dan pukulan mengacaukan susunan domain magnet elementer.');
  addQ('C', 'ipa_sains', 'Hormon yang berfungsi menurunkan kadar glukosa dalam darah dengan mengubahnya menjadi glikogen adalah...', ['Glukagon', 'Insulin', 'Adrenalin', 'Tiroksin'], 1, 'Insulin diproduksi pulau Langerhans pankreas untuk mengontrol gula darah.');
  addQ('C', 'ipa_sains', 'Efek rumah kaca yang berlebihan memicu pemanasan global terutama disebabkan oleh peningkatan emisi gas...', ['Oksigen (O2)', 'Karbon dioksida (CO2) dan Metana (CH4)', 'Nitrogen (N2)', 'Argon (Ar)'], 1, 'CO2 dan CH4 menyerap radiasi inframerah bumi.');
  addQ('C', 'ipa_sains', 'Alat optik yang digunakan untuk mengamati mikroorganisme yang tidak kasat mata adalah...', ['Teleskop', 'Mikroskop', 'Periskop', 'Lup'], 1, 'Mikroskop menggunakan sistem lensa objektif dan okuler untuk memperbesar objek mikroskopis.');

  // Bahasa Inggris SMP
  addQ('C', 'bahasa_inggris', '"If I had studied harder, I ... the national competition." Choose the correct completion.', ['will win', 'would win', 'would have won', 'had won'], 2, 'Third conditional: If + past perfect, would have + V3.');
  addQ('C', 'bahasa_inggris', 'The passive voice of "Alexander Graham Bell invented the telephone" is...', ['The telephone was invented by Alexander Graham Bell.', 'The telephone is invented by Alexander Graham Bell.', 'Alexander Graham Bell was invented by telephone.', 'The telephone had been invented by Alexander Graham Bell.'], 0, 'Simple past passive: was/were + V3 (was invented).');
  addQ('C', 'bahasa_inggris', '"Despite the heavy rain, the students continued their march." The word "Despite" expresses...', ['Addition', 'Contrast / Concession', 'Result', 'Time sequence'], 1, '"Despite" indicates concession or contrast between rain and continuing march.');
  addQ('C', 'bahasa_inggris', 'Choose the sentence with correct relative pronoun: "The scientist ... won the Nobel Prize delivered an inspiring lecture."', ['which', 'who', 'whose', 'whom'], 1, '"Who" refers to person as subject (the scientist).');
  addQ('C', 'bahasa_inggris', 'What is the closest meaning of the idiom "A blessing in disguise"?', ['Something that appears bad at first but leads to good results', 'A secret hidden in a mystery box', 'A religious prayer recited in silence', 'A dangerous situation without warning'], 0, 'An apparent misfortune that eventually produces beneficial outcomes.');
  addQ('C', 'bahasa_inggris', '"She asked me where I lived." The direct speech of this sentence is...', ['She asked, "Where do you live?"', 'She asked, "Where did you live?"', 'She asked, "Where you live?"', 'She asked, "Where had you lived?"'], 0, 'Past simple in reported speech reverts to present simple in direct question.');
  addQ('C', 'bahasa_inggris', 'Identify the adjective in the sentence: "The ancient temple attracts millions of curious tourists every year."', ['Attracts', 'Ancient', 'Millions', 'Tourists'], 1, '"Ancient" describes the noun temple.');
  addQ('C', 'bahasa_inggris', '"By next December, we ... from junior high school."', ['will graduate', 'will have graduated', 'graduated', 'are graduating'], 1, 'Future perfect tense: will have + past participle for completion by a future date.');
  addQ('C', 'bahasa_inggris', 'Which word is antonym of "ABUNDANT"?', ['Scarce', 'Plentiful', 'Immense', 'Generous'], 0, 'Scarce means in short supply or rare, opposite of abundant.');
  addQ('C', 'bahasa_inggris', '"Neither the teacher nor the students ... aware of the sudden schedule shift."', ['was', 'were', 'is', 'are being'], 1, 'In "neither... nor", the verb agrees with the closer subject ("students" -> were).');
  addQ('C', 'bahasa_inggris', 'What kind of text aims to explain how and why a natural phenomenon occurs?', ['Narrative text', 'Explanation text', 'Descriptive text', 'Spoof text'], 1, 'Explanation texts discuss the processes involved in the formation of natural or socio-cultural phenomena.');
  addQ('C', 'bahasa_inggris', 'Choose the correct preposition: "Indonesia is rich ... cultural diversity and natural resources."', ['at', 'with', 'in', 'on'], 2, 'Collocation: rich in something.');
  addQ('C', 'bahasa_inggris', '"You shouldn\'t have done that." This expression signifies...', ['Giving permission', 'Expressing criticism or regret over a past action', 'Offering help', 'Requesting an explanation'], 1, 'Shouldn\'t have + V3 expresses disapproval or regret regarding past conduct.');
  addQ('C', 'bahasa_inggris', 'The synonym of the word "INNOVATIVE" is...', ['Conventional', 'Creative and novel', 'Obsolete', 'Rigid'], 1, 'Innovative refers to new, creative methods or ideas.');
  addQ('C', 'bahasa_inggris', '"The more you read, the ... you understand."', ['better', 'good', 'best', 'more good'], 0, 'Double comparative structure: "The more..., the better...".');
  addQ('C', 'bahasa_inggris', 'Choose the correct form: "I look forward to ... you at the national olympiad."', ['meet', 'meeting', 'met', 'have met'], 1, '"Look forward to" takes a gerund (-ing form).');
  addQ('C', 'bahasa_inggris', 'A narrative text generally consists of which generic structure?', ['Orientation - Complication - Resolution', 'General Statement - Sequenced Explanation', 'Goal - Materials - Steps', 'Thesis - Arguments - Reiteration'], 0, 'Classic narrative framework: Orientation, Complication, Resolution.');
  addQ('C', 'bahasa_inggris', '"Hardly had the bell rung ... the excited students left the classroom."', ['when', 'than', 'then', 'while'], 0, 'Correlation: Hardly... when.');
  addQ('C', 'bahasa_inggris', 'Which sentence contains a transitive verb?', ['She sleeps peacefully.', 'The boy kicks the leather ball.', 'Birds fly gracefully.', 'The sun rises in the east.'], 1, '"Kicks" requires a direct object ("the leather ball").');
  addQ('C', 'bahasa_inggris', 'What is the message of the proverb "Practice makes perfect"?', ['Hard work without rest is bad', 'Constant repetition and dedication lead to excellence', 'Perfection is impossible to reach', 'Only talented people can succeed'], 1, 'Consistent practice fosters mastery.');

  // Bahasa Indonesia SMP
  addQ('C', 'bahasa_indonesia', 'Kalimat majemuk bertingkat dengan anak kalimat pengganti keterangan waktu terdapat pada...', ['Rani tetap berangkat meskipun hujan mengguyur deras.', 'Ketika fajar menyingsing di ufuk timur, para nelayan mulai melabuhkan perahunya.', 'Ayah mengabarkan bahwa ia akan pulang terlambat.', 'Ia belajar keras agar lolos seleksi beasiswa.'], 1, '"Ketika fajar menyingsing..." menyatakan anak kalimat keterangan waktu.');
  addQ('C', 'bahasa_indonesia', 'Teks tanggapan kritis bertujuan untuk...', ['Menghibur pembaca dengan cerita fantasi', 'Menyampaikan penilaian objektif, pujian, atau kritik yang disertai argumen logis terhadap suatu karya/isu', 'Menjelaskan langkah praktis membuat kerajinan', 'Mengiklankan produk komersial'], 1, 'Teks tanggapan berisi evaluasi objektif berbasis data dan nalar.');
  addQ('C', 'bahasa_indonesia', 'Penulisan judul karangan ilmiah yang sesuai dengan kaidah EYD adalah...', ['Pemanfaatan Energi Surya Sebagai Sumber Listrik Alternatif', 'Pemanfaatan Energi Surya sebagai Sumber Listrik Alternatif', 'Pemanfaatan energi surya sebagai sumber listrik alternatif', 'PEMANFAATAN ENERGI SURYA SEBAGAI SUMBER LISTRIK ALTERNATIF'], 1, 'Huruf kapital pada awal tiap kata kecuali kata tugas (sebagai).');
  addQ('C', 'bahasa_indonesia', 'Unsur intrinsik cerpen yang menata jalinan peristiwa berdasarkan hubungan sebab-akibat dinamakan...', ['Latar', 'Alur (plot)', 'Amanat', 'Penokohan'], 1, 'Alur adalah rangkaian peristiwa kausalitas dalam cerita.');
  addQ('C', 'bahasa_indonesia', 'Konjungsi antarkalimat yang menyatakan pertentangan dengan kalimat sebelumnya adalah...', ['Oleh karena itu', 'Akan tetapi', 'Selain itu', 'Dengan demikian'], 1, '"Akan tetapi" atau "Namun" menyatakan kontras antarkalimat.');
  addQ('C', 'bahasa_indonesia', 'Dalam teks pidato persuasif, bagian yang berisi ajakan, imbauan, atau rekomendasi tindakan nyata diletakkan pada...', ['Pembukaan', 'Isi pidato', 'Penutup', 'Salam pembuka'], 1, 'Puncak ajakan persuasif terdapat pada bagian isi pidato sebelum penutup.');
  addQ('C', 'bahasa_indonesia', 'Makna idiom "Cuci tangan" dalam konteks hukum atau tanggung jawab adalah...', ['Membersihkan tangan dengan sabun cair', 'Melepaskan diri dari keterlibatan atau tanggung jawab atas kesalahan', 'Membantu korban bencana alam', 'Menyerahkan diri ke pihak berwajib'], 1, 'Cuci tangan bermakna lari dari tanggung jawab.');
  addQ('C', 'bahasa_indonesia', 'Kalimat efektif di bawah ini adalah...', ['Bagi para siswa-siswa sekalian diharapkan kumpul di aula.', 'Para siswa diharapkan berkumpul di aula.', 'Kepada bapak kepala sekolah waktu dan tempat kami persilakan.', 'Ibu membeli sayur-sayuran, buah-buahan, dan lain sebagainya.'], 1, 'Hemat kata, logis, dan tidak pleonastis: "Para siswa diharapkan berkumpul di aula."');
  addQ('C', 'bahasa_indonesia', 'Sudut pandang orang pertama sebagai pelaku utama dalam cerita fiksi ditandai oleh pemakaian kata ganti...', ['Ia / Dia', 'Aku / Saya', 'Mereka', 'Beliau'], 1, 'Kata ganti "Aku" atau "Saya" menandai POV orang pertama.');
  addQ('C', 'bahasa_indonesia', 'Kata serapan yang benar penulisannya sesuai KBBI adalah...', ['Kreatifitas, resiko, kwalitas', 'Kreativitas, risiko, kualitas', 'Kreatifitas, resiko, kualitas', 'Kreativitas, risiko, kwalitet'], 1, 'Bentuk baku: kreativitas (-itas), risiko (dengan i), kualitas (dengan u).');
  addQ('C', 'bahasa_indonesia', 'Majas yang menyatakan sindiran secara halus dengan menggunakan kata-kata yang berlawanan dengan makna sesungguhnya disebut majas...', ['Ironi', 'Sarkasme', 'Sinisme', 'Litotes'], 0, 'Ironi adalah sindiran halus, misal: "Rajin sekali kamu, jam sepuluh baru bangun."');
  addQ('C', 'bahasa_indonesia', 'Bagian surat dinas yang berfungsi menerangkan nomor arsip, lampiran, dan perihal surat adalah...', ['Kepala surat (kop)', 'Identitas pembuka surat (nomor, lampiran, hal)', 'Alinea penutup', 'Kaki surat'], 1, 'Nomor, lampiran, dan perihal dicantumkan di bawah kop surat.');
  addQ('C', 'bahasa_indonesia', 'Perbedaan esensial antara cerpen dan novel terletak pada...', ['Jumlah kata dan kompleksitas alur serta penokohan', 'Cerpen selalu berima sedangkan novel tidak', 'Novel tidak memiliki tema sedangkan cerpen memiliki tema', 'Cerpen murni fakta sedangkan novel fiktif'], 0, 'Novel memiliki alur lebih kompleks dan dimensi karakter lebih mendalam dibanding cerpen.');
  addQ('C', 'bahasa_indonesia', 'Kalimat pasif intransitif adalah kalimat pasif yang predikatnya...', ['Memerlukan objek penderita', 'Tidak memerlukan objek penderita', 'Selalu berupa kata kerja berimbuhan meng-', 'Menggunakan subjek berupa benda mati'], 1, 'Pasif intransitif tidak berobjek.');
  addQ('C', 'bahasa_indonesia', 'Ditinjau dari etimologinya, kata "Nusantara" berasal dari gabungan bahasa Jawa Kuno "nusa" dan "antara" yang memiliki arti...', ['Pulau-pulau lain / kepulauan yang terhubung di antara lautan', 'Negeri yang agung dan makmur', 'Lautan luas tanpa batas', 'Tanah kelahiran pahlawan'], 0, '"Nusa" berarti pulau dan "antara" berarti luar/seberang, merujuk gugusan kepulauan.');
  addQ('C', 'bahasa_indonesia', 'Kalimat retoris adalah kalimat pertanyaan yang...', ['Membutuhkan jawaban segera secara tertulis', 'Tidak menuntut jawaban karena jawabannya sudah jelas atau tersirat', 'Hanya boleh ditanyakan oleh guru kepada murid', 'Selalu dijawab dengan kata ya atau tidak'], 1, 'Pertanyaan retoris bertujuan menegaskan, bukan meminta jawaban faktual.');
  addQ('C', 'bahasa_indonesia', 'Dalam teks ulasan novel atau film, kelemahan dan keunggulan karya dievaluasi secara berimbang pada bagian...', ['Orientasi', 'Tafsiran', 'Evaluasi kritis', 'Rangkuman akhir'], 2, 'Bagian evaluasi menimbang nilai seni, kelebihan, serta kekurangan karya.');
  addQ('C', 'bahasa_indonesia', 'Teks eksposisi disusun atas struktur utama yang terdiri dari...', ['Tesis - Rangkaian Argumen - Penegasan Ulang', 'Abstraksi - Orientasi - Krisis - Reaksi - Koda', 'Pernyataan Umum - Deretan Penjelas - Interpretasi', 'Tujuan - Langkah-langkah kerja - Penutup'], 0, 'Tesis (pendapat/isu) -> Rangkaian argumen pendukung -> Penegasan ulang rekomendasi.');
  addQ('C', 'bahasa_indonesia', 'Penggunaan kata seru yang mengekspresikan kekaguman atau keterpesonaan adalah...', ['Aduh, kakiku terantuk batu!', 'Wah, megah sekali panggung grand final olimpiade ini!', 'Ih, jorok sekali tempat sampah itu!', 'Hai, sedang apa kamu di situ?'], 1, '"Wah" dan "Aduhai" menyatakan keterpukauan atau kekaguman.');
  addQ('C', 'bahasa_indonesia', 'Kata ulang berubah bunyi (anomali fonem) terdapat pada kata...', ['Kupu-kupu', 'Sayur-mayur', 'Buku-buku', 'Berjalan-jalan'], 1, '"Sayur-mayur" mengalami perubahan vokal/konsonan.');

  return bank;
}
