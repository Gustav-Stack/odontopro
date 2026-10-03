"use server"

import { Subscription } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { Session } from "next-auth";
import { getPlans } from "./get-plans";
import { PLANS } from "../plans";
import { checkSubscriptionExpired } from "./checkSubscriptionExpired";
import { ResultPermissionProps } from "./canPermission";


export async function canCreateService(subscription: Subscription | null, session: Session ): Promise<ResultPermissionProps> {


    try{
        const serviceCount = await prisma.service.count({
            where: {
                userId: session.user.id,
                status: true
            }
        });

        if(subscription && subscription.status === "active") {
        const plan = subscription.plan;
        const planLimits = await getPlans(plan);
        return {
                hasPermission: planLimits.maxServices === null || serviceCount < planLimits.maxServices,
                planId: subscription.plan,
                expired: false,
                plan: PLANS[subscription.plan],
            }
        }
        

        const checkUserLimit = await checkSubscriptionExpired(session);

        return checkUserLimit;


        
    }catch(error){
        console.error("Error checking service creation permission:", error);
        return {
                hasPermission: false,
                planId: "EXPIRED",
                expired: false,
                plan: null,
            }

    }


}
