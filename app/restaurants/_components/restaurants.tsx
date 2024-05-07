"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

interface RestaurantProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const Restaurants = ({ userFavoriteRestaurants }: RestaurantProps) => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchFor = searchParams.get("search");
  const router = useRouter();
  const handleBackClick = () => router.back();

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5">
        {restaurants.length > 0 && (
          <div className="mb-6 flex flex-col items-start gap-2 px-6">
            <Button
              className="rounded-full bg-white text-foreground hover:text-white"
              size="lg"
              onClick={handleBackClick}
            >
              <ChevronLeftIcon />
              Voltar
            </Button>
            <h2 className="text-lg font-semibold">Restaurantes Encontrados</h2>
          </div>
        )}
        <div className="flex w-full flex-col justify-center gap-6 sm:flex-row sm:flex-wrap">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="mx-auto w-full max-w-[450px]"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <div className="flex flex-col items-center gap-5  ">
              <h3 className="text-center text-lg">
                Não encontramos nenhum restaurante chamado: <br />
                <span className="font-bold">{searchFor}</span>
              </h3>
              <Button
                variant="link"
                size="lg"
                className="text-lg underline"
                onClick={handleBackClick}
              >
                Voltar para tela inicial
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
