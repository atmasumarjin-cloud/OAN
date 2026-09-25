import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { APP_CONFIG } from './appConfig.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize Google GenAI client safely
let ai = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI:', err);
  }
}

// Build dynamic system instruction from appConfig.js
function buildSystemInstruction() {
  const productListStr = APP_CONFIG.products
    .map(
      (p, i) =>
        `${i + 1}. ${p.title} (${p.categoryTarget}): ${p.subtitle}. Manfaat: ${p.benefits.join(', ')}.`
    )
    .join('\n');

  return `Anda adalah Konsultan Akademik Senior dan Konsultan Penjualan Resmi dari "${APP_CONFIG.brandName}", sebuah platform ${APP_CONFIG.businessType} terkemuka di Indonesia yang didukung penuh oleh "${APP_CONFIG.supportedBy}".

Profil Brand:
- Nama: ${APP_CONFIG.brandName}
- Bidang: ${APP_CONFIG.businessType} (${APP_CONFIG.description})
- Nilai & Visi: ${APP_CONFIG.tagline}
- Kontak WhatsApp Resmi: ${APP_CONFIG.contact.whatsappDisplay} (${APP_CONFIG.contact.whatsapp})
- Tiket Final Promo: Rp ${APP_CONFIG.payment.ticketPromoPrice.toLocaleString('id-ID')} (dari harga normal Rp ${APP_CONFIG.payment.ticketNormalPrice.toLocaleString('id-ID')}) khusus 10 peserta tercepat melalui Bank BCA ${APP_CONFIG.payment.accountNumber} a.n. ${APP_CONFIG.payment.accountHolder}.

Daftar Program / Produk Utama:
${productListStr}

Instruksi Sikap & Tugas:
1. Bersikaplah sangat ramah, profesional, suportif terhadap masa depan anak Indonesia, sopan, dan persuasif.
2. Bantu orang tua murid atau siswa dalam memilih kategori (Kategori A: SD 1-3, Kategori B: SD 4-6, Kategori C: SMP 7-9) dan mata pelajaran yang paling cocok (Matematika, IPA/Sains, Bahasa Inggris, Bahasa Indonesia).
3. Berikan tips strategi memenangkan olimpiade, kisi-kisi materi umum, dan yakinkan orang tua bahwa pendaftaran babak penyisihan ini adalah kesempatan emas tanpa risiko untuk menguji potensi anak.
4. Jika ditanya tentang cara daftar, jelaskan alur mandiri: Isi formulir di web -> Konfirmasi WhatsApp -> Follow sosmed -> Akses simulasi ujian mandiri -> Babak penyisihan online -> Pengumuman H+2 -> Tiket babak final & sertifikat resmi.
5. Jawab dalam Bahasa Indonesia yang santun, elegan, memotivasi, dan mudah dipahami.`;
}

// POST /api/recommendation endpoint for AI Consultation
app.post('/api/recommendation', async (req, res) => {
  try {
    const { prompt, childName, grade, preferredSubject, messageHistory } = req.body;
    const userPrompt = prompt || `Halo, saya ingin konsultasi pemilihan lomba olimpiade untuk anak saya yang bernama ${childName || 'Ananda'}, saat ini kelas ${grade || 'SD/SMP'}, tertarik dengan ${preferredSubject || 'sains/matematika'}. Mohon rekomendasinya.`;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        reply: `Terima kasih telah berkonsultasi dengan Konsultan Akademik ${APP_CONFIG.brandName}! Untuk Ananda yang ingin berprestasi di kancah nasional, kami sangat merekomendasikan untuk mendaftar pada mata pelajaran favoritnya (seperti Matematika, IPA/Sains, Bahasa Inggris, atau Bahasa Indonesia). Pendaftaran babak penyisihan dibuka tanpa pungutan biaya, dan putra/putri Anda dapat langsung mencoba Simulasi Ujian Mandiri setelah mendaftar. Hubungi WhatsApp resmi kami di ${APP_CONFIG.contact.whatsappDisplay} untuk informasi lebih lanjut!`,
        source: 'system-fallback',
      });
    }

    if (!ai) {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: { 'User-Agent': 'aistudio-build' },
        },
      });
    }

    const systemInstruction = buildSystemInstruction();
    let textResponse = '';

    try {
      // First attempt with high thinking mode
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: userPrompt,
        config: {
          systemInstruction,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
        },
      });
      textResponse = response.text || '';
    } catch (modelErr) {
      console.warn('Fallback to gemini-3.8-flash:', modelErr?.message);
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
        },
      });
      textResponse = fallbackResponse.text || '';
    }

    return res.json({
      success: true,
      reply: textResponse,
    });
  } catch (error) {
    console.error('Error in /api/recommendation:', error);
    return res.status(500).json({
      success: false,
      error: 'Gagal memproses rekomendasi AI.',
      details: error.message,
    });
  }
});

// Endpoint to retrieve public app configuration
app.get('/api/config', (req, res) => {
  res.json({ success: true, config: APP_CONFIG });
});

// Serve static assets for Production & cPanel Node.js Selector
const possibleDistPaths = [
  path.join(__dirname, 'dist'),
  path.join(__dirname, 'client', 'dist'),
];

let distPath = possibleDistPaths.find((p) => fs.existsSync(p));

if (distPath) {
  app.use(express.static(distPath));
  // Catch-all route to prevent 404 on SPA reload
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send(
      `<h1>${APP_CONFIG.brandName} API Server Running</h1><p>Frontend static assets not built yet. Run <code>npm run build</code>.</p>`
    );
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[${APP_CONFIG.brandName}] Server running on port ${PORT}`);
});

export default app;
