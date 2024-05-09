"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Github, Instagram, Linkedin } from "lucide-react";
import { FormEvent, useState } from "react";
import { validarEmail } from "../_helpers/validateEmail";
import { toast } from "sonner";
import { RegisterEmail } from "../_actions/registerEmail";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let date = new Date();

  const social = [
    {
      id: 0,
      name: "GitHub",
      icon: <Github size={35} />,
      link: "https://github.com/Darlan0307",
    },
    {
      id: 1,
      name: "LinkedIn",
      icon: <Linkedin size={35} />,
      link: "https://www.linkedin.com/in/darlan-martins-8a7956259/",
    },
    {
      id: 2,
      name: "Instagram",
      icon: <Instagram size={35} />,
      link: "https://www.instagram.com/darlan_sw_/",
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      toast.warning("Escreva algo");
      setIsLoading(false);
      return;
    }

    let emailValid = validarEmail(email);

    if (!emailValid) {
      toast.error("Email inválido");
      setIsLoading(false);
      return;
    }

    const response = await RegisterEmail(email);

    if (response) {
      toast.success("Cadastrado com sucesso!");
    }

    setEmail("");
    setIsLoading(false);
  };

  return (
    <footer className="mt-10 flex min-h-[60vh] flex-col justify-around bg-primary px-10 sm:min-h-[50vh] md:min-h-[40vh]">
      <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center sm:gap-6">
        <h2 className="text-lg font-bold text-white md:text-2xl">
          Quer receber novidades pelo email? <br /> Faça o seu cadastro agora!
        </h2>
        <form
          className="flex flex-wrap gap-1 md:flex-nowrap"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="Seu email..."
            className="max-w-[300px] md:text-lg"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Button
            className="max-w-[200px] md:text-lg"
            variant="outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Cadastrar"}
          </Button>
        </form>
      </div>
      <div className="relative">
        <div className="hidden h-1 w-full bg-white sm:block"></div>
        <div className="absolute left-[50%] top-[50%] z-10 flex -translate-x-[50%] -translate-y-[50%] flex-col items-center justify-evenly gap-5 bg-primary sm:w-[70%] sm:max-w-[700px] sm:flex-row">
          <p className="min-w-40 text-center text-lg font-bold text-white">
            Copyright @{date.getFullYear()}
          </p>
          <div className="flex items-center gap-5 ">
            {social.map((link) => (
              <Link
                href={link.link}
                className="relative"
                target="_blank"
                key={link.id.toString()}
              >
                <div className="peer text-white transition-all hover:scale-110">
                  {link.icon}
                </div>
                <span
                  className={`absolute -top-20 left-[50%] -translate-x-[50%]  font-bold text-white opacity-0 transition-all peer-hover:-top-8 peer-hover:opacity-100`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
