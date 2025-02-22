import "./App.css";
import { UsersContextProvider } from "./context/createContext";
import Users from "./components/Users";

function App() {
  return (
    <UsersContextProvider>
      <div className="wrapper">
        <Users />
      </div>
    </UsersContextProvider>
  );
}

export default App;
