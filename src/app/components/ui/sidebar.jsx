'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { LogOut, Home, CalendarCheck2, User2, X, LogIn } from 'lucide-react';
import Image from 'next/image';

const nav = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/pages/Challenges', label: 'Challenges', icon: CalendarCheck2 },
  { href: '/pages/Profile', label: 'Profile', icon: User2 },
];

export default function Sidebar({ isOpen, onClose }) {
  const token = localStorage.getItem('token');
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
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-52 rounded-r-xl
          bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-md text-slate-100
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          flex flex-col
        `}
      >
        {/* Header - Brand */}
        <div className="flex items-center justify-between px-5 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-indigo-500/30 ring-1 ring-white/20 grid place-items-center">
              <Image
                src="/icon.png"
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
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 lg:hidden">
            <X className="h-5 w-5 text-indigo-200" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-4"></div>

        {/* Main Content - Flex grow untuk push footer ke bawah */}
        <div className="flex-1 flex flex-col">
          {token ? (
            <>
              {/* Navigation List */}
              <nav className="px-2 py-6">
                <ul className="space-y-1">
                  {nav.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href || (href !== '/' && pathname.startsWith(href));
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className={`
                            group relative flex items-center gap-3 rounded-xl px-4 py-3
                            transition duration-200
                            ${active
                              ? 'bg-indigo-500/20 ring-1 ring-indigo-300/30 text-indigo-100'
                              : 'hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10 text-slate-300 hover:text-slate-100'}
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
                          <span className="text-sm font-medium">{label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </>
          ) : (
            <>
              {/* Message untuk guest user */}
              <div className="px-4 py-6 flex-1 flex flex-col justify-center">
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl ring-1 ring-indigo-300/30 mx-auto flex items-center justify-center">
                    <CalendarCheck2 className="h-6 w-6 text-indigo-300" />
                  </div>
                  <div>
                    <h3 className='text-base font-semibold text-white mb-2'>Ready to Challenge?</h3>
                    <p className='text-sm text-slate-400'>Login or sign up to start your 30-day journey</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer - Bottom Actions */}
        <div className="border-t border-white/10 p-4 space-y-3">
          {token ? (
            <>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl cursor-pointer bg-red-500/10 hover:bg-red-500/20 ring-1 ring-red-400/30 px-4 py-2.5 text-sm font-medium text-red-300 hover:text-red-200 transition duration-200"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/Login"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl cursor-pointer bg-indigo-500/20 hover:bg-indigo-500/30 ring-1 ring-indigo-400/30 px-4 py-2.5 text-sm font-medium text-indigo-300 hover:text-indigo-200 transition duration-200"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                href="/Register"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 ring-1 ring-white/20 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
          
          <p className="text-[11px] text-slate-400/70 text-center text-pretty tracking-wide pt-2">
            &copy; {new Date().getFullYear()} Aldino Khalifah. All rights reserved.
          </p>
        </div>
      </aside>
    </>
  );
}