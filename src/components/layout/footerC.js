import React from "react";
import Image from "next/image";
import Link from "next/link";
import Profile from "../../../public/profile.jpeg";
import Ig from "../../../public/ig.svg";
import Linkedin from "../../../public/linkedin.svg";
import tw from "../../../public/tw.svg";
import wa from "../../../public/wa.svg";
import yt from "../../../public/yt.svg";
import Styles from "../../styles/Home.module.css";
export default function FooterC() {
  return (
    <div className={`bg-white bg-opacity-5 shadow-2xl rounded-t-2xl`}>
      <div className="flex flex-col justify-center items-center p-5">
        <div className="h-24 w-24 rounded-full overflow-clip hover:scale-110 duration-500 transition-all">
          <Image className="scale-110 translate-x-1" src={Profile} alt={"#"} />
        </div>
        <h1 className="font-bold text-center mt-2 text-white">
          Agung Ramadhanu, S.Kom., M.Kom,. MTA
        </h1>
      </div>
      <div className="flex gap-4 items-center justify-center">
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
      <div className="w-full flex justify-center items-center">
        <h1 className="text-center text-gray-500 mt-5 px-4 bg-white rounded-t-lg font-medium text-sm">
          © 2023 - Febriqgal
        </h1>
      </div>
    </div>
  );
}
