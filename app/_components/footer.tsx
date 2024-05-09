import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Github, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  let date = new Date();

  return (
    <footer className="mt-10 flex min-h-[60vh] flex-col justify-around bg-primary px-10 sm:min-h-[50vh] md:min-h-[40vh]">
      <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center sm:gap-6">
        <h2 className="text-lg font-bold text-white md:text-2xl">
          Quer receber novidades pelo email? <br /> Faça o seu cadastro agora!
        </h2>
        <form className="flex flex-wrap gap-1 md:flex-nowrap">
          <Input
            placeholder="Seu email..."
            className="max-w-[300px] md:text-lg"
          />
          <Button
            className="max-w-[200px] md:text-lg"
            variant="outline"
            type="submit"
          >
            Cadastrar
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
            <Link
              href="https://github.com/Darlan0307"
              className="relative "
              target="_blank"
            >
              <Github
                color="#979595"
                size={35}
                className="peer transition-all hover:scale-110"
              />
              <span className="absolute -top-20 left-[50%] -translate-x-[50%]  font-bold text-[#979595] opacity-0 transition-all peer-hover:-top-8 peer-hover:opacity-100">
                GitHub
              </span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/darlan-martins-8a7956259/"
              className="relative"
              target="_blank"
            >
              <Linkedin
                color="#55bdf5"
                size={35}
                className="peer transition-all hover:scale-110"
              />
              <span className="absolute -top-20 left-[50%] -translate-x-[50%]  font-bold text-[#55bdf5] opacity-0 transition-all peer-hover:-top-8 peer-hover:opacity-100">
                LinkedIn
              </span>
            </Link>
            <Link
              href="https://www.instagram.com/darlan_sw_/"
              className="relative"
              target="_blank"
            >
              <Instagram
                color="#ff55be"
                size={35}
                className="peer transition-all hover:scale-110"
              />
              <span className="absolute -top-20 left-[50%] -translate-x-[50%]  font-bold text-[#ffafe0] opacity-0 transition-all peer-hover:-top-8 peer-hover:opacity-100">
                Instagram
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
