import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { subscriptionPlans } from "@/utils/plans";
import { SubscriptionButton } from "./subscription-button";


export function GridPlans(){
    return (
   
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 ">

                {subscriptionPlans.map((plan, index) => (
                    <Card key={plan.id} className={cn("flex flex-col w-full mx-auto ", index === 1 && "pt-0 border-emerald-500")}>{index === 1 && (
                            <div className="bg-emerald-500 w-full py-3 text-center rounded-t-xl">
                                <p className="text-white font-semibold">PROMOÇÃO EXCLUSIVA</p>
                            </div>)}

                       <div>
                         <CardHeader>
                            <CardTitle className="text-xl md:text-2xl">{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul>
                                {plan.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>

                            <div >
                                <p className="text-sm text-muted-foreground line-through">{plan.oldPrice}</p>
                                <p className="text-2xl font-bold">{plan.price}</p>
                            </div>
                        </CardContent>
                       </div>
                       <div>
                         <CardFooter className="mt-4">
                           <SubscriptionButton type={plan.id === "BASIC" ? "BASIC" : "PROFESSIONAL"} />
                        </CardFooter>
                       </div>
                    </Card>
                ))}
            </section>
       
    )
}