import React, { useState } from 'react';
import { Menu, X, Shield, Sparkles, Award, UserCheck, MessageSquare } from 'lucide-react';
import { BrandLogo, SupportedByBadge } from './BrandLogo';
import { APP_CONFIG } from '../../appConfig.js';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenAdmin: () => void;
  onOpenAiConsultant: () => void;
  onOpenSimulation: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenAdmin,
  onOpenAiConsultant,
  onOpenSimulation,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <BrandLogo />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-semibold text-gray-700">
            <button
              onClick={() => onScrollToSection('kategori')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Kategori & Mapel
            </button>
            <button
              onClick={() => onScrollToSection('alur')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Alur Kompetisi
            </button>
            <button
              onClick={onOpenSimulation}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer flex items-center gap-1 text-[#AA820A] font-bold"
            >
              <Sparkles className="w-3.5 h-3.5" /> Simulasi Mandiri
            </button>
            <button
              onClick={() => onScrollToSection('pengumuman')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Cek Pengumuman
            </button>
            <button
              onClick={() => onScrollToSection('faq')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Secret Admin Entry Button (Discreet Shield Icon) */}
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title="Portal Administrator"
              aria-label="Portal Administrator"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Primary CTA */}
            <button
              onClick={onOpenRegister}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AA820A] to-[#D4AF37] hover:brightness-110 text-white font-bold text-xs tracking-wider uppercase shadow-md shadow-[#D4AF37]/25 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              Daftar Sekarang
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-gray-500 hover:text-gray-800"
              title="Admin"
            >
              <Shield className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="py-2">
            <SupportedByBadge />
          </div>

          <div className="flex flex-col space-y-2 text-sm font-semibold text-gray-800">
            <button
              onClick={() => {
                onScrollToSection('kategori');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#D4AF37]"
            >
              Kategori & Mata Pelajaran
            </button>
            <button
              onClick={() => {
                onScrollToSection('alur');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#D4AF37]"
            >
              Alur Pendaftaran Hingga Final
            </button>
            <button
              onClick={() => {
                onOpenSimulation();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#AA820A] font-bold flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" /> Mulai Simulasi Ujian (20 Soal)
            </button>
            <button
              onClick={() => {
                onScrollToSection('pengumuman');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#D4AF37]"
            >
              Cek Status Kelulusan & Pengumuman
            </button>
            <button
              onClick={() => {
                onScrollToSection('faq');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#D4AF37]"
            >
              Pertanyaan Umum (FAQ)
            </button>
          </div>

          <div className="pt-2 border-t border-gray-100 space-y-2">
            <button
              onClick={() => {
                onOpenRegister();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AA820A] to-[#D4AF37] text-white font-bold text-sm text-center shadow-md"
            >
              Daftar Peserta Sekarang (Gratis)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
