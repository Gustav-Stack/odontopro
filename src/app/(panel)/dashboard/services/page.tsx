import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { ServiceContent } from "./_components/service-content";
import { Suspense } from "react";

export default async function Services() {
    const session = await getSession();

    if (!session) {
        redirect("/");
    }
  return (
      <Suspense fallback={<div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>}>

        <ServiceContent userId={session.user?.id!}/>
      </Suspense>
    
  );
}


