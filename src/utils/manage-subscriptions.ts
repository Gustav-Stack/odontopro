import prisma from "@/lib/prisma";
import Stripe from "stripe";
import { stripe } from "@/utils/stripe";
import { Plan } from "@/generated/prisma/enums";



/**
 * Salvar, atualizar ou deletar assinatura do usuário no banco de dados

 */
export async function manageSubscription(
    subscriptionId: string,
    customerId: string,
    createAction: boolean = false,
    deleteAction: boolean = false,
    type?: Plan
){


    const findUser = await prisma.user.findFirst({
        where: {
            stripe_customer_id: customerId
        }
    })

    if(!findUser){
     return Response.json({error: "Usuário não encontrado"}, {status: 400});
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
        id: subscription.id,
        userId: findUser.id,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id,
        plan: type ?? "BASIC",
    }

    if(subscriptionId && deleteAction){
        await prisma.subscription.delete({
            where: {
                id: subscriptionId
            }
        })
        
        return;
    }

    if(createAction){
        try{
            await prisma.subscription.create({
            data: subscriptionData
        })
        return;
        }
        catch(error){
            return Response.json({error: "Erro ao criar assinatura"}, {status: 400});
        }

    }else{
        try{
            await prisma.subscription.update({
                where: {
                    id: subscriptionId
                },
                data: {
                    status: subscription.status,
                    priceId: subscription.items.data[0].price.id,
                }
            })
            return;
        }
        catch(error){
            return Response.json({error: "Erro ao atualizar assinatura"}, {status: 400});
        }
    }

}