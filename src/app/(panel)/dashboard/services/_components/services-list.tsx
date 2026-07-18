"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, Plus, X } from "lucide-react"
import { useState } from "react"
import { DialogService } from "./dialog-service"
import { Service } from "@/generated/prisma/client"
import { formatCurrency } from "@/utils/formatCurrency"
import { deleteService } from "../_actions/delete-service"
import { toast } from "sonner"



interface ServiceListProps{
    services: Service[]
}

export function ServiceList({services}: ServiceListProps){

const [isDialogOpen, setIsDialogOpen] = useState(false)
const [editingService, setEditingService] = useState<null | Service>(null)


//chama função do servidor para deletar o serviço
async function handleDeleteService(serviceId: string){
    const response = await deleteService({serviceId: serviceId})
       if(response.error){
        toast.error(response.error)
        return;
    }
    toast.success("Serviço deletado com sucesso")
}


//atualiza o useState e abre a caixa de dialogo
function handleEditService(service: Service){
    setEditingService(service);
    setIsDialogOpen(true);
}

    return(
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <section className="mx=auto">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    < CardTitle className="text-xl md:text-2xl font-bold">Serviços</CardTitle>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4"/>
                        </Button>
                    </DialogTrigger>
                    <DialogContent
                    //Impede que o formulario salve cache quando clica fora dele
                    onInteractOutside={(e)=>{
                        e.preventDefault();
                        setIsDialogOpen(false);
                        setEditingService(null)
                    }}
                    >

                        <DialogService
                        closeModal={()=>{

                            setIsDialogOpen(false);
                            //limpa cache do editing
                            setEditingService(null);
                        }}
                        //verifica se tem cache no editing service que e chamado mais abaixo
                        serviceId={editingService ? editingService.id : undefined}
                        initialValues={editingService ?{
                            name: editingService.name,
                            price: (editingService.price / 100).toFixed(2).replace(".",","),
                            hours: Math.floor(editingService.duration / 60).toString(),
                            minutes: (editingService.duration % 60).toString()
                        }: undefined
                    }
                        />
                    </DialogContent>
                </CardHeader>
                <CardContent>
                    <section className="space-y-4 mt-5">
                            {services.map(services =>(
                                <article 
                                key={services.id}
                                className="flex items-center justify-between"
                                >
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium">{services.name}</span>
                                        <span className="text-gray-500">-</span>
                                        <span className="text-gray-800">{formatCurrency((services.price / 100))}</span>
                                        
                                    </div>

                                    <div>
                                        <Button 
                                        variant="ghost"
                                        size="icon"
                                        onClick={(()=>{
                                            //chama ação de edição
                                            handleEditService(services)
                                        })}
                                        >
                                            <Pencil className="w-4 h-4"/>
                                        </Button>
                                               <Button 
                                        variant="ghost"
                                        size="icon"
                                        onClick={(()=>{
                                            handleDeleteService(services.id)
                                        })}
                                        >
                                            <X className="w-4 h-4"/>
                                        </Button>
                                    </div>
                                </article>
                            ))}
                    </section>
                </CardContent>
            </Card>
        </section>
        </Dialog>
    )
}