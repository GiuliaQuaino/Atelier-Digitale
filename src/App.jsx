import './App.css'
// import Sidebar from './components/sidebar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { AuthProvider} from './context/AuthContext';
import Login from './pages/Login';
// import { useState } from "react";
import Layout from './components/Layout';
import Dashboard from './pages/dashboard';
import Mappa from './pages/mappa';
import Flotta from './pages/flotta';
import Statistiche from './pages/statistiche';
import Manutenzione from './pages/manutenzione';
import Segnalazioni from './pages/segnalazioni';
import GestioneUtenti from './pages/gestione-utenti';



export default function App() {
  return (
    <AuthProvider>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>
            <Route path="/dashboard"       element={<Dashboard />} />
            <Route path="/mappa"           element={<Mappa />} />
            <Route path="/flotta"          element={<Flotta />} />
            <Route path="/statistiche"     element={<Statistiche />} />
            <Route path="/manutenzione"    element={<Manutenzione />} />
            <Route path="/segnalazioni"    element={<Segnalazioni />} />
            <Route path="/gestione-utenti" element={<GestioneUtenti />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}