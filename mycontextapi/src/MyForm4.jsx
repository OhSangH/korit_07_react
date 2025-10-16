import { useState } from "react";

function MyForm4() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    alert(`First Name : ${firstName}, Last Name : ${lastName} , Email : ${email}`);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>First Name : </label>
      <input type="text" onChange={(event) => setFirstName(event.target.value)} />
      <br />
      <label>Last Name : </label>
      <input type="text" onChange={(event) => setLastName(event.target.value)} />
      <br />
      <label>Email : </label>
      <input type="email" onChange={(event) => setEmail(event.target.value)} />
      <br />
      <input type="submit" value="제출" />
    </form>
  );
}

export default MyForm4;
