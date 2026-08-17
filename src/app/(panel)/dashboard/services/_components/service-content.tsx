import { canPermission } from "@/utils/permissions/canPermission";
import { getAllServices } from "../_data-access/get-all-services"
import { ServiceList } from "./services-list";
import { LabelSubscription } from "@/components/ui/label-subscription";

interface ServiceContentProps{
    userId: string
}

export async function ServiceContent({userId}: ServiceContentProps){


    const services = await getAllServices({userId: userId});
    const permissions = await canPermission({type: "service"});

    console.log("permission", permissions);
    
    return(
        <>
        {
            !permissions.hasPermission && (
                <LabelSubscription expired={permissions.expired}/>
            )
        }
        <ServiceList services={services.data  || []} permission={permissions}/>
        </>
    )
}