"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useProModal } from "@/hooks/use-pro-modal"
import { Badge } from "./ui/badge";
import {  Check, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";


const tools=[
    {
        label:"Conversation",
        icon:MessageSquare,
        color:"text-violet-500",
        bgColor:"bg-violet-500/10",
        href:"/conversation"
    },
    {
        label:"Music Generation",
        icon:Music,
        color:"text-emerald-500",
        bgColor:"bg-emerald-500/10",
        href:"/music"
    },
    {
        label:"Video Generation",
        icon: VideoIcon,
        href:"/video",
        bgColor:"bg-orange-700/10",
        color:"text-orange-700"
    }
]

export const ProModal=()=>{

    const proModal=useProModal();

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center 
                    flex-col gap-y-4 pb-2">
                        <div>
                            Upgrade to Think
                            <Badge variant="premium" className="uppercase text-sm py-1 ml-2">
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool)=>(
                            <Card key={tool.label}
                            className="p-3 border-black/5 flex items-center justify-between">
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6",tool.color)}/>
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button size="lg" variant="premium" className="w-full">
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white"></Zap>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}