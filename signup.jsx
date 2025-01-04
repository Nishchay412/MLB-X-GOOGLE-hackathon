import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ComboboxDemo } from "./src/combobox_teams";
import { ComboboxDemo1 } from "@/combobox1";

export function SignUp() {
  const navigate = useNavigate();
  const [log, setLog] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <ComboboxDemo/>
      <ComboboxDemo1/>
      <GoogleOAuthProvider clientId="299875729531-bo76d5icl6tuqqtc74d65j7hugoa2lrc.apps.googleusercontent.com">
        <div
          className="flex items-center justify-center h-screen"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              try {
                const decodedToken = jwtDecode(credentialResponse?.credential);
                console.log("Decoded Token:", decodedToken);
                setLog(true);
                localStorage.setItem("user_data",JSON.stringify(decodedToken))
                navigate("/");

              } catch (error) {
                console.error("Error decoding token:", error);
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}
