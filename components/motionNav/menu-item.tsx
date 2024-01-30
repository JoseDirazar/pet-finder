'use client'
import { motion } from "framer-motion";
import styles from './nav.module.css'
import { cn } from "@/lib/utils";
const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i }: { i: number }) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
    className={cn('m-0 p-0', styles.li)}
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={styles.iconPlaceholder} style={style} />
      <div className={styles.textPlaceholder} style={style} />
    </motion.li>
  );
};
