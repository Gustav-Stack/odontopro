"use server"

import prisma from "@/lib/prisma"
import { z} from "zod"


const formSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório  "),
    email: z.string().email("O email é obrigatório"),
    phone: z.string().min(1, "O telefone é obrigatório"),
    date: z.date(),
    serviceId: z.string().min(1, "O serviço é obrigatório"),
    time: z.string().min(1, "O horário é obrigatório"),
    clinicId: z.string().min(1, "O identificador da clínica é obrigatório"),

})

type FormSchema = z.infer<typeof formSchema>

export async function createNewAppointment(formData: FormSchema){
    const scehma = formSchema.safeParse(formData)
    if(!scehma.success){
        return{
            error: scehma.error.issues[0].message
        }
    }
    try{
        const selectedDate = new Date(formData.date)

        const year = selectedDate.getFullYear()
        const month = selectedDate.getMonth() + 1

        const day = selectedDate.getDate()

        const appointmentDate = new Date(year, month, day,0,0,0,0)

        const newAppointment = await prisma.appointment.create({
            data:{
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                timer: formData.time,
                appointmentDate: appointmentDate,
                serviceId: formData.serviceId,
                userId: formData.clinicId
                

            }
        })

        return{
            data: newAppointment
        }

    }catch(err){
        console.log(err);
        return{
            error: "Ocorreu um erro ao criar o agendamento"
        }
    }
}