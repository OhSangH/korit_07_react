import { useState } from "react";

function MyForm3() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = (event) => {
    alert(`Hello, ${user.firstName} ${user.lastName}`);
    event.preventDefault();
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" name="firstName" onChange={handleChange} value={user.firstName} />
        <br />
        <input type="text" name="lastName" onChange={handleChange} value={user.lastName} />
        <br />
        <input type="text" name="email" onChange={handleChange} value={user.email} />
        <br />
        <input type="submit" value="제출" />
      </label>
    </form>
  );
}

export default MyForm3;
