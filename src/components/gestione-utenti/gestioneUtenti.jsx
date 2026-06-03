import { useState } from "react";
import "./gestioneUtenti.css";

const INITIAL_USERS = [
  { id: "A-23PFG", nome: "Mario Rossi",        ruolo: "Amministratore", stato: "Attivo" },
  { id: "T-56GEW", nome: "Alessandro Bianchi",  ruolo: "Tecnico",        stato: "Attivo" },
  { id: "S-9BILG", nome: "Elena Greco",         ruolo: "Supporto",       stato: "Disattivato" },
  { id: "S-23ASD", nome: "Chiara Gallo",        ruolo: "Supporto",       stato: "Attivo" },
];

const RUOLI = ["Amministratore", "Tecnico", "Supporto"];
const STATI = ["Attivo", "Disattivato"];

export default function Gestioneutenti() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft]         = useState({});

  const startEdit  = (u) => { setEditingId(u.id); setDraft({ ...u }); };
  const saveEdit   = () => { setUsers(users.map((u) => (u.id === editingId ? draft : u))); setEditingId(null); };
  const cancelEdit = () => setEditingId(null);

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
                <>
              <tr key={u.id} className="gu-row">
                <td className="gu-nome">{u.nome}</td>
                <td className="gu-id">{u.id}</td>
                <td>{u.ruolo}</td>
                <td>
                  <span className={`gu-badge ${u.stato === "Attivo" ? "attivo" : "disattivato"}`}>
                    {u.stato}
                  </span>
                </td>
                <td className="gu-action">
                    <button className="gu-icon-btn" title="Modifica" onClick={() => editingId === u.id ? cancelEdit() : startEdit(u)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                        <path d="m15 5 4 4"/>
                      </svg>
                    </button>
                </td>
              </tr>
 {editingId === u.id && (
                  <tr key={`${u.id}-edit`} className="gu-row-editing">
                    <td>
                      <input className="gu-input" value={draft.nome}
                        onChange={(e) => setDraft({ ...draft, nome: e.target.value })} />
                    </td>
                    <td>
                      <input className="gu-input" value={draft.id}
                        onChange={(e) => setDraft({ ...draft, id: e.target.value })} />
                    </td>
                    <td>
                      <select className="gu-select" value={draft.ruolo}
                        onChange={(e) => setDraft({ ...draft, ruolo: e.target.value })}>
                        {RUOLI.map((r) => <option key={r} style={{ background: "#fff", color: "#222" }}>{r}</option>)}
                      </select>
                    </td>
                    <td>
                      <select className={`gu-select gu-stato-select ${draft.stato === "Attivo" ? "attivo" : "disattivato"}`}
                        value={draft.stato} onChange={(e) => setDraft({ ...draft, stato: e.target.value })}>
                        {STATI.map((s) => <option key={s} style={{ background: "#fff", color: "#222" }}>{s}</option>)}
                      </select>
                    </td>
                    <td className="gu-actions">
                      <button className="gu-btn-save" onClick={saveEdit}>Salva</button>
                      <button className="gu-btn-cancel" onClick={cancelEdit}>✕</button>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}