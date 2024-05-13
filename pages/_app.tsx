// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../app/layout'; // Import a Layout component

function MyApp({ Component, pageProps }:AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
