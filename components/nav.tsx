import { UserButton } from "@clerk/nextjs";
import ThemeSwitch from "./ui/theme-switch";
import { Lusitana } from "next/font/google";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import MobileMenu from "./mobile-menu";
import { Example } from "./motionNav/main-nav";

const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["700"],
});
const Navbar = () => {
  return (
    <div className="w-full h-20  bg-secondary flex items-center justify-start px-5">
      <h1 className={cn("text-2xl", lusitana.className)}>Pet Finder</h1>
     <Example />
      
    </div>
  );
};

export default Navbar;
