import React, { useState } from 'react';
import logoOanImport from '../assets/logo-olimpiade.jpg';
import logoYayasanImport from '../assets/logo-yayasan.jpg';

export const LOGO_OAN_SRC = logoOanImport || '/logo-olimpiade.jpg';
export const LOGO_YAYASAN_SRC = logoYayasanImport || '/logo-yayasan.jpg';

interface LogoProps {
  className?: string;
  imageClassName?: string;
  variant?: 'light' | 'dark' | 'full';
  showSubtitle?: boolean;
  showIconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<LogoProps> = ({
  className = 'h-12',
  imageClassName,
  variant = 'light',
  showSubtitle = true,
  showIconOnly = false,
  size,
}) => {
  const isDark = variant === 'dark';
  const [imgError, setImgError] = useState(false);

  // Dynamic sizing based on className or size prop
  const isSmall = size === 'sm' || className.includes('h-8') || className.includes('h-9');
  const isMedium = size === 'md' || className.includes('h-10');

  const defaultImgSize = isSmall
    ? 'w-8 h-8'
    : isMedium
    ? 'w-9 h-9 sm:w-10 sm:h-10'
    : 'w-11 h-11 md:w-12 md:h-12';

  const appliedImageSize = imageClassName || defaultImgSize;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Emblem Logo Image */}
      <div
        className={`relative flex-shrink-0 ${appliedImageSize} rounded-full p-0.5 bg-gradient-to-br from-[#D4AF37] via-[#AA820A] to-[#1A1615] shadow-md shadow-[#D4AF37]/20 flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105`}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-[#1A1615] flex items-center justify-center border border-amber-300/40">
          {!imgError ? (
            <img
              src={LOGO_OAN_SRC}
              alt="Logo Resmi Olimpiade Anak Nusantara"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-[#D4AF37] text-xs">
              OAN
            </div>
          )}
        </div>
      </div>

      {/* Typography */}
      {!showIconOnly && (
        <div className="flex flex-col text-left">
          <span
            className={`font-['Cinzel',serif] tracking-wider font-extrabold ${
              isSmall ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
            } leading-tight ${isDark ? 'text-white' : 'text-[#1A1615]'}`}
          >
            OLIMPIADE ANAK <span className="text-[#D4AF37]">NUSANTARA</span>
          </span>
          {showSubtitle && (
            <span
              className={`${
                isSmall ? 'text-[9px]' : 'text-[10px] sm:text-[11px]'
              } font-medium tracking-widest text-[#B8972E] uppercase`}
            >
              Ajang Prestasi Sains & Bahasa Nasional
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const FoundationLogo: React.FC<{
  className?: string;
  imageClassName?: string;
  isDark?: boolean;
  showText?: boolean;
}> = ({
  className = 'h-10',
  imageClassName,
  isDark = false,
  showText = true,
}) => {
  const [imgError, setImgError] = useState(false);
  const isSmall = className.includes('h-8') || className.includes('h-7');
  const defaultSize = isSmall ? 'w-7 h-7' : 'w-9 h-9';
  const appliedSize = imageClassName || defaultSize;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className={`relative flex-shrink-0 ${appliedSize} rounded-full p-0.5 bg-gradient-to-br from-[#0055b3] via-[#003366] to-[#D4AF37] shadow-sm flex items-center justify-center overflow-hidden`}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center border border-sky-200">
          {!imgError ? (
            <img
              src={LOGO_YAYASAN_SRC}
              alt="Logo Resmi Yayasan Besarrasa Bagi Bangsa"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-[#0055b3] text-[9px]">
              YBBB
            </div>
          )}
        </div>
      </div>
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`text-[11px] font-bold tracking-tight uppercase leading-snug ${
              isDark ? 'text-gray-200' : 'text-[#1A1615]'
            }`}
          >
            Yayasan Besarrasa Bagi Bangsa
          </span>
          <span className="text-[9px] text-[#B8972E] font-medium tracking-wide">
            Official Supporting Partner & Patron
          </span>
        </div>
      )}
    </div>
  );
};

export const SupportedByBadge: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4AF37]/35 shadow-sm text-xs ${
        isDark ? 'bg-[#2A2421]/90 text-white' : 'bg-white/90 text-[#1A1615]'
      }`}
    >
      <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-[#D4AF37]">
        <img
          src={LOGO_YAYASAN_SRC}
          alt="Yayasan Seal"
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-[11px] text-gray-500 font-medium">Didukung oleh:</span>
      <span className="text-[11px] font-bold text-[#D4AF37] tracking-wide uppercase">
        Yayasan Besarrasa Bagi Bangsa
      </span>
    </div>
  );
};
