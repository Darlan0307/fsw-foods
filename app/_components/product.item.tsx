import { Prisma } from "@prisma/client";

type ProductItemProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
};

const ProductItem = ({ product }: ProductItemProps) => {
  return <article>{product.restaurant.name}</article>;
};

export default ProductItem;
