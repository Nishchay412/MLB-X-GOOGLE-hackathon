import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./Header"; // Ensure this component exists or adjust accordingly
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../firebase";

export function Hero() {
  const [userData, setUserData] = useState(null); // State to store user data
  const [mlbData, setMlbData] = useState([]); // State to store MLB data

  // Function to fetch user data from Firestore
  const fetchUserData = async () => {
    const firebaseId = localStorage.getItem("firebaseid"); // Get the document ID from localStorage

    if (!firebaseId) {
      console.error("No firebaseid found in localStorage!");
      return;
    }

    try {
      // Fetch the document from Firestore using the ID
      const docRef = doc(db, "users", firebaseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("User Data:", docSnap.data());
        setUserData(docSnap.data());
      } else {
        console.error("No document found with the given ID.");
      }
    } catch (error) {
      console.error("Error fetching user data from Firestore:", error);
    }
  };

  // Function to fetch MLB data using Axios
  const fetchMlbData = async () => {
    try {
      const response = await axios.get("https://statsapi.mlb.com/api/v1/teams?sportId=1");
      console.log("MLB Teams:", response.data.teams);
      setMlbData(response.data.teams); // Set MLB teams to state
    } catch (error) {
      console.error("Error fetching MLB teams with Axios:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data on component mount
    fetchMlbData(); // Fetch MLB data on component mount
  }, []);

  return (
    <div className="bg-[url('/background_baseball.jpeg')] bg-fixed bg-opacity-35 bg-no-repeat bg-cover h-screen w-full">
      <Header />
      <div className="flex flex-col justify-center items-center h-full text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MLB Fan Engagement Hub</h1>
        {userData ? (
          <div className="bg-black bg-opacity-70 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold">Hello, {userData.googleUser?.name || "Fan"}!</h2>
            <p className="text-lg">Your Favorite Team: {userData.selectedTeam}</p>
            <p className="text-lg">Your Favorite Player: {userData.selectedPlayer}</p>
            <p className="text-lg">Preferred Language: {userData.selectedLanguage}</p>
          </div>
        ) : (
          <p>Loading your preferences...</p>
        )}

      
      </div>
    </div>
  );
}
