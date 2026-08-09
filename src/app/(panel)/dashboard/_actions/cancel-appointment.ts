"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import {z} from "zod"

const formSchema = z.object({
    appointmentId: z.string().min(1, {message: "ID do agendamento é obrigatório"}),
})


type formSchema = z.infer<typeof formSchema>

export async function cancelAppointment(formData: formSchema){

    const session = await auth();
    if(!session?.user?.id){
        return {
            error: "Usuário não autenticado"
        }
    }

    const schema = formSchema.safeParse(formData);

    if(!schema.success){
        return {
            error: schema.error.issues[0].message
        }   
    }
    try{
        await prisma.appointment.delete({
            where: {
                id: formData.appointmentId,
                userId: session.user?.id
            }
        })
        revalidatePath("/dashboard")

        return {
            data: "Agendamento cancelado com sucesso"
        }
        
    }catch(error){
        return {
            error: "Erro ao criar lembrete"
        }
    }
}