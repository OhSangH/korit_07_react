import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App2() {
  const [count, setCount] = useState(98);
  // count = 1;  -> 상수이기 때문에 오류 발생
  const [firstName, setFirstName] = useState("일");
  const [lasstName, setLastName] = useState("김");
  // setFirstName("이");
  // setLastName("강");

  return (
    <>
      <p>
        {firstName} {lasstName}
      </p>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React수업을 시작합니다.</h1>
      <div className="card">
        <button
          onClick={() =>
            setCount((count) => (count >= 100 ? (count = 0) : count + 1))
          }
        >
          count is {count}
        </button>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App2;
