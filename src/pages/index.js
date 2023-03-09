/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout";
import Image from "next/image";
import Styles from "../styles/Home.module.css";
import unplash from "../../public/unplash.jpg";
import TypeIt from "typeit-react";
export default function Home() {
  return (
    <Layout>
      <div className="flex pt-20 pl-9 items-center justify-center min-h-screen flex-col lg:flex-row lg:pr-20 lg:pl-24">
        <div className="flex flex-col lg:w-1/2">
          <TypeIt className="text-white font-bold text-4xl">{`Hi, I'm Agung Ramadhanu`}</TypeIt>
          <h1 className="text-justify mr-10 text-white">
            {` Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.`}
          </h1>
        </div>
        <div className="w-[500px] rounded-xl m-8 lg:m-0 overflow-clip border-2 shadow-2xl">
          <Image
            className="hover:scale-125 transition-all hover:rotate-12 duration-1000"
            src={unplash}
            alt={"#"}
          />
        </div>
      </div>
    </Layout>
  );
}
