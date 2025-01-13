import { motion } from "framer-motion";
import "./Logo.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Logo = () => {
  const pathname = usePathname();
  return pathname === "/" ? (
    <motion.img
      className="logo"
      src="/logos/logoHeader.svg"
      alt="HYSKY.PHY Logo"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  ) : (
    <Link href="/">
      <motion.img
        className="logo"
        src="/logos/logoHeader.svg"
        alt="HYSKY.PHY Logo"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </Link>
  );
};

export default Logo;
