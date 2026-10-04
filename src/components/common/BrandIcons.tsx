import React from 'react';

export const FinSuiteLogo: React.FC<{ className?: string; showText?: boolean }> = ({
  className = 'w-8 h-8',
  showText = true,
}) => {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      <div className={`relative ${className} flex items-center justify-center`}>
        {/* Modern FinSuite wallet/card geometric icon */}
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          <rect x="2" y="6" width="36" height="28" rx="8" fill="#0F172A" />
          {/* Neon green & cyan gradient card layer */}
          <rect x="6" y="11" width="28" height="20" rx="6" fill="url(#finsuite-grad)" />
          {/* Card band and chip */}
          <rect x="10" y="16" width="7" height="6" rx="2" fill="#D4F74C" />
          <circle cx="28" cy="22" r="3" fill="#FFFFFF" fillOpacity="0.8" />
          <defs>
            <linearGradient id="finsuite-grad" x1="6" y1="11" x2="34" y2="31" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="0.6" stopColor="#7C3AED" />
              <stop offset="1" stopColor="#D4F74C" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {showText && (
        <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors flex items-center">
          Fin<span className="text-blue-600">Suite</span>
        </span>
      )}
    </div>
  );
};

export const NetflixIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <div className={`${className} bg-black flex items-center justify-center rounded-lg shadow-sm shrink-0`}>
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#E50914]">
      <path d="M5.398 0v24c1.196-.18 2.378-.382 3.55-.606V7.472l6.818 16.035c1.29-.27 2.569-.562 3.836-.88V0h-3.55v16.528L9.234 0H5.398z" />
    </svg>
  </div>
);

export const SpotifyIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <div className={`${className} bg-[#1DB954] flex items-center justify-center rounded-full shadow-sm shrink-0`}>
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.308c-.216.353-.675.467-1.028.251-2.812-1.718-6.35-2.108-10.518-1.155-.403.092-.803-.16-.895-.563-.092-.403.16-.803.563-.895 4.563-1.042 8.48-.601 11.627 1.334.353.216.467.675.251 1.028zm1.47-3.268c-.272.443-.853.584-1.296.312-3.219-1.979-8.125-2.55-11.933-1.393-.499.151-1.024-.132-1.176-.63-.151-.499.132-1.024.63-1.176 4.354-1.322 9.774-.687 13.463 1.591.443.272.584.853.312 1.296zm.126-3.41c-3.858-2.291-10.228-2.502-13.898-1.388-.592.18-1.221-.157-1.401-.749-.18-.592.157-1.221.749-1.401 4.225-1.283 11.265-1.036 15.698 1.594.534.316.708 1.009.392 1.543-.316.534-1.009.708-1.54 1.001z" />
    </svg>
  </div>
);

export const ICloudIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <div className={`${className} bg-gradient-to-tr from-white to-sky-100 flex items-center justify-center rounded-xl shadow-sm shrink-0 border border-white/40`}>
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-sky-500">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
    </svg>
  </div>
);

export const ToolIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'slack':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" />
          <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" />
          <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" />
          <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
        </svg>
      );
    case 'figma':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#F24E1E" d="M12 12a4 4 0 1 1 0-8h4v8h-4z" />
          <path fill="#FF7262" d="M8 4a4 4 0 0 0 0 8h4V4H8z" />
          <path fill="#A259FF" d="M8 12a4 4 0 0 0 0 8h4v-8H8z" />
          <path fill="#1ABCFE" d="M12 12h4a4 4 0 1 1-4 4v-4z" />
          <path fill="#0ACF83" d="M8 20a4 4 0 1 0 4-4H8v4z" />
        </svg>
      );
    case 'notion':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.093-.373L17.842 1.97c-.466-.373-.98-.793-2.193-.7l-12.04.84c-.373.047-.466.28-.28.466l1.13 1.632zm-.793 4.293v13.532c0 .84.42 1.166 1.353 1.12l14.288-.84c.933-.047 1.166-.653 1.166-1.353V7.333c0-.7-.373-1.026-1.12-.98l-14.567.84c-.793.047-1.12.466-1.12 1.308zm12.32 1.866c.093.42 0 .84-.42.887l-.746.14c-.373.047-.513.233-.513.56v8.494c0 .466.28.606.746.56l.84-.047c.373-.047.466.326.326.653l-2.006.186c-.233 0-.466-.14-.56-.373l-4.153-6.533v5.88c0 .513.28.653.746.606l.513-.047c.373-.047.466.373.326.653l-2.846.186c-.187 0-.373-.28-.326-.606l.513-.047c.373-.047.513-.233.513-.56V11.83c0-.466-.233-.606-.653-.56l-.606.047c-.373.047-.466-.326-.326-.653l2.8-.233c.373 0 .606.233.746.466l4.246 6.58V11.83c0-.466-.28-.606-.7-.56l-.513.047c-.373.047-.466-.373-.326-.653l2.52-.233z" />
        </svg>
      );
    case 'chrome':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="10" fill="#4285F4" />
          <circle cx="12" cy="12" r="7" fill="#FBBC05" />
          <circle cx="12" cy="12" r="4.5" fill="#34A853" />
          <circle cx="12" cy="12" r="2.8" fill="#EA4335" />
          <circle cx="12" cy="12" r="1.8" fill="#FFFFFF" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
          <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
          <defs>
            <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFDC80" />
              <stop offset="0.3" stopColor="#F77737" />
              <stop offset="0.6" stopColor="#E1306C" />
              <stop offset="1" stopColor="#833AB4" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'gmail':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#4285F4" d="M1.5 5.5v13a2 2 0 0 0 2 2h3v-9.5L1.5 7.5z" />
          <path fill="#34A853" d="M22.5 5.5v13a2 2 0 0 1-2 2h-3v-9.5l5-3.5z" />
          <path fill="#EA4335" d="M17.5 11l-5.5 4-5.5-4v9.5h11V11z" />
          <path fill="#FBBC05" d="M22.5 5.5L12 13 1.5 5.5A2 2 0 0 1 3.5 3.5h17a2 2 0 0 1 2 2z" />
        </svg>
      );
    case 'messenger':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="url(#msg-grad)" d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.518 3.734 7.21V22l3.41-1.87c.92.256 1.895.394 2.856.394 5.523 0 10-4.145 10-9.266C22 6.145 17.523 2 12 2zm1.066 12.476l-2.73-2.91-5.328 2.91 5.86-6.22 2.8 2.91 5.258-2.91-5.86 6.22z" />
          <defs>
            <linearGradient id="msg-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00B2FF" />
              <stop offset="0.5" stopColor="#006AFF" />
              <stop offset="1" stopColor="#9B38FF" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'drive':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#FFC107" d="M8.2 4.5h7.6l6.2 10.7-3.8 6.6H10.6z" />
          <path fill="#0066DA" d="M15.8 4.5L8.2 17.7 4.4 11.1 8.2 4.5z" />
          <path fill="#00AC47" d="M4.4 11.1l3.8 6.6h12l-3.8 6.6H8.2z" />
        </svg>
      );
    default:
      return null;
  }
};
