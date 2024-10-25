import { useState } from "react";

export default function NewPlayerForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form refresh

    const newPlayer = { name, breed }; // Data from the form

    try {
      // fetch API for players to create new player
      const response = await fetch(
        "https:fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-PT/players",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPlayer),
        }
      );
      // parse into js object
      const result = await response.json();

      if (result.success) {
        // display that new player was successfully added
        console.log("New player added: ", result);

        // Reset form after submitting
        setName("");
        setBreed("");

      } else {
        console.error("Failed to create new player");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        placeholder="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)} // Update state on change
        required
      />

      <br />

      <label htmlFor="breed">Breed: </label>
      <input
        type="text"
        placeholder="breed"
        id="breed"
        value={breed}
        onChange={(e) => setBreed(e.target.value)} // Update state on change
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
}
