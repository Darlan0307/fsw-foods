import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import Footer from "./_components/footer";
import Image from "next/image";

const fetch = async () => {
  const getProducts = db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 6,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  const getBurguersCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguersCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurguersCategory,
    getPizzasCategory,
  ]);

  return { products, burguersCategory, pizzasCategory };
};

const Home = async () => {
  const { products, burguersCategory, pizzasCategory } = await fetch();

  return (
    <>
      <Header />
      <div className="px-5 pt-6 sm:hidden">
        <Search />
      </div>

      <div className="relative mt-6 flex min-h-[50vh] flex-col items-center gap-5 bg-primary px-5 pt-5 text-white sm:pt-10  lg:justify-center lg:pt-0">
        <h1 className="text-3xl font-bold lg:text-[44px]">Esta com fome?</h1>
        <p className="text-center text-lg font-semibold">
          Com apenas alguns cliques, encontre refeições acessíveis perto de
          você.
        </p>
        <div className="absolute bottom-0 right-5 h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] lg:right-[5vw] lg:h-[14vw] lg:w-[14vw]">
          <Image
            src="/img-base.png"
            alt="imagem de um prato de comida"
            fill
            sizes="100%"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="px-5 pt-6">
          <h2 className="mb-2 hidden text-center font-semibold lg:block">
            Categorias
          </h2>
          <CategoryList />
        </div>

        <div className="px-5 pt-6">
          <Link href={`/categories/${pizzasCategory?.id}/products`}>
            <PromoBanner
              src="/promo-banner-01.png"
              alt="Até 30% de desconto em pizzas!"
            />
          </Link>
        </div>
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <Link href={`/categories/${burguersCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner-02.png"
            alt="A partir de R$17,90 em lanches"
          />
        </Link>
      </div>

      <div className="space-y-4 py-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>

      <Footer />
    </>
  );
};

export default Home;
