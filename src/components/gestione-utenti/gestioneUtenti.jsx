import { useState } from "react";
import "./gestioneUtenti.css";

const INITIAL_USERS = [
  { id: "A-23PFG", nome: "Mario Rossi",        ruolo: "Amministratore", stato: "Attivo" },
  { id: "T-56GEW", nome: "Alessandro Bianchi",  ruolo: "Tecnico",        stato: "Attivo" },
  { id: "S-9BILG", nome: "Elena Greco",         ruolo: "Supporto",       stato: "Disattivato" },
  { id: "S-23ASD", nome: "Chiara Gallo",        ruolo: "Supporto",       stato: "Attivo" },
];

export default function Gestioneutenti() {
  const [users] = useState(INITIAL_USERS);

  return (
    <div className="gu-page">
      <h1 className="gu-heading">Gestione Utenti</h1>

      <div className="gu-card">
        <table className="gu-table">
          <thead>
            <tr>
              <th>Utente</th>
              <th>ID</th>
              <th>Ruolo</th>
              <th>Stato</th>
              <th>Modifica</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="gu-row">
                <td className="gu-nome">{u.nome}</td>
                <td className="gu-id">{u.id}</td>
                <td>{u.ruolo}</td>
                <td>
                  <span className={`gu-badge ${u.stato === "Attivo" ? "attivo" : "disattivato"}`}>
                    {u.stato}
                  </span>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}