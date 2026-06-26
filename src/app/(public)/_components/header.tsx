"use client"
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { useState } from "react";

export function Header() {

    const session = false;

    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        {href: "#profissionais", label: "Profissionais"},
        {href: "/Contatos", label: "Contatos"}
    ]

const NavLinks = () => (
  <>
    {navItems.map((item) => (
      <Button
        key={item.href}
        onClick={()=>{setIsOpen(false)}}
        asChild
        className="bg-transparent hover:bg-transparent text-black shadow-none"
      >
        <Link href={item.href}>
          {item.label}
        </Link>
      </Button>
    ))}

    {session ? (<Link href="#dashboard"> Painel da Clínica </Link> ) : 
    (<Button className=" hover:bg-gray-400 hover:text-black" ><User/> Fazer Login</Button>)}
  </>
);


  return (
    <header className="fixed top-0 left-0 right-0 z-[999] py-2 px-4 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl flex-col font-bold ">
          Odonto<span className=" text-emerald-400">PRO</span>
        </Link>
    <nav className="hidden md:flex items-center">
        
        <NavLinks/>
    </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button className="text-black hover:bg-transparent" variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px] z-[9999] py-2 px-5" >
            <SheetTitle>Menu</SheetTitle>
            {/* <SheetHeader></SheetHeader> */}
            <SheetDescription>
            Veja Nossos Links
            </SheetDescription>
            <nav  className="flex flex-col px-0 items-center py-5">
                <NavLinks/>
              </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
