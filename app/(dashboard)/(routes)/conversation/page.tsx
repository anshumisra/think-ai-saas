"use client";

// import * as z from "zod";
// import axios from "axios"
import { Heading } from "@/components/heading";
import { Bot, Loader2, MessageSquare, Send, User2} from "lucide-react";
// import { useForm } from "react-hook-form";
// import { formSchema } from "./constants";
// import { zodResolver } from "@hookform/resolvers/zod";
import {useChat} from "ai/react";
import { useProModal } from "@/hooks/use-pro-modal";
import { ProModal } from "@/components/pro-modal";

// import { Form,FormField,FormItem,FormControl } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export default function ConversationPage(){
    
    const {messages,input,handleInputChange,handleSubmit,isLoading,stop}=useChat(
        {
            api:'api/genai'
        }
    );

    return (
        <div>
            <Heading title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10" />
            <div className="flex min-h-screen flex-col items-center p-12">
                        {RenderForm()}
                        {RenderMessages()}
                    
            </div>
        </div>
        
    )
    function RenderForm(){
        const proModal=useProModal();
        return <form onSubmit={async (event)=>{
            
            event.preventDefault();
            try {
                await handleSubmit(event, {

                    data: {
                        prompt: input
                    }
                });
            } catch (error:any) {
                if (error?.response?.status === 403) {
                    proModal.onOpen();
                }
            }
        }
        } className="w-full flex flex-row gap-2 items-center h-full">
            <input type="text" placeholder={isLoading?"Thinking...":"ask something..."} 
            value={input}
            disabled={isLoading}
            onChange={handleInputChange}
            className="border-b border-dashed outline-none w-full px-4 py-2 text-[#0842A0] text-right focus:placeholder-transparent disabled:bg-transparent"/>
            <button type="submit" className="rounded-full shadow-md border flex flex-row">
                {isLoading?<Loader2 onClick={stop} className="p-3 h-10 w-10 stroke-stone-500 animate-spin"/>:
                <Send className="p-3 h-10 w-10 stroke-stone-500"/>}
            </button>
        </form>
        
    }
    function RenderMessages()
    {
        
        return <div className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap relative">
            {messages.map((m,index)=>{
                return (<div className={`p-4 shadow-md rounded-md ml-10 relative ${m.role=='user'?"bg-stone-100":""}`}>
                        {m.content}
                        {m.role==='user'?(<User2 className="absolute top-2 -left-10 border rounded-full p-1 shadow-lg"/>):(<Bot className={`absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[#0842A0] ${isLoading && index===messages.length-1?'animate-bounce':""}`}
                        />)}
                </div>
            )})}
            </div>
    }
    
}

// const ConversationPage = () => {
//     //const router=useRouter();

//     const {messages,input,handleInputChange,handleSubmit}=useChat(
//         {
//             api:'api/genai'
//         }
//     );
    //const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);    
    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         prompt: ""
    //     }
    // });

    // const isLoading = form.formState.isSubmitting;
    // const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //     try{
    //         const userMessage:ChatCompletionMessageParam={
    //           role:"user",
    //           content:values.prompt,
    //         };
    //         const newMessages=[...messages,userMessage];

    //         const response=await axios.post("/api/conversation",{
    //             messages:newMessages,
    //         });
    //         //setMessages((current)=>[...current,userMessage,response.data]);
    //         form.reset();
    //     }catch(error:any){
    //         //Pro
    //         console.log(error);
    //     }finally{
    //         router.refresh();
    //     }
    // }
//     return (
//         <div>
//             <div>
//                 <Heading title="Conversation"
//                     description="Our most advanced conversation model."
//                     icon={MessageSquare}
//                     iconColor="text-violet-500"
//                     bgColor="bg-violet-500/10" />
//             </div>
//             <form onSubmit={(event)=>{
//                 event.preventDefault();
//                 handleSubmit(event,{
//                     data:{
//                         prompt:input
//                     }
//                 })
//             }} className="w-full flex flex-row gap-2 items-center h-full">
//                 <input type="text" placeholder="ask something..." 
//                 className="border-b border-dashed outline-none w-full px-4 py-2 text-[#0842A0] text-right focus:placeholder-transparent"/>
//                 <button type="submit" className="rounded-full shadow-md border flex flex-row">
//                     <Send className="p-3 h-10 w-10 stroke-stone-500"/>
//                 </button>
//             </form>
//             <div>{JSON.stringify(messages)}</div>
//             {/* <div className="px-4 lg:px-8">
//                 <div>
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)}
//                             className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                        
//                         <FormField name="prompt" render={({field})=>(
//                             <FormItem className="col-span-12 lg:col-span-10">
//                                 <FormControl className="m-0 p-0">
//                                 <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
//                                 disabled={isLoading}
//                                 placeholder="How do i calculate the radius of a circle?"
//                                 {...field}/>
//                                 </FormControl>
//                             </FormItem>
//                         )}/>
//                         <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
//                             Generate
//                         </Button>
//                         </form>
//                     </Form>
//                     <div className="space-y-12 mt-4 hover:space-y-3 hover:transition-all">
//                         <div className="flex flex-col-reverse gap-y-4">
//                             {messages.map((message)=>(
//                                     <div key={String(message.content)}>
//                                         {String(message.content)}
//                                     </div>
//                                 ))}
//                         </div>
//                     </div>
//                 </div>
//             </div> */}
//         </div>

//     );
// }


//export default ConversationPage;


