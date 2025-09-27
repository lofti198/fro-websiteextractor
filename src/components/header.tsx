"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { raleway } from "@/lib/fonts";

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/posts",
    label: "Posts",
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6 lg:px-7">
      {/* <Link href="/">
        <Image
          src="https://bytegrad.com/course-assets/youtube/example-logo.png"
          alt="Logo"
          className="w-[35px] h-[35px]"
          width="35"
          height="35"
        />
      </Link> */}

      <Link href="/">
        <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${raleway.className} text-zinc-800 hover:text-zinc-900 transition-colors`}>Blog</h1>
      </Link>
    </header>
  );
}
