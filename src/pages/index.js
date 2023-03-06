/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import TypeIt from "typeit-react";

export default function Home() {
  return (
    <Layout>
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906&q=80"
          alt=""
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-sky-800 via-cyan-900 to-sky-700 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-2xl lg:text-3xl">
          <TypeIt>{`Hi, I'm Agung Ramadhanu!`}</TypeIt>
        </h1>
        <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
          Mattis amet hendrerit dolor, quisque lorem pharetra. Pellentesque
          lacus nisi urna, arcu sociis eu. Orci vel lectus nisl eget eget ut
          consectetur. Sit justo viverra non adipisicing elit distinctio.
        </p>
      </div>
    </Layout>
  );
}
