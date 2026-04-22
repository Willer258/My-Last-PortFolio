import "../styles/globals.css";
import "lenis/dist/lenis.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layouts";
import { RecoilRoot } from "recoil";
import { appWithTranslation } from 'next-i18next';
import { Space_Grotesk, Outfit } from 'next/font/google';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Persist locale: redirect to saved locale if it differs from current
  useEffect(() => {
    const match = document.cookie.match(/NEXT_LOCALE=(\w+)/);
    const saved = match?.[1];
    if (saved && saved !== router.locale && ['fr', 'en'].includes(saved)) {
      router.replace(router.asPath, router.asPath, { locale: saved });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let raf: number;
    (async () => {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      function update(time: number) {
        lenis.raf(time);
        raf = requestAnimationFrame(update);
      }
      raf = requestAnimationFrame(update);
      // @ts-ignore
      window.__lenis = lenis;
    })();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <RecoilRoot>
      <div className={`${spaceGrotesk.variable} ${outfit.variable} grain`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </RecoilRoot>
  );
}

export default appWithTranslation(MyApp);
