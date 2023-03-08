/* eslint-disable @next/next/no-img-element */
import { Menu, Transition } from "@headlessui/react";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useUser } from "../../context/user";
import admin from "../../../public/admin.svg";
import ubahnama from "../../../public/admin.svg";
export default function Dropdownprofile() {
  const auth = getAuth();
  const route = useRouter();
  return (
    <Menu as="div" className="flex  place-items-center flex-col text-left">
      <Menu.Button
        title="Akun"
        className={"h-10 w-10 rounded-full overflow-clip"}
      >
        {auth.currentUser ? (
          <img
            loading={"eager"}
            className="object-cover scale-[1.13] h-full w-full rounded-full hover:cursor-pointer"
            src={
              auth.currentUser.photoURL
                ? auth.currentUser.photoURL
                : "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png"
            }
            alt="1"
          />
        ) : (
          <img
            title="Login"
            loading={"eager"}
            className="object-cover h-full w-full rounded-full hover:cursor-pointer"
            src={
              "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png"
            }
            alt="2"
          />
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="lg:absolute top-16 right-10 text-black  mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <div className="text-center mt-2">
              <h1 className="uppercase font-bold">
                {auth.currentUser?.displayName ?? "-"}
              </h1>
              <h1 className="text-xs">{auth.currentUser?.email ?? "-"}</h1>
              <hr className="my-2 mx-4" />
              <Menu.Item>
                {auth.currentUser?.email === "febriqgal@gmail.com" ? (
                  <div className="flex ml-3 gap-1 mb-1">
                    <Image src={admin} alt={"#"} />
                    <Link
                      href={"/admin"}
                      className="hover:bg-slate-900 hover:text-white px-2 py-1 rounded-lg text-left text-sm"
                    >
                      Admin
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </Menu.Item>
              {!auth.currentUser ? (
                <></>
              ) : (
                <div>
                  <Menu.Item>
                    <div className="flex ml-3 gap-1 mb-1">
                      <Image src={ubahnama} alt={"#"} />
                      <Link
                        href={"/profile/ganti-password"}
                        className="hover:bg-slate-900 hover:text-white px-2 py-1 rounded-lg text-left text-sm"
                      >
                        Ganti Password
                      </Link>
                    </div>
                  </Menu.Item>

                  <Menu.Item>
                    <div className="flex ml-3 gap-1 mb-1">
                      <Image src={ubahnama} alt={"#"} />

                      <Link
                        href={"/profile/ganti-nama"}
                        className="hover:bg-slate-900 hover:text-white px-2 py-1 rounded-lg text-left text-sm"
                      >
                        Ganti Nama
                      </Link>
                    </div>
                  </Menu.Item>

                  <hr className="mx-4" />
                </div>
              )}
              <Menu.Item>
                {!auth.currentUser ? (
                  <button
                    className="hover:bg-red-500 my-1 hover:text-white px-3 py-2 rounded-lg w-full text-red-500 text-sm"
                    onClick={async () => {
                      route.push("/login");
                    }}
                  >
                    login
                  </button>
                ) : (
                  <button
                    className="hover:bg-red-500 my-1 hover:text-white px-3 py-2 rounded-lg w-full text-red-500 text-sm"
                    onClick={async () => {
                      await signOut(auth);
                      route.replace("/");
                    }}
                  >
                    Keluar
                  </button>
                )}
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
