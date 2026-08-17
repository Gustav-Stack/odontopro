"use server"

import { Plan } from "@/generated/prisma/enums"
import { PlanProps } from "../plans"

export interface PlanDetailsInfo{
    maxServices: number;
}

const PLANS_LIMITS: PlanProps = {
    BASIC: {
        maxServices: 3,
    },
    PROFESSIONAL: {
        maxServices: 50,
    },
}

export async function getPlans(planId: Plan){
    return PLANS_LIMITS[planId];
}


