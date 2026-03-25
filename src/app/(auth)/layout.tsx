import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Shield className="h-10 w-10 text-[#1B1F3B]" />
        <span className="text-2xl font-bold text-[#1B1F3B]">Superscore</span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
