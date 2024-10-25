import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // To extract the player id from the URL
import { fetchSinglePlayer } from "../api"; // Assuming you have a function to fetch a single player's details

export default function SinglePlayer() {
  const { id } = useParams(); // Get the player id from the URL
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPlayerDetails() {
      try {
        const response = await fetchSinglePlayer(id); // Fetch player details using the id
        if (response.success) {
          setPlayer(response.data.player); // Set the player details in state
        } else {
          setError(response.error.message); // Handle error
        }
      } catch (err) {
        setError(err.message); // Handle any fetch error
      }
    }
    getPlayerDetails();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!player) {
    return <div>Loading...</div>;
  }

  // Function for when clicking on the delete button
  async function handleDelete(e) {
    e.preventDefault(); // Prevent form refresh

    // Send a DELETE request to API to remove the player
    try {
      const result = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-PT/players/${id}`,
        { method: "DELETE" }
      );

      // Remove the deleted player from the list
      //   e.target.parentElement.remove();
      //   Ran into issues with manipulating DOM directly
      if (result.ok) {
        // cause React to re-render by changing state
        setPlayer(null);
        // redirect back to home after deleting
        navigate("/");
        console.log(`Successfully deleted player: ${player.name}`)
      } else {
        console.error("Failed to delete player");
      }
    } catch (err) {
      console.log("ERROR!!", err);
    }
  }

  return (
    <>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {/* Render other player details here */}
        <img className="photo" src={player.imageUrl} alt={`${player.name}`} />
        <h2>{player.name}</h2>
        <p>Breed: {player.breed}</p>
        <p>Status: {player.status}</p>
        <button onClick={handleDelete} type="submit">
          Delete Current Player
        </button>
      </div>
    </>
  );
}
