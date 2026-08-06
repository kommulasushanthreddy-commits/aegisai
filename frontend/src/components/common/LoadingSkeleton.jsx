import React from 'react';

export const LoadingSkeleton = ({ count = 3, className = "h-12 w-full" }) => {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-[#182030] rounded-xl border border-[#1e2638] ${className}`}
        />
      ))}
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="p-6 bg-[#121723] rounded-2xl border border-[#1e2638] animate-pulse space-y-4">
      <div className="h-6 bg-[#182030] rounded w-1/3"></div>
      <div className="h-20 bg-[#182030] rounded w-full"></div>
      <div className="flex gap-2">
        <div className="h-8 bg-[#182030] rounded w-24"></div>
        <div className="h-8 bg-[#182030] rounded w-24"></div>
      </div>
    </div>
  );
};
