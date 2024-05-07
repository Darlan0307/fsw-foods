"use client";

import { ChevronLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ButtonBack = () => {
  const router = useRouter();
  const handleBackClick = () => router.back();
  return (
    <Button className="rounded-ful text-white" onClick={handleBackClick}>
      <ChevronLeftIcon />
      Voltar
    </Button>
  );
};

export default ButtonBack;
