import React from "react";

// Article Card Skeleton
export const ArticleCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-48 w-full rounded-lg mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/4"></div>
    </div>
  </div>
);

// Category Card Skeleton
export const CategoryCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-32 w-full rounded-lg mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
  </div>
);

// Hero Slider Skeleton
export const HeroSliderSkeleton = () => (
  <div className="animate-pulse w-screen lg:h-screen h-[600px] bg-gray-300 relative">
    <div className="absolute bottom-16 left-32 space-y-4">
      <div className="h-8 bg-gray-400 rounded w-96"></div>
      <div className="h-4 bg-gray-400 rounded w-64"></div>
    </div>
  </div>
);

// Article Content Skeleton
export const ArticleContentSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-gray-300 rounded w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    <div className="h-64 bg-gray-300 rounded w-full"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  </div>
);

// Loading Spinner
export const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} border-4 border-gray-300 border-t-[#9544cf] rounded-full animate-spin`}></div>
    </div>
  );
};

// Full Page Loading
export const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600">Φόρτωση...</p>
    </div>
  </div>
);