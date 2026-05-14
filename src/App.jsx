
import './App.css'
import Sidebar from './components/sidebar';
/*import { useState } from "react";
import { AuthProvider } from "./AuthContext";
import LoginPage from "./LoginPage";*/

function App() {

  return (
    <div>
      <Sidebar></Sidebar>
      Primi commit
    </div>
  );
}

export default App


/*
function App() {
  const [loggato, setLoggato] = useState(false);

  return (
    <AuthProvider>
      {loggato
        ? <Sidebar />
        : <LoginPage onLogin={() => setLoggato(true)} />
      }
    </AuthProvider>
  );
}

export default App

*/