import protectAdmin from "@/protect/protect-admin";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import home from "../../../public/home.svg";
import { useRouter } from "next/router";
import CardProfile from "./card-profile";
import Styles from "../../styles/Home.module.css";
const LayoutAdmin = ({ children, titlee }) => {
  const navigation = [
    { name: "Beranda", icon: home, href: "/admin" },
    {
      name: "Tambah Informasi",
      icon: home,
      href: "/admin/tambah-informasi",
    },
    // { name: "Tambah Download", icon: tambahberita, href: "/admin/download" },
    {
      name: "Tambah Modul",
      icon: home,
      href: "/admin/tambah-modul",
    },
  ];
  const route = useRouter();
  return (
    <div className="bg-gradient-to-br from-sky-800 via-cyan-900 to-sky-700 text-white">
      <Toaster />
      <Head>
        <title>{titlee ?? ""} Agung Ramadhanu</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo1.png" />
      </Head>
      {/* Mobile */}
      <div className="md:hidden w-full py-2 m-auto items-center bottom-1 fixed z-[9999] ">
        <div className="shadow-xl mx-5 p-5 flex justify-between rounded-lg">
          {navigation.map((e, i) => (
            <Link className="flex justify-around" key={i} href={e.href}>
              <Image src={e.icon} width={30} alt={"#"} />
            </Link>
          ))}
        </div>
      </div>
      {/* Destop */}
      <div className="hidden outline-1 border-r-2 md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 shadow-2xl">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto ">
            <Link
              href={"/"}
              className="pt-4 pb-8 text-center font-bold text-xl"
            >
              Dashboard Admin
            </Link>
            <hr className="pb-8 mx-4" />
            <nav className="flex-1 text-sm flex flex-col px-2 space-y-1 ">
              {navigation.map((e, i) => (
                <div key={i} div className="flex gap-2 mx-2">
                  <Image src={e.icon} alt={e.name} />
                  <Link
                    className={
                      route.pathname === e.href
                        ? `bg-sky-700 text-slate-50 py-1 flex items-center px-2 rounded-lg`
                        : `hover:bg-sky-700 hover:text-white py-1 flex items-center hover:px-2 rounded-lg`
                    }
                    href={e.href}
                  >
                    {e.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
          <CardProfile />
        </div>
      </div>
      <div className="pl-0 md:pl-64 flex flex-col flex-1">
        <div>
          <div className={`${Styles.main} text-white`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default protectAdmin(LayoutAdmin);
