import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, Instagram, Youtube, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Participant } from '../types';
import { APP_CONFIG } from '../../appConfig.js';

interface SocialFollowModalProps {
  isOpen: boolean;
  participant: Participant | null;
  onVerified: () => void;
  onClose: () => void;
}

export const SocialFollowModal: React.FC<SocialFollowModalProps> = ({
  isOpen,
  participant,
  onVerified,
  onClose,
}) => {
  const [followedInstagram, setFollowedInstagram] = useState(false);
  const [followedTiktok, setFollowedTiktok] = useState(false);
  const [subscribedYoutube, setSubscribedYoutube] = useState(false);
  const [confirmedWa, setConfirmedWa] = useState(false);

  if (!isOpen || !participant) return null;

  // WhatsApp confirm link with auto-formatted chat
  const waMessage = encodeURIComponent(
    `Halo Panitia ${APP_CONFIG.brandName},\n\nSaya telah mendaftarkan anak saya untuk Olimpiade Online:\n- Nama Anak: ${participant.fullName}\n- No. Registrasi: ${participant.id}\n- Kategori: Kategori ${participant.category}\n- Mapel: ${participant.subject.toUpperCase()}\n- Asal Sekolah: ${participant.schoolName}\n- No. WA: ${participant.whatsapp}\n\nSaya mengonfirmasi pendaftaran ini dan siap mengikuti tahap simulasi ujian. Mohon bimbingannya. Terima kasih!`
  );
  const waLink = `https://wa.me/${APP_CONFIG.contact.whatsapp}?text=${waMessage}`;

  const allFollowed = followedInstagram && followedTiktok && subscribedYoutube;

  const handleStartSimulation = () => {
    onVerified();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#D4AF37]/40 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A1615] via-[#2A2421] to-[#1A1615] p-5 sm:p-6 text-white border-b border-[#D4AF37]/40 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-xs font-semibold text-[#F5E7B2] mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Pendaftaran Berhasil
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-['Cinzel',serif] text-white">
            Konfirmasi Pendaftaran & Akses Simulasi
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Langkah 2 dari 2: Verifikasi WhatsApp dan ikuti media sosial resmi untuk membuka akses Simulasi Ujian Mandiri.
          </p>

          {/* Participant Card Preview */}
          <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/15 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <p className="text-gray-300">Nama Siswa:</p>
              <p className="font-bold text-white text-sm">{participant.fullName}</p>
              <p className="text-gray-300">
                Kategori {participant.category} • {participant.subject.toUpperCase()}
              </p>
            </div>
            <div className="sm:text-right">
              <span className="text-gray-300 block">No. Registrasi:</span>
              <span className="font-mono font-bold text-[#F5E7B2] text-sm bg-black/40 px-2 py-0.5 rounded border border-[#D4AF37]/40 inline-block">
                {participant.id}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Step 1: Konfirmasi WA Admin */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-gray-200">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A1615] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-white text-[11px] font-bold flex items-center justify-center">1</span>
                Wajib Konfirmasi WhatsApp Panitia
              </span>
              {confirmedWa && (
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Terkonfirmasi
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Kirimkan pesan otomatis ke WhatsApp resmi panitia ({APP_CONFIG.contact.whatsappDisplay}) untuk validasi nomor peserta Anda.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setConfirmedWa(true)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Kirim Konfirmasi WhatsApp ke Admin
            </a>
          </div>

          {/* Step 2: Wajib Follow Sosmed */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-gray-200 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A1615] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1A1615] text-[#D4AF37] text-[11px] font-bold flex items-center justify-center">2</span>
                Wajib Follow Akun Media Sosial Resmi
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Ikuti akun resmi untuk mendapatkan kisi-kisi latihan soal, jadwal ujian, dan pengumuman pemenang medali.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Instagram */}
              <button
                type="button"
                onClick={() => setFollowedInstagram(!followedInstagram)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  followedInstagram
                    ? 'bg-rose-50 border-rose-300 text-rose-800'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Instagram className="w-5 h-5 text-rose-600" />
                  <input
                    type="checkbox"
                    checked={followedInstagram}
                    onChange={(e) => setFollowedInstagram(e.target.checked)}
                    className="accent-rose-600 rounded"
                  />
                </div>
                <span className="text-xs font-bold mt-2">Instagram</span>
                <span className="text-[10px] text-gray-500">@{APP_CONFIG.contact.instagram}</span>
              </button>

              {/* TikTok */}
              <button
                type="button"
                onClick={() => setFollowedTiktok(!followedTiktok)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  followedTiktok
                    ? 'bg-neutral-100 border-neutral-400 text-neutral-900'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base leading-none">🎵</span>
                  <input
                    type="checkbox"
                    checked={followedTiktok}
                    onChange={(e) => setFollowedTiktok(e.target.checked)}
                    className="accent-black rounded"
                  />
                </div>
                <span className="text-xs font-bold mt-2">TikTok</span>
                <span className="text-[10px] text-gray-500">@{APP_CONFIG.contact.tiktok}</span>
              </button>

              {/* YouTube */}
              <button
                type="button"
                onClick={() => setSubscribedYoutube(!subscribedYoutube)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  subscribedYoutube
                    ? 'bg-red-50 border-red-300 text-red-800'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Youtube className="w-5 h-5 text-red-600" />
                  <input
                    type="checkbox"
                    checked={subscribedYoutube}
                    onChange={(e) => setSubscribedYoutube(e.target.checked)}
                    className="accent-red-600 rounded"
                  />
                </div>
                <span className="text-xs font-bold mt-2">YouTube</span>
                <span className="text-[10px] text-gray-500">Channel Resmi</span>
              </button>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setFollowedInstagram(true);
                  setFollowedTiktok(true);
                  setSubscribedYoutube(true);
                }}
                className="text-xs text-[#AA820A] hover:underline font-semibold"
              >
                Tandai Sudah Follow Semua Sosmed
              </button>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-2 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-gray-500 hover:text-gray-800 underline"
            >
              Simpan & Lakukan Nanti
            </button>

            <button
              type="button"
              onClick={handleStartSimulation}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AA820A] to-[#D4AF37] hover:brightness-110 text-white font-bold text-sm tracking-wide shadow-lg shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Verifikasi & Masuk Simulasi Ujian Mandiri
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
