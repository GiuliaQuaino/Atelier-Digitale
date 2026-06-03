import { useState, Fragment } from 'react';
import './manutenzioni.css';
 
//dati harcoded
const initialData = [
  { id: 1, idVeicolo: 'M-1A23BF', modello: 'Macchina', tipo: 'ordinario', categoria: 'Pulizia', tecnico: 'Marco Rossi', stato: 'completato', data: '20/04/2026', note: 'Pulizia interna ed esterna completata.' },
  { id: 2, idVeicolo: 'B-1A23BF', modello: 'Bici', tipo: 'straordinario', categoria: 'Ruota danneggiata', tecnico: 'Laura Bianchi', stato: 'corso', data: '25/04/2026', note: "Sostituzione camera d'aria ruota anteriore." },
  { id: 3, idVeicolo: 'M-2B34CD', modello: 'Macchina', tipo: 'ordinario', categoria: 'Ricarica', tecnico: 'Marco Rossi', stato: 'attesa', data: '27/04/2026', note: 'Batteria al 12%, ricarica programmata.' },
  { id: 4, idVeicolo: 'S-3C45DE', modello: 'Bici', tipo: 'straordinario', categoria: 'Batteria rotta', tecnico: 'Giovanni Verdi', stato: 'attesa', data: '28/04/2026', note: 'Bici non si accende, probabile guasto alla batteria.' },
  { id: 5, idVeicolo: 'B-2B34CD', modello: 'Bici', tipo: 'ordinario', categoria: 'Controllo freni', tecnico: 'Laura Bianchi', stato: 'completato', data: '01/05/2026', note: 'Freni regolati e testati.' },
  { id: 6, idVeicolo: 'M-3C45DE', modello: 'Macchina', tipo: 'straordinario', categoria: 'Guasto motore', tecnico: 'Marco Rossi', stato: 'corso', data: '02/05/2026', note: 'Spia motore accesa, veicolo in officina.' },
];
 
const STATI = ['attesa', 'corso', 'completato'];
const STATI_LABEL = { attesa: 'In attesa', corso: 'In corso', completato: 'Completato' };
 
