import React from "react";
import { Header } from "./Header";
export function Hero() {
    return (
        <div className="bg-[url('/background_baseball.jpeg')] bg-fixed bg-opacity-35 bg-no-repeat bg-cover h-screen w-full">
            <Header/>
        </div>
    );
}
