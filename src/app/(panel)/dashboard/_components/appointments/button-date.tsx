import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";

export function ButtonPickerAppointment(){
        const router = useRouter();

       const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd")    );
       
       function handleChangeDate(event: ChangeEvent<HTMLInputElement>) {
        const newDate = event.target.value;
        setSelectedDate(newDate);

        const url = new URL(window.location.href);

        url.searchParams.set("date", newDate);
        router.push(url.toString());
       }

    return(

      <input
        type="date"
        id="start"
        className="border-2 px-2 py-1 rounded-md text-sm md:text-base"
        onChange={handleChangeDate}
        />
    )
}