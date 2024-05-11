"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export async function CloseOrder(id: string) {
  await db.order.update({
    where: { id },
    data: { status: "CANCELED" },
  });
  revalidatePath("/my-orders");
}

export async function CompletedOrder(id: string) {
  await db.order.update({
    where: { id },
    data: { status: "COMPLETED" },
  });
  revalidatePath("/my-orders");
}

export async function ComfirmedOrder(id: string) {
  await db.order.update({
    where: { id },
    data: { status: "CONFIRMED" },
  });
  revalidatePath("/my-orders");
}
