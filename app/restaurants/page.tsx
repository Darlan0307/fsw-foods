import Restaurants from "./_components/restaurants";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

const RestaurantsPage = async () => {
  const session = await getServerSession(authOptions);
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return <Restaurants userFavoriteRestaurants={userFavoriteRestaurants} />;
};

export default RestaurantsPage;
