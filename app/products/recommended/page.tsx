import ButtonBack from "@/app/_components/buttonBack";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  // TODO: pegar produtos com mais pedidos
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <div className="mb-6 flex flex-col items-start gap-6 px-6">
          <ButtonBack />
          <h2 className="text-lg font-semibold">Pedidos Recomendados</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-5 sm:gap-10">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="w-full max-w-[250px]"
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecommendedProductsPage;
