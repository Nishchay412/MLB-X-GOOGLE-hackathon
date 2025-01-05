import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./Header";

export function Hero() {
  const [nextMatch, setNextMatch] = useState(null);
  const [loadingNextMatch, setLoadingNextMatch] = useState(false);

  const fetchNextMatch = async (teamId) => {
    try {
      setLoadingNextMatch(true);

      const today = new Date().toISOString().split("T")[0]; // Get today's date (2025-01-05)
      
      // Fetch the schedule starting from today
      const response = await axios.get(
        `https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=${teamId}&startDate=${today}&endDate=2025-12-31` // Extend date range for testing
      );

      console.log("Fetched Team Schedule:", response.data);

      // Extract games from the response
      const games = response.data.dates.flatMap(date => date.games) || [];
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
    const yankeesTeamId = 147; // New York Yankees team ID
    fetchNextMatch(yankeesTeamId);
  }, []);

  return (
    <div className="bg-[url('/background_baseball.jpeg')] bg-fixed bg-opacity-35 bg-no-repeat bg-cover h-screen w-full">
      <Header />
      <div className="flex flex-col justify-center items-center h-full text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MLB Fan Engagement Hub</h1>
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
            <p>No upcoming matches scheduled for the New York Yankees.</p>
          )}
        </div>
      </div>
    </div>
  );
}
