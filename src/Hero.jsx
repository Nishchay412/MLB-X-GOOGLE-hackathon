import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./Header";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export function Hero() {
  const [userData, setUserData] = useState({
    googleUser: { name: "Guest", picture: null },
    selectedTeam: "None",
    selectedPlayer: "None",
    selectedLanguage: "English",
  });
  const [nextMatch, setNextMatch] = useState(null);
  const [loadingNextMatch, setLoadingNextMatch] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState(true);

  const fetchUserData = async () => {
    const firebaseId = localStorage.getItem("firebaseid");
    if (!firebaseId) {
      setLoadingUserData(false);
      return;
    }

    try {
      const docRef = doc(db, "users", firebaseId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoadingUserData(false);
    }
  };

  const fetchNextMatch = async (teamId) => {
    try {
      setLoadingNextMatch(true);

      const today = new Date().toISOString().split("T")[0]; // Get today's date
      
      // Fetch the schedule starting from today
      const response = await axios.get(
        `https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=${teamId}&startDate=${today}&endDate=2025-12-31` // Full 2025 range
      );

      console.log("Fetched Team Schedule:", response.data);

      // Extract games from the response
      const games = response.data.dates.flatMap((date) => date.games) || [];
      if (games.length > 0) {
        setNextMatch(games[0]); // Set the next match
      } else {
        setNextMatch(null); // No upcoming matches
      }
    } catch (error) {
      console.error("Error fetching next match:", error);
    } finally {
      setLoadingNextMatch(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData.selectedTeam && userData.selectedTeam !== "None") {
      console.log("Fetching next match for team:", userData.selectedTeam);
      fetchNextMatch(userData.selectedTeam);
    }
  }, [userData.selectedTeam]);

  return (
    <div className="bg-[url('/background_baseball.jpeg')] bg-fixed bg-opacity-35 bg-no-repeat bg-cover h-screen w-full">
      <Header />
      <div className="flex flex-col justify-center items-center h-full text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MLB Fan Engagement Hub</h1>
        {loadingUserData ? (
          <p>Loading your preferences...</p>
        ) : (
          <div className="bg-black bg-opacity-70 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold">
              Hello, {userData?.googleUser?.name || "Fan"}!
            </h2>
            {userData?.googleUser?.picture && (
              <img
                src={userData.googleUser.picture || "/default-profile.png"}
                alt="User Profile"
                className="rounded-full w-16 h-16 mt-2"
              />
            )}
            <p className="text-lg">Your Favorite Team: {userData?.selectedTeam || "None"}</p>
            <p className="text-lg">Your Favorite Player: {userData?.selectedPlayer || "None"}</p>
            <p className="text-lg">Preferred Language: {userData?.selectedLanguage || "English"}</p>
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold mt-4">Next Match</h2>
          {loadingNextMatch ? (
            <p>Loading next match...</p>
          ) : nextMatch ? (
            <div className="mt-4 p-4 border rounded bg-white text-black">
              <p>
                <strong>Match:</strong> {nextMatch.teams.away.team.name} @{" "}
                {nextMatch.teams.home.team.name}
              </p>
              <p>
                <strong>Date:</strong> {new Date(nextMatch.gameDate).toLocaleString()}
              </p>
              <p>
                <strong>Venue:</strong> {nextMatch.venue.name}
              </p>
            </div>
          ) : (
            <p>No upcoming matches scheduled for the selected team.</p>
          )}
        </div>
      </div>
    </div>
  );
}
