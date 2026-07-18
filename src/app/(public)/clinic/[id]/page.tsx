import { getInfoSchedule } from "./_data-access/get-info-schedule"
import { redirect } from "next/navigation"
import { ScheduleContent } from "./_components/schedule-content"

export default async function scheludePage({
    params,
} : {
    params:Promise<{id:string}>
}){

    const userId = (await params).id

    const user = await getInfoSchedule({userId:userId});
    console.log(user)

      if(!user){
            redirect("/")
        }
    return (
        <ScheduleContent clinic={user}/>

    )
}