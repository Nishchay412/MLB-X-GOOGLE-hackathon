import React, { useEffect } from "react";
import axios from "axios";
import { Header } from "./Header"; // Ensure this component exists or adjust accordingly

export function Hero() {
  useEffect(() => {
    async function fetchPlayersWithAxios() {
      try {
        // Replace this URL with the actual endpoint for fetching MLB players
        const response = await axios.get(
            "https://statsapi.mlb.com/api/v1/teams?sportId=1"

          );
        // Axios automatically parses JSON; response.data contains the actual data
        //const players = response.data.search_player_all.queryResults.row;

        console.log("MLB Players:", response);
      } catch (error) {
        console.error("Error fetching MLB players with Axios:", error);
      }
    }

    fetchPlayersWithAxios();
  }, []);

  return (
    <div className="bg-[url('/background_baseball.jpeg')] bg-fixed bg-opacity-35 bg-no-repeat bg-cover h-screen w-full">
      <Header />
      <div className="flex justify-center items-center h-full">
        <h1 className="text-white text-4xl font-bold">Welcome to MLB Fan Engagement Hub</h1>
      </div>
    </div>
  );
}
