import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
