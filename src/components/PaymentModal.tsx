import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Sparkles, ShieldCheck, CreditCard, Upload } from 'lucide-react';
import { Participant } from '../types';
import { APP_CONFIG } from '../../appConfig.js';

interface PaymentModalProps {
  isOpen: boolean;
  participant: Participant | null;
  onClose: () => void;
  onPaymentConfirmed: (participantId: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  participant,
  onClose,
  onPaymentConfirmed,
}) => {
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [proofNote, setProofNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !participant) return null;

  const handleCopy = (text: string, type: 'account' | 'amount') => {
    navigator.clipboard.writeText(text);
    if (type === 'account') {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } else {
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2000);
    }
  };

  // WhatsApp auto format requirement
  const waChat = encodeURIComponent(
    `Halo Admin ${APP_CONFIG.brandName},\n\nSaya ingin konfirmasi pembayaran Tiket Final:\n- Nama Anak: ${participant.fullName}\n- Mata Pelajaran: ${participant.subject.toUpperCase()}\n- Kategori: Kategori ${participant.category}\n- No. Registrasi: ${participant.id}\n- Nominal Transfer: Rp 99.000\n- Rekening Tujuan: BCA 3843-136-911 a.n. SRI PRIHATININGSIH SH.\n\nBukti transfer terlampir. Mohon verifikasi akses Babak Final saya. Terima kasih!`
  );
  const waLink = `https://wa.me/${APP_CONFIG.contact.whatsapp}?text=${waChat}`;

  const handleConfirmClosing = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onPaymentConfirmed(participant.id);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#D4AF37]/50 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A1615] via-[#2A2421] to-[#1A1615] p-5 sm:p-6 text-white border-b border-[#D4AF37]/40 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-bold text-[#F5E7B2] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Promo Tiket Babak Final
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-['Cinzel',serif] text-white">
            Pembelian Tiket Babak Final
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Selamat kepada Ananda <strong>{participant.fullName}</strong> yang berhasil lolos ke Babak Final Nasional!
          </p>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Price Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-[#FAF8F5] border border-[#D4AF37]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Biaya Tiket Final Eksklusif:
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-sm text-gray-400 line-through font-semibold">
                  Rp 180.000
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#1A1615] font-['Cinzel',serif]">
                  Rp 99.000
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                  Hemat 45%
                </span>
              </div>
            </div>
            <div className="text-xs text-amber-900 bg-amber-100/70 px-3 py-1.5 rounded-lg border border-amber-300 font-medium">
              🔥 Khusus 10 Peserta Pertama
            </div>
          </div>

          {/* Bank Account Info */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-gray-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 uppercase">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#AA820A]" /> Rekening Pembayaran Resmi BCA
              </span>
              <span className="text-emerald-700 flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-gray-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 block">Bank Tujuan:</span>
                  <span className="text-sm font-bold text-gray-900">
                    {APP_CONFIG.payment.bank}
                  </span>
                </div>
                <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold">
                  BCA
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                <div>
                  <span className="text-[10px] text-gray-500 block">Nomor Rekening:</span>
                  <span className="font-mono text-base font-extrabold text-[#1A1615]">
                    {APP_CONFIG.payment.accountNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(APP_CONFIG.payment.accountNumber.replace(/-/g, ''), 'account')}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 flex items-center gap-1 transition-colors"
                >
                  {copiedAccount ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedAccount ? 'Tersalin' : 'Salin No. Rek'}
                </button>
              </div>

              <div className="pt-1 border-t border-gray-100">
                <span className="text-[10px] text-gray-500 block">Atas Nama:</span>
                <span className="text-xs font-bold text-gray-900">
                  {APP_CONFIG.payment.accountHolder}
                </span>
              </div>
            </div>
          </div>

          {/* Action 1: Direct WhatsApp Confirmation Link */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs font-bold text-emerald-950 block mb-1">
              Langkah 1: Konfirmasi Pembayaran ke WhatsApp Admin
            </span>
            <p className="text-[11px] text-emerald-800 mb-2.5">
              Klik tombol di bawah untuk langsung membuka chat WhatsApp admin dengan format otomatis (Nama Anak: {participant.fullName}, Mapel: {participant.subject.toUpperCase()}).
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Kirim Konfirmasi Pembayaran ke WA Admin
            </a>
          </div>

          {/* Action 2: Form Closing Notification */}
          <form onSubmit={handleConfirmClosing} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-gray-200 space-y-2.5">
            <span className="text-xs font-bold text-gray-800 block">
              Langkah 2: Tandai Konfirmasi Mandiri di Sistem
            </span>
            <p className="text-[11px] text-gray-600">
              Setelah melakukan transfer, klik tombol di bawah agar sistem segera mencatat status <strong>CLOSING TIKET FINAL LUNAS</strong> dan membuka akses ujian babak final Anda.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AA820A] to-[#D4AF37] hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                'Memverifikasi Pembayaran...'
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Saya Sudah Transfer & Konfirmasi Tiket Final
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
