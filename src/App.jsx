
import './App.css'
import Sidebar from './components/sidebar';
/*import { useState } from "react";
import { AuthProvider } from "./AuthContext";
import LoginPage from "./LoginPage";*/

function App() {
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';

export default function App() {
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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
