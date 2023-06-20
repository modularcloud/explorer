import '../styles/globals.css';
import { AppProps } from 'next/app';
import { VerifyAndUpload } from 'apps/verify/contract-verify/pages/verifyAndUpload';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <VerifyAndUpload />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
