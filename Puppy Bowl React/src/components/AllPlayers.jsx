import { useState, useEffect } from "react";
import { fetchAllPlayers } from "../api";
import { Link } from "react-router-dom";
import "../index.css";
import NewPlayerForm from "./NewPlayerForm";

export default function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  //   console.log(searchParam);

  useEffect(() => {
    async function getAllPlayers() {
      const APIResponse = await fetchAllPlayers();
      //   console.log(APIResponse.data.players);
      if (APIResponse.success) {
        setPlayers(APIResponse.data.players);
      } else {
        setError(APIResponse.error.message);
      }
    }
    getAllPlayers();
  }, []);

  // Filtering based on search
  const playersToDisplay = searchParam
    ? players.filter((p) => p.name.toLowerCase().includes(searchParam))
    : players;

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <>
      <div className="container">
        <h1>Puppy Bowl React</h1>

        {/* Add a link to navigate home */}
        <Link to="/">Home</Link>
      </div>

        <br />
        
      {/* Added a search bar */}
      <div>
        <label>
          Search:{" "}
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          ></input>
        </label>
      </div>

      {/* Added a create new player form */}
      <NewPlayerForm />

      {/* Render filtered list of players */}
      <div>
        {playersToDisplay.length > 0 ? (
          playersToDisplay.map((player) => (
            <div className="player-card" key={player.id}>
              <h4>{player.name}</h4>
              <Link to={`/players/${player.id}`}>
                <button>See Player Details</button>
              </Link>
            </div>
          ))
        ) : (
          <div className="loading">No players found</div>
        )}
      </div>
    </>
  );
}
