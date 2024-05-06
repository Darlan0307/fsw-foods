import Image from "next/image";

type PromoBannerProps = {
  src: string;
  alt: string;
};

const PromoBanner = ({ src, alt }: PromoBannerProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      height={0}
      width={0}
      className="mx-auto h-auto w-full max-w-[1200px] object-contain"
      sizes="100vw"
      quality={100}
    />
  );
};

export default PromoBanner;
