"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfileAvatar({avatarUrl}: {avatarUrl: string}){
    
    const session = await auth();

    if(!session?.user?.id){
        return{
            error: "Usuário não autenticado",
        }
    }

    if(!avatarUrl || avatarUrl === ""){
        return{
            error: "URL da imagem inválida",
        }
    }
    try{
        await prisma.user.update({
            where: {
                id: session?.user?.id,
            },
            data: {
                image: avatarUrl,
            }
        })

        revalidatePath("/dashboard/profile");

        return{
            message: "Imagem atualizada com sucesso",
        }
    }catch(error){
        console.error("Erro ao atualizar imagem:", error);
        return{
            error: "Erro ao atualizar imagem",
        }
    }
}