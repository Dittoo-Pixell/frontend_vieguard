import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="w-full pb-16">
      <div className="w-full h-9 bg-white border-b border-[#E5E7EB]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Hero Skeleton */}
        <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-12 text-center space-y-4">
          <Skeleton className="w-64 h-6 mx-auto rounded-full" />
          <Skeleton className="w-3/4 h-10 mx-auto rounded-lg" />
          <Skeleton className="w-1/2 h-5 mx-auto rounded" />
          <div className="pt-4 flex justify-center gap-4">
            <Skeleton className="w-36 h-8 rounded-lg" />
            <Skeleton className="w-36 h-8 rounded-lg" />
            <Skeleton className="w-36 h-8 rounded-lg" />
          </div>
        </div>

        {/* 3 Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4">
              <Skeleton className="w-24 h-4 rounded" />
              <Skeleton className="w-3/4 h-6 rounded" />
              <Skeleton className="w-full h-12 rounded" />
              <Skeleton className="w-full h-11 rounded-xl" />
            </div>
          ))}
        </div>

        {/* Portfolio Skeleton */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 space-y-6">
          <Skeleton className="w-1/3 h-8 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="w-full h-44 rounded-lg" />
                <Skeleton className="w-3/4 h-4 rounded" />
                <Skeleton className="w-1/2 h-4 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
