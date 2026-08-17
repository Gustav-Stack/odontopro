"use server"

import { auth } from "@/lib/auth";
import { PlanDetailsInfo } from "./get-plans";
import prisma from "@/lib/prisma";
import { canCreateService } from "./canCreateService";



export type PLAN_PROP = "BASIC" | "PROFESSIONAL" | "TRIAL" | "EXPIRED";
type typeCheck = "service";

export interface ResultPermissionProps{
    hasPermission: boolean;
    planId: PLAN_PROP;
    expired: boolean;
    plan: PlanDetailsInfo | null;
}

interface CanPermissionProps {
    type: typeCheck;
}
export async function canPermission({type}: CanPermissionProps): Promise<ResultPermissionProps> {

    const session = await auth();

    if(!session?.user?.id) {
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: true,
            plan: null
        }
    }

    const subscription = await prisma.subscription.findFirst({
        where: {
            userId: session.user.id,
        }
    });

    switch(type){
        case "service":
            const permission = await canCreateService(subscription, session);
            return permission;

        default:
            return {
                hasPermission: false,
                planId: "EXPIRED",
                expired: true,
                plan: null
            }
    }


}