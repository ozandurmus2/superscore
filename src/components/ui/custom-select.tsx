'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

export function CustomSelect({ value, onChange, options, placeholder }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-3.5 border-2 rounded-xl text-sm outline-none transition-all text-left ${open ? 'border-[#3c57bc]' : 'border-gray-200'} ${value ? 'text-[#1b1a1b]' : 'text-gray-400'}`}
      >
        <span>{value || placeholder}</span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[#3c57bc] rounded-xl shadow-lg z-50 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors ${value === opt ? 'bg-[#e8eaf6] text-[#3c57bc] font-medium' : 'text-[#1b1a1b] hover:bg-gray-50'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
