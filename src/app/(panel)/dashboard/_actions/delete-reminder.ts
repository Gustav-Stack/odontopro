"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import {z} from "zod"

const formSchema = z.object({
    reminderId: z.string().min(1, {message: "ID do lembrete é obrigatório"})
})


type formSchema = z.infer<typeof formSchema>

export async function deleteReminder(formData: formSchema){
    const schema = formSchema.safeParse(formData);

    if(!schema.success){
        return {
            error: schema.error.issues[0].message
        }   
    }
    try{
        await prisma.reminder.delete({
            where: {
                id: formData.reminderId
            }
        })
        revalidatePath("/dashboard")
        return {
            data: "Lembrete deletado com sucesso"
        }
    }catch(error){
        return {
            error: "Erro ao deletar lembrete"
        }
    }
}