"use client";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  Menu,
  X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeSwitch from "./ui/theme-switch";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Dialog } from "@headlessui/react";
import IconButton from "./ui/icon-button";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
  
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
  return (
    <>
    <Button
      onClick={onOpen}
      className="bg-transparent p-0 dark:text-white text-black lg:hidden hover:bg-transparent"
    >
      <Menu size={20} />
    </Button>
    <Dialog
      open={open}
      as="div"
      className="absolute top-0 right-0 z-30 h-[100vh] w-[70%] sm:w-[40%] lg:hidden"
      onClose={onClose}
    >
      <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px]" />

      <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto py-4 pb-6 shadow-xl backdrop-blur-lg  transition-transform animate-in bg-secondary/70 ">
        {/* Close button */}
        <div className="flex items-center px-[1.1rem]  justify-end">
          <IconButton icon={<X size={15} />} onClick={onClose} className="dark:text-black"/>
        </div>
        <div className="flex items-center px-4 py-8 justify-between">
        <h2>Mi cuenta</h2>
        <UserButton />
        </div>
        <ThemeSwitch />
        <div className="mr-1 flex  h-full max-h-[60vh] flex-col-reverse items-end justify-start p-6 sm:mr-3">
        <Link href="/mis_publicaciones">Mis publicaciones</Link>
        </div>
        <SignOutButton />
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
