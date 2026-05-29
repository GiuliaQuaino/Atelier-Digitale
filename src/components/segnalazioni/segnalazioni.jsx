import { useState } from 'react';
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
 
export default function Segnalazioni() {
  const [segnalazioni, setSegnalazioni] = useState(segnalazioniData);
  const [selectedId, setSelectedId] = useState(6);
 
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
 
  return (
    <div className="segnalazioni-container">
      <div className="segnalazioni-header">
        <h1 className="segnalazioni-title">Segnalazioni</h1>
        <button className="btn-aggiungi">
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
              <>
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
                          <button className="btn-chiama" title="Chiama">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                            </svg>
                          </button>
                          <button className="btn-crea-task">
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
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}