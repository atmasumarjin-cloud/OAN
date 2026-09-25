import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { APP_CONFIG } from './appConfig.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.dirname(__filename);

function geminiDevApiPlugin(): Plugin {
  return {
    name: 'gemini-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/config', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, config: APP_CONFIG }));
      });

      server.middlewares.use('/api/recommendation', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let bodyStr = '';
        req.on('data', (chunk) => {
          bodyStr += chunk;
        });

        req.on('end', async () => {
          try {
            const data = bodyStr ? JSON.parse(bodyStr) : {};
            const userPrompt =
              data.prompt ||
              `Halo konsultan ${APP_CONFIG.brandName}, mohon berikan rekomendasi dan strategi belajar untuk anak saya.`;

            if (!process.env.GEMINI_API_KEY) {
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  reply: `Selamat datang di Konsultasi ${APP_CONFIG.brandName}! Kami merekomendasikan Ananda mengikuti mata pelajaran unggulan seperti Matematika Terpadu atau Sains/IPA. Babak penyisihan dibuka gratis dengan simulasi ujian mandiri langsung setelah pendaftaran. Hubungi admin WhatsApp kami di ${APP_CONFIG.contact.whatsappDisplay} untuk bimbingan langsung.`,
                })
              );
              return;
            }

            const ai = new GoogleGenAI({
              apiKey: process.env.GEMINI_API_KEY,
              httpOptions: {
                headers: { 'User-Agent': 'aistudio-build' },
              },
            });

            const productList = APP_CONFIG.products
              .map(
                (p, idx) =>
                  `${idx + 1}. ${p.title} (${p.categoryTarget}): ${p.subtitle}`
              )
              .join('\n');

            const systemInstruction = `Anda adalah Konsultan Akademik Senior Resmi dari "${APP_CONFIG.brandName}", platform ${APP_CONFIG.businessType} terkemuka di Indonesia yang didukung oleh "${APP_CONFIG.supportedBy}".
Program:
${productList}
Harga Tiket Final Promo: Rp ${APP_CONFIG.payment.ticketPromoPrice.toLocaleString('id-ID')} via BCA ${APP_CONFIG.payment.accountNumber} a.n. ${APP_CONFIG.payment.accountHolder}.
Kontak WA: ${APP_CONFIG.contact.whatsappDisplay}.
Tugas Anda: Berikan bimbingan, rekomendasi mata pelajaran & kategori yang tepat, motivasi belajar, tips juara, serta panduan pendaftaran mandiri dengan ramah dan sopan.`;

            let reply = '';
            try {
              const result = await ai.models.generateContent({
                model: 'gemini-3.1-pro-preview',
                contents: userPrompt,
                config: {
                  systemInstruction,
                  thinkingConfig: {
                    thinkingLevel: ThinkingLevel.HIGH,
                  },
                },
              });
              reply = result.text || '';
            } catch (err) {
              console.warn('Fallback to gemini-3.8-flash in dev:', err);
              const fallback = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: userPrompt,
                config: { systemInstruction },
              });
              reply = fallback.text || '';
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, reply }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: false,
                error: err?.message || 'Server error',
              })
            );
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiDevApiPlugin()],
    resolve: {
      alias: {
        '@': rootDir,
        '/src': path.resolve(rootDir, 'src'),
        'src': path.resolve(rootDir, 'src'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
