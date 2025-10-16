import "./App.css";
import AuthContext from "./AuthContext";
import MyComponent from "./MyComponent";
import MyTable from "./MyTable";
import MyComponent2 from "./MyComponent2";
import MyForm from "./MyForm";

function App2() {
  const username = "김일";

  return (
    <AuthContext.Provider value={username}>
      <MyForm />
      <MyComponent />
      <MyTable />
      <MyComponent2 />
    </AuthContext.Provider>
  );
}

export default App2;
