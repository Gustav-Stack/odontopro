import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { GridPlans } from "./_components/grid-plans";
import { getSubscription } from "@/utils/get-subscription";

export default async function Plans() {

 const session = await getSession();

    if (!session) {
        redirect("/");
    }

    const subscription = await getSubscription({ userId: session?.user?.id });
  return (
      <div>
        {subscription?.status !== "active" && (
           <GridPlans/>
        )}

        {subscription?.status === "active" && (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold">Você já possui uma assinatura ativa.</h1>
            </div>
        )}


      </div>
  );
}
