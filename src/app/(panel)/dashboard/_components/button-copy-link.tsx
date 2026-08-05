"use client"

import { Button } from "@/components/ui/button"
import { LinkIcon } from "lucide-react"
import { toast } from "sonner"


export function ButtonCopyLink({userId}: {userId: string}){



    function handleCopyLink(){
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/clinic/${userId}`)
        toast.success("Link copiado para a área de transferência!", {
            description: "Compartilhe este link com seus pacientes para que eles possam agendar consultas.",
        })
    }
    return(
        <Button onClick={handleCopyLink}>
            <LinkIcon className="w-5 h-5"/>
        </Button>
    )


}