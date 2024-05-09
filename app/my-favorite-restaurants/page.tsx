import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
import ButtonBack from "../_components/buttonBack";
import Link from "next/link";
import Footer from "../_components/footer";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <div className="mb-6 flex flex-col items-start gap-6 px-2">
          <ButtonBack />
          <h2 className="text-lg font-semibold">Restaurantes Favoritos</h2>
        </div>

        <div className="flex w-full flex-col gap-6">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="mx-auto w-full max-w-[700px]"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <div className="flex min-h-[40vh] flex-col items-center gap-5">
              <h3 className="font-medium">
                Você ainda não marcou nenhum restaurante como favorito.
              </h3>
              <Link
                href="/restaurants/recommended"
                className="text-primary underline"
              >
                Dê uma olhada nos restaurantes
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyFavoriteRestaurants;
