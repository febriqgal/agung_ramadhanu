import { motion, useScroll, useSpring } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Contact from "../../../public/contact.svg";
import Home from "../../../public/home.svg";
import Logo from "../../../public/logo.png";
import Project from "../../../public/project.svg";
import Team from "../../../public/team.svg";
import styles from "../../styles/Home.module.css";
import FooterC from "./footerC";
import app from "@/server/firebase";
import { getAuth } from "firebase/auth";
import Dropdownprofile from "./profile";
export default function Layout({ children, title }) {
  const route = useRouter();
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigation = [
    { title: "Home", href: "/", icon: Home },
    { title: "Informasi", href: "/informasi", icon: Contact },
    { title: "Modul", href: "/modul", icon: Project },
  ];
  const [clientWindowHeight, setClientWindowHeight] = useState("");
  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
  const [padding, setPadding] = useState(10);
  const [boxShadow, setBoxShadow] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    let backgroundTransparacyVar = clientWindowHeight / 600;
    if (backgroundTransparacyVar < 1) {
      let paddingVar = 20 + backgroundTransparacyVar * 5;
      let boxShadowVar = backgroundTransparacyVar * 0.1;
      setBackgroundTransparacy(backgroundTransparacyVar);
      setPadding(paddingVar);
      setBoxShadow(boxShadowVar);
    }
  }, [clientWindowHeight]);
  return (
    <>
      <Head>
        <title>{`${title ?? ""} Agung Ramadhanu`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo1.png" />
      </Head>
      <div className={`bg-gradient-to-br from-sky-800 via-cyan-900 to-sky-700`}>
        <motion.div
          className="progress-bar fixed rounded-xl bg-slate-50 top-0 left-0 right-0 h-1 z-[999] origin-top"
          style={{ scaleX }}
        />

        <nav
          className="backdrop-blur-sm w-screen hidden fixed lg:block z-50"
          style={{
            padding: `${padding}px 0px`,
            boxShadow: `rgb(0 0 0 / ${boxShadow}) 0px 0px 20px 6px`,
          }}
        >
          <div className={`flex justify-between place-items-center px-24`}>
            <div className="flex place-items-center">
              <Image
                title="Beranda Agung Ramadhanu"
                onClick={() => {
                  route.push("/");
                }}
                src={Logo}
                className="w-[150px] mr-2 hover:cursor-pointer"
                alt={"dasdas"}
              />
            </div>
            <div
              className={`flex justify-self-center place-items-center text-slate-50 font-semibold`}
            >
              {navigation.map((e, i) => {
                return (
                  <Link
                    key={i}
                    href={e.href}
                    className={
                      route.pathname === e.href
                        ? `mr-8 underline underline-offset-4`
                        : "mr-8"
                    }
                  >
                    {e.title}
                  </Link>
                );
              })}
              {user != null ? (
                <Dropdownprofile />
              ) : (
                <Link href={"/login"}>Login</Link>
              )}
            </div>
          </div>
        </nav>
        <nav
          className="fixed z-50 backdrop-blur-sm place-items-center lg:hidden flex"
          style={{
            padding: `${padding}px 0px`,
            boxShadow: `rgb(0 0 0 / ${boxShadow}) 0px 0px 20px 6px`,
          }}
        >
          <div className="h-5  w-5 absolute left-5"> </div>
          <div className={`w-screen mx-auto bg-center flex justify-center`}>
            <Image src={Logo} className="w-[150px] mr-2" alt={"dasdas"} />
          </div>
        </nav>
        <nav
          className="fixed bottom-0 z-50 backdrop-blur-sm place-items-center lg:hidden flex"
          style={{
            padding: `${padding}px 0px`,
            boxShadow: `rgb(0 0 0 /  0.05) 0px 0px 20px 6px`,
          }}
        >
          <div className={`w-screen mx-auto flex`}>
            {navigation.map((e, i) => (
              <div key={i} className="w-full items-center">
                <a href={e.href} className="flex flex-col place-items-center">
                  <Image src={e.icon} alt={"#"} />
                  <h1 className="text-sm">{e.title}</h1>
                </a>
              </div>
            ))}
          </div>
        </nav>
        <main>{children}</main>
        <FooterC />
      </div>
    </>
  );
}
