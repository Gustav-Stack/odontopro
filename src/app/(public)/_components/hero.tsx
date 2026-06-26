import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImg from "../../../../public/doctor-hero.png";
export function Hero() {
  return (
    <section>
      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8 pb-4 lg:pb-0 bg-white">
        <main className="flex items-center justify-center">
            <article  className="flex-[2] mx-w-3x1 space-y-8 flex flex-col justify-center" >
                <h1 className="text-4xl font-bold lg:text-5xl max-w-2xl tracking-tight">
                    Encontre os melhores profissionais em um único local!
                </h1>
                <p className="text-base md:text-lg text-gray-600">
                    Nós somos umaplataforma para profissionais da saúde com foco em agilizar 
                    seu atendimento de forma simplificada e organizada.
                </p>
                <Button className="bg-emerald-500 hover:bg-emerald-400 w-fit px-6 font-semibold">
                    Encontre uma clínica
                </Button>
            </article>
            <div className="hidden lg:block">
                <Image 
                priority
                src={doctorImg} alt="Foto ilustrativa de um profissional de saúde"
                width={340}
                height={400}
                className="object-contain"
                quality={100}>
                
                    
                </Image>
            </div>

        </main>
      </div>
    </section>
  );
}
