import { MenuIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex justify-between px-5 pt-6">
      <Image src="/logo.png" alt="logo" height={30} width={100} />
      <Button variant="ghost" size="icon" className="bg-transparent">
        <MenuIcon />
      </Button>
    </header>
  );
};

export default Header;
