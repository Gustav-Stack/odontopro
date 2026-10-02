"use server"

import prisma from "@/lib/prisma"


export async function getPermissionUserToReports(userId: {userId: string }){ 

    const user = await prisma.user.findUnique({
        where: {
            id: userId.userId
        },
        include:{
            subscription: true
        }
    })
        if(!user?.subscription || user.subscription.plan !== "PROFESSIONAL"){
            return null;
        }

        return user;



}


