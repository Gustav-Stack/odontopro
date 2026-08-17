"use server"

import prisma from "@/lib/prisma"
import { addDays, differenceInDays, isAfter } from "date-fns"
import { TRIAL_DAYS } from "./trial-limits"

export async function checkSubscription(userId: string){

    const user = await prisma.user.findUnique({
        where: {
            id: userId

        }, 
        include:{
            subscription: true
        }
    })

    if(!user){
        throw new Error("Usuário não encontrado")
    }
    if(user.subscription && user.subscription.status === "active"){
        return {
            subscriptionStatus: "ACTIVE",
            message: "Assinatura ativa",
            planId: user.subscription.plan,
        }
    }

    const trialEndDate = addDays(user.createdAt!, TRIAL_DAYS);

    if(isAfter(new Date(), trialEndDate)){
        return {
            subscriptionStatus: "EXPIRED",
            message: "Seu periodo de teste expirou",
            planId: "TRIAL",
        }

    }
const daysRemaining = differenceInDays(trialEndDate, new Date());

    return {
            subscriptionStatus: "TRIAL",
            message: `Você está no período de teste. Faltam ${daysRemaining} dias para expirar`,
            planId: "TRIAL",
        }
}