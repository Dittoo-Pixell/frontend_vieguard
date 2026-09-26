import React from 'react';
import { apiGet } from '@/lib/api';
import { StoreProfile } from '@/types/store';
import { SystemSpecStrip } from '@/components/sections/SystemSpecStrip';
import { HeroSection } from '@/components/sections/HeroSection';
import { QuickAccessSection } from '@/components/sections/QuickAccessSection';
import { PortfolioPreviewSection } from '@/components/sections/PortfolioPreviewSection';
import { ProcessSection } from '@/components/sections/ProcessSection';

async function getStoreProfile(): Promise<StoreProfile | null> {
  try {
    return await apiGet<StoreProfile>('/api/website/store-profile');
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const profile = await getStoreProfile();

  return (
    <div className="w-full pb-16">
      {/* Top Metadata Strip */}
      <SystemSpecStrip />

      {/* Main Landing Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* 1. Hero Section */}
        <HeroSection
          storeName={profile?.storeName || 'Vieguard'}
          description={profile?.description}
        />

        {/* 2. Quick Access 3 Cards */}
        <QuickAccessSection />

        {/* 3. Portfolio Preview (Live API + Skeleton Loading) */}
        <PortfolioPreviewSection />

        {/* 4. Supplemental Process Protocol (4-Step QC) */}
        <ProcessSection />
      </div>
    </div>
  );
}
