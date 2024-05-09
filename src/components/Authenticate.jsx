import { useState } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('')

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log('This is data for API', data)
      setSuccessMessage(data.message);
      console.log("Username set to:", data.data.username)
      setUsername(data.data.username);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <h2>Authenticate!</h2>
      {successMessage && username && <p>{successMessage} User: {username}</p>}
      {username}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  );
}
