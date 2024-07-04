import  {GoogleGenerativeAI} from "@google/generative-ai"
import {StreamingTextResponse, GoogleGenerativeAIStream} from "ai";
import { auth } from "@clerk/nextjs/server";
import { increaseApiLimit,checkApiLimit } from "@/lib/api-limit";
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from "next/server";

export async function POST(req:Request,res:Response) {

    const {userId}=auth();
    if(!userId) return new NextResponse("Unauthorized",{status:401});

    const freeTrial=await checkApiLimit();
    
    if(!freeTrial){
        return new NextResponse("Free trial has expired...",{status:403});
    }

    const reqBody=await req.json();
    console.log(reqBody);
    const prompt=reqBody.data.prompt;

    const genAI=new GoogleGenerativeAI(String(process.env.GOOGLE_API_KEY!))
    const model=genAI.getGenerativeModel({model:'gemini-pro'});
    const streamingResponse=await model.generateContentStream(prompt);
    await increaseApiLimit();
    return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));

    // const text =generateText({
    //     model: google('models/gemini-pro'),
    //     prompt: promptS,
    //   });
    // return String(text);
    
}



