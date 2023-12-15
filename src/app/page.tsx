"use client"

import { Body } from "@/components/Body";
import { Header } from "@/components/Header";
import { PokemonProvider } from "@/contexts/PokemonContext";

const Page = () => {
    return(
        <PokemonProvider>
            <div className="flex flex-col w-screen h-screen">
                <Header />
                <Body />
            </div>
        </PokemonProvider>
    );
}

export default Page;