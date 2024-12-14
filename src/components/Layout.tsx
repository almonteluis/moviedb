"use client";

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
    <div className="h-full bg-gray-100">
      <nav className="bg-white shadow-md py-4 px-8">
        <ul className="flex justify-center gap-8">
          <li>
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/search"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              href="/watchlist"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Watch List
            </Link>
          </li>
        </ul>
      </nav>
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear", duration: 0.3 }}
        className="bg-gray-100"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
