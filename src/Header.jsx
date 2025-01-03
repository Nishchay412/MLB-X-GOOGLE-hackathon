import React from "react";

export function Header(){
    return(
        <div className="flex justify-between py-2 px-2">
            <img src ="/mlb logo .png" className="h-10 w-auto">
            </img>
        <div className=" flex gap-3">
            <button className="bg-transparent rounded-sm">
                SIGN UP
            </button>
            <button className="bg-transparent rounded-sm">
                PROFILE
            </button>
            <button className="bg-transparent rounded-sm">
                HIGHLIGHTS 
            </button>
        </div>
        </div>
    )
}