import ButtonBack from "@/app/_components/buttonBack";
import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <div className="mb-6 flex flex-col items-start gap-6 px-6">
          <ButtonBack />
          <h2 className=" text-lg font-semibold">{category.name}</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:flex sm:flex-wrap sm:justify-center sm:gap-10">
          {category.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className=" w-full max-w-[250px] lg:w-[250px]"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
