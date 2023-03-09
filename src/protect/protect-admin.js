/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import Head from "next/head";
import Link from "next/link";
import { useUser } from "../context/user";
import Logo from "../../public/logo.png";
import Image from "next/image";
const protectAdmin = (Pages) => {
  return (props) => {
    const { uid, email } = useUser();
    if (!uid || email != "agungramadhanu@gmail.com") {
      return (
        <section>
          <Head>
            <title>404 - Agung Ramadhanu</title>
            <meta name="description" content="Tidak Memiliki Akses" />
            <link rel="icon" href="/logo1.png" />
          </Head>
          <div className="h-screen pt-16 pb-12 flex flex-col bg-gradient-to-br from-sky-800 via-cyan-900 to-sky-700">
            <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex-shrink-0 flex justify-center">
                <Link href={"/"}>
                  <Image height={50} src={Logo} alt={"#"} />
                </Link>
              </div>
              <div className="text-center">
                <p className="mt-2 text-base text-white">
                  Maaf, anda tidak memiliki akses.
                </p>
                <div className="mt-6">
                  <Link
                    href={"/"}
                    className="text-base font-medium text-white hover:bg-white hover:text-sky-700 rounded-lg px-4"
                  >
                    Beranda<span aria-hidden="true"></span>
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </section>
      );
    }

    return <Pages {...props} />;
  };
};

export default protectAdmin;
