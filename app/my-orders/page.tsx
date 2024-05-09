import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import OrderItem from "./_components/order-item";
import ButtonBack from "../_components/buttonBack";
import Footer from "../_components/footer";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <div className="mb-6 flex flex-col items-start gap-6 px-2">
          <ButtonBack />
          <h2 className="text-lg font-semibold">Meus Pedidos</h2>
        </div>

        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => <OrderItem key={order.id} order={order} />)
          ) : (
            <div className="min-h-[40vh]">
              <h3 className="text-center text-lg">
                Você não realizou nenhum pedido
              </h3>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
