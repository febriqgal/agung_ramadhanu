import AuthStateChangeProvider from "@/context/auth";
import { UserProvider } from "@/context/user";
import "@/styles/globals.css";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Agung Ramadhanu</title>
        <meta name="description" content="BPTD III Sumbar" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <UserProvider>
        <AuthStateChangeProvider>
          <Component {...pageProps} />
        </AuthStateChangeProvider>
      </UserProvider>
    </>
  );
}
