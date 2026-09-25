import React, { useState } from 'react';
import { Search, Award, CheckCircle2, AlertCircle, Sparkles, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { Participant } from '../types';
import { APP_CONFIG } from '../../appConfig.js';

interface AnnouncementCheckerProps {
  participants: Participant[];
  onOpenPayment: (p: Participant) => void;
  onOpenCertificate: (p: Participant) => void;
  onStartFinalExam: (p: Participant) => void;
}

export const AnnouncementChecker: React.FC<AnnouncementCheckerProps> = ({
  participants,
  onOpenPayment,
  onOpenCertificate,
  onStartFinalExam,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedParticipant, setSearchedParticipant] = useState<Participant | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    const found = participants.find(
      (p) =>
        p.id.toLowerCase() === query ||
        p.fullName.toLowerCase().includes(query) ||
        p.whatsapp.includes(query)
    );

    setSearchedParticipant(found || null);
    setHasSearched(true);
  };

  // Recent qualifiers list
  const qualifiers = participants.filter((p) => p.isPassedPreliminary);

  return (
    <div id="pengumuman" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-xs font-bold text-[#AA820A] mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Portal Resmi Hasil Ujian
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-['Cinzel',serif] text-[#1A1615]">
            Cek Status Kelulusan & Pengumuman Juara
          </h2>
          <p className="text-xs sm:text-base text-gray-600 mt-2">
            Ketik Nomor Registrasi (contoh: <code>OAN-26-1001</code>) atau Nama Lengkap Peserta untuk memeriksa status kelulusan Babak Penyisihan, Tiket Final, dan E-Sertifikat.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto mb-12">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-white rounded-2xl border border-[#D4AF37]/40 shadow-lg"
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Masukkan No. Registrasi atau Nama Peserta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm rounded-xl focus:outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AA820A] to-[#D4AF37] text-white font-bold text-sm tracking-wide shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Cek Hasil
            </button>
          </form>

          {/* Search Result Card */}
          {hasSearched && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
              {searchedParticipant ? (
                <div className="p-6 bg-white rounded-2xl border-2 border-[#D4AF37] shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
                    <div>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                        {searchedParticipant.id}
                      </span>
                      <h3 className="text-xl font-bold font-['Cinzel',serif] text-gray-900 mt-1">
                        {searchedParticipant.fullName}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {searchedParticipant.schoolName} • Kategori {searchedParticipant.category} ({searchedParticipant.grade})
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <span className="text-xs text-gray-500 block">Mata Pelajaran:</span>
                      <span className="text-sm font-bold text-[#AA820A] uppercase">
                        {searchedParticipant.subject.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Status Banner */}
                  {searchedParticipant.isPassedPreliminary ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-bold text-emerald-900">
                            SELAMAT! ANDA DINYATAKAN LOLOS KE BABAK FINAL!
                          </h4>
                          <p className="text-xs text-emerald-800 mt-0.5">
                            Skor Penyisihan: <strong>{searchedParticipant.preliminaryScore ?? 85} / 100</strong>. Anda berhak memperebutkan Medali Emas, Perak, Perunggu di Babak Final!
                          </p>
                        </div>
                      </div>

                      {searchedParticipant.finalTicketPaid ? (
                        <span className="px-3 py-1.5 rounded-full bg-emerald-200 text-emerald-900 text-xs font-extrabold flex items-center gap-1.5 self-start sm:self-auto">
                          <CheckCircle2 className="w-3.5 h-3.5" /> TIKET FINAL LUNAS
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onOpenPayment(searchedParticipant)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-white text-xs font-bold shadow-md hover:brightness-110 cursor-pointer flex-shrink-0"
                        >
                          Beli Tiket Final (Promo Rp 99.000)
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-amber-900">
                          Status Ujian Penyisihan
                        </h4>
                        <p className="text-xs text-amber-800 mt-0.5">
                          {searchedParticipant.preliminaryDone
                            ? `Ujian telah dikerjakan dengan skor ${searchedParticipant.preliminaryScore}. Tetap semangat dan Anda tetap berhak mengunduh E-Sertifikat Kepesertaan Resmi.`
                            : 'Peserta belum menyelesaikan Babak Penyisihan. Silakan ikuti ujian sesuai jadwal yang ditentukan.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Actions for this participant */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenCertificate(searchedParticipant)}
                      className="px-4 py-2.5 rounded-xl bg-[#1A1615] text-[#D4AF37] hover:bg-black text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                    >
                      <FileText className="w-4 h-4" /> Unduh E-Sertifikat Resmi
                    </button>

                    {searchedParticipant.isPassedPreliminary && !searchedParticipant.finalTicketPaid && (
                      <button
                        type="button"
                        onClick={() => onOpenPayment(searchedParticipant)}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-white text-xs font-bold flex items-center gap-2 hover:brightness-110 transition-all cursor-pointer shadow-sm"
                      >
                        <Sparkles className="w-4 h-4" /> Ambil Promo Tiket Final (Rp 99.000)
                      </button>
                    )}

                    {searchedParticipant.finalTicketPaid && !searchedParticipant.finalDone && (
                      <button
                        type="button"
                        onClick={() => onStartFinalExam(searchedParticipant)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                      >
                        <Award className="w-4 h-4" /> Mulai Ujian Babak Final Sekarang
                      </button>
                    )}

                    {searchedParticipant.finalDone && (
                      <span className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#AA820A]" /> Nilai Final: {searchedParticipant.finalScore} / 100 ({searchedParticipant.medal || 'Finalis'})
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-white rounded-2xl border border-gray-200 text-center text-gray-500 text-sm">
                  Data peserta dengan kata kunci &quot;{searchQuery}&quot; tidak ditemukan. Pastikan Nomor Registrasi atau Nama Lengkap sudah sesuai dengan saat pendaftaran.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Official Qualifier Table Preview */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold font-['Cinzel',serif] text-[#1A1615] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D4AF37]" />
                Daftar Peserta Lolos Babak Penyisihan Terbaru
              </h3>
              <p className="text-xs text-gray-500">
                Terintegrasi dengan Surat Keputusan Panitia & Dewan Juri {APP_CONFIG.brandName}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <ShieldCheck className="w-4 h-4" /> Terverifikasi Dewan Juri
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#FAF8F5] text-gray-600 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">No. Registrasi</th>
                  <th className="py-3 px-4">Nama Lengkap Siswa</th>
                  <th className="py-3 px-4">Asal Sekolah & Kota</th>
                  <th className="py-3 px-4">Kategori & Mapel</th>
                  <th className="py-3 px-4 text-center">Skor</th>
                  <th className="py-3 px-4 text-center">Status Kelulusan</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {qualifiers.slice(0, 5).map((q) => (
                  <tr key={q.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                      {q.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      {q.fullName}
                      <span className="block text-[10px] text-gray-500 font-normal">
                        Wali: {q.parentName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {q.schoolName}
                      <span className="block text-[10px] text-gray-400">{q.city}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-[10px] font-bold">
                        Kat {q.category}
                      </span>{' '}
                      <span className="text-[11px] font-medium text-[#AA820A]">
                        {q.subject.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold font-mono text-emerald-700">
                      {q.preliminaryScore ?? 85}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        <CheckCircle2 className="w-3 h-3" /> Lolos Final
                      </span>
                      {q.finalTicketPaid && (
                        <span className="block text-[9px] text-[#AA820A] font-extrabold mt-0.5">
                          ★ TIKET FINAL LUNAS
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onOpenCertificate(q)}
                        className="text-xs text-[#AA820A] hover:underline font-bold"
                      >
                        Sertifikat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
