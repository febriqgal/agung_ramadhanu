import Layout from "@/components/layout";
import React from "react";
import Profile from "../../../public/profile.jpeg";
import Ig from "../../../public/ig.svg";
import Image from "next/image";
import Linkedin from "../../../public/linkedin.svg";
import tw from "../../../public/tw.svg";
import wa from "../../../public/wa.svg";
import yt from "../../../public/yt.svg";
import Link from "next/link";
import FooterC from "@/components/layout/footerC";
export default function Contact() {
  return (
    <Layout title={"About Me -"}>
      <div className="h-24 w-24 rounded-full overflow-clip hover:scale-110 duration-500 transition-all">
        <Image className="scale-110 translate-x-1" src={Profile} alt={"#"} />
      </div>
      <h1 className="mt-2 font-bold text-lg">
        Agung Ramadhanu, S.Kom., M.Kom,. MTA
      </h1>
      <div className="flex gap-4">
        <Link
          target={"_blank"}
          href={"https://www.instagram.com/agungramadhanu_/"}
        >
          <Image src={Ig} alt={"#"} />
        </Link>
        <Link
          target={"_blank"}
          href={
            "https://www.linkedin.com/in/agung-ramadhanu-s-kom-m-kom-mta-a96823169/"
          }
        >
          <Image src={Linkedin} alt={"#"} />
        </Link>
        <Link target={"_blank"} href={"https://twitter.com/"}>
          <Image src={tw} alt={"#"} />
        </Link>
        <Link target={"_blank"} href={"https://wa.me/6285266111669"}>
          <Image src={wa} alt={"#"} />
        </Link>
        <Link
          target={"_blank"}
          href={"https://www.youtube.com/@dengarinteknologi9220"}
        >
          <Image src={yt} alt={"#"} />
        </Link>
      </div>
      <FooterC />
    </Layout>
  );
}
