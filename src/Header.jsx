import React from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const userDataString = localStorage.getItem("user_data");
  const userData = JSON.parse(userDataString || "null"); // safer parse
  const userPicture = String(userData.picture);

  console.log(userData?.email);
  console.log(userData?.picture);
  
  return (
    <div className="flex justify-between py-2 px-2">
      {/* Main Logo (self-closing <img> tag) */}
      <img
        src="/mlb logo .png"
        className="h-10 w-auto"
        alt="MLB Logo"
      />
      
      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <button
          className="bg-transparent rounded-sm"
          onClick={() => navigate("/profile")}
        >
          PROFILE
        </button>
        
        <button
          className="bg-transparent rounded-sm"
          onClick={() => navigate("/highlights")}
        >
          HIGHLIGHTS
        </button>
        
        {/* Login button & user image */}
        <div className="flex gap-1"> 
          <button
            className="bg-transparent rounded-sm"
            onClick={() => navigate("/signup")}
          >
            LOGIN
          </button>

          {/* Use the actual URL from userData?.picture */}
          <img
            src={userPicture || "/placeholder.png"}
            className="h-6 w-auto mt-2 rounded-lg"
            alt="User profile"
          />
        </div>
      </div>
    </div>
  );
}
