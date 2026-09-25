import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Send,
  Sparkles,
  Award,
  Check,
  RotateCcw,
} from 'lucide-react';
import { Question, Participant, ExamType, CategoryId, SubjectId } from '../types';
import { APP_CONFIG } from '../../appConfig.js';
import { BrandLogo } from './BrandLogo';

interface ExamEngineProps {
  examType: ExamType;
  participant: Participant;
  allQuestions: Question[];
  antiCheatEnabled: boolean;
  onFinish: (score: number, correctCount: number, wrongCount: number) => void;
  onExit: () => void;
}

export const ExamEngine: React.FC<ExamEngineProps> = ({
  examType,
  participant,
  allQuestions,
  antiCheatEnabled,
  onFinish,
  onExit,
}) => {
  // Filter questions for participant's category & subject
  const availableQuestions = useMemo(() => {
    let filtered = allQuestions.filter(
      (q) => q.category === participant.category && q.subject === participant.subject
    );

    // If not enough questions in exact filter, fallback to matching subject
    if (filtered.length < 20) {
      filtered = allQuestions.filter((q) => q.subject === participant.subject);
    }

    // Shuffle and pick 20
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 20);
  }, [allQuestions, participant.category, participant.subject]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [doubtfulQuestions, setDoubtfulQuestions] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(examType === 'final' ? 2400 : 1800); // 40 mins for final, 30 mins for others
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [cheatViolations, setCheatViolations] = useState<number>(0);
  const [showCheatWarning, setShowCheatWarning] = useState<boolean>(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);

  // Timer Effect
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  // Anti-Cheat (Focus / Visibility Detector)
  useEffect(() => {
    if (!antiCheatEnabled || isSubmitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCheatViolations((prev) => {
          const next = prev + 1;
          setShowCheatWarning(true);
          return next;
        });
      }
    };

    const handleBlur = () => {
      setCheatViolations((prev) => {
        const next = prev + 1;
        setShowCheatWarning(true);
        return next;
      });
    };

    const handlePreventCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('copy', handlePreventCopy);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('copy', handlePreventCopy);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [antiCheatEnabled, isSubmitted]);

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleToggleDoubtful = () => {
    setDoubtfulQuestions((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex],
    }));
  };

  const handleSubmitExam = () => {
    let correct = 0;
    availableQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correct += 1;
      }
    });

    const score = correct * 5; // 20 questions x 5 = 100 max
    const wrong = availableQuestions.length - correct;

    setCorrectCount(correct);
    setFinalScore(score);
    setIsSubmitted(true);
    setShowConfirmSubmit(false);

    // Call callback to persist immediately
    onFinish(score, correct, wrong);
  };

  const currentQ = availableQuestions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  const examTitle =
    examType === 'simulasi'
      ? 'SIMULASI UJIAN MANDIRI'
      : examType === 'penyisihan'
      ? 'BABAK PENYISIHAN RESMI'
      : 'BABAK FINAL NASIONAL';

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col select-none">
      {/* Top Exam Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#1A1615] text-white border-b border-[#D4AF37]/40 shadow-md px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BrandLogo variant="dark" showSubtitle={false} className="h-9" />
            <div className="hidden sm:block border-l border-white/20 pl-3">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                {examTitle}
              </span>
              <span className="text-[11px] text-gray-300">
                {participant.fullName} (Kategori {participant.category} • {participant.subject.toUpperCase()})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer Badge */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-sm font-bold border ${
                timeLeft < 300
                  ? 'bg-red-500/20 text-red-300 border-red-500 animate-pulse'
                  : 'bg-white/10 text-[#F5E7B2] border-[#D4AF37]/50'
              }`}
            >
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            {/* Anti-cheat status pill */}
            {antiCheatEnabled && (
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-[11px] text-emerald-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Anti-Contek Aktif
              </div>
            )}

            {!isSubmitted && (
              <button
                type="button"
                onClick={() => setShowConfirmSubmit(true)}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-white text-xs font-bold shadow-md hover:brightness-110 cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Kirim Jawaban
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Exam Interface */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 flex flex-col md:flex-row gap-5">
        {!isSubmitted ? (
          <>
            {/* Left Column: Question Card */}
            <div className="flex-1 flex flex-col justify-between bg-white rounded-2xl border border-gray-200/90 shadow-sm p-4 sm:p-6 min-h-[500px]">
              <div>
                {/* Question Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-[#1A1615] text-[#D4AF37] font-bold text-xs">
                      Soal Nomor {currentIndex + 1}
                    </span>
                    <span className="text-xs text-gray-500">
                      dari 20 Soal (Bobot: 5 Poin)
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleToggleDoubtful}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                      doubtfulQuestions[currentIndex]
                        ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                    {doubtfulQuestions[currentIndex] ? 'Ragu-ragu (Ditandai)' : 'Tandai Ragu'}
                  </button>
                </div>

                {/* Question Body */}
                <div className="my-3">
                  <p className="text-base sm:text-lg font-medium text-gray-900 leading-relaxed">
                    {currentQ?.questionText}
                  </p>
                </div>

                {/* Answer Options */}
                <div className="space-y-3 mt-6">
                  {currentQ?.options.map((optText, optIdx) => {
                    const isSelected = selectedAnswers[currentIndex] === optIdx;
                    const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-[#FAF8F5] border-[#D4AF37] ring-2 ring-[#D4AF37]/50 shadow-sm'
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#D4AF37] text-white shadow-sm'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="text-sm sm:text-base text-gray-800 leading-snug pt-0.5">
                          {optText}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Navigation Buttons */}
              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs sm:text-sm flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4" /> Soal Sebelumnya
                </button>

                <div className="text-xs text-gray-500 hidden sm:block">
                  Terjawab: <strong className="text-gray-900">{answeredCount}</strong> / 20 Soal
                </div>

                {currentIndex < availableQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => Math.min(availableQuestions.length - 1, prev + 1))}
                    className="px-5 py-2 rounded-xl bg-[#1A1615] text-[#D4AF37] font-semibold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-black transition-colors"
                  >
                    Soal Berikutnya <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowConfirmSubmit(true)}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:brightness-110"
                  >
                    Selesai & Kumpulkan <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Question Grid & Information */}
            <div className="w-full md:w-80 flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-4">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Nomor Soal (20 Soal)
                  </h4>
                  <span className="text-[11px] font-bold text-[#AA820A]">
                    {answeredCount} Terisi
                  </span>
                </div>

                {/* 20 Questions Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {availableQuestions.map((_, idx) => {
                    const isAnswered = selectedAnswers[idx] !== undefined;
                    const isDoubt = doubtfulQuestions[idx];
                    const isCurrent = currentIndex === idx;

                    let bgClass = 'bg-gray-100 text-gray-700 border-gray-200';
                    if (isAnswered) {
                      bgClass = 'bg-emerald-600 text-white border-emerald-700 shadow-sm';
                    }
                    if (isDoubt) {
                      bgClass = 'bg-amber-500 text-white border-amber-600 shadow-sm';
                    }
                    if (isCurrent) {
                      bgClass += ' ring-2 ring-[#D4AF37] ring-offset-1 font-extrabold';
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-9 rounded-lg border text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${bgClass}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-[11px] text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-emerald-600 inline-block" />
                    <span>Sudah Dijawab ({answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-amber-500 inline-block" />
                    <span>Ragu-Ragu ({Object.values(doubtfulQuestions).filter(Boolean).length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-gray-100 border border-gray-300 inline-block" />
                    <span>Belum Dijawab ({20 - answeredCount})</span>
                  </div>
                </div>
              </div>

              {/* Anti-cheat status banner */}
              {antiCheatEnabled && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    Sistem Integritas Ujian
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Dilarang berpindah tab browser atau meminimalkan jendela. Setiap aktivitas mencurigakan terekam oleh server.
                  </p>
                  {cheatViolations > 0 && (
                    <div className="text-[11px] font-bold text-red-600 pt-1">
                      ⚠️ Tercatat {cheatViolations} kali perpindahan jendela!
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Result Summary Screen */
          <div className="w-full max-w-2xl mx-auto my-6 bg-white rounded-2xl border border-[#D4AF37]/50 shadow-xl overflow-hidden p-6 sm:p-8 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#AA820A] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#D4AF37]/30">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold text-[#AA820A] uppercase tracking-widest block mb-1">
              Hasil {examTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Cinzel',serif] text-[#1A1615]">
              Selamat, {participant.fullName}!
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto">
              Anda telah menyelesaikan seluruh 20 soal {examTitle}. Hasil dan nilai Anda telah tercatat secara otomatis di sistem panitia.
            </p>

            {/* Score Big Display */}
            <div className="my-6 p-6 rounded-2xl bg-gradient-to-b from-[#FAF8F5] to-amber-50/60 border border-[#D4AF37]/40 max-w-sm mx-auto">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block">
                Total Skor Anda
              </span>
              <div className="text-5xl sm:text-6xl font-black font-['Cinzel',serif] text-[#1A1615] my-2">
                {finalScore} <span className="text-xl font-normal text-gray-400">/ 100</span>
              </div>
              <p className="text-xs font-semibold text-emerald-700">
                Jawaban Benar: {correctCount} dari 20 Soal (Bobot: 5 Poin/Soal)
              </p>
            </div>

            {/* Feedback based on score */}
            <div className="text-xs sm:text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 text-left space-y-1.5">
              <p>
                <strong>Catatan Panitia:</strong>
              </p>
              {finalScore !== null && finalScore >= 70 ? (
                <p className="text-emerald-800">
                  🎉 Luar biasa! Skor Anda sangat memuaskan dan memenuhi standar kelulusan ke babak berikutnya. Anda berhak mendapatkan E-Sertifikat dan dapat melanjutkan ke Babak Final.
                </p>
              ) : (
                <p className="text-amber-800">
                  👍 Kerja bagus! Terus asah kemampuan dan nalar belajarmu. Simulasi mandiri dapat dicoba kembali untuk mempertajam kesiapan menghadapi babak sesungguhnya.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onExit}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1A1615] text-white hover:bg-black font-bold text-sm tracking-wide transition-all cursor-pointer shadow-md"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-gray-200 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">Kumpulkan Ujian Sekarang?</h4>
            <p className="text-xs text-gray-600 mt-2">
              Anda telah menjawab <strong>{answeredCount}</strong> dari <strong>20</strong> soal.
              {answeredCount < 20 && (
                <span className="text-red-500 block font-semibold mt-1">
                  Masih ada {20 - answeredCount} soal yang belum Anda jawab!
                </span>
              )}
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
              >
                Lanjutkan Mengerjakan
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-md hover:brightness-110"
              >
                Ya, Kumpulkan Jawaban
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Anti-cheat Warning Modal */}
      {showCheatWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-red-300 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-red-600">Peringatan Anti-Contek!</h4>
            <p className="text-xs text-gray-700 mt-2 leading-relaxed">
              Sistem mendeteksi bahwa Anda telah berpindah tab, meminimalkan browser, atau kehilangan fokus pada layar ujian.
            </p>
            <div className="my-3 p-2 bg-red-50 rounded-lg text-xs font-bold text-red-800">
              Total Pelanggaran: {cheatViolations} kali
            </div>
            <p className="text-[11px] text-gray-500 mb-4">
              Harap tetap berada di halaman ujian hingga selesai. Pelanggaran berulang dapat membatalkan skor Anda.
            </p>
            <button
              type="button"
              onClick={() => setShowCheatWarning(false)}
              className="w-full py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 shadow-md"
            >
              Saya Mengerti & Kembali ke Ujian
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
