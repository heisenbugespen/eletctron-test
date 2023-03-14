import { ipcRenderer } from 'electron';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    async function log() {
      const test = await ipcRenderer.invoke('test', 'dispense');
      console.log(test);
    }
    log();
  }, []);

  return (
    <>
      <Head>
        <title>Home - Nextron (with-javascript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href='/next'>
            <a>Go to next page</a>
          </Link>
        </p>
        <img src='/images/logo.png' />
      </div>
    </>
  );
}

export default Home;
