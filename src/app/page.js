'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomePage from './pages/Home/page';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Middleware sudah menghandle proteksi, tapi ini layer tambahan untuk security
    const userData = localStorage.getItem('userData');
    if (!userData) {
      console.log('[Home] No userData in localStorage - redirecting to login');
      router.replace('/Login');
    }
  }, [router]);

  return <HomePage />;
}
