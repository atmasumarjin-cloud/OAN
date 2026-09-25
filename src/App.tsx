/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Award,
  BookOpen,
  Calculator,
  Atom,
  Languages,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { APP_CONFIG } from '../appConfig.js';
import {
  Participant,
  Question,
  ScheduleConfig,
  MetaPixelConfig,
  ExamType,
  CategoryId,
  SubjectId,
} from './types';
import {
  INITIAL_PARTICIPANTS,
  DEFAULT_SCHEDULE,
  DEFAULT_META_PIXEL,
  generateDefaultQuestionBank,
} from './data/initialData';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandLogo, FoundationLogo, SupportedByBadge } from './components/BrandLogo';
import { SafeImage } from './components/SafeImage';
import { RegistrationModal } from './components/RegistrationModal';
import { SocialFollowModal } from './components/SocialFollowModal';
import { ExamEngine } from './components/ExamEngine';
import { PaymentModal } from './components/PaymentModal';
import { CertificateView } from './components/CertificateView';
import { AnnouncementChecker } from './components/AnnouncementChecker';
import { AdminDashboard } from './components/AdminDashboard';
import { AiConsultantDrawer } from './components/AiConsultantDrawer';
import { Footer } from './components/Footer';

export default function App() {
  // State with LocalStorage Persistence
  const [participants, setParticipants] = useState<Participant[]>(() => {
    try {
      const saved = localStorage.getItem('oan_participants');
      return saved ? JSON.parse(saved) : INITIAL_PARTICIPANTS;
    } catch {
      return INITIAL_PARTICIPANTS;
    }
  });

  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('oan_questions');
      return saved ? JSON.parse(saved) : generateDefaultQuestionBank();
    } catch {
      return generateDefaultQuestionBank();
    }
  });

  const [schedule, setSchedule] = useState<ScheduleConfig>(() => {
    try {
      const saved = localStorage.getItem('oan_schedule');
      return saved ? JSON.parse(saved) : DEFAULT_SCHEDULE;
    } catch {
      return DEFAULT_SCHEDULE;
    }
  });

  const [metaPixel, setMetaPixel] = useState<MetaPixelConfig>(() => {
    try {
      const saved = localStorage.getItem('oan_meta_pixel');
      return saved ? JSON.parse(saved) : DEFAULT_META_PIXEL;
    } catch {
      return DEFAULT_META_PIXEL;
    }
  });

  // Save to LocalStorage whenever states update
  useEffect(() => {
    localStorage.setItem('oan_participants', JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    localStorage.setItem('oan_questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('oan_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('oan_meta_pixel', JSON.stringify(metaPixel));
  }, [metaPixel]);

  // Inject Meta Pixel if enabled
  useEffect(() => {
    if (metaPixel.isEnabled && metaPixel.pixelId) {
      const scriptId = 'meta-pixel-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${metaPixel.pixelId}');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(script);
      }
    }
  }, [metaPixel]);

  // Modal Controls
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedCategoryForRegister, setSelectedCategoryForRegister] = useState<CategoryId>('A');
  const [selectedSubjectForRegister, setSelectedSubjectForRegister] = useState<SubjectId>('matematika');

  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [currentRegisteredParticipant, setCurrentRegisteredParticipant] = useState<Participant | null>(null);

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentParticipant, setPaymentParticipant] = useState<Participant | null>(null);

  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [certificateParticipant, setCertificateParticipant] = useState<Participant | null>(null);

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Active Exam Session (Simulation, Preliminary, Final)
  const [activeExamType, setActiveExamType] = useState<ExamType | null>(null);
  const [activeExamParticipant, setActiveExamParticipant] = useState<Participant | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Handlers
  const handleOpenRegisterWithPreset = (cat: CategoryId, sub: SubjectId) => {
    setSelectedCategoryForRegister(cat);
    setSelectedSubjectForRegister(sub);
    setIsRegisterOpen(true);
  };

  const handleRegistrationSuccess = (newParticipant: Participant) => {
    setParticipants((prev) => [newParticipant, ...prev]);
    setIsRegisterOpen(false);
    setCurrentRegisteredParticipant(newParticipant);
    setIsSocialModalOpen(true);
  };

  const handleStartSimulationFromSocial = () => {
    if (currentRegisteredParticipant) {
      // Mark social followed
      setParticipants((prev) =>
        prev.map((p) =>
          p.id === currentRegisteredParticipant.id ? { ...p, socialFollowed: true } : p
        )
      );
      setIsSocialModalOpen(false);
      setActiveExamParticipant(currentRegisteredParticipant);
      setActiveExamType('simulasi');
    }
  };

  const handleDirectStartSimulation = () => {
    // Pick the most recent participant or prompt registration
    if (participants.length > 0) {
      setActiveExamParticipant(participants[0]);
      setActiveExamType('simulasi');
    } else {
      setIsRegisterOpen(true);
    }
  };

  const handleExamFinish = (score: number, correctCount: number, wrongCount: number) => {
    if (!activeExamParticipant || !activeExamType) return;

    const participantId = activeExamParticipant.id;
    const nowIso = new Date().toISOString();

    setParticipants((prev) =>
      prev.map((p) => {
        if (p.id === participantId) {
          if (activeExamType === 'simulasi') {
            return {
              ...p,
              simulationDone: true,
              simulationScore: score,
              simulationDate: nowIso,
            };
          } else if (activeExamType === 'penyisihan') {
            const isPass = score >= 70;
            return {
              ...p,
              preliminaryDone: true,
              preliminaryScore: score,
              preliminaryDate: nowIso,
              isPassedPreliminary: isPass,
            };
          } else if (activeExamType === 'final') {
            let medalAward: Participant['medal'] = 'Peserta';
            if (score >= 90) medalAward = 'Emas';
            else if (score >= 80) medalAward = 'Perak';
            else if (score >= 70) medalAward = 'Perunggu';
            else medalAward = 'Honorable Mention';

            return {
              ...p,
              finalDone: true,
              finalScore: score,
              finalDate: nowIso,
              medal: medalAward,
            };
          }
        }
        return p;
      })
    );
  };

  const handlePaymentConfirmed = (participantId: string) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === participantId
          ? {
              ...p,
              finalTicketPaid: true,
              finalTicketPaidAt: new Date().toISOString(),
            }
          : p
      )
    );
    setIsPaymentOpen(false);
    alert('Pembayaran Tiket Final berhasil dikonfirmasi! Anda kini memiliki akses ke Ujian Babak Final.');
  };

  const handleStartFinalExam = (p: Participant) => {
    setActiveExamParticipant(p);
    setActiveExamType('final');
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1615]">
      {/* Active Exam Mode Screen (Fullscreen Engine) */}
      {activeExamType && activeExamParticipant && (
        <ExamEngine
          examType={activeExamType}
          participant={activeExamParticipant}
          allQuestions={questions}
          antiCheatEnabled={schedule.antiCheatEnabled}
          onFinish={handleExamFinish}
          onExit={() => {
            setActiveExamType(null);
            setActiveExamParticipant(null);
          }}
        />
      )}

      {/* Standard Public Website View (Hidden when exam is actively ongoing) */}
      {!activeExamType && (
        <>
          {/* Executive Navbar */}
          <Navbar
            onOpenRegister={() => setIsRegisterOpen(true)}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenAiConsultant={() => {}}
            onOpenSimulation={handleDirectStartSimulation}
            onScrollToSection={scrollToSection}
          />

          {/* Luxury Mobile-First Hero Section */}
          <HeroSection
            onOpenRegister={() => setIsRegisterOpen(true)}
            onOpenSimulation={handleDirectStartSimulation}
            onScrollToAnnouncements={() => scrollToSection('pengumuman')}
          />

          {/* Section: Kategori Jenjang & Usia */}
          <section id="kategori" className="py-16 sm:py-24 bg-white border-b border-gray-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-bold text-[#AA820A] uppercase tracking-widest block mb-2">
                  Tingkat Jenjang Pendidikan
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-['Cinzel',serif] text-[#1A1615]">
                  Pembagian Kategori Peserta Olimpiade
                </h2>
                <p className="text-xs sm:text-base text-gray-600 mt-2">
                  Soal disusun secara berjenjang dan disesuaikan dengan kurikulum serta daya nalar anak di setiap jenjang usia.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {APP_CONFIG.categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-6 rounded-2xl bg-gradient-to-b from-[#FAF8F5] to-white border border-gray-200/90 hover:border-[#D4AF37] hover:shadow-xl transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-10 h-10 rounded-xl bg-[#1A1615] text-[#D4AF37] font-['Cinzel',serif] font-bold text-lg flex items-center justify-center shadow-md">
                          {cat.id}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100/70 text-amber-900">
                          {cat.ageRange}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold font-['Cinzel',serif] text-[#1A1615] mb-1">
                        {cat.name}
                      </h3>
                      <p className="text-xs font-bold text-[#AA820A] mb-3">
                        {cat.level}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => handleOpenRegisterWithPreset(cat.id as CategoryId, 'matematika')}
                        className="w-full py-2.5 rounded-xl bg-[#1A1615] group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#AA820A] text-[#F5E7B2] group-hover:text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        Pilih Kategori {cat.id}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: 4 Bidang / Mata Pelajaran Olimpiade */}
          <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-gray-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-bold text-[#AA820A] uppercase tracking-widest block mb-2">
                  Mata Pelajaran & Silabus
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-['Cinzel',serif] text-[#1A1615]">
                  4 Bidang Olimpiade Unggulan Nasional
                </h2>
                <p className="text-xs sm:text-base text-gray-600 mt-2">
                  Daftarkan putra-putri Anda pada mata pelajaran favoritnya untuk memaksimalkan potensi medali dan portofolio prestasi.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {APP_CONFIG.products.map((prod, idx) => (
                  <div
                    key={prod.id}
                    className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row group"
                  >
                    {/* Visual Photo */}
                    <div className="w-full md:w-52 h-48 md:h-auto overflow-hidden relative flex-shrink-0">
                      <SafeImage
                        src={prod.image}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#1A1615]/80 backdrop-blur-xs text-[#F5E7B2] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D4AF37]/50">
                        {prod.badge}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#AA820A] uppercase tracking-wider block mb-1">
                          {prod.categoryTarget}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold font-['Cinzel',serif] text-[#1A1615]">
                          {prod.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {prod.description}
                        </p>

                        <div className="my-4 space-y-1.5">
                          {prod.benefits.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2 text-xs text-gray-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                              <span className="truncate">{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-extrabold text-emerald-700">
                          {prod.priceTag}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            const subMap: Record<number, SubjectId> = {
                              0: 'matematika',
                              1: 'ipa_sains',
                              2: 'bahasa_inggris',
                              3: 'bahasa_indonesia',
                            };
                            handleOpenRegisterWithPreset('A', subMap[idx] || 'matematika');
                          }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-white font-bold text-xs shadow-md hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
                        >
                          Daftar Bidang Ini <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Alur Lengkap Pendaftaran Hingga Final (9 Tahapan) */}
          <section id="alur" className="py-16 sm:py-24 bg-white border-b border-gray-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-bold text-[#AA820A] uppercase tracking-widest block mb-2">
                  Sistem Mandiri Terpadu
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-['Cinzel',serif] text-[#1A1615]">
                  Alur Pendaftaran Hingga Pelaksanaan Olimpiade
                </h2>
                <p className="text-xs sm:text-base text-gray-600 mt-2">
                  Seluruh rangkaian dirancang 100% mandiri, ramah anak, dan dapat diakses dari smartphone maupun komputer Anda.
                </p>
              </div>

              {/* 9 Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: '01',
                    title: 'Pendaftaran Mandiri',
                    desc: 'Orang tua atau siswa mengisi formulir data diri lengkap di website ini secara mandiri tanpa biaya pendaftaran.',
                    badge: 'Bebas Biaya',
                  },
                  {
                    step: '02',
                    title: 'Konfirmasi WhatsApp & Follow Sosmed',
                    desc: 'Konfirmasi nomor aktif ke WA panitia resmi dan ikuti media sosial untuk membuka akses ujian simulasi.',
                    badge: 'Wajib Verifikasi',
                  },
                  {
                    step: '03',
                    title: 'Simulasi Ujian Mandiri',
                    desc: 'Coba 20 butir soal acak berbobot 5 poin/soal dengan timer dan sistem anti-contek untuk latihan maksimal.',
                    badge: 'Akses Instan',
                  },
                  {
                    step: '04',
                    title: 'Reminder WhatsApp H-2 & H-1',
                    desc: 'Sistem dan admin mengirimkan pengingat jadwal ujian babak penyisihan via WhatsApp agar peserta tidak terlewat.',
                    badge: 'Notifikasi Otomatis',
                  },
                  {
                    step: '05',
                    title: 'Babak Penyisihan Online',
                    desc: 'Peserta mengerjakan 20 soal resmi babak penyisihan dengan pengawasan integritas anti-cheat otomatis.',
                    badge: 'Bobot 100 Poin',
                  },
                  {
                    step: '06',
                    title: 'Pengumuman Kelulusan H+2',
                    desc: 'Pada H+2, dewan juri menetapkan status kelulusan peserta yang terintegrasi di portal cek status website.',
                    badge: 'H+2 Pelaksanaan',
                  },
                  {
                    step: '07',
                    title: 'Pembelian Tiket Babak Final',
                    desc: 'Peserta lolos mengambil tiket final promo Rp 99.000 (normal Rp 180.000) via BCA 3843-136-911 a.n. SRI PRIHATININGSIH SH.',
                    badge: 'Promo Khusus',
                  },
                  {
                    step: '08',
                    title: 'Pelaksanaan Babak Final',
                    desc: 'Peserta berstatus closing tiket final mengerjakan babak final untuk memperebutkan Medali Emas, Perak, dan Perunggu.',
                    badge: 'Perebutan Medali',
                  },
                  {
                    step: '09',
                    title: 'Unduh E-Sertifikat Resmi',
                    desc: 'Seluruh peserta dan pemenang dapat mencetak E-Sertifikat ber-QR Code dengan tanda tangan pengesahan resmi.',
                    badge: 'Legalitas Terjamin',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#FAF8F5] border border-gray-200/80 hover:border-[#D4AF37] transition-all relative overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl font-black font-['Cinzel',serif] text-[#D4AF37]/50">
                          {item.step}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-gray-700 border border-gray-200">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-base font-bold font-['Cinzel',serif] text-[#1A1615] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Central CTA Banner */}
              <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#1A1615] via-[#2A2421] to-[#1A1615] text-white border border-[#D4AF37]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <SupportedByBadge isDark={true} />
                  <h3 className="text-xl sm:text-2xl font-bold font-['Cinzel',serif] text-white mt-2">
                    Siap Memulai Perjalanan Prestasi Nasional?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
                    Pendaftaran babak penyisihan masih dibuka hari ini. Daftarkan putra-putri Anda sekarang dan dapatkan akses langsung ke Simulasi Ujian Mandiri.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsRegisterOpen(true)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AA820A] to-[#D4AF37] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#D4AF37]/30 hover:brightness-110 transition-all cursor-pointer whitespace-nowrap"
                  >
                    Daftar Sekarang (Gratis)
                  </button>
                  <button
                    type="button"
                    onClick={handleDirectStartSimulation}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#F5E7B2] font-semibold text-xs transition-colors border border-white/20 whitespace-nowrap"
                  >
                    Uji Simulasi Mandiri
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Galeri Visual & Pembuktian Prestasi */}
          <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-gray-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-bold text-[#AA820A] uppercase tracking-widest block mb-2">
                  Galeri Prestasi Nusantara
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-['Cinzel',serif] text-[#1A1615]">
                  Menumbuhkan Bakat & Percaya Diri Anak
                </h2>
                <p className="text-xs sm:text-base text-gray-600 mt-2">
                  Dokumentasi semangat belajar, kompetisi sehat, dan kebanggaan medali penghargaan siswa di seluruh Indonesia.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-48 sm:h-64 group relative">
                  <SafeImage
                    src={APP_CONFIG.images.students}
                    alt="Siswa Berprestasi"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-end">
                    <span className="text-xs font-bold text-white">Fokus & Integritas Belajar</span>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-48 sm:h-64 group relative">
                  <SafeImage
                    src={APP_CONFIG.images.medals}
                    alt="Medali Emas Olimpiade"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-end">
                    <span className="text-xs font-bold text-white">Medali Penghargaan Nasional</span>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-48 sm:h-64 group relative">
                  <SafeImage
                    src={APP_CONFIG.images.trophy}
                    alt="Piala Juara Umum"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-end">
                    <span className="text-xs font-bold text-white">Piala Juara & Piagam</span>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-48 sm:h-64 group relative">
                  <SafeImage
                    src={APP_CONFIG.images.certificate}
                    alt="E-Sertifikat Sah"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-end">
                    <span className="text-xs font-bold text-white">Sertifikat Terakreditasi</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Testimoni Orang Tua & Guru Pembina */}
          <section className="py-16 sm:py-24 bg-white border-b border-gray-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-bold text-[#AA820A] uppercase tracking-widest block mb-2">
                  Testimoni Nyata
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-['Cinzel',serif] text-[#1A1615]">
                  Apresiasi & Kepercayaan Orang Tua
                </h2>
                <p className="text-xs sm:text-base text-gray-600 mt-2">
                  Pengalaman nyata dari ribuan orang tua dan guru pembina sekolah di seluruh nusantara.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {APP_CONFIG.testimonials.map((testi, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#FAF8F5] border border-gray-200 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-1 text-amber-500 mb-3">
                        {Array.from({ length: testi.rating }).map((_, r) => (
                          <span key={r} className="text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed mb-4">
                        &quot;{testi.text}&quot;
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200/80 flex items-center gap-3">
                      <SafeImage
                        src={testi.avatar}
                        alt={testi.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{testi.name}</h4>
                        <p className="text-[10px] text-gray-500">{testi.role}</p>
                        <p className="text-[10px] text-[#AA820A] font-semibold">{testi.studentName}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Announcement & Qualifier Table */}
          <AnnouncementChecker
            participants={participants}
            onOpenPayment={(p) => {
              setPaymentParticipant(p);
              setIsPaymentOpen(true);
            }}
            onOpenCertificate={(p) => {
              setCertificateParticipant(p);
              setIsCertificateOpen(true);
            }}
            onStartFinalExam={handleStartFinalExam}
          />

          {/* Section: FAQ Accordion (10+ Items) */}
          <section id="faq" className="py-16 sm:py-24 bg-white border-b border-gray-200/80">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-bold text-[#AA820A] uppercase tracking-widest block mb-2">
                  Tanya Jawab Seputar Kompetisi
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-['Cinzel',serif] text-[#1A1615]">
                  Pertanyaan Yang Sering Diajukan (FAQ)
                </h2>
                <p className="text-xs sm:text-base text-gray-600 mt-2">
                  Informasi lengkap mengenai alur pendaftaran, pelaksanaan ujian, pembagian sertifikat, dan pembayaran tiket final.
                </p>
              </div>

              <div className="space-y-3">
                {APP_CONFIG.faq.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-2xl overflow-hidden bg-[#FAF8F5] transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-900 hover:text-[#AA820A] cursor-pointer"
                      >
                        <span className="flex items-center gap-3">
                          <HelpCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                          {item.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-white">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Still have questions banner */}
              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-900">
                <span>
                  Masih memiliki pertanyaan lain yang belum terjawab? Tim kami siap melayani Anda 24/7.
                </span>
                <a
                  href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                    `Halo Admin ${APP_CONFIG.brandName}, saya ingin bertanya informasi lebih lanjut seputar kompetisi.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-sm hover:bg-[#20ba59] transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" /> Hubungi WA Admin
                </a>
              </div>
            </div>
          </section>

          {/* Executive Footer */}
          <Footer
            onOpenRegister={() => setIsRegisterOpen(true)}
            onOpenSimulation={handleDirectStartSimulation}
            onScrollToSection={scrollToSection}
          />

          {/* AI Consultant Drawer */}
          <AiConsultantDrawer />
        </>
      )}

      {/* Modals */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={handleRegistrationSuccess}
        initialCategory={selectedCategoryForRegister}
        initialSubject={selectedSubjectForRegister}
      />

      <SocialFollowModal
        isOpen={isSocialModalOpen}
        participant={currentRegisteredParticipant}
        onVerified={handleStartSimulationFromSocial}
        onClose={() => setIsSocialModalOpen(false)}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        participant={paymentParticipant}
        onClose={() => setIsPaymentOpen(false)}
        onPaymentConfirmed={handlePaymentConfirmed}
      />

      {isCertificateOpen && certificateParticipant && (
        <CertificateView
          participant={certificateParticipant}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        participants={participants}
        setParticipants={setParticipants}
        questions={questions}
        setQuestions={setQuestions}
        schedule={schedule}
        setSchedule={setSchedule}
        metaPixel={metaPixel}
        setMetaPixel={setMetaPixel}
        onOpenCertificate={(p) => {
          setCertificateParticipant(p);
          setIsCertificateOpen(true);
        }}
      />
    </div>
  );
}
