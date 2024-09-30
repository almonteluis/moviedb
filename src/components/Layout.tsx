'use client';

import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type LayoutProps = {
  children: ReactNode;
};

const variants = {
  hidden: { opacity: 0, x: 0, y: 200 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/search">Search</Link>
          </li>
          <li>
            <Link href="/watchlist">Watch List</Link>
          </li>
        </ul>
      </nav>
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear", duration: 0.3 }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;