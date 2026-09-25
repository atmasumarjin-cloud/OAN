import React, { useState } from 'react';
import { X, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { Participant, CategoryId, SubjectId } from '../types';
import { APP_CONFIG } from '../../appConfig.js';
import { BrandLogo, SupportedByBadge } from './BrandLogo';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newParticipant: Participant) => void;
  initialCategory?: CategoryId;
  initialSubject?: SubjectId;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialCategory = 'A',
  initialSubject = 'matematika',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    parentName: '',
    category: initialCategory,
    subject: initialSubject,
    grade: '',
    schoolName: '',
    city: '',
    province: '',
    whatsapp: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Nama lengkap siswa wajib diisi';
    if (!formData.parentName.trim()) errs.parentName = 'Nama orang tua / wali wajib diisi';
    if (!formData.grade.trim()) errs.grade = 'Kelas / tingkat wajib diisi';
    if (!formData.schoolName.trim()) errs.schoolName = 'Asal sekolah wajib diisi';
    if (!formData.city.trim()) errs.city = 'Kota/Kabupaten wajib diisi';
    if (!formData.province.trim()) errs.province = 'Provinsi wajib diisi';
    
    // WhatsApp validation
    const cleanWa = formData.whatsapp.replace(/\D/g, '');
    if (!cleanWa || cleanWa.length < 9) {
      errs.whatsapp = 'Nomor WhatsApp aktif minimal 10 digit (contoh: 08123456789)';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Email valid wajib diisi untuk pengiriman e-sertifikat';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Format WhatsApp phone
    let formattedWa = formData.whatsapp.trim();
    if (formattedWa.startsWith('+62')) {
      formattedWa = '0' + formattedWa.slice(3);
    } else if (formattedWa.startsWith('62')) {
      formattedWa = '0' + formattedWa.slice(2);
    }

    // Generate Unique ID
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newId = `OAN-26-${randomDigits}`;

    const newParticipant: Participant = {
      id: newId,
      registeredAt: new Date().toISOString(),
      fullName: formData.fullName.trim(),
      parentName: formData.parentName.trim(),
      category: formData.category,
      subject: formData.subject,
      grade: formData.grade.trim(),
      schoolName: formData.schoolName.trim(),
      city: formData.city.trim(),
      province: formData.province.trim(),
      whatsapp: formattedWa,
      email: formData.email.trim(),
      socialFollowed: false,
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
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(newParticipant);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#D4AF37]/30 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#1A1615] via-[#2A2421] to-[#1A1615] p-5 sm:p-6 text-white border-b border-[#D4AF37]/40 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <BrandLogo variant="dark" />
            <SupportedByBadge isDark={true} />
          </div>

          <div className="mt-4">
            <h2 className="text-xl sm:text-2xl font-bold font-['Cinzel',serif] text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              Formulir Pendaftaran Mandiri Peserta
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Pendaftaran Babak Penyisihan Terbuka Bebas Biaya (Gratis) untuk Seluruh Siswa SD & SMP di Indonesia.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Data Siswa & Kategori */}
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-gray-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              <Award className="w-4 h-4" /> 1. Data Siswa & Kategori Lomba
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nama Lengkap Siswa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Muhammad Kevin Al-Fatih"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                  errors.fullName ? 'border-red-500 bg-red-50/50' : 'border-gray-300 bg-white'
                }`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Pilihan Kategori Jenjang <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryId })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="A">Kategori A (SD/MI Kelas 1 - 3)</option>
                  <option value="B">Kategori B (SD/MI Kelas 4 - 6)</option>
                  <option value="C">Kategori C (SMP/MTs Kelas 7 - 9)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mata Pelajaran yang Diikuti <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value as SubjectId })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="matematika">Matematika Terpadu</option>
                  <option value="ipa_sains">IPA / Sains Eksperimental</option>
                  <option value="bahasa_inggris">Bahasa Inggris (English Mastery)</option>
                  <option value="bahasa_indonesia">Bahasa Indonesia & Literasi</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Kelas / Tingkat Sekarang <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Kelas 3 SD atau Kelas 8 SMP"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                    errors.grade ? 'border-red-500 bg-red-50/50' : 'border-gray-300 bg-white'
                  }`}
                />
                {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Asal Sekolah <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: SDIT Al-Azhar 1 Jakarta"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                    errors.schoolName ? 'border-red-500 bg-red-50/50' : 'border-gray-300 bg-white'
                  }`}
                />
                {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Kota / Kabupaten <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Kota Surabaya"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                    errors.city ? 'border-red-500 bg-red-50/50' : 'border-gray-300 bg-white'
                  }`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Provinsi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jawa Timur"
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                    errors.province ? 'border-red-500 bg-red-50/50' : 'border-gray-300 bg-white'
                  }`}
                />
                {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Data Orang Tua / Wali & Kontak */}
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-gray-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A1615] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 2. Data Orang Tua / Wali & Kontak
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nama Orang Tua / Wali Murid <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Hendra Wijaya, S.T."
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                  errors.parentName ? 'border-red-500 bg-red-50/50' : 'border-gray-300 bg-white'
                }`}
              />
              {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                    errors.whatsapp ? 'border-red-500 bg-red-50/50' : 'border-gray-300 bg-white'
                  }`}
                />
                <span className="text-[11px] text-gray-500">
                  Untuk konfirmasi resmi dan notifikasi reminder H-2 & H-1.
                </span>
                {errors.whatsapp && <p className="text-red-500 text-xs mt-0.5">{errors.whatsapp}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Alamat Email Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Contoh: orangtua@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                    errors.email ? 'border-red-500 bg-red-50/50' : 'border-gray-300 bg-white'
                  }`}
                />
                <span className="text-[11px] text-gray-500">
                  Untuk pengiriman salinan e-sertifikat resmi.
                </span>
                {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Privacy & Guarantee Notice */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <span className="text-base leading-none">🛡️</span>
            <span>
              Dengan mendaftar, data peserta tersimpan aman di sistem pusat <strong>{APP_CONFIG.brandName}</strong>. Setelah formulir ini, Anda diarahkan untuk konfirmasi WhatsApp panitia dan follow media sosial untuk membuka akses <strong>Simulasi Ujian Mandiri</strong>.
            </span>
          </div>

          {/* Submit Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AA820A] to-[#D4AF37] hover:brightness-110 text-white font-bold text-sm tracking-wide shadow-lg shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Mendaftarkan...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Daftar Sekarang & Dapatkan Akses Simulasi
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
