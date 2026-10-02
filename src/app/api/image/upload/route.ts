

import {v2 as cloudinary} from "cloudinary";
import { NextResponse } from "next/server";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME as string,
    api_key: process.env.CLOUDINARY_KEY as string,
    api_secret: process.env.CLOUDINARY_SECRET as string,
    secure: true
})

export const POST = async (request: Request) => {

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;


    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if(!userId || userId === ""){
        return NextResponse.json({error: "Falha ao alterar imagem"}, {status: 401});
    }

    if(file.type !== "image/jpeg" && file.type !== "image/png"){
        return NextResponse.json({error: "Formato de imagem inválido. Por favor, selecione uma imagem JPEG ou PNG."}, {status: 400});
    }


    const results = await new Promise((resolve, reject)=>{
        cloudinary.uploader.upload_stream({
            tags:[`user_${userId}`],
            public_id: userId,
            folder: `users/${userId}`,
        }, (error, result) => {
            if (error) {
                reject(error);
            }

            resolve(result);
            
        }).end(buffer);
    })


    return NextResponse.json(results);

    
    
    

}