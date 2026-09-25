import React from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  Instagram,
  Youtube,
  ShieldCheck,
  CreditCard,
  Award,
} from 'lucide-react';
import { APP_CONFIG } from '../../appConfig.js';
import { BrandLogo, FoundationLogo } from './BrandLogo';

interface FooterProps {
  onOpenRegister: () => void;
  onOpenSimulation: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRegister,
  onOpenSimulation,
  onScrollToSection,
}) => {
  return (
    <footer className="bg-[#1A1615] text-white border-t border-[#D4AF37]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Foundation */}
          <div className="space-y-4">
            <BrandLogo variant="dark" />
            <p className="text-xs text-gray-300 leading-relaxed">
              {APP_CONFIG.brandName} adalah platform {APP_CONFIG.businessType} terpadu yang diselenggarakan secara online untuk menjaring dan membina talenta siswa berprestasi di seluruh pelosok nusantara.
            </p>

            <div className="pt-2">
              <FoundationLogo className="h-9" isDark={true} />
            </div>
          </div>

          {/* Col 2: Program & Mata Pelajaran */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] font-['Cinzel',serif]">
              Bidang Kompetisi
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('kategori')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Olimpiade Matematika Terpadu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('kategori')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Olimpiade Sains & IPA Eksperimental
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('kategori')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  National English Championship
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('kategori')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Olimpiade Bahasa Indonesia & Literasi
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] text-gray-400 block font-semibold uppercase">
                Tingkat Kategori:
              </span>
              <p className="text-[11px] text-gray-300 mt-0.5">
                Kategori A (SD 1-3) • Kategori B (SD 4-6) • Kategori C (SMP 7-9)
              </p>
            </div>
          </div>

          {/* Col 3: Layanan Mandiri Peserta */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] font-['Cinzel',serif]">
              Layanan Mandiri
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button
                  type="button"
                  onClick={onOpenRegister}
                  className="hover:text-[#D4AF37] transition-colors font-semibold text-[#F5E7B2]"
                >
                  ★ Formulir Pendaftaran Mandiri
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSimulation}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Simulasi Ujian Mandiri (20 Soal Acak)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('pengumuman')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Cek Status Kelulusan & Pengumuman H+2
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('pengumuman')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Cetak / Download E-Sertifikat Resmi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('faq')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Pusat Bantuan & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Pembayaran & Kontak Resmi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] font-['Cinzel',serif]">
              Rekening Resmi & Kontak
            </h4>

            {/* Bank Card */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs">
              <span className="text-[10px] text-gray-400 block uppercase font-mono">
                Rekening Resmi Panitia (BCA):
              </span>
              <p className="font-mono font-extrabold text-[#F5E7B2] text-sm tracking-wide">
                {APP_CONFIG.payment.accountNumber}
              </p>
              <p className="text-[11px] text-gray-300">
                a.n. {APP_CONFIG.payment.accountHolder}
              </p>
            </div>

            {/* WhatsApp Contact */}
            <div className="pt-1">
              <a
                href={`https://wa.me/${APP_CONFIG.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                WhatsApp Admin: {APP_CONFIG.contact.whatsappDisplay}
              </a>
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs text-gray-400">
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{APP_CONFIG.contact.email}</span>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>
            © 2026 <strong>{APP_CONFIG.brandName}</strong>. Seluruh Hak Cipta Dilindungi Undang-Undang. Didukung oleh <strong>{APP_CONFIG.supportedBy}</strong>.
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Platform Resmi Terenkripsi 256-bit
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