function BadgeTipo({ tipo }) {
  return (
    <span className={`badge-tipo badge-${tipo}`}>
      {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
    </span>
  );
}
 
function BadgeStato({ stato }) {
  return (
    <span className={`badge-stato badge-${stato}`}>
      {STATI_LABEL[stato]}
    </span>
  );
}
 
function ModalGuasto({ onClose, onSave }) {
  const [form, setForm] = useState({
    idVeicolo: '',
    modello: 'Macchina',
    manutentore: '',
    categoria: '',
    note: '',
  });
 
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
 
  const handleSubmit = () => {
    if (!form.idVeicolo || !form.categoria || !form.manutentore) return;
    onSave(form);
  };
 
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Segnala guasto</span>
          <button className="modal-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="16" y2="16" /><line x1="16" y1="2" x2="2" y2="16" />
            </svg>
          </button>
        </div>
 
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">ID Veicolo</label>
            <input className="form-input" placeholder="es. M-1A23BF" value={form.idVeicolo} onChange={(e) => set('idVeicolo', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Modello</label>
            <select className="form-select" value={form.modello} onChange={(e) => set('modello', e.target.value)}>
              <option>Macchina</option>
              <option>Bici</option>
            </select>
          </div>
        </div>

            <div className="form-group">
    <label className="form-label">Assegna a manutentore</label>
    <select
        className="form-select"
        value={form.manutentore}
        onChange={(e) => set('manutentore', e.target.value)}>
        <option value="">— Seleziona —</option>
        <option>Marco Rossi</option>
        <option>Laura Bianchi</option>
        <option>Giovanni Verdi</option>
    </select>
    </div>
 
        <div className="form-group">
          <label className="form-label">Categoria guasto</label>
          <select className="form-select" value={form.categoria} onChange={(e) => set('categoria', e.target.value)}>
            <option value="">— Seleziona —</option>
            <option>Batteria rotta</option>
            <option>Ruota danneggiata</option>
            <option>Guasto motore</option>
            <option>Freni non funzionanti</option>
            <option>Carrozzeria danneggiata</option>
            <option>Altro</option>
          </select>
        </div>
 
        <div className="form-group">
          <label className="form-label">Nota</label>
          <textarea className="form-textarea" placeholder="Descrivi brevemente il guasto..." value={form.note} onChange={(e) => set('note', e.target.value)} />
        </div>
 
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Annulla</button>
          <button className="btn-submit-red" onClick={handleSubmit}>Invia segnalazione</button>
        </div>
      </div>
    </div>
  );
}

function ModalTask({ onClose }) {
  const [form, setForm] = useState({
    idVeicolo: '',
    modello: 'Macchina',
    manutentore: '',
    scadenza: '',
    nota: '',
  });
 
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
 
  return (
    <div className="modal-overlay" onClick={() => onClose(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Crea task</span>
          <button className="modal-close" onClick={() => onClose(false)}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="16" y2="16" /><line x1="16" y1="2" x2="2" y2="16" />
            </svg>
          </button>
        </div>
 
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">ID Veicolo</label>
            <input className="form-input" placeholder="es. M-1A23BF" value={form.idVeicolo} onChange={(e) => set('idVeicolo', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Modello</label>
            <select className="form-select" value={form.modello} onChange={(e) => set('modello', e.target.value)}>
              <option>Macchina</option>
              <option>Bici</option>
            </select>
          </div>
        </div>
 
        <div className="form-group">
          <label className="form-label">Assegna a manutentore</label>
          <select className="form-select" value={form.manutentore} onChange={(e) => set('manutentore', e.target.value)}>
            <option value="">— Seleziona —</option>
            <option>Marco Rossi</option>
            <option>Laura Bianchi</option>
            <option>Giovanni Verdi</option>
          </select>
        </div>
 
        <div className="form-group">
          <label className="form-label">Scadenza</label>
          <input className="form-input" type="date" value={form.scadenza} onChange={(e) => set('scadenza', e.target.value)} />
        </div>
 
        <div className="form-group">
          <label className="form-label">Note per il manutentore</label>
          <textarea className="form-textarea" placeholder="Istruzioni aggiuntive..." value={form.nota} onChange={(e) => set('nota', e.target.value)} />
        </div>
 
        <div className="modal-footer">
         <button className="btn-cancel" onClick={() => onClose(null)}>Annulla</button>
          <button className="btn-submit"onClick={() => onClose(form)}>Crea task</button>
        </div>
      </div>
    </div>
  );
}
 
export default function Manutenzione() {
  const [interventi, setInterventi] = useState(initialData);
  const [selectedId, setSelectedId] = useState(null);
  const [taskTarget, setTaskTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [showGuasto, setShowGuasto] = useState(false);
 
  const [filtroStato, setFiltroStato] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroModello, setFiltroModello] = useState('');
  const [filtroTecnico, setFiltroTecnico] = useState('');
 
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };
 
  const handleRowClick = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };
 
  const handleStatoChange = (e, id) => {
    e.stopPropagation();
    const nuovoStato = e.target.value;
    setInterventi((prev) =>
      prev.map((i) => (i.id === id ? { ...i, stato: nuovoStato } : i))
    );
  };
 
   const handleSaveGuasto = (form) => {
    const now = new Date();
    const data = now.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const newId = interventi.length + 1;
    setInterventi((prev) => [
      ...prev,
      { ...form, id: newId, tipo: 'straordinario', tecnico: form.manutentore, stato: 'attesa', data },
    ]);
    setShowGuasto(false);
    showToast('Guasto segnalato ✓');
  };
 
const handleTaskClose = (task) => {
  setTaskTarget(null);

  if (!task) return;

  const nuovoIntervento = {
    id: Date.now(),
    idVeicolo: task.idVeicolo,
    modello: task.modello,
    tipo: 'ordinario', 
    categoria: 'Task programmato',
    tecnico: task.manutentore,
    stato: 'attesa',
    data: task.scadenza
      ? new Date(task.scadenza).toLocaleDateString('it-IT')
      : new Date().toLocaleDateString('it-IT'),
    note: task.nota,
  };

  setInterventi((prev) => [...prev, nuovoIntervento]);

  showToast('Task creato con successo ✓');
};
 
  const filtrati = interventi.filter((i) => {
    if (filtroStato && i.stato !== filtroStato) return false;
    if (filtroTipo && i.tipo !== filtroTipo) return false;
    if (filtroModello && i.modello !== filtroModello) return false;
    if (filtroTecnico && i.tecnico !== filtroTecnico) return false;
    return true;
  });
 
  const resetFiltri = () => {
    setFiltroStato('');
    setFiltroTipo('');
    setFiltroModello('');
    setFiltroTecnico('');
  };
 
  return (
    <div className="manutenzione-container">
 
      <div className="manutenzione-header">
        <h1 className="manutenzione-title">Manutenzione</h1>
       <button className="btn-task" onClick={() => setTaskTarget({})}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="8" y1="2" x2="8" y2="14" /><line x1="2" y1="8" x2="14" y2="8" />
            </svg>
            Crea task
          </button>
    
      </div>
 
      <div className="manutenzione-filtri">
        <select className="filtro-select" value={filtroStato} onChange={(e) => setFiltroStato(e.target.value)}>
          <option value="">Tutti gli stati</option>
          <option value="attesa">In attesa</option>
          <option value="corso">In corso</option>
          <option value="completato">Completato</option>
        </select>
 
        <select className="filtro-select" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
          <option value="">Tutti i tipi</option>
          <option value="ordinario">Ordinario</option>
          <option value="straordinario">Straordinario</option>
        </select>
 
        <select className="filtro-select" value={filtroModello} onChange={(e) => setFiltroModello(e.target.value)}>
          <option value="">Tutti i modelli</option>
          <option>Macchina</option>
          <option>Bici</option>
        </select>

        <select className="filtro-select" value={filtroTecnico} onChange={(e) => setFiltroTecnico(e.target.value)}>
         <option value="">Tutti i tecnici</option>
         <option>Marco Rossi</option>
         <option>Laura Bianchi</option>
         <option>Giovanni Verdi</option>
        </select>
 
        {(filtroStato || filtroTipo || filtroModello || filtroTecnico) && (
          <button className="filtro-reset" onClick={resetFiltri}>Azzera filtri</button>
        )}
      </div>
 
      <div className="manutenzione-table-wrapper">
        <table className="manutenzione-table">
          <thead>
            <tr>
              <th>ID Veicolo</th>
              <th>Modello</th>
              <th>Tipo</th>
              <th>Categoria</th>
              <th>Tecnico</th>
              <th>Stato</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {filtrati.map((i) => (
              <Fragment key={i.id}>
                <tr
                  className={selectedId === i.id ? 'selected' : ''}
                  onClick={() => handleRowClick(i.id)}
                >
                  <td>{i.idVeicolo}</td>
                  <td>{i.modello}</td>
                  <td><BadgeTipo tipo={i.tipo} /></td>
                  <td>{i.categoria}</td>
                  <td>{i.tecnico}</td>
                  <td><BadgeStato stato={i.stato} /></td>
                  <td>{i.data}</td>
                </tr>
 
                {selectedId === i.id && (
                  <tr key={`detail-${i.id}`}>
                    <td colSpan={7} style={{ padding: 0 }}>
                      <div className="manutenzione-detail">
                        <span className="manutenzione-detail-label">Note:</span>
                        <p>{i.note || '—'}</p>
                        <div className="detail-actions">
                          <select
                            className="stato-select-inline"
                            value={i.stato}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => handleStatoChange(e, i.id)}
                          >
                            {STATI.map((s) => (
                              <option key={s} value={s}>{STATI_LABEL[s]}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
 
            {filtrati.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: '#8aaa8a' }}>
                  Nessun intervento trovato
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
 
 
   <button className="fab-guasto" onClick={() => setShowGuasto(true)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        Segnala guasto
      </button>
 
      {showGuasto && (
        <ModalGuasto onClose={() => setShowGuasto(false)} onSave={handleSaveGuasto} />
      )}

      {taskTarget && (
        <ModalTask intervento={taskTarget} onClose={handleTaskClose} />
      )}
 
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}