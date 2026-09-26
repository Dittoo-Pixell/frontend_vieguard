import React from 'react';
import { Compass, Layers, Clock, Sparkles } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'PENGUKURAN',
      icon: <Compass className="w-4 h-4 text-[#1E3A8A]" />,
      description:
        'Konsultasi pengukuran ukuran tubuh langsung di sekolah atau unggah lembar format ukuran digital personil.',
    },
    {
      num: '02',
      title: 'PEMILIHAN BAHAN',
      icon: <Layers className="w-4 h-4 text-[#1E3A8A]" />,
      description:
        'Bahan drill standar, semi-wool, tropical fabric berkualitas tinggi, dan ornamen logam kuningan awet.',
    },
    {
      num: '03',
      title: 'JADWAL PRODUKSI',
      icon: <Clock className="w-4 h-4 text-[#1E3A8A]" />,
      description:
        'Pengerjaan terstandar 14-21 hari kerja dengan sistem pemantauan tahapan kendali mutu (QC) berkala.',
    },
    {
      num: '04',
      title: 'SANITASI ARMADA SEWA',
      icon: <Sparkles className="w-4 h-4 text-[#1E3A8A]" />,
      description:
        'Pencucian uap industri dan inspeksi higienis menyeluruh instrumen serta kostum pasca-acara bergaransi.',
    },
  ];

  return (
    <section
      aria-label="Protokol Proses Produksi"
      className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-[0_4px_16px_rgba(20,30,60,0.04)]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="space-y-2.5 relative">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#EAF0FF] text-[#1E3A8A] font-bold text-xs flex items-center justify-center">
                {step.num}
              </span>
              <span className="font-bold text-xs tracking-wider text-[#17245F]">
                {step.title}
              </span>
            </div>
            <p className="text-xs text-[#667085] leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
