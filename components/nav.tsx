
import ThemeSwitch from "./ui/theme-switch";
import { Lusitana } from "next/font/google";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import MobileMenu from "./mobile-menu";
import { Example } from "./motionNav/main-nav";
import Link from "next/link";
import { auth } from "@/auth";
const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["700"],
});
const Navbar = async () => {
  const session = await auth()
  return (
    <div className="w-full h-20 fixed z-10 bg-secondary flex items-center justify-start px-5">
      <Link href='/' className={cn("text-2xl", lusitana.className)}>Pet Finder</Link>
     <Example session={session}/>
      
    </div>
  );
};

export default Navbar;
