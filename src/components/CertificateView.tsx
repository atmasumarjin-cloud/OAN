import React, { useRef } from 'react';
import { X, Printer, Download, Award, ShieldCheck, QrCode } from 'lucide-react';
import { Participant } from '../types';
import { APP_CONFIG } from '../../appConfig.js';
import { BrandLogo, FoundationLogo, LOGO_OAN_SRC, LOGO_YAYASAN_SRC } from './BrandLogo';

interface CertificateViewProps {
  participant: Participant;
  onClose: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  participant,
  onClose,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  // Predicate calculation
  let awardTitle = 'PESERTA TERBAIK BABAK PENYISIHAN';
  let medalBadge = 'NATIONAL FINALIST';

  if (participant.medal === 'Emas') {
    awardTitle = 'PERAIH MEDALI EMAS (GOLD MEDALIST)';
    medalBadge = 'GOLD MEDALIST';
  } else if (participant.medal === 'Perak') {
    awardTitle = 'PERAIH MEDALI PERAK (SILVER MEDALIST)';
    medalBadge = 'SILVER MEDALIST';
  } else if (participant.medal === 'Perunggu') {
    awardTitle = 'PERAIH MEDALI PERUNGGU (BRONZE MEDALIST)';
    medalBadge = 'BRONZE MEDALIST';
  } else if (participant.isPassedPreliminary) {
    awardTitle = 'PESERTA LOLOS BABAK PENYISIHAN & FINALIS NASIONAL';
    medalBadge = 'FINALIST';
  }

