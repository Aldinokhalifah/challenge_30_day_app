'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { LogOut, Home, CalendarCheck2, User2, X } from 'lucide-react';
import Image from 'next/image';

const nav = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/pages/Challenges', label: 'Challenges', icon: CalendarCheck2 },
  { href: '/pages/Profile', label: 'Profile', icon: User2 },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    router.push('/Login');
  }, [router]);

  return (
    <>
      {/* overlay untuk mobile */}
      <div
        className={`fixed inset-0  z-40 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-auto rounded-r-xl
          bg-gradient-to-b backdrop-blur-md bg-white/10 text-slate-100
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* close button di mobile */}
        <div className="flex items-center justify-between px-5 pt-6 pb-4 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-indigo-500/30 ring-1 ring-white/20 grid place-items-center">
              <Image
                  src="/icon.png" // Path dimulai dari folder public
                  alt='Icon of the App'
                  width={100}
                  height={100}
                  className='rounded-full w-full'
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-widest text-indigo-300/80">Challenge 30</p>
              <p className="text-lg font-semibold">Days App</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10">
            <X className="h-5 w-5 text-indigo-200" />
          </button>
        </div>

        {/* desktop brand */}
        <div className="px-5 pt-6 pb-4 hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-indigo-500/30 ring-1 ring-white/20 grid place-items-center">
              <Image
                  src="/icon.png" // Path dimulai dari folder public
                  alt='Icon of the App'
                  width={100}
                  height={100}
                  className='rounded-full w-full'
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-widest text-indigo-300/80">Challenge 30 </p>
              <p className="text-lg font-semibold">Days App</p>
            </div>
          </div>
        </div>

        {/* nav list */}
        <nav className="px-2">
          <ul className="space-y-1">
            {nav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      group relative flex items-center gap-3 rounded-xl px-4 py-3
                      transition
                      ${active
                        ? 'bg-indigo-500/20 ring-1 ring-indigo-300/30'
                        : 'hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10'}
                    `}
                    onClick={onClose}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 animate-pulse rounded-r-full bg-indigo-400/80" />
                    )}
                    <Icon
                      className={`h-5 w-5 ${
                        active
                          ? 'text-indigo-300'
                          : 'text-indigo-200/70 group-hover:text-indigo-200'
                      }`}
                    />
                    <span className="text-sm">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* bottom actions */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 ring-1 ring-white/10 px-4 py-2.5 text-sm transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
          <p className="mt-3 text-[10px] text-slate-400/70 text-center text-pretty tracking-wide">
            &copy; {new Date().getFullYear()} Aldino Khalifah. All rights reserved.
          </p>
        </div>
      </aside>
    </>
  );
}
