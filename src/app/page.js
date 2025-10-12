'use client';

import dynamic from 'next/dynamic';
import Loading from "./components/ui/loading";
import HomePage from './pages/Home/page';

// Lazy load HomePage component
// const HomePage = dynamic(() => import("./pages/Home/page"), {
//   loading: () => <Loading />,
//   ssr: false
// });

export default function Home() {
  return <HomePage />;
}