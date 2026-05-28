import { useState, useRef, useEffect } from "react";
import "./gestioneFlotte.css";

const STATO_OPTIONS = ["Attivo", "In Uso", "Non Disponibile"];

function AutonomiaBadge({ value }) {
  const badgeClass = value >= 80 ? "badge-alta" : value >= 10 ? "badge-media" : "badge-bassa";
  return <span className={`badge-autonomia ${badgeClass}`}>{value}%</span>;
}

function StatoPill({ stato }) {
  const map = {
    Attivo: { className: "pill-attivo", icon: "✓", label: "Attivo" },
    "In Uso": { className: "pill-inuso", icon: "···", label: "In Uso" },
    "Non Disponibile": { className: "pill-nondisp", icon: "✕", label: "Non Disponibile" },
  };
  const { className, icon, label } = map[stato] ?? map["Non Disponibile"];
  return (
    <span className={`stato-pill ${className}`}>
      <span className="stato-pill-icon">{icon}</span>{label}
    </span>
  );
}

function IconButton({ onClick, danger, title, children }) {
  return (
    <button title={title} onClick={onClick} className={`icon-button ${danger ? "icon-button-danger" : ""}`}>
      {children}
    </button>
  );
}

function FilterDropdown({ label, icon, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} className="dropdown-wrapper">
      <button onClick={() => setOpen((o) => !o)} className={`dropdown-trigger ${value ? "dropdown-trigger-active" : ""}`}>
        <span>{icon}</span>{value ?? label}
        <span className="dropdown-arrow">▾</span>
      </button>

      {open && (
        <div className="dropdown-menu">
          {["Tutti", ...options].map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt === "Tutti" ? null : opt); setOpen(false); }}
              className={`dropdown-item ${(value ?? "Tutti") === opt ? "dropdown-item-active" : ""}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function EditRow({ mezzo, onClose }) {
  const [form, setForm] = useState({ ...mezzo });

  useEffect(() => {
    function handleKey(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const field = (label, key, type = "text", opts = null) => (
    <div className="form-group-inline">
      <label className="form-label">{label}</label>
      {opts ? (
        <select
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className="form-input"
        >
          {opts.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={(e) =>
            setForm((f) => ({ ...f, [key]: type === "number" ? Number(e.target.value) : e.target.value }))
          }
          className="form-input"
        />
      )}
    </div>
  );

  return (
    <tr className="edit-row-container">
      <td colSpan={6} className="edit-row-cell">
        <div className="edit-row-grid">
          {field("ID", "id")}
          {field("Modello", "modello", "text", ["Macchina", "Bici", "Moto", "Furgone"])}
          {field("Km", "km")}
          
          <div className="form-group-inline range-container">
            <label className="form-label">Autonomia: <strong>{form.autonomia}%</strong></label>
            <input
              type="range" min={0} max={100} value={form.autonomia}
              onChange={(e) => setForm((f) => ({ ...f, autonomia: Number(e.target.value) }))}
              style={{ width: "100%", accentColor: "#0F6E56" }}
            />
          </div>

          {field("Stato", "stato", "text", STATO_OPTIONS)}

          <div className="edit-row-actions">
            <button onClick={onClose} className="btn-cancel btn-sm">Annulla</button>
            <button onClick={onClose} className="btn-save btn-sm">Salva</button>
          </div>
        </div>
      </td>
    </tr>
  );
}

function TableRow({ mezzo, isLast, isEditing, onEditClick, onCloseEdit, onDelete }) {
  const cellClass = `table-td ${isLast && !isEditing ? "table-td-last" : ""}`;

  return (
    <>
      <tr className={`table-row ${isEditing ? "table-row-editing" : ""}`}>
        <td className={`${cellClass} td-id`}>{mezzo.id}</td>
        <td className={`${cellClass} td-modello`}>{mezzo.modello}</td>
        <td className={`${cellClass} td-km`}>{mezzo.km}</td>
        <td className={cellClass}><AutonomiaBadge value={mezzo.autonomia} /></td>
        <td className={cellClass}><StatoPill stato={mezzo.stato} /></td>
        <td className={cellClass}>
          <div style={{ display: "flex", gap: 6 }}>
            <IconButton 
              title={isEditing ? "Chiudi" : "Modifica"} 
              onClick={() => isEditing ? onCloseEdit() : onEditClick(mezzo)}
            >
              {isEditing ? "✕" : "✏️"}
            </IconButton>
            <IconButton title="Elimina" danger onClick={() => onDelete?.(mezzo)}>🗑</IconButton>
          </div>
        </td>
      </tr>

      {isEditing && (
        <EditRow mezzo={mezzo} onClose={onCloseEdit} />
      )}
    </>
  );
}

export default function ElencoMezzi({
  data = DEFAULT_DATA,
  onDelete,
  title = "Elenco mezzi",
}) {
  const [filterModello, setFilterModello] = useState(null);
  const [filterAutonomia, setFilterAutonomia] = useState(null);
  const [filterStato, setFilterStato] = useState(null);
  const [editingMezzoId, setEditingMezzoId] = useState(null); 

  const modelOptions = [...new Set(data.map((d) => d.modello))];
  const statoOptions = [...new Set(data.map((d) => d.stato))];
  const autonomiaOptions = ["Alta (≥80%)", "Media (10–79%)", "Bassa (<10%)"];

  const filtered = data.filter((r) => {
    if (filterModello && r.modello !== filterModello) return false;
    if (filterStato && r.stato !== filterStato) return false;
    if (filterAutonomia) {
      if (filterAutonomia.startsWith("Alta") && r.autonomia < 80) return false;
      if (filterAutonomia.startsWith("Media") && (r.autonomia < 10 || r.autonomia >= 80)) return false;
      if (filterAutonomia.startsWith("Bassa") && r.autonomia >= 10) return false;
    }
    return true;
  });

  return (
    <div className="flotte-container">
      <div className="flotte-header">
        <h2 className="flotte-title">{title}</h2>
        <div className="filter-group">
          <span className="filter-label">Filtra per:</span>
          <FilterDropdown label="Modello" icon="🚗" options={modelOptions} value={filterModello} onChange={setFilterModello} />
          <FilterDropdown label="Autonomia" icon="⚡" options={autonomiaOptions} value={filterAutonomia} onChange={setFilterAutonomia} />
          <FilterDropdown label="Stato" icon="🔄" options={statoOptions} value={filterStato} onChange={setFilterStato} />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="flotte-table">
          <colgroup>
            <col style={{ width: "15%" }} /><col style={{ width: "18%" }} />
            <col style={{ width: "12%" }} /><col style={{ width: "15%" }} />
            <col style={{ width: "28%" }} /><col style={{ width: "12%" }} />
          </colgroup>
          <thead>
            <tr style={{ background: "var(--header-bg)" }}>
              {["ID", "Modello", "Km", "Autonomia", "Stato", "Edit"].map((h) => (
                <th key={h} className="table-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="table-empty">Nessun mezzo trovato</td>
              </tr>
            ) : (
              filtered.map((mezzo, i) => (
                <TableRow
                  key={`${mezzo.id}-${i}`}
                  mezzo={mezzo}
                  isLast={i === filtered.length - 1}
                  isEditing={editingMezzoId === mezzo.id}
                  onEditClick={(m) => setEditingMezzoId(m.id)}
                  onCloseEdit={() => setEditingMezzoId(null)}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="table-counter">{filtered.length} di {data.length} mezzi</p>
    </div>
  );
}

const DEFAULT_DATA = [
  { id: "M-1A23BF", modello: "Macchina", km: "250km", autonomia: 100, stato: "Attivo" },
  { id: "M-2B45GF", modello: "Macchina", km: "50km",  autonomia: 5,   stato: "In Uso" },
  { id: "B-6B54DR", modello: "Bici",     km: "50km",  autonomia: 90,  stato: "In Uso" },
  { id: "M-8B33GS", modello: "Macchina", km: "150km", autonomia: 80,  stato: "Attivo" },
  { id: "B-6B54DR", modello: "Bici",     km: "15km",  autonomia: 0,   stato: "Non Disponibile" },
  { id: "B-4V67QW", modello: "Bici",     km: "30km",  autonomia: 95,  stato: "In Uso" },
  { id: "M-2B54JK", modello: "Macchina", km: "125km", autonomia: 100, stato: "Attivo" },
  { id: "B-3B22GH", modello: "Bici",     km: "25km",  autonomia: 7,   stato: "Non Disponibile" },
];