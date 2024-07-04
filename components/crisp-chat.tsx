"use client"

import { useEffect } from "react";
import {Crisp} from "crisp-sdk-web";

export const CrispChat=()=>{
    useEffect(()=>{
        Crisp.configure("35832cc9-4f4f-4590-b8e1-ee99454368e3");
    },[]);
    return null;
}