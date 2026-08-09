import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"




export const GET = auth(async function GET(request) {
if(!request.auth){
    return NextResponse.json({ error: "Acesso não autorizado" }, { status: 401 })
}
const searchParams = request.nextUrl.searchParams;
const dateString = searchParams.get("date") as string;
const clinicId = request.auth.user?.id;

if(!dateString) {
    return NextResponse.json({ error: "Data não fornecida" }, { status: 400 })
}
if(!clinicId) {
    return NextResponse.json({ error: "ID da clínica não fornecido" }, { status: 400 })
}
try{
    const [year, month,day ] = dateString.split("-").map(Number);
    const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));

    const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 999));

    const appointments = await prisma.appointment.findMany({
        where: {
            userId: clinicId,
            appointmentDate: {
                gte: startDate,
                lte: endDate,
            }
        },
        include: {
            service: true,
        }
    });

    return NextResponse.json({ appointments })

}catch(error){
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Erro ao buscar agendamentos" }, { status: 500 })
}
    
})