  const certificateNumber = `OAN-YBBB/2026/IX/${participant.id.replace('OAN-', '')}`;
  const issueDate = '25 September 2026';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl my-6 overflow-hidden flex flex-col print:shadow-none print:m-0 print:max-w-none print:w-full print:rounded-none">
        {/* Floating Top Controls (Hidden when printing) */}
        <div className="bg-[#1A1615] px-4 py-3 text-white flex items-center justify-between border-b border-[#D4AF37]/40 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-xs sm:text-sm font-bold font-['Cinzel',serif] tracking-wide">
              E-Sertifikat Resmi Berpenghargaan Nasional
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:brightness-110 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Cetak / Unduh PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Container */}
        <div
          ref={certificateRef}
          className="p-5 sm:p-10 bg-[#FAF8F5] relative overflow-hidden text-center print:p-6"
        >
          {/* Ornate Gold Border & Guilloche Frame */}
          <div className="border-4 border-[#D4AF37] p-1.5 sm:p-3 rounded-lg relative shadow-inner">
            <div className="border-2 border-dashed border-[#B8972E]/60 p-4 sm:p-8 rounded bg-gradient-to-b from-[#FFFDF9] via-[#FAF8F5] to-[#F5EFE6] relative">
              
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-10 h-10 border-t-4 border-l-4 border-[#D4AF37]" />
              <div className="absolute top-2 right-2 w-10 h-10 border-t-4 border-r-4 border-[#D4AF37]" />
              <div className="absolute bottom-2 left-2 w-10 h-10 border-b-4 border-l-4 border-[#D4AF37]" />
              <div className="absolute bottom-2 right-2 w-10 h-10 border-b-4 border-r-4 border-[#D4AF37]" />

              {/* Watermark Crest Background using actual logo */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none overflow-hidden">
                <img
                  src={LOGO_OAN_SRC}
                  alt=""
                  className="w-96 h-96 object-contain filter grayscale"
                />
              </div>

              {/* Dual Logo Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#D4AF37]/30">
                <BrandLogo className="h-10" />
                <div className="text-center sm:text-right">
                  <FoundationLogo className="h-9 justify-center sm:justify-end" />
                </div>
              </div>

              {/* Certificate Title */}
              <div className="my-5">
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#AA820A] uppercase block">
                  KEMENTERIAN AKADEMIK & KOMPETISI NASIONAL
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold font-['Cinzel',serif] text-[#1A1615] tracking-wider my-1">
                  SERTIFIKAT PENGHARGAAN
                </h1>
                <span className="text-xs sm:text-sm font-semibold tracking-widest text-gray-500 font-['Cinzel',serif] uppercase block">
                  Certificate of Achievement & Excellence
                </span>
                <span className="inline-block mt-2 font-mono text-[10px] sm:text-xs text-gray-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Nomor Sertifikat: <strong>{certificateNumber}</strong>
                </span>
              </div>

              {/* Recipient Text */}
              <div className="my-6 space-y-2">
                <p className="text-xs sm:text-sm text-gray-600 italic">
                  Sertifikat resmi ini dianugerahkan dengan penuh kehormatan kepada:
                </p>
                <div className="py-2">
                  <h2 className="text-2xl sm:text-4xl font-extrabold font-['Cinzel',serif] text-[#1A1615] underline decoration-[#D4AF37] decoration-2 underline-offset-8">
                    {participant.fullName}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-700">
                  {participant.schoolName} — {participant.city}, {participant.province}
                </p>
              </div>

              {/* Award Description */}
              <div className="my-5 p-4 rounded-xl bg-white/70 border border-[#D4AF37]/40 max-w-xl mx-auto shadow-xs">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
                  Atas Prestasi Membanggakan Sebagai:
                </p>
                <h3 className="text-base sm:text-xl font-bold font-['Cinzel',serif] text-[#AA820A]">
                  {awardTitle}
                </h3>
                <p className="text-xs text-gray-700 mt-1">
                  Mata Pelajaran: <strong>{participant.subject.replace('_', ' ').toUpperCase()}</strong> • <strong>KATEGORI {participant.category} ({participant.grade})</strong>
                </p>
                <p className="text-[11px] text-gray-500 mt-1 italic">
                  Diselenggarakan secara nasional dalam ajang kompetisi resmi <strong>{APP_CONFIG.brandName} 2026</strong> yang didukung penuh oleh <strong>{APP_CONFIG.supportedBy}</strong>.
                </p>
              </div>

              {/* Signatures & Seal Section */}
              <div className="mt-8 pt-4 border-t border-[#D4AF37]/30 grid grid-cols-3 items-end gap-2 text-center">
                {/* Left Signature */}
                <div className="flex flex-col items-center">
                  <div className="h-14 flex items-center justify-center">
                    <span className="font-['Cinzel',serif] text-xl font-bold text-gray-800 italic transform -rotate-6">
                      Ardiansyah K.
                    </span>
                  </div>
                  <div className="w-32 border-b border-gray-400 mb-1" />
                  <p className="text-[11px] font-bold text-gray-900 leading-tight">
                    Dr. H. Ardiansyah, M.Ed.
                  </p>
                  <p className="text-[9px] text-gray-500">
                    Ketua Pelaksana {APP_CONFIG.brandName}
                  </p>
                </div>

                {/* Center Digital Gold Seal */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#FFF2A3] via-[#D4AF37] to-[#AA820A] p-1 shadow-lg border-2 border-[#AA820A] flex items-center justify-center transform hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-full border border-dashed border-[#8C6D12] overflow-hidden flex items-center justify-center bg-white p-0.5">
                      <img
                        src={LOGO_YAYASAN_SRC}
                        alt="Official Seal Yayasan"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-[9px] text-gray-500 font-mono mt-1">
                    Jakarta, {issueDate}
                  </span>
                </div>

                {/* Right Signature */}
                <div className="flex flex-col items-center">
                  <div className="h-14 flex items-center justify-center">
                    <span className="font-['Cinzel',serif] text-xl font-bold text-gray-800 italic transform -rotate-3">
                      Sri Prihatiningsih
                    </span>
                  </div>
                  <div className="w-32 border-b border-gray-400 mb-1" />
                  <p className="text-[11px] font-bold text-gray-900 leading-tight">
                    Sri Prihatiningsih, S.H.
                  </p>
                  <p className="text-[9px] text-gray-500">
                    Pembina {APP_CONFIG.supportedBy}
                  </p>
                </div>
              </div>

              {/* Bottom Verification Footer */}
              <div className="mt-6 pt-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-500 gap-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sertifikat Asli Terdaftar Resmi di Pangkalan Data Kompetisi Nasional</span>
                </div>
                <div className="flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="font-mono text-[9px]">ID: {participant.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
