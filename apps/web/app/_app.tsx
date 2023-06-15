import '../styles/globals.css';
import { AppProps } from 'next/app';
import { VerifyAndUpload } from '../ui/contract-verify/verifyAndUpload';

function MyApp({ Component, pageProps }: AppProps) {
  <VerifyAndUpload />
  return <Component {...pageProps} />;
}

export default MyApp;
