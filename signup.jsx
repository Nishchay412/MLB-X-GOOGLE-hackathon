import React, { useDebugValue, useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ComboboxDemo } from "./src/combobox_teams";
import { ComboboxDemo1 } from "@/combobox1";
import { ComboboxLanguage } from "@/Comboboxlanguage";

export function SignUp() {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  
  const navigate = useNavigate();
  const [log, setLog] = useState(false);
  const [data, setData] = useState();

  // Handlers for combobox selections
  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    console.log("Selected Player:", player);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    console.log("Selected Team:", team);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    console.log("Selected Langrrruage:", language);
  };

  // Combine data when all selections are made
  useEffect(() => {
    if (selectedPlayer && selectedTeam && selectedLanguage) {
      setData({
        selectedPlayer,
        selectedTeam,
        selectedLanguage,
      });
    }
  }, [selectedPlayer, selectedTeam, selectedLanguage]);

  // Log combined data whenever it changes
  useEffect(() => {
    if (data) {
      console.log("Combined Data:", data);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center">
      <ComboboxDemo onSelectPlayer={handlePlayerSelect} />
      <ComboboxDemo1 onSelectTeam={handleTeamSelect} />
      <ComboboxLanguage onSelectLanguage={handleLanguageSelect} />
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
                localStorage.setItem("user_data", JSON.stringify(decodedToken));
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
