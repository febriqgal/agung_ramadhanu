/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";
export default function Example() {
  return (
    <section>
      <div className="h-screen pt-16 pb-12 flex flex-col ">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <Link href={"/"}>
              <Image
                title="Beranda"
                className="h-12 w-auto"
                src={Logo}
                alt=""
              />
            </Link>
          </div>
          <div className="text-center">
            <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-4xl">
              Page not found.
            </h1>
            <p className="mt-2 text-base text-white">
              Maaf, kami tidak dapat menemukan halaman yang Anda cari.
            </p>
            <div className="mt-6">
              <Link
                href={"/"}
                className="text-base font-medium text-white hover:text-sky-700 hover:bg-white rounded-lg px-2"
              >
                Go back home<span aria-hidden="true"></span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
