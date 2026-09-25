import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { APP_CONFIG } from '../../appConfig.js';
import { SupportedByBadge, FoundationLogo } from './BrandLogo';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onOpenRegister: () => void;
  onOpenSimulation: () => void;
  onScrollToAnnouncements: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRegister,
  onOpenSimulation,
  onScrollToAnnouncements,
}) => {
  // Countdown to registration deadline
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FFFDF9] to-[#FAF8F5] pt-8 sm:pt-14 pb-16 sm:pb-24 border-b border-gray-200/70">
      {/* Background Decorative Gold Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#D4AF37]/10 via-[#FAF8F5]/0 to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          {/* Left Column: Headline, CTAs, Benefits */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            {/* Supported By Official Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <SupportedByBadge />
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Pendaftaran Terbuka Nasional
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Cinzel',serif] text-[#1A1615] tracking-tight leading-[1.15]">
                AJANG PRESTASI <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#AA820A] to-[#D4AF37]">
                  SAINS & BAHASA
                </span> <br />
                TERBESAR INDONESIA
              </h1>
              <p className="text-sm sm:text-lg text-gray-700 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Kompetisi online bergengsi untuk siswa <strong>SD (Kategori A & B)</strong> dan <strong>SMP (Kategori C)</strong> di seluruh 38 provinsi. Tahap pendaftaran mandiri, simulasi ujian, babak penyisihan, hingga cetak sertifikat ber-QR Code resmi.
              </p>
            </div>

            {/* Countdown Urgency Banner */}
            <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm max-w-md mx-auto lg:mx-0">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#AA820A]" /> Batas Waktu Pendaftaran:
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  Kuota Terbatas
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="block text-lg sm:text-xl font-bold text-[#1A1615]">
                    {timeLeft.days}
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase">Hari</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="block text-lg sm:text-xl font-bold text-[#1A1615]">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase">Jam</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="block text-lg sm:text-xl font-bold text-[#1A1615]">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase">Menit</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="block text-lg sm:text-xl font-bold text-[#AA820A]">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase">Detik</span>
                </div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AA820A] to-[#D4AF37] hover:brightness-110 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Award className="w-5 h-5" />
                Daftar Sekarang (Mandiri & Bebas Biaya)
              </button>

              <button
                type="button"
                onClick={onOpenSimulation}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-[#D4AF37]/50 text-[#1A1615] hover:bg-[#FAF8F5] font-bold text-sm tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#AA820A]" />
                Mulai Simulasi Mandiri (20 Soal)
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Online Mandiri</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>E-Sertifikat Ber-QR Code</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Seluruh Siswa Indonesia</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Real-Time Stats */}
          <div className="w-full lg:w-[480px] space-y-4">
            {/* Hero Main Image Card with SafeImage Fallback */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl bg-white group">
              <div className="h-64 sm:h-80 w-full overflow-hidden">
                <SafeImage
                  src={APP_CONFIG.heroImage}
                  fallbackSrc={APP_CONFIG.images.students}
                  alt="Siswa Berprestasi Olimpiade Online Nasional"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Gradient Overlay & Badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold tracking-widest text-[#F5E7B2] uppercase font-mono">
                  RESMI TINGKAT NASIONAL
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-['Cinzel',serif] text-white">
                  Mencetak Generasi Emas Berdaya Saing Global
                </h3>
                <p className="text-xs text-gray-200 mt-1 line-clamp-2">
                  Matematika Terpadu, Sains/IPA Eksperimental, Bahasa Inggris, dan Bahasa Indonesia.
                </p>
              </div>

              {/* Promo Floating Tag */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-rose-700 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Penyisihan Gratis</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-xs text-center">
                <span className="text-lg sm:text-2xl font-black font-['Cinzel',serif] text-[#1A1615]">
                  14.800+
                </span>
                <span className="text-[10px] text-gray-500 block font-medium">
                  Peserta Terdaftar
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-xs text-center">
                <span className="text-lg sm:text-2xl font-black font-['Cinzel',serif] text-[#AA820A]">
                  38
                </span>
                <span className="text-[10px] text-gray-500 block font-medium">
                  Provinsi Indonesia
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-xs text-center">
                <span className="text-lg sm:text-2xl font-black font-['Cinzel',serif] text-[#1A1615]">
                  4
                </span>
                <span className="text-[10px] text-gray-500 block font-medium">
                  Mata Pelajaran
                </span>
              </div>
            </div>

            {/* Partner Accreditation Strip */}
            <div className="p-3 rounded-xl bg-white border border-gray-200 flex items-center justify-between">
              <FoundationLogo className="h-8" />
              <button
                type="button"
                onClick={onScrollToAnnouncements}
                className="text-xs text-[#AA820A] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                Cek Hasil <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
