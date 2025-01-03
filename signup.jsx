import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export function SignUp() {
    return (
        <div>
        <GoogleOAuthProvider clientId="299875729531-bo76d5icl6tuqqtc74d65j7hugoa2lrc.apps.googleusercontent.com">
            <div
                className="flex items-center justify-center h-screen"
                style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
            >
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        const decodedToken = jwtDecode(credentialResponse?.credential);
                        console.log("Decoded Token:", decodedToken);
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
