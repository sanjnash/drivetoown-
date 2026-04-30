'use client';

import { useEffect, useRef, useState } from 'react';

export function RunningCar() {
  const [carX, setCarX]             = useState(120);
  const [dashOffset, setDashOffset] = useState(0);
  const [speed, setSpeed]           = useState(0);
  const [braking, setBraking]       = useState(false);

  const lastScrollY  = useRef(0);
  const brakeTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta    = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      const absSpeed = Math.abs(delta);
      setSpeed(absSpeed);
      setBraking(false);

      if (brakeTimer.current) clearTimeout(brakeTimer.current);
      brakeTimer.current = setTimeout(() => {
        setBraking(true);
        setSpeed(0);
      }, 180);

      setCarX((prev) => {
        const next = prev + delta * 1.2;
        if (next > window.innerWidth + 160) return -160;
        if (next < -160) return window.innerWidth + 160;
        return next;
      });

      setDashOffset((prev) => (prev - delta * 1.2) % 64);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (brakeTimer.current) clearTimeout(brakeTimer.current);
    };
  }, []);

  const blurPx      = Math.min(speed * 0.15, 2).toFixed(1);
  const streakAlpha = Math.min(speed * 0.05, 0.5);
  const isMoving    = speed > 1;

  return (
    <div
      className="relative h-20 w-full overflow-hidden"
      aria-hidden="true"
    >
      {/* Glass pill road */}
      <div
        className="absolute inset-x-10 top-1/2 h-11 -translate-y-1/2 overflow-hidden rounded-full border border-white/50"
        style={{
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(15,36,68,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        {/* Animated dashes inside road */}
        <div className="absolute inset-0 flex items-center overflow-hidden">
          <div
            className="flex shrink-0 gap-5"
            style={{
              transform: `translateX(${dashOffset}px)`,
              width: 'calc(100% + 128px)',
              marginLeft: '-64px',
            }}
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="h-0.5 w-8 shrink-0 rounded-full bg-navy/20"
              />
            ))}
          </div>
        </div>
        {/* Left fade mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 rounded-l-full bg-gradient-to-r from-white/60 to-transparent" />
        {/* Right fade mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 rounded-r-full bg-gradient-to-l from-white/60 to-transparent" />
      </div>

      {/* Speed streaks */}
      {isMoving && (
        <div
          className="pointer-events-none absolute top-1/2 -translate-y-1/2"
          style={{
            left: carX - 60,
            opacity: streakAlpha,
            transition: 'opacity 0.15s ease',
          }}
        >
          {[0, 6, 12, 20].map((offset) => (
            <div
              key={offset}
              className="mb-1 h-px rounded-full"
              style={{
                width: `${50 + offset * 2}px`,
                background: 'linear-gradient(to left, rgba(15,36,68,0.3), transparent)',
              }}
            />
          ))}
        </div>
      )}

      {/* Car group */}
      <div
        className="pointer-events-none absolute top-1/2"
        style={{
          left: carX,
          transform: 'translateY(-58%)',
        }}
      >
        {/* Headlight glow */}
        <div
          className="absolute"
          style={{
            right: -18,
            top: 8,
            width: 24,
            height: 16,
            background: 'linear-gradient(to right, rgba(255,248,180,0.8), transparent)',
            clipPath: 'polygon(0 35%, 100% 0%, 100% 100%, 0 65%)',
            filter: 'blur(3px)',
          }}
        />
        {/* Brake light glow */}
        <div
          className="absolute rounded-full transition-opacity duration-300"
          style={{
            left: -10,
            top: 8,
            width: 14,
            height: 12,
            background: 'rgba(220,38,38,0.9)',
            filter: 'blur(6px)',
            opacity: braking ? 1 : 0,
          }}
        />
        {/* Ground shadow */}
        <div
          className="absolute -bottom-1 left-2 right-2 h-2 rounded-full"
          style={{ background: 'rgba(15,36,68,0.15)', filter: 'blur(4px)' }}
        />

        {/* SVG sedan car */}
        <svg
          width="110"
          height="48"
          viewBox="0 0 130 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: `drop-shadow(0 2px 8px rgba(15,36,68,0.2)) blur(${blurPx}px)`,
            transition: 'filter 0.12s ease',
          }}
        >
          {/* Body */}
          <path
            d="M8 36 Q10 22 28 18 Q40 12 58 10 Q72 9 84 13 Q96 16 108 22 Q118 26 122 32 Q124 36 122 40 L8 40 Z"
            fill="#0f2444"
          />
          {/* Roof */}
          <path
            d="M32 18 Q38 8 56 6 Q72 4 82 9 Q90 12 96 18 Z"
            fill="#1a365d"
          />
          {/* Window */}
          <path
            d="M36 18 Q40 10 56 8 Q70 7 78 11 Q86 14 90 18 Z"
            fill="#bfdbfe"
            fillOpacity="0.85"
          />
          {/* Window divider */}
          <line x1="63" y1="8" x2="60" y2="18" stroke="#0f2444" strokeWidth="1.5" />
          {/* Red accent stripe */}
          <path
            d="M8 36 L122 36 L122 38 Q65 41 8 38 Z"
            fill="#ef4444"
          />
          {/* Front bumper */}
          <path d="M108 28 Q118 28 122 32 L122 40 L108 40 Z" fill="#1e3a5f" />
          {/* Rear bumper */}
          <path d="M8 36 L8 40 L24 40 L24 36 Z" fill="#1e3a5f" />
          {/* Headlight */}
          <ellipse cx="114" cy="30" rx="5" ry="3.5" fill="#fef9c3" fillOpacity="0.95" />
          <ellipse cx="114" cy="30" rx="3" ry="2" fill="white" />
          {/* Tail light */}
          <ellipse cx="14" cy="34" rx="4" ry="3" fill="#ef4444" fillOpacity="0.9" />
          {/* Wheel arches */}
          <path d="M22 40 Q22 47 32 47 Q42 47 42 40" fill="#0d1520" />
          <path d="M82 40 Q82 47 92 47 Q102 47 102 40" fill="#0d1520" />
          {/* Wheels */}
          <circle cx="32" cy="46" r="9" fill="#1e293b" />
          <circle cx="32" cy="46" r="6.5" fill="#334155" />
          <circle cx="32" cy="46" r="3.5" fill="#64748b" />
          <circle cx="32" cy="46" r="1.5" fill="#94a3b8" />
          <circle cx="92" cy="46" r="9" fill="#1e293b" />
          <circle cx="92" cy="46" r="6.5" fill="#334155" />
          <circle cx="92" cy="46" r="3.5" fill="#64748b" />
          <circle cx="92" cy="46" r="1.5" fill="#94a3b8" />
          {/* Wheel spokes */}
          <line x1="32" y1="39.5" x2="32" y2="42.5" stroke="#475569" strokeWidth="1" />
          <line x1="29" y1="46" x2="35" y2="46" stroke="#475569" strokeWidth="1" />
          <line x1="92" y1="39.5" x2="92" y2="42.5" stroke="#475569" strokeWidth="1" />
          <line x1="89" y1="46" x2="95" y2="46" stroke="#475569" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
