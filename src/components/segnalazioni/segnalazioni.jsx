import { useState, Fragment } from 'react';
import './segnalazioni.css';

//dati harcoded
const segnalazioniData = [
  {
    id: 1,
    numero: '#003',
    idVeicolo: 'M-1A23BF',
    modello: 'Macchina',
    localizzazione: 'Via Roma, 2',
    urgenza: 'bassa',
    stato: 'completato',
    data: '27/04/2026',
    utente: 'Alex Noman',
    telefono: '+39 345 123 4567',
    descrizione: "L'auto del servizio di car sharing non si avvia / ha smesso di funzionare durante l'utilizzo. Richiedo assistenza urgente.",
  },
  {
    id: 2,
    numero: '#002',
    idVeicolo: 'B-1A23BF',
    modello: 'Bici',
    localizzazione: 'Via Mercato, 15',
    urgenza: 'media',
    stato: 'completato',
    data: '29/06/2026',
    utente: 'Alex Noman',
    telefono: '+39 345 123 4567',
    descrizione: 'La bici ha la ruota anteriore sgonfia e il freno posteriore non risponde correttamente.',
  },
  {
    id: 3,
    numero: '#001',
    idVeicolo: 'M-1A23BF',
    modello: 'Macchina',
    localizzazione: 'Via Roma, 2',
    urgenza: 'alta',
    stato: 'pendente',
    data: '27/04/2026',
    utente: 'Alex Noman',
    telefono: '+39 345 123 4567',
    descrizione: 'Segnalazione di danno alla carrozzeria sul lato sinistro del veicolo. Necessario intervento tecnico.',
  },
  {
    id: 4,
    numero: '#003',
    idVeicolo: 'M-1A23BF',
    modello: 'Macchina',
    localizzazione: 'Via Roma, 2',
    urgenza: 'bassa',
    stato: 'completato',
    data: '27/04/2026',
    utente: 'Alex Noman',
    telefono: '+39 345 123 4567',
    descrizione: 'Piccolo problema alla chiusura del bagagliaio. Il meccanismo non scatta correttamente.',
  },
  {
    id: 5,
    numero: '#002',
    idVeicolo: 'B-1A23BF',
    modello: 'Bici',
    localizzazione: 'Via Mercato, 15',
    urgenza: 'media',
    stato: 'completato',
    data: '29/06/2026',
    utente: 'Alex Noman',
    telefono: '+39 345 123 4567',
    descrizione: 'Catena della bici fuori sede, impossibile pedalare. Richiesta assistenza immediata.',
  },
  {
    id: 6,
    numero: '#001',
    idVeicolo: 'M-1A23BF',
    modello: 'Macchina',
    localizzazione: 'Via Roma, 2',
    urgenza: 'alta',
    stato: 'pendente',
    data: '27/04/2026',
    utente: 'Alex Noman',
    telefono: '+39 345 123 4567',
    descrizione: 'Guasto al sistema di climatizzazione. Aria condizionata non funzionante durante temperatura elevata.',
  },
];
 
function UrgenzaBadge({ urgenza }) {
  return (
    <span className={`badge badge-${urgenza}`}>
      {urgenza.charAt(0).toUpperCase() + urgenza.slice(1)}
    </span>
  );
}
 
function StatoIcon({ stato, onToggle }) {
  if (stato === 'completato') {
    return (
      <span className="stato-icon completato" onClick={onToggle} title="Segna come pendente">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="11" fill="#1a3d2b" />
          <path d="M6.5 11.5l3 3 6-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className="stato-icon pendente" onClick={onToggle} title="Segna come completato">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="10" stroke="#ccc" strokeWidth="2" />
      </svg>
    </span>
  );
}

function ModalAggiungi({ onClose, onSave }) {
  const [form, setForm] = useState({
    idVeicolo: '',
    modello: 'Macchina',
    localizzazione: '',
    urgenza: 'bassa',
    descrizione: '',
    utente: '',
  });
 
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
 
  const handleSubmit = () => {
    if (!form.idVeicolo || !form.localizzazione || !form.utente) return;
    onSave(form);
  };
 
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Nuova segnalazione</span>
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
              <option>Monopattino</option>
            </select>
          </div>
        </div>
 
        <div className="form-group">
          <label className="form-label">Localizzazione</label>
          <input className="form-input" placeholder="es. Via Roma, 2" value={form.localizzazione} onChange={(e) => set('localizzazione', e.target.value)} />
        </div>
 
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Urgenza</label>
            <select className="form-select" value={form.urgenza} onChange={(e) => set('urgenza', e.target.value)}>
              <option value="bassa">Bassa</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Utente</label>
            <input className="form-input" placeholder="Nome Cognome" value={form.utente} onChange={(e) => set('utente', e.target.value)} />
          </div>
        </div>
 
        <div className="form-group">
          <label className="form-label">Descrizione</label>
          <textarea className="form-textarea" placeholder="Descrivi il problema..." value={form.descrizione} onChange={(e) => set('descrizione', e.target.value)} />
        </div>
 
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Annulla</button>
          <button className="btn-submit" onClick={handleSubmit}>Aggiungi</button>
        </div>
      </div>
    </div>
  );
}

