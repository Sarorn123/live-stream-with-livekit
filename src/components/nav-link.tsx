"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {
  links: NavLink[];
  style: string;
};

const activeClass = " bg-primary text-primary-foreground";

const Navlink = ({ links, style }: Props) => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={
            style +
            ` ${pathname === link.href && activeClass}
            ${link.href.includes(pathname) && pathname !== "/" && activeClass}
            `
          }
          prefetch
        >
          {link.icon}
        </Link>
      ))}
    </>
  );
};

export default Navlink;
