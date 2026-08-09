import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AppointmentWithService } from "./appointments-list";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/formatCurrency";


interface DialogAppointmentProps {
    appointment: AppointmentWithService | null;
}

export function DialogAppointment({ appointment }: DialogAppointmentProps){
 
    return (
    <DialogContent >
        <DialogHeader className="text-left">
            <DialogTitle className="text-lg font-semibold">
                Detalhes do Agendamento
            </DialogTitle>
            <DialogDescription>
                Veja todos os detalhes do agendamento.
            </DialogDescription>
            <div className="py-4 ">
                {appointment &&(
                    <article>
                        <p><span className="font-semibold">Horário agendado:</span> {appointment.timer}</p>
                        <p><span className="font-semibold">Data do agendamento:</span> {new Intl.DateTimeFormat('pt-BR',{
                            timeZone: 'UTC',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        }).format(new Date(appointment.appointmentDate))
                        }</p>
                        <p><span className="font-semibold">Nome:</span> {appointment.name}</p>
                        <p><span className="font-semibold">Telefone:</span> {appointment.phone}</p>
                        <p><span className="font-semibold">Email:</span> {appointment.email}</p>
                        <section className="mt-4 p-4 border rounded-md bg-gray-100">
                            <p><span className="font-semibold">Serviço:</span> {appointment.service.name}</p>
                            <p><span className="font-semibold">Duração:</span> {appointment.service.duration} minutos</p>
                            <p><span className="font-semibold">Valor:</span> {formatCurrency((appointment.service.price / 100))}</p>
                        </section>

                        
                    </article>
                )}
            </div>
        </DialogHeader>
    
    </DialogContent>
    
    )
}