function ModalTask({ segnalazione, onClose }) {
  const [form, setForm] = useState({
    manutentore: '',
    priorita: segnalazione.urgenza,
    nota: '',
    scadenza: '',
  });
 
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
 
  const handleSubmit = () => {
    onClose(true); 
  };
 
  return (
    <div className="modal-overlay" onClick={() => onClose(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Crea task — {segnalazione.numero}</span>
          <button className="modal-close" onClick={() => onClose(false)}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="16" y2="16" /><line x1="16" y1="2" x2="2" y2="16" />
            </svg>
          </button>
        </div>
 
        <div className="form-group">
          <label className="form-label">Veicolo</label>
          <input className="form-input" value={`${segnalazione.idVeicolo} — ${segnalazione.modello} — ${segnalazione.localizzazione}`} readOnly style={{ opacity: 0.6 }} />
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
 
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Priorità</label>
            <select className="form-select" value={form.priorita} onChange={(e) => set('priorita', e.target.value)}>
              <option value="bassa">Bassa</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Scadenza</label>
            <input className="form-input" type="date" value={form.scadenza} onChange={(e) => set('scadenza', e.target.value)} />
          </div>
        </div>
 
        <div className="form-group">
          <label className="form-label">Note per il manutentore</label>
          <textarea className="form-textarea" placeholder="Istruzioni aggiuntive..." value={form.nota} onChange={(e) => set('nota', e.target.value)} />
        </div>
 
        <div className="modal-footer">
          <button className="btn-cancel" onClick={() => onClose(false)}>Annulla</button>
          <button className="btn-submit" onClick={handleSubmit}>Invia task</button>
        </div>
      </div>
    </div>
  );
}
 
function ChiamataPopup({ telefono }) {
  return (
    <div className="chiamata-popup">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
      Chiamata a <span className="chiamata-number">{telefono}</span>
    </div>
  );
}
 
export default function Segnalazioni() {
  const [segnalazioni, setSegnalazioni] = useState(segnalazioniData);
  const [selectedId, setSelectedId] = useState(6);
  const [showAggiungi, setShowAggiungi] = useState(false);
    const [taskTarget, setTaskTarget] = useState(null);     
  const [chiamataInfo, setChiamataInfo] = useState(null);  
  const [toast, setToast] = useState(null);
 
  const handleRowClick = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };
 
  const toggleStato = (e, id) => {
    e.stopPropagation();
    setSegnalazioni((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, stato: s.stato === 'completato' ? 'pendente' : 'completato' }
          : s
      )
    );
  };

  const showToast = (msg) => {
  setToast(msg);
  setTimeout(() => setToast(null), 2600);
};

const handleSaveSegnalazione = (form) => {
  const now = new Date();
  const data = now.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const newId = segnalazioni.length + 1;
  const newNum = `#${String(newId).padStart(3, '0')}`;
  setSegnalazioni((prev) => [
    ...prev,
    { ...form, id: newId, numero: newNum, stato: 'pendente', data, telefono: '+39 000 000 0000', descrizione: form.descrizione || '—' },
  ]);
  setShowAggiungi(false);
  showToast('Segnalazione aggiunta ✓');
};

const handleChiama = (e, s) => {
  e.stopPropagation();
  setChiamataInfo(s.telefono);
  setTimeout(() => setChiamataInfo(null), 3600);
};

const handleTaskClose = (invia) => {
  setTaskTarget(null);
  if (invia) showToast('Task inviato al manutentore ✓');
};
 
  return (
    <div className="segnalazioni-container">
      <div className="segnalazioni-header">
        <h1 className="segnalazioni-title">Segnalazioni</h1>
        <button className="btn-aggiungi" onClick={() => setShowAggiungi(true)}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="8" y1="2" x2="8" y2="14" />
            <line x1="2" y1="8" x2="14" y2="8" />
          </svg>
          Aggiungi nuova segnalazione
        </button>
      </div>
 
      <div className="segnalazioni-table-wrapper">
        <table className="segnalazioni-table">
          <thead>
            <tr>
              <th>N°</th>
              <th>ID</th>
              <th>Modello</th>
              <th>Localizzazione</th>
              <th>Urgenza</th>
              <th>Stato</th>
              <th>Data</th>
              <th>Utente</th>
            </tr>
          </thead>
          <tbody>
           {segnalazioni.map((s) => (
            <Fragment key={s.id}>
                <tr
                  key={s.id}
                  className={selectedId === s.id ? 'selected' : ''}
                  onClick={() => handleRowClick(s.id)}
                >
                  <td>{s.numero}</td>
                  <td>{s.idVeicolo}</td>
                  <td>{s.modello}</td>
                  <td>{s.localizzazione}</td>
                  <td>
                    <UrgenzaBadge urgenza={s.urgenza} />
                  </td>
                  <td>
                    <StatoIcon stato={s.stato} onToggle={(e) => toggleStato(e, s.id)} />
                  </td>
                  <td>{s.data}</td>
                  <td>{s.utente}</td>
                </tr>
 
                {selectedId === s.id && (
                  <tr key={`detail-${s.id}`}>
                    <td colSpan={8} style={{ padding: 0 }}>
                      <div className="segnalazione-detail">
                        <span className="segnalazione-detail-label">Segnalazione:</span>
                        <p>{s.descrizione}</p>
                        <div className="detail-actions">
                          <button className="btn-chiama" title="Chiama" onClick={(e) => handleChiama(e, s)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                            </svg>
                          </button>
                          <button className="btn-crea-task" onClick={(e) => { e.stopPropagation(); setTaskTarget(s); }}>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <line x1="8" y1="2" x2="8" y2="14" />
                              <line x1="2" y1="8" x2="14" y2="8" />
                            </svg>
                            Crea task
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
   </div>
 
      {showAggiungi && (
        <ModalAggiungi onClose={() => setShowAggiungi(false)} onSave={handleSaveSegnalazione} />
      )}
 
      {taskTarget && (
        <ModalTask segnalazione={taskTarget} onClose={handleTaskClose} />
      )}

      {toast && <div className="toast">{toast}</div>}
      {chiamataInfo && <ChiamataPopup telefono={chiamataInfo} />}
    </div>
  );
}