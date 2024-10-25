//fetch data from puppy bowl API using docs
export async function fetchAllPlayers() {

  const cohortName = "2407-FTB-ET-WEB-PT";
  const baseUrl = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

  try {
    const response = await fetch(baseUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

//fetch for single player by id
export async function fetchSinglePlayer(id) {
    const cohortName = "2407-FTB-ET-WEB-PT";
    const baseUrl = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/${id}`;
  
    try {
      const response = await fetch(baseUrl);
      const result = await response.json();
      return result; // Return the player data
    } catch (error) {
      console.error(error);
    }
  }
  