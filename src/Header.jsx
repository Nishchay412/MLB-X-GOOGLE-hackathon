import React from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  // Safely parse user data from localStorage
  const userDataString = localStorage.getItem("user_data");
  console.log("dataa",userDataString)
  const userData = JSON.parse(userDataString || "null"); // If null, set to null safely

  // Fallback to placeholder image if no picture is available
  const userPicture = userData?.picture || "/user.png";

  console.log(userData?.email); // Log email for debugging
  console.log(userPicture); // Log picture URL for debugging

  return (
    <div className="flex justify-between py-2 px-2">
      {/* Main Logo */}
      <img
        src="/mlb logo.png"
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

        {/* Login Button & User Image */}
        <div className="flex gap-1">
          <button
            className="bg-transparent rounded-sm"
            onClick={() => navigate("/signup")}
          >
            LOGIN
          </button>

          {/* Display user image with fallback */}
          <img
            src={userPicture} // Either userData.picture or "/user.png"
            className="h-6 w-auto mt-2 rounded-lg"
            alt="User profile"
          />
        </div>
      </div>
    </div>
  );
}
