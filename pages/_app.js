import '@/styles/globals.css'
import Head from "next/head";
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { Lobster } from 'next/font/google'
import { ClerkProvider, SignIn, SignedIn, SignedOut } from '@clerk/nextjs';

const lobster = Lobster({
  subsets: ['latin'],
  variable: '--font-lobster',
  weight: '400'
})

export default function App({ Component, pageProps }) {

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      setProgress(40)
    })

    Router.events.on('routeChangeComplete', (url) => {
      setProgress(100)
    })
  }, [])

  return (
    <ClerkProvider>
      <div className={`${lobster.variable}`}>
        <LoadingBar
          color='#8573ff'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          waitingTime={400}
        />
        <Head>
          <meta charSet="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Uncharted Musings</title>
        </Head>
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
}
