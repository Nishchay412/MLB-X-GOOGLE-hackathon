import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ComboboxDemo } from "./src/combobox_teams";
import { ComboboxDemo1 } from "@/combobox1";
import { ComboboxLanguage } from "@/Comboboxlanguage";
import { db } from "./firebase"; // Firebase Firestore import
import { collection, addDoc } from "firebase/firestore"; // Firestore methods

export function SignUp() {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [googleUser, setGoogleUser] = useState(null); // Google user info
  const navigate = useNavigate();
  const [combinedData, setCombinedData] = useState(null); // Final combined data

  // Handlers for combobox selections
  const handlePlayerSelect = (player) => setSelectedPlayer(player);
  const handleTeamSelect = (team) => setSelectedTeam(team);
  const handleLanguageSelect = (language) => setSelectedLanguage(language);

  // Combine Google user info with user selections
  useEffect(() => {
    if (googleUser && selectedPlayer && selectedTeam && selectedLanguage) {
      const dataToSave = {
        googleUser, // Google login data
        selectedPlayer,
        selectedTeam,
        selectedLanguage,
      };
      setCombinedData(dataToSave); // Store combined data
    }
  }, [googleUser, selectedPlayer, selectedTeam, selectedLanguage]);

  // Save combined data to Firestore
  useEffect(() => {
    if (combinedData) {
      saveToFirestore(combinedData);
    }
  }, [combinedData]);

  // Firestore save function
  const saveToFirestore = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "users"), data);
      console.log("Document written with ID: ", docRef.id);
      localStorage.setItem("firebaseid",docRef.id)
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <ComboboxDemo onSelectPlayer={handlePlayerSelect} />
      <ComboboxDemo1 onSelectTeam={handleTeamSelect} />
      <ComboboxLanguage onSelectLanguage={handleLanguageSelect} />
      <GoogleOAuthProvider clientId="299875729531-bo76d5icl6tuqqtc74d65j7hugoa2lrc.apps.googleusercontent.com">
        <div className="mt-8">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              try {
                const decodedToken = jwtDecode(credentialResponse?.credential);
                console.log("Google User Data:", decodedToken);
                localStorage.setItem("user_data", JSON.stringify(decodedToken));

                setGoogleUser(decodedToken); // Store Google login info
                navigate("/"); // Redirect after login
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
