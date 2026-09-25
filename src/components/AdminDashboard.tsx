import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  LogOut,
  Users,
  Award,
  BookOpen,
  Calendar,
  Code,
  DollarSign,
  Trash2,
  Edit,
  Plus,
  Download,
  Upload,
  MessageCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Filter,
  Search,
  Lock,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Eye,
  Check,
  Send,
  FileSpreadsheet,
} from 'lucide-react';
import {
  Participant,
  Question,
  ScheduleConfig,
  MetaPixelConfig,
  CategoryId,
  SubjectId,
  MedalType,
} from '../types';
import { APP_CONFIG } from '../../appConfig.js';
import { BrandLogo, SupportedByBadge } from './BrandLogo';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  schedule: ScheduleConfig;
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleConfig>>;
  metaPixel: MetaPixelConfig;
  setMetaPixel: React.Dispatch<React.SetStateAction<MetaPixelConfig>>;
  onOpenCertificate: (p: Participant) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  participants,
  setParticipants,
  questions,
  setQuestions,
  schedule,
  setSchedule,
  metaPixel,
  setMetaPixel,
  onOpenCertificate,
}) => {
  // Authentication State (Credentials: ADMIN / AKUSAYANGKAMU123)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  type TabType =
    | 'ringkasan'
    | 'peserta'
    | 'simulasi'
    | 'penyisihan'
    | 'final'
    | 'bankSoal'
    | 'jadwal'
    | 'metaPixel';
  const [activeTab, setActiveTab] = useState<TabType>('ringkasan');

  // Filters for Participant Table
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [selectedParticipantIds, setSelectedParticipantIds] = useState<string[]>([]);

  // Bank Soal State
  const [qCategoryFilter, setQCategoryFilter] = useState<string>('all');
  const [qSubjectFilter, setQSubjectFilter] = useState<string>('all');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [bulkEditPoints, setBulkEditPoints] = useState<number>(5);
  const [showBulkEditModal, setShowBulkEditModal] = useState(false);

  // New Question Form State
  const [newQ, setNewQ] = useState<Partial<Question>>({
    category: 'A',
    subject: 'matematika',
    questionText: '',
    options: ['', '', '', ''],
    correctOptionIndex: 0,
    explanation: '',
    points: 5,
  });

  if (!isOpen) return null;

  // Login handler (Rule: do not display password on form!)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toUpperCase() === 'ADMIN' && password === 'AKUSAYANGKAMU123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Kredensial akses administrator tidak valid. Periksa kembali.');
    }
  };

  // Filtered Participants List (supports Date Range filter)
  const filteredParticipants = participants.filter((p) => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.schoolName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.parentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.whatsapp.includes(searchFilter);

    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSubject = subjectFilter === 'all' || p.subject === subjectFilter;

    let matchesDate = true;
    if (startDateFilter) {
      matchesDate = matchesDate && p.registeredAt.slice(0, 10) >= startDateFilter;
    }
    if (endDateFilter) {
      matchesDate = matchesDate && p.registeredAt.slice(0, 10) <= endDateFilter;
    }

    return matchesSearch && matchesCategory && matchesSubject && matchesDate;
  });

  // KPI Calculations
  const totalRegistered = participants.length;
  const totalSimulated = participants.filter((p) => p.simulationDone).length;
  const totalPreliminary = participants.filter((p) => p.preliminaryDone).length;
  const totalPassedPrelim = participants.filter((p) => p.isPassedPreliminary).length;
  const totalClosingPaid = participants.filter((p) => p.finalTicketPaid).length;
  const totalFinalDone = participants.filter((p) => p.finalDone).length;
  const totalRevenue = totalClosingPaid * APP_CONFIG.payment.ticketPromoPrice;

  // Single Delete Participant
  const handleDeleteParticipant = (id: string, name: string) => {
    if (window.confirm(`Yakin ingin menghapus data peserta "${name}" (${id})? Tindakan ini tidak dapat dibatalkan.`)) {
      setParticipants((prev) => prev.filter((p) => p.id !== id));
      setSelectedParticipantIds((prev) => prev.filter((item) => item !== id));
    }
  };

  // Bulk Delete Participants
  const handleBulkDeleteParticipants = () => {
    if (selectedParticipantIds.length === 0) return;
    if (window.confirm(`Yakin ingin menghapus ${selectedParticipantIds.length} data peserta yang dipilih?`)) {
      setParticipants((prev) => prev.filter((p) => !selectedParticipantIds.includes(p.id)));
      setSelectedParticipantIds([]);
    }
  };

  // Toggle Passing Preliminary
  const handleTogglePassPreliminary = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isPassedPreliminary: !p.isPassedPreliminary } : p
      )
    );
  };

  // Bulk Pass Preliminary (all >= 70)
  const handleBulkPassPreliminary = () => {
    setParticipants((prev) =>
      prev.map((p) => {
        if (p.preliminaryDone && (p.preliminaryScore ?? 0) >= 70) {
          return { ...p, isPassedPreliminary: true };
        }
        return p;
      })
    );
    alert('Seluruh peserta dengan skor penyisihan >= 70 telah dinyatakan LOLOS KE BABAK FINAL.');
  };

  // Toggle Final Ticket Paid (Closing)
  const handleToggleClosingTicket = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newStatus = !p.finalTicketPaid;
          return {
            ...p,
            finalTicketPaid: newStatus,
            finalTicketPaidAt: newStatus ? new Date().toISOString() : null,
          };
        }
        return p;
      })
    );
  };

  // WhatsApp Follow-up action generator
  const getWhatsAppFollowUpLink = (
    p: Participant,
    type: 'simulation' | 'preliminary' | 'ticket' | 'final'
  ) => {
    let msg = '';
    const cleanWa = p.whatsapp.startsWith('0') ? '62' + p.whatsapp.slice(1) : p.whatsapp;

    if (type === 'simulation') {
      msg = `Halo Bapak/Ibu ${p.parentName}, wali dari ananda ${p.fullName} (No. Reg: ${p.id}). Kami panitia ${APP_CONFIG.brandName} mengingatkan bahwa ananda belum menyelesaikan Simulasi Ujian Mandiri. Simulasi sangat penting untuk menguji pemahaman soal dan sistem online sebelum babak penyisihan dimulai. Silakan akses website kami dan ikuti simulasi sekarang juga. Terima kasih!`;
    } else if (type === 'preliminary') {
      msg = `PENTING: Halo Bapak/Ibu ${p.parentName}, mengingatkan bahwa pelaksanaan Babak Penyisihan ${APP_CONFIG.brandName} untuk ananda ${p.fullName} (${p.subject.toUpperCase()}) akan dimulai pada tanggal ${schedule.preliminaryDate}. Mohon persiapkan perangkat internet ananda. Semangat berprestasi!`;
    } else if (type === 'ticket') {
      msg = `SELAMAT! Ananda ${p.fullName} dinyatakan LOLOS BABAK PENYISIHAN ${APP_CONFIG.brandName}! Dapatkan Tiket Final Promo spesial Rp 99.000 (normal Rp 180.000) khusus 10 peserta pertama via BCA 3843-136-911 a.n. SRI PRIHATININGSIH SH. Konfirmasi segera via link ini untuk amankan kuota finalis ananda!`;
    } else {
      msg = `Halo Bapak/Ibu ${p.parentName}, tiket final ananda ${p.fullName} telah terkonfirmasi lunas. Mohon bersiap untuk pelaksanaan Babak Final Nasional pada tanggal ${schedule.finalDate}. Raih Medali Emas dan E-Sertifikat Penghargaan Nasional!`;
    }

    return `https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`;
  };

  // Mass Follow Up Reminder (H-2 / H-1)
  const handleTriggerMassReminder = () => {
    const unexamined = participants.filter((p) => !p.preliminaryDone);
    alert(
      `Sistem Berhasil Mengirimkan Log Reminder WhatsApp H-2 & H-1 kepada ${unexamined.length} peserta yang belum ujian penyisihan. Anda juga dapat melakukan follow-up manual per siswa melalui tombol WhatsApp di tabel peserta.`
    );
  };

  // Bank Soal Filter
  const filteredQuestions = questions.filter((q) => {
    const matchCat = qCategoryFilter === 'all' || q.category === qCategoryFilter;
    const matchSub = qSubjectFilter === 'all' || q.subject === qSubjectFilter;
    return matchCat && matchSub;
  });

  // Single Delete Question
  const handleDeleteQuestion = (qId: string) => {
    if (window.confirm('Hapus butir soal ini dari Bank Soal?')) {
      setQuestions((prev) => prev.filter((q) => q.id !== qId));
      setSelectedQuestionIds((prev) => prev.filter((id) => id !== qId));
    }
  };

  // Bulk Delete Questions
  const handleBulkDeleteQuestions = () => {
    if (selectedQuestionIds.length === 0) return;
    if (window.confirm(`Hapus ${selectedQuestionIds.length} butir soal yang dipilih?`)) {
      setQuestions((prev) => prev.filter((q) => !selectedQuestionIds.includes(q.id)));
      setSelectedQuestionIds([]);
    }
  };

  // Bulk Edit Questions Points
  const handleApplyBulkEdit = () => {
    if (selectedQuestionIds.length === 0) return;
    setQuestions((prev) =>
      prev.map((q) =>
        selectedQuestionIds.includes(q.id) ? { ...q, points: bulkEditPoints } : q
      )
    );
    setShowBulkEditModal(false);
    setSelectedQuestionIds([]);
    alert(`Berhasil memperbarui bobot poin untuk ${selectedQuestionIds.length} soal.`);
  };

  // Export Questions to JSON
  const handleExportQuestions = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bank-soal-${APP_CONFIG.brandName.toLowerCase().replace(/\s+/g, '-')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import Questions from JSON File
  const handleImportQuestions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setQuestions(parsed);
            alert(`Berhasil mengimpor ${parsed.length} butir soal ke Bank Soal!`);
          } else {
            alert('Format file JSON tidak valid. Pastikan berisi array soal.');
          }
        } catch (err) {
          alert('Gagal membaca file JSON.');
        }
      };
    }
  };

  // Save New Question
  const handleSaveNewQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQ.questionText?.trim()) {
      alert('Teks pertanyaan wajib diisi');
      return;
    }

    const questionToAdd: Question = {
      id: `Q-${newQ.category}-${newQ.subject}-${Date.now()}`,
      category: (newQ.category as CategoryId) || 'A',
      subject: (newQ.subject as SubjectId) || 'matematika',
      questionText: newQ.questionText || '',
      options: newQ.options && newQ.options.length === 4 ? newQ.options : ['A', 'B', 'C', 'D'],
      correctOptionIndex: Number(newQ.correctOptionIndex) || 0,
      explanation: newQ.explanation || '',
      points: Number(newQ.points) || 5,
    };

    setQuestions((prev) => [questionToAdd, ...prev]);
    setIsAddingQuestion(false);
    setNewQ({
      category: 'A',
      subject: 'matematika',
      questionText: '',
      options: ['', '', '', ''],
      correctOptionIndex: 0,
      explanation: '',
      points: 5,
    });
    alert('Soal baru berhasil ditambahkan ke Bank Soal!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-7xl bg-white rounded-2xl shadow-2xl border border-[#D4AF37]/50 my-6 overflow-hidden flex flex-col h-[92vh]">
        {/* Top Executive Header */}
        <div className="bg-gradient-to-r from-[#1A1615] via-[#2A2421] to-[#1A1615] px-5 py-3.5 text-white border-b border-[#D4AF37]/40 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <BrandLogo variant="dark" showSubtitle={false} className="h-9" />
            <div className="hidden sm:block border-l border-white/20 pl-3">
              <span className="text-xs font-bold text-[#D4AF37] tracking-wider block">
                EXECUTIVE ADMIN CONTROL CENTER
              </span>
              <span className="text-[10px] text-gray-400">
                Didukung oleh {APP_CONFIG.supportedBy}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="hidden md:inline text-xs text-[#F5E7B2] font-semibold bg-white/10 px-2.5 py-1 rounded-lg border border-[#D4AF37]/30">
                  Logged in as Administrator
                </span>
                <button
                  type="button"
                  onClick={() => setIsAuthenticated(false)}
                  className="px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" /> Keluar
                </button>
              </div>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Guard (Login Screen without written credentials) */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-[#FAF8F5]">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 border border-[#D4AF37]/40 shadow-xl text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1A1615] to-[#2A2421] text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-['Cinzel',serif] text-[#1A1615]">
                Otentikasi Administrator
              </h3>
              <p className="text-xs text-gray-500 mt-1 mb-6">
                Masukkan kredensial rahasia untuk mengakses panel kontrol {APP_CONFIG.brandName}.
              </p>

              {loginError && (
                <div className="mb-4 p-3 bg-red-50 rounded-xl border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2 text-left">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Username Administrator
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username admin..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Password Rahasia
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password admin..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AA820A] to-[#D4AF37] text-white font-bold text-sm tracking-wide shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" /> Masuk ke Dashboard Admin
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard Workspace */
          <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
            {/* Tabs Navigation */}
            <div className="bg-white border-b border-gray-200 px-4 flex gap-1 overflow-x-auto scrollbar-none flex-shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('ringkasan')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'ringkasan'
                    ? 'border-[#D4AF37] text-[#1A1615]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Ringkasan & Filter Tanggal
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('peserta')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'peserta'
                    ? 'border-[#D4AF37] text-[#1A1615]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Users className="w-4 h-4 text-[#AA820A]" /> Database Peserta Lengkap ({participants.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('simulasi')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'simulasi'
                    ? 'border-[#D4AF37] text-[#1A1615]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Clock className="w-4 h-4 text-blue-600" /> Laporan Simulasi ({totalSimulated})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('penyisihan')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'penyisihan'
                    ? 'border-[#D4AF37] text-[#1A1615]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Award className="w-4 h-4 text-emerald-600" /> Laporan Penyisihan ({totalPreliminary})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('final')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'final'
                    ? 'border-[#D4AF37] text-[#1A1615]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <DollarSign className="w-4 h-4 text-amber-600" /> Laporan Final & Closing ({totalClosingPaid})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('bankSoal')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'bankSoal'
                    ? 'border-[#D4AF37] text-[#1A1615]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <BookOpen className="w-4 h-4 text-purple-600" /> Bank Soal ({questions.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('jadwal')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'jadwal'
                    ? 'border-[#D4AF37] text-[#1A1615]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Calendar className="w-4 h-4 text-rose-600" /> Jadwal & Anti-Contek
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('metaPixel')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'metaPixel'
                    ? 'border-[#D4AF37] text-[#1A1615]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Code className="w-4 h-4 text-cyan-600" /> Meta Pixel Iklan
              </button>
            </div>

            {/* Tab Contents Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* TAB 1: RINGKASAN & FILTER STATISTIK */}
              {activeTab === 'ringkasan' && (
                <div className="space-y-6">
                  {/* Date Filter Bar */}
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                      <Filter className="w-4 h-4 text-[#AA820A]" />
                      <span>Filter Statistik Berdasarkan Tanggal Pendaftaran:</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-gray-500">Mulai:</span>
                        <input
                          type="date"
                          value={startDateFilter}
                          onChange={(e) => setStartDateFilter(e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-1 focus:ring-[#D4AF37]"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-gray-500">Sampai:</span>
                        <input
                          type="date"
                          value={endDateFilter}
                          onChange={(e) => setEndDateFilter(e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-1 focus:ring-[#D4AF37]"
                        />
                      </div>
                      {(startDateFilter || endDateFilter) && (
                        <button
                          type="button"
                          onClick={() => {
                            setStartDateFilter('');
                            setEndDateFilter('');
                          }}
                          className="text-xs text-red-600 hover:underline font-semibold"
                        >
                          Reset Filter
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 6 Metric KPI Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                    <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs">
                      <span className="text-[11px] font-bold text-gray-500 block uppercase">
                        Total Pendaftaran
                      </span>
                      <span className="text-2xl font-extrabold text-[#1A1615] font-['Cinzel',serif]">
                        {filteredParticipants.length}
                      </span>
                      <span className="text-[10px] text-gray-400 block mt-1">Siswa Terdaftar</span>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs">
                      <span className="text-[11px] font-bold text-blue-600 block uppercase">
                        Simulasi Selesai
                      </span>
                      <span className="text-2xl font-extrabold text-blue-900 font-['Cinzel',serif]">
                        {filteredParticipants.filter((p) => p.simulationDone).length}
                      </span>
                      <span className="text-[10px] text-gray-400 block mt-1">
                        Telah uji coba mandiri
                      </span>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs">
                      <span className="text-[11px] font-bold text-emerald-600 block uppercase">
                        Penyisihan Selesai
                      </span>
                      <span className="text-2xl font-extrabold text-emerald-900 font-['Cinzel',serif]">
                        {filteredParticipants.filter((p) => p.preliminaryDone).length}
                      </span>
                      <span className="text-[10px] text-gray-400 block mt-1">Skor tercatat live</span>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs">
                      <span className="text-[11px] font-bold text-purple-600 block uppercase">
                        Lolos Final
                      </span>
                      <span className="text-2xl font-extrabold text-purple-900 font-['Cinzel',serif]">
                        {filteredParticipants.filter((p) => p.isPassedPreliminary).length}
                      </span>
                      <span className="text-[10px] text-gray-400 block mt-1">Kandidat Finalis</span>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 shadow-xs">
                      <span className="text-[11px] font-bold text-amber-800 block uppercase">
                        Tiket Final Closing
                      </span>
                      <span className="text-2xl font-extrabold text-amber-950 font-['Cinzel',serif]">
                        {filteredParticipants.filter((p) => p.finalTicketPaid).length}
                      </span>
                      <span className="text-[10px] text-amber-700 block mt-1">
                        Rp 99.000 / Peserta
                      </span>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 shadow-xs">
                      <span className="text-[11px] font-bold text-emerald-800 block uppercase">
                        Total Omzet Tiket
                      </span>
                      <span className="text-lg font-extrabold text-emerald-950 font-['Cinzel',serif]">
                        Rp {(filteredParticipants.filter((p) => p.finalTicketPaid).length * 99000).toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-emerald-700 block mt-1">
                        Rekening BCA 3843-136-911
                      </span>
                    </div>
                  </div>

                  {/* Mass WhatsApp Reminder Trigger Banner */}
                  <div className="p-5 bg-gradient-to-r from-amber-500/10 via-[#D4AF37]/15 to-transparent rounded-2xl border border-[#D4AF37]/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                        <MessageCircle className="w-5 h-5 fill-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">
                          Sistem Follow-Up Otomatis WhatsApp (H-2 & H-1 Babak Penyisihan)
                        </h4>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Jadwal Ujian Penyisihan: <strong>{schedule.preliminaryDate}</strong>. Sistem siap mengirimkan broadcast pesan reminder kepada seluruh peserta yang belum menyelesaikan ujian.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleTriggerMassReminder}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap self-start md:self-auto"
                    >
                      <Send className="w-4 h-4" /> Kirim Follow-Up Reminder WhatsApp Massal
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: DATABASE PESERTA LENGKAP */}
              {activeTab === 'peserta' && (
                <div className="space-y-4">
                  {/* Search and Filters */}
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Cari nama siswa, orang tua, asal sekolah, no WA, no reg..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                      >
                        <option value="all">Semua Kategori</option>
                        <option value="A">Kategori A (SD 1-3)</option>
                        <option value="B">Kategori B (SD 4-6)</option>
                        <option value="C">Kategori C (SMP 7-9)</option>
                      </select>

                      <select
                        value={subjectFilter}
                        onChange={(e) => setSubjectFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                      >
                        <option value="all">Semua Mapel</option>
                        <option value="matematika">Matematika</option>
                        <option value="ipa_sains">IPA / Sains</option>
                        <option value="bahasa_inggris">Bahasa Inggris</option>
                        <option value="bahasa_indonesia">Bahasa Indonesia</option>
                      </select>

                      {selectedParticipantIds.length > 0 && (
                        <button
                          type="button"
                          onClick={handleBulkDeleteParticipants}
                          className="px-3 py-2 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hapus Terpilih ({selectedParticipantIds.length})
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Comprehensive Participants Table (ALL FORM FIELDS SHOWN) */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-gray-700">
                        <thead className="bg-[#FAF8F5] text-gray-600 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                          <tr>
                            <th className="py-3 px-3 w-8">
                              <input
                                type="checkbox"
                                checked={
                                  selectedParticipantIds.length === filteredParticipants.length &&
                                  filteredParticipants.length > 0
                                }
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedParticipantIds(filteredParticipants.map((p) => p.id));
                                  } else {
                                    setSelectedParticipantIds([]);
                                  }
                                }}
                              />
                            </th>
                            <th className="py-3 px-3">No. Registrasi</th>
                            <th className="py-3 px-3">Nama Siswa & Sekolah</th>
                            <th className="py-3 px-3">Nama Orang Tua / Wali</th>
                            <th className="py-3 px-3">WhatsApp & Email</th>
                            <th className="py-3 px-3">Kategori & Mapel</th>
                            <th className="py-3 px-3 text-center">Simulasi</th>
                            <th className="py-3 px-3 text-center">Penyisihan</th>
                            <th className="py-3 px-3 text-center">Status Lolos</th>
                            <th className="py-3 px-3 text-center">Tiket Final (Closing)</th>
                            <th className="py-3 px-3 text-center">Nilai Final</th>
                            <th className="py-3 px-3 text-right">Aksi & Follow-Up</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filteredParticipants.map((p) => (
                            <tr key={p.id} className="hover:bg-amber-50/30 transition-colors">
                              <td className="py-3 px-3">
                                <input
                                  type="checkbox"
                                  checked={selectedParticipantIds.includes(p.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedParticipantIds((prev) => [...prev, p.id]);
                                    } else {
                                      setSelectedParticipantIds((prev) =>
                                        prev.filter((id) => id !== p.id)
                                      );
                                    }
                                  }}
                                />
                              </td>

                              <td className="py-3 px-3 font-mono font-bold text-gray-900 whitespace-nowrap">
                                {p.id}
                                <span className="block text-[9px] text-gray-400 font-normal">
                                  {p.registeredAt.slice(0, 10)}
                                </span>
                              </td>

                              <td className="py-3 px-3">
                                <span className="font-bold text-gray-900 block">{p.fullName}</span>
                                <span className="text-[10px] text-gray-500 block">
                                  {p.schoolName} ({p.grade})
                                </span>
                                <span className="text-[9px] text-gray-400 block">
                                  {p.city}, {p.province}
                                </span>
                              </td>

                              <td className="py-3 px-3">
                                <span className="font-semibold text-gray-800 block">{p.parentName}</span>
                                <span className="text-[9px] text-gray-400">Wali Murid</span>
                              </td>

                              <td className="py-3 px-3 whitespace-nowrap">
                                <span className="font-mono text-gray-800 block">{p.whatsapp}</span>
                                <span className="text-[10px] text-gray-500 block">{p.email}</span>
                              </td>

                              <td className="py-3 px-3 whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-[10px] font-bold block w-fit mb-0.5">
                                  Kat {p.category}
                                </span>
                                <span className="text-[11px] font-semibold text-[#AA820A] uppercase">
                                  {p.subject.replace('_', ' ')}
                                </span>
                              </td>

                              {/* Simulasi Score & Status */}
                              <td className="py-3 px-3 text-center">
                                {p.simulationDone ? (
                                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                    {p.simulationScore ?? 0}
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-red-500 font-medium">Belum</span>
                                )}
                              </td>

                              {/* Penyisihan Score & Status */}
                              <td className="py-3 px-3 text-center">
                                {p.preliminaryDone ? (
                                  <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                    {p.preliminaryScore ?? 0}
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-gray-400">Belum</span>
                                )}
                              </td>

                              {/* Status Lolos Toggle */}
                              <td className="py-3 px-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleTogglePassPreliminary(p.id)}
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                                    p.isPassedPreliminary
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                  }`}
                                >
                                  {p.isPassedPreliminary ? '★ LOLOS FINAL' : 'Tidak Lolos'}
                                </button>
                              </td>

                              {/* Final Ticket Paid (Closing) Badge & Toggle */}
                              <td className="py-3 px-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleToggleClosingTicket(p.id)}
                                  className={`px-2 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition-all ${
                                    p.finalTicketPaid
                                      ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
                                      : 'bg-gray-100 text-gray-400 hover:bg-amber-50 hover:text-amber-700'
                                  }`}
                                >
                                  {p.finalTicketPaid ? '✔ CLOSING LUNAS' : 'Belum Bayar'}
                                </button>
                              </td>

                              {/* Nilai Final */}
                              <td className="py-3 px-3 text-center">
                                {p.finalDone ? (
                                  <span className="font-mono font-bold text-purple-700">
                                    {p.finalScore} ({p.medal || 'Finalis'})
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-gray-400">-</span>
                                )}
                              </td>

                              {/* Action Buttons: Delete & Instant WhatsApp Follow-up */}
                              <td className="py-3 px-3 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* Follow up WhatsApp buttons based on state */}
                                  {!p.simulationDone && (
                                    <a
                                      href={getWhatsAppFollowUpLink(p, 'simulation')}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 title='Follow-up Belum Simulasi'"
                                      title="Kirim WA: Pengingat Ujian Simulasi"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5" />
                                    </a>
                                  )}

                                  {!p.preliminaryDone && (
                                    <a
                                      href={getWhatsAppFollowUpLink(p, 'preliminary')}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                      title="Kirim WA: Reminder H-2/H-1 Babak Penyisihan"
                                    >
                                      <Send className="w-3.5 h-3.5" />
                                    </a>
                                  )}

                                  {p.isPassedPreliminary && !p.finalTicketPaid && (
                                    <a
                                      href={getWhatsAppFollowUpLink(p, 'ticket')}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100"
                                      title="Kirim WA: Penawaran Promo Tiket Final Rp 99.000"
                                    >
                                      <DollarSign className="w-3.5 h-3.5" />
                                    </a>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => onOpenCertificate(p)}
                                    className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    title="Lihat / Cetak Sertifikat"
                                  >
                                    <Award className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteParticipant(p.id, p.fullName)}
                                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                                    title="Hapus Peserta Ini"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TABEL LAPORAN PENGERJAAN SIMULASI */}
              {activeTab === 'simulasi' && (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        Laporan Pengerjaan Simulasi Ujian Mandiri
                      </h4>
                      <p className="text-xs text-gray-500">
                        Total {totalSimulated} dari {participants.length} peserta telah mengerjakan simulasi 20 soal mandiri.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-xs text-gray-700">
                      <thead className="bg-[#FAF8F5] text-gray-600 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                        <tr>
                          <th className="py-3 px-4">No. Registrasi</th>
                          <th className="py-3 px-4">Nama Siswa</th>
                          <th className="py-3 px-4">Kategori & Mapel</th>
                          <th className="py-3 px-4 text-center">Status Simulasi</th>
                          <th className="py-3 px-4 text-center">Skor Akhir</th>
                          <th className="py-3 px-4 text-right">Follow-Up WhatsApp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {participants.map((p) => (
                          <tr key={p.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 font-mono font-bold text-gray-900">{p.id}</td>
                            <td className="py-3 px-4 font-semibold text-gray-900">
                              {p.fullName}
                              <span className="block text-[10px] text-gray-500">{p.schoolName}</span>
                            </td>
                            <td className="py-3 px-4">
                              Kat {p.category} • {p.subject.replace('_', ' ').toUpperCase()}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {p.simulationDone ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                  <CheckCircle2 className="w-3 h-3" /> Selesai
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
                                  <XCircle className="w-3 h-3" /> Belum Mengerjakan
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-sm">
                              {p.simulationDone ? p.simulationScore : '-'}
                            </td>
                            <td className="py-3 px-4 text-right">
                              {!p.simulationDone ? (
                                <a
                                  href={getWhatsAppFollowUpLink(p, 'simulation')}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#25D366] text-white font-bold text-[11px] shadow-xs"
                                >
                                  <MessageCircle className="w-3.5 h-3.5 fill-white" /> Follow-Up WA
                                </a>
                              ) : (
                                <span className="text-[11px] text-emerald-600 font-semibold">Tercatat</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: TABEL LAPORAN PENGERJAAN BABAK PENYISIHAN */}
              {activeTab === 'penyisihan' && (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        Laporan Pengerjaan Babak Penyisihan (H+2 Penentuan Kelulusan)
                      </h4>
                      <p className="text-xs text-gray-500">
                        Skor peserta langsung muncul secara real-time setelah peserta menyelesaikan ujian penyisihan.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleBulkPassPreliminary}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md hover:brightness-110"
                    >
                      Loloskan Semua Skor ≥ 70
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-xs text-gray-700">
                      <thead className="bg-[#FAF8F5] text-gray-600 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                        <tr>
                          <th className="py-3 px-4">No. Registrasi</th>
                          <th className="py-3 px-4">Nama Siswa & Sekolah</th>
                          <th className="py-3 px-4">Kategori & Mapel</th>
                          <th className="py-3 px-4 text-center">Status Pengerjaan</th>
                          <th className="py-3 px-4 text-center">Nilai Penyisihan</th>
                          <th className="py-3 px-4 text-center">Status Kelulusan</th>
                          <th className="py-3 px-4 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {participants.map((p) => (
                          <tr key={p.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 font-mono font-bold text-gray-900">{p.id}</td>
                            <td className="py-3 px-4 font-semibold text-gray-900">
                              {p.fullName}
                              <span className="block text-[10px] text-gray-500">{p.schoolName}</span>
                            </td>
                            <td className="py-3 px-4">
                              Kat {p.category} • {p.subject.replace('_', ' ').toUpperCase()}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {p.preliminaryDone ? (
                                <span className="text-emerald-700 font-bold">Selesai</span>
                              ) : (
                                <span className="text-gray-400">Belum Ujian</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-sm text-blue-700">
                              {p.preliminaryDone ? p.preliminaryScore ?? 0 : '-'}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => handleTogglePassPreliminary(p.id)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer ${
                                  p.isPassedPreliminary
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : 'bg-gray-100 text-gray-500'
                                }`}
                              >
                                {p.isPassedPreliminary ? '★ LOLOS FINAL' : 'Belum Lolos'}
                              </button>
                            </td>
                            <td className="py-3 px-4 text-right">
                              {p.isPassedPreliminary && !p.finalTicketPaid ? (
                                <a
                                  href={getWhatsAppFollowUpLink(p, 'ticket')}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-[#AA820A] font-bold hover:underline"
                                >
                                  Follow-Up Tiket Final
                                </a>
                              ) : (
                                <span className="text-[11px] text-gray-400">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: TABEL LAPORAN PENGERJAAN BABAK FINAL */}
              {activeTab === 'final' && (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        Laporan Pengerjaan Babak Final & Perolehan Medali
                      </h4>
                      <p className="text-xs text-gray-500">
                        Peserta yang telah closing tiket final dapat mengakses babak final dan dianugerahi medali nasional.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-xs text-gray-700">
                      <thead className="bg-[#FAF8F5] text-gray-600 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                        <tr>
                          <th className="py-3 px-4">No. Registrasi</th>
                          <th className="py-3 px-4">Nama Siswa</th>
                          <th className="py-3 px-4">Kategori & Mapel</th>
                          <th className="py-3 px-4 text-center">Status Tiket Final</th>
                          <th className="py-3 px-4 text-center">Nilai Final</th>
                          <th className="py-3 px-4 text-center">Perolehan Medali</th>
                          <th className="py-3 px-4 text-right">Sertifikat</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {participants.filter((p) => p.isPassedPreliminary).map((p) => (
                          <tr key={p.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 font-mono font-bold text-gray-900">{p.id}</td>
                            <td className="py-3 px-4 font-semibold text-gray-900">{p.fullName}</td>
                            <td className="py-3 px-4">
                              Kat {p.category} • {p.subject.replace('_', ' ').toUpperCase()}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {p.finalTicketPaid ? (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                  ✔ CLOSING LUNAS
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                                  Menunggu Pembayaran
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-sm">
                              {p.finalDone ? p.finalScore : '-'}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {p.medal ? (
                                <span className="px-2.5 py-1 rounded-full bg-[#1A1615] text-[#F5E7B2] font-bold text-[10px] border border-[#D4AF37]">
                                  Medali {p.medal}
                                </span>
                              ) : (
                                <span className="text-gray-400 text-[10px]">Belum Final</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => onOpenCertificate(p)}
                                className="text-xs text-[#AA820A] font-bold hover:underline"
                              >
                                Lihat Sertifikat
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 6: BANK SOAL MANAGEMENT */}
              {activeTab === 'bankSoal' && (
                <div className="space-y-4">
                  {/* Actions Header */}
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={qCategoryFilter}
                        onChange={(e) => setQCategoryFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                      >
                        <option value="all">Semua Kategori</option>
                        <option value="A">Kategori A (SD 1-3)</option>
                        <option value="B">Kategori B (SD 4-6)</option>
                        <option value="C">Kategori C (SMP 7-9)</option>
                      </select>

                      <select
                        value={qSubjectFilter}
                        onChange={(e) => setQSubjectFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                      >
                        <option value="all">Semua Mapel</option>
                        <option value="matematika">Matematika</option>
                        <option value="ipa_sains">IPA / Sains</option>
                        <option value="bahasa_inggris">Bahasa Inggris</option>
                        <option value="bahasa_indonesia">Bahasa Indonesia</option>
                      </select>

                      {selectedQuestionIds.length > 0 && (
                        <>
                          <button
                            type="button"
                            onClick={handleBulkDeleteQuestions}
                            className="px-3 py-2 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Hapus Massal ({selectedQuestionIds.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowBulkEditModal(true)}
                            className="px-3 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                          >
                            <Edit className="w-3.5 h-3.5" /> Edit Massal Poin
                          </button>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleExportQuestions}
                        className="px-3.5 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-50"
                      >
                        <Download className="w-3.5 h-3.5" /> Export JSON
                      </button>

                      <label className="px-3.5 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-50 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" /> Import JSON
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportQuestions}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => setIsAddingQuestion(true)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110"
                      >
                        <Plus className="w-4 h-4" /> Tambah Soal Satuan
                      </button>
                    </div>
                  </div>

                  {/* Add Question Modal */}
                  {isAddingQuestion && (
                    <div className="p-5 bg-white rounded-2xl border-2 border-[#D4AF37] shadow-lg space-y-3">
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <Plus className="w-4 h-4 text-[#AA820A]" /> Form Tambah Soal Baru
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                            Kategori
                          </label>
                          <select
                            value={newQ.category}
                            onChange={(e) =>
                              setNewQ({ ...newQ, category: e.target.value as CategoryId })
                            }
                            className="w-full p-2 text-xs border rounded-lg"
                          >
                            <option value="A">Kategori A (SD 1-3)</option>
                            <option value="B">Kategori B (SD 4-6)</option>
                            <option value="C">Kategori C (SMP 7-9)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                            Mata Pelajaran
                          </label>
                          <select
                            value={newQ.subject}
                            onChange={(e) =>
                              setNewQ({ ...newQ, subject: e.target.value as SubjectId })
                            }
                            className="w-full p-2 text-xs border rounded-lg"
                          >
                            <option value="matematika">Matematika</option>
                            <option value="ipa_sains">IPA / Sains</option>
                            <option value="bahasa_inggris">Bahasa Inggris</option>
                            <option value="bahasa_indonesia">Bahasa Indonesia</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                            Poin (Standar: 5)
                          </label>
                          <input
                            type="number"
                            value={newQ.points}
                            onChange={(e) => setNewQ({ ...newQ, points: Number(e.target.value) })}
                            className="w-full p-2 text-xs border rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          Teks Pertanyaan
                        </label>
                        <textarea
                          rows={2}
                          value={newQ.questionText}
                          onChange={(e) => setNewQ({ ...newQ, questionText: e.target.value })}
                          placeholder="Ketik butir soal di sini..."
                          className="w-full p-2 text-xs border rounded-lg"
                        />
                      </div>

                      {/* 4 Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['A', 'B', 'C', 'D'].map((letter, optIndex) => (
                          <div key={letter} className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-gray-100 text-xs font-bold flex items-center justify-center">
                              {letter}
                            </span>
                            <input
                              type="text"
                              placeholder={`Opsi ${letter}`}
                              value={newQ.options?.[optIndex] || ''}
                              onChange={(e) => {
                                const updatedOpts = [...(newQ.options || ['', '', '', ''])];
                                updatedOpts[optIndex] = e.target.value;
                                setNewQ({ ...newQ, options: updatedOpts });
                              }}
                              className="flex-1 p-2 text-xs border rounded-lg"
                            />
                            <input
                              type="radio"
                              name="correctOption"
                              checked={newQ.correctOptionIndex === optIndex}
                              onChange={() => setNewQ({ ...newQ, correctOptionIndex: optIndex })}
                              title="Pilih sebagai kunci jawaban"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingQuestion(false)}
                          className="px-3 py-1.5 rounded-lg border text-xs"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveNewQuestion}
                          className="px-4 py-1.5 rounded-lg bg-[#D4AF37] text-white font-bold text-xs"
                        >
                          Simpan Soal
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Questions Table */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-xs text-gray-700">
                      <thead className="bg-[#FAF8F5] text-gray-600 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200">
                        <tr>
                          <th className="py-3 px-3 w-8">
                            <input
                              type="checkbox"
                              checked={
                                selectedQuestionIds.length === filteredQuestions.length &&
                                filteredQuestions.length > 0
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedQuestionIds(filteredQuestions.map((q) => q.id));
                                } else {
                                  setSelectedQuestionIds([]);
                                }
                              }}
                            />
                          </th>
                          <th className="py-3 px-3">ID</th>
                          <th className="py-3 px-3">Kat / Mapel</th>
                          <th className="py-3 px-3">Pertanyaan</th>
                          <th className="py-3 px-3">Kunci Jawaban</th>
                          <th className="py-3 px-3 text-center">Poin</th>
                          <th className="py-3 px-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredQuestions.map((q) => (
                          <tr key={q.id} className="hover:bg-gray-50">
                            <td className="py-3 px-3">
                              <input
                                type="checkbox"
                                checked={selectedQuestionIds.includes(q.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedQuestionIds((prev) => [...prev, q.id]);
                                  } else {
                                    setSelectedQuestionIds((prev) =>
                                      prev.filter((id) => id !== q.id)
                                    );
                                  }
                                }}
                              />
                            </td>
                            <td className="py-3 px-3 font-mono font-bold text-gray-400 text-[10px]">
                              {q.id}
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className="font-bold text-gray-800">Kat {q.category}</span>
                              <span className="block text-[10px] text-gray-500 uppercase">
                                {q.subject.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="py-3 px-3 max-w-md">
                              <p className="line-clamp-2 text-gray-900 font-medium">
                                {q.questionText}
                              </p>
                            </td>
                            <td className="py-3 px-3 font-semibold text-emerald-700 whitespace-nowrap">
                              Opsi {String.fromCharCode(65 + q.correctOptionIndex)} ({q.options[q.correctOptionIndex]})
                            </td>
                            <td className="py-3 px-3 text-center font-bold font-mono">
                              {q.points}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleDeleteQuestion(q.id)}
                                className="p-1 rounded text-red-500 hover:bg-red-50"
                                title="Hapus soal ini"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 7: JADWAL PELAKSANAAN & ANTI-CONTEK */}
              {activeTab === 'jadwal' && (
                <div className="space-y-6">
                  {/* Anti-Cheat Master Toggle */}
                  <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        Fitur Anti-Contek (Anti-Cheat Engine)
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Jika diaktifkan, sistem akan mendeteksi perpindahan tab browser, memblokir klik kanan, dan membatasi copy-paste saat peserta mengerjakan ujian.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSchedule((prev) => ({
                          ...prev,
                          antiCheatEnabled: !prev.antiCheatEnabled,
                        }))
                      }
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                        schedule.antiCheatEnabled
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {schedule.antiCheatEnabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                      {schedule.antiCheatEnabled ? 'STATUS: AKTIF (ON)' : 'STATUS: NONAKTIF (OFF)'}
                    </button>
                  </div>

                  {/* Dates Configuration */}
                  <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-4">
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#AA820A]" /> Pengaturan Tanggal Pelaksanaan Olimpiade
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Batas Akhir Pendaftaran
                        </label>
                        <input
                          type="date"
                          value={schedule.registrationDeadline}
                          onChange={(e) =>
                            setSchedule({ ...schedule, registrationDeadline: e.target.value })
                          }
                          className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Tanggal Mulai Simulasi
                        </label>
                        <input
                          type="date"
                          value={schedule.simulationStartDate}
                          onChange={(e) =>
                            setSchedule({ ...schedule, simulationStartDate: e.target.value })
                          }
                          className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Tanggal Selesai Simulasi
                        </label>
                        <input
                          type="date"
                          value={schedule.simulationEndDate}
                          onChange={(e) =>
                            setSchedule({ ...schedule, simulationEndDate: e.target.value })
                          }
                          className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Tanggal Babak Penyisihan (H-2 & H-1 Reminder)
                        </label>
                        <input
                          type="date"
                          value={schedule.preliminaryDate}
                          onChange={(e) =>
                            setSchedule({ ...schedule, preliminaryDate: e.target.value })
                          }
                          className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Tanggal Pengumuman Kelulusan Penyisihan (H+2)
                        </label>
                        <input
                          type="date"
                          value={schedule.preliminaryAnnouncementDate}
                          onChange={(e) =>
                            setSchedule({
                              ...schedule,
                              preliminaryAnnouncementDate: e.target.value,
                            })
                          }
                          className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Tanggal Babak Final Nasional
                        </label>
                        <input
                          type="date"
                          value={schedule.finalDate}
                          onChange={(e) =>
                            setSchedule({ ...schedule, finalDate: e.target.value })
                          }
                          className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => alert('Jadwal pelaksanaan berhasil disimpan secara permanen!')}
                        className="px-5 py-2.5 rounded-xl bg-[#1A1615] text-[#D4AF37] font-bold text-xs"
                      >
                        Simpan Perubahan Jadwal
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: META PIXEL SETTING */}
              {activeTab === 'metaPixel' && (
                <div className="space-y-4">
                  <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <Code className="w-4 h-4 text-blue-600" /> Pengaturan Meta Pixel (Facebook & Instagram Ads)
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Konfigurasikan ID Meta Pixel dan Script HTML Pixel untuk melacak klik iklan Meta menuju formulir pendaftaran.
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                      <div>
                        <span className="text-xs font-bold text-gray-800">Status Aktif Meta Pixel</span>
                        <span className="text-[11px] text-gray-500 block">
                          Aktifkan pelacakan event PageView dan Lead pendaftaran.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setMetaPixel((prev) => ({ ...prev, isEnabled: !prev.isEnabled }))
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          metaPixel.isEnabled
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-300 text-gray-700'
                        }`}
                      >
                        {metaPixel.isEnabled ? 'AKTIF' : 'NONAKTIF'}
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Meta Pixel ID (15 - 16 Digit)
                      </label>
                      <input
                        type="text"
                        value={metaPixel.pixelId}
                        onChange={(e) => setMetaPixel({ ...metaPixel, pixelId: e.target.value })}
                        placeholder="Contoh: 984572183920194"
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Kode Script HTML Meta Pixel Lengkap
                      </label>
                      <textarea
                        rows={6}
                        value={metaPixel.customScript}
                        onChange={(e) =>
                          setMetaPixel({ ...metaPixel, customScript: e.target.value })
                        }
                        placeholder="<!-- Meta Pixel Code -->..."
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs font-mono bg-gray-50"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => alert('Pengaturan Meta Pixel berhasil disimpan!')}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md"
                    >
                      Simpan Pengaturan Meta Pixel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bulk Edit Points Modal */}
      {showBulkEditModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <h4 className="text-sm font-bold text-gray-900 mb-2">Edit Bobot Poin Massal</h4>
            <p className="text-xs text-gray-600 mb-4">
              Ubah bobot poin untuk {selectedQuestionIds.length} soal yang dipilih sekaligus.
            </p>
            <input
              type="number"
              value={bulkEditPoints}
              onChange={(e) => setBulkEditPoints(Number(e.target.value))}
              className="w-full p-2 border rounded-xl text-center text-sm font-bold font-mono mb-4"
            />
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => setShowBulkEditModal(false)}
                className="px-3 py-1.5 rounded-lg border text-xs"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleApplyBulkEdit}
                className="px-4 py-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
