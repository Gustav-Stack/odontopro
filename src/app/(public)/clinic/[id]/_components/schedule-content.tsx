"use client"

import Image from "next/image"
import imgTest from "../../../../../../public/foto1.png"
import { MapPin } from "lucide-react"
import { Prisma } from "@/generated/prisma/client"
import { AppointmentFormData, useAppointmentForm } from "./schedule-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormatPhone } from "@/utils/formatPhone"
import { DateTimePicker } from "./date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { ScheduleTimeList } from "./schedule-time-list"
import { createNewAppointment } from "../_actions/create-appointmensts"
import { toast } from "sonner"

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
    include:{
        subscription: true,
        services: true
    }
}>

interface ScheduleContentProps{
    clinic: UserWithServiceAndSubscription
}

export interface TimeSlot {
    time: string;
    available: boolean;
}


export function ScheduleContent({clinic}: ScheduleContentProps){


    const form = useAppointmentForm();
    const {watch} = form
    const selectedDate = watch("date")
    const selectedServiceId = watch("serviceId")
   

    const [selectedTime, setSelectedTime] = useState("")
    const [availableTimeSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false)

    const [blockedTimes, setBlockedTimes] = useState<string[]>([])



const fetchBlockedTimes = useCallback(async (date: Date): Promise<string[]> =>{
    setLoadingSlots(true);

        try{
            const dateString = date.toISOString().split("T")[0]
            console.log(dateString);
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`)
            const json = await response.json();
            setLoadingSlots(false);
            return json;
        }catch(err){
            setLoadingSlots(false);
            return [];
        }
},[clinic.id])


useEffect(()=>{
        if(selectedDate){
            fetchBlockedTimes(selectedDate).then((blocked)=>{
                setBlockedTimes(blocked)
                 console.log("blocked:", blocked)
    console.log("clinic.times:", clinic.times)
                const times = clinic.times || [];

                const finalSlots = times.map((time)=>(

                    {
                        time: time,
                        available: !blocked.includes(time)
                    }
                ))
                setAvailableSlots(finalSlots)
            })
        }
    },[selectedDate, clinic.times, fetchBlockedTimes, selectedTime])



    async function handleRegisterAppointment(formData: AppointmentFormData){
        if(!selectedTime){
            return;
        }
        const response = await createNewAppointment({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            time: selectedTime,
            date: formData.date,
            serviceId: formData.serviceId,
            clinicId: clinic.id
        })

        if(response.error){
            toast.error(response.error)
            return;
        }
        toast.success("Consulta agenda com sucesso");
    }
    

return(
    <div className="min-h-screen flex flex-col">
        <div className="h-32 bg-emerald-500" />

        <section className="container mx-auto px-4 -mt-16">
            <div className="max-w-2xl mx-auto"></div>
            <article className="flex flex-col items-center">

                <div>
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white mb-8">
                        <Image 
                        src={clinic.image ? clinic.image : imgTest}
                        alt="foto da clinica"
                        className="object-cover"
                        fill
                        />
                    </div>
                </div>

                <h1  className="text-2xl font-bold mb-2">{clinic.name}</h1>
                <div className="flex items-center gap-1">
                    <MapPin className="w-5 h-5"/>
                    <span>{clinic.address ? clinic.address : "Endereço não informado"}</span>
                    
                </div>
            </article>

        </section>
        <section className="max-w-2xl mx-auto w-full mt-6">
            <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(handleRegisterAppointment)}
            className="mx-2 space-y-6 bg-white p-6 border rounded-md shadow-sm">
                <FormField
                control={form.control}
                name="name"
                render={({field})=>(
                    <FormItem className="my-2">
                        <FormLabel className="font-semibold">
                            Nome completo:
                        </FormLabel>
                        <FormControl>
                            <Input 
                            id="name"
                            placeholder="Digite seu nome completo..."
                            {...field}
                            >
                            </Input>
                        </FormControl>
                    </FormItem>
                )}
                >

                </FormField>
                <FormField
                control={form.control}
                name="email"
                render={({field})=>(
                    <FormItem className="my-2">
                        <FormLabel className="font-semibold">
                            Email:
                        </FormLabel>
                        <FormControl>
                            <Input 
                            id="email"
                            placeholder="Digite seu email..."
                            {...field}
                            >
                            </Input>
                        </FormControl>
                    </FormItem>
                )}
                >

                </FormField>
                <FormField
                control={form.control}
                name="phone"
                render={({field})=>(
                    <FormItem className="my-2">
                        <FormLabel className="font-semibold">
                            Telefone:
                        </FormLabel>
                        <FormControl>
                            <Input 
                            id="phone"
                            placeholder="(XX) XXXXX-XXXX"
                            {...field}
                            onChange={(e)=>{
                                const formattedValue = FormatPhone(e.target.value)
                                field.onChange(formattedValue);
                            }}

                            >
                            </Input>
                        </FormControl>
                    </FormItem>
                )}
                >

                </FormField>

                <FormField
                control={form.control}
                name="date"
                render={({field})=>(
                    <FormItem className=" flex items-center gap-2 space-y-1 ">
                        <FormLabel className="font-semibold">
                            Data do agendamento:
                        </FormLabel>
                        <FormControl>
                            <DateTimePicker
                            initialDate={new Date()}
                            className="w-full rounded border -2 "
                            onChange={(date)=>{
                                if(date){
                                    field.onChange(date)
                                }
                            }}
                            />
                        </FormControl>
                    </FormItem>
                )}
                >

                </FormField>

                  <FormField
               control={form.control}
  name="serviceId"
  render={({ field }) => {
    console.log("RENDER field.value:", JSON.stringify(field.value), typeof field.value);
    return (
      <FormItem>
        <FormLabel className="font-semibold">Selecione o serviço:</FormLabel>
        <FormControl>
          <Select
            value={field.value}
            onValueChange={(value) => {
              console.log("onValueChange disparou com:", JSON.stringify(value), typeof value);
              field.onChange(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um serviço" />
            </SelectTrigger>
            <SelectContent>
              {clinic.services.map((service) => {
                console.log("SelectItem value:", JSON.stringify(service.id), typeof service.id);
                return (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} ({Math.floor(service.duration / 60)}h {service.duration % 60}min)
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
                >

                </FormField>
                {selectedServiceId && (
                    <div className="space-y-2">
                        <Label className="font-semibold">Horários disponíveis</Label>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            {loadingSlots ?(
                                <p>Carregando horários</p>
                            ): availableTimeSlots.length === 0 ? (
                                <p>Nenhum horário disponível</p>
                            ):(
                                <ScheduleTimeList 
                                onSelectTime={(time)=> setSelectedTime(time)}
                                clinicTimes={clinic.times}
                                blockedTimes={blockedTimes}
                                availableTimeSlots={availableTimeSlots}
                                selectedTime={selectedTime}
                                selectedDate={selectedDate}
                                requiredSlots={
                                    clinic.services.find(service => service.id === selectedServiceId) ? Math.ceil(clinic.services.find(service => service.id === selectedServiceId)!.duration / 30) : 1
                                }
                                />
                            )}
                        </div>
                    </div>
                )}
                <Button
                className="w-full bg-emerald-500 hover:bg-emerald-400"
                disabled={!watch("name") || !watch("email") || !watch("phone"  ) || !watch("date") }
                >
                    Realizar Agendamento
                </Button>
            </form>
        </Form>
        </section>
            
    </div>
)
}