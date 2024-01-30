"use client";
import { motion } from "framer-motion";
import { MenuItem } from "./menu-item";
import styles from "./nav.module.css";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Github } from "lucide-react";
import Link from "next/link";
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const variantsLi = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const Navigation = () => (
  <motion.ul className={cn("m-0 p-0", styles.ul)} variants={variants}>
    <motion.li
      className={cn("m-0 p-0 items-center", styles.li)}
      variants={variantsLi}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          styles.iconPlaceholder
        )}
      >
        <UserButton />
      </div>
      <div
        className={cn(
          "flex items-center",
          styles.textPlaceholder
        )}
      >
        My profile
      </div>
    </motion.li>
    <motion.li
      className={cn("m-0 p-0", styles.li)}
      variants={variantsLi}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link className="flex items-center p-0 m-0" href="/mis_publicaciones">
        <div
          className={cn(
            "flex items-center justify-center",
            styles.iconPlaceholder
          )}
        >
          <Github />
        </div>
        <div
          className={cn(
            "flex items-center",
            styles.textPlaceholder
          )}
        >
          Mis publicaciones
        </div>
      </Link>
    </motion.li>
    {itemIds.map((i) => (
      <MenuItem i={i} key={i} />
    ))}
  </motion.ul>
);

const itemIds = [0, 1, 2, 3, 4];
