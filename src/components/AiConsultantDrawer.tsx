import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Lightbulb,
  Award,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { APP_CONFIG } from '../../appConfig.js';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const QUICK_QUESTIONS = [
  'Kategori apa yang cocok untuk anak kelas 3 SD?',
  'Bagaimana alur pendaftaran mandiri hingga final?',
  'Apa saja materi kisi-kisi Olimpiade Matematika?',
  'Berapa biaya tiket babak final dan bagaimana cara bayarnya?',
];

export const AiConsultantDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Halo Ayah/Bunda dan Adik Juara! Selamat datang di Konsultasi Resmi **${APP_CONFIG.brandName}**. Saya adalah Konsultan Akademik AI resmi yang didukung oleh **${APP_CONFIG.supportedBy}**.\n\nAda yang bisa saya bantu terkait pemilihan kategori, kisi-kisi lomba, atau alur pendaftaran mandiri?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend }),
      });

      const data = await res.json();
      const replyText =
        data.reply ||
        `Terima kasih! Tim konsultan akademik ${APP_CONFIG.brandName} selalu siap membantu putra/putri Anda mengukir prestasi terbaik. Anda juga dapat berkonsultasi via WhatsApp resmi di ${APP_CONFIG.contact.whatsappDisplay}.`;

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `Halo, pendaftaran Babak Penyisihan ${APP_CONFIG.brandName} dibuka secara mandiri tanpa biaya pendaftaran. Setelah mendaftar, Anda langsung dapat mencoba Simulasi Ujian Mandiri sebanyak 20 soal acak. Hubungi admin WhatsApp kami di ${APP_CONFIG.contact.whatsappDisplay} untuk bantuan instan.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#1A1615] via-[#2A2421] to-[#1A1615] text-[#D4AF37] border-2 border-[#D4AF37] shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer group"
        aria-label="Buka Konsultan AI"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />
        </div>
        <span className="hidden sm:inline font-bold text-xs tracking-wider uppercase text-white group-hover:text-[#F5E7B2]">
          Konsultan AI Olimpiade
        </span>
      </button>

      {/* Slide-over Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1A1615] via-[#2A2421] to-[#1A1615] p-4 text-white border-b border-[#D4AF37]/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-['Cinzel',serif] text-white flex items-center gap-1.5">
                    Konsultan Akademik AI
                  </h3>
                  <span className="text-[10px] text-[#F5E7B2] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> Didukung {APP_CONFIG.supportedBy}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Questions Suggestions */}
            <div className="p-3 bg-[#FAF8F5] border-b border-gray-200">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                Pertanyaan Populer:
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {QUICK_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-white border border-gray-300 hover:border-[#D4AF37] text-gray-700 hover:text-[#AA820A] whitespace-nowrap transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gray-50/50">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${
                    m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                      m.sender === 'user'
                        ? 'bg-[#1A1615] text-[#D4AF37]'
                        : 'bg-[#D4AF37] text-white'
                    }`}
                  >
                    {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[82%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      m.sender === 'user'
                        ? 'bg-[#1A1615] text-white rounded-tr-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line">{m.text}</div>
                    <span
                      className={`text-[9px] block text-right mt-1 ${
                        m.sender === 'user' ? 'text-gray-400' : 'text-gray-400'
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-gray-500 italic p-2 bg-white rounded-xl border border-gray-200 w-fit">
                  <div className="w-3.5 h-3.5 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                  Konsultan sedang menyusun panduan terbaik...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 bg-white border-t border-gray-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ketik pertanyaan untuk Konsultan AI..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-white hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
