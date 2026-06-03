import { useAuth } from '../context/AuthContext';
import RentStatusWidget from "../components/RentStatusWidget/RentStatusWidget";
import RemindersWidget from "../components/RemindersWidget/RemindersWidget";
import './pages.css';
import NoleggiChart from "../components/component-grafico-noleggio/widgetNoleggio";
import CO2Card from "../components/CO2-card/cardCO2";


import MappaMilano from '../components/MappaMilano'; 

const dataMag = [
  { v: 310 }, { v: 320 }, { v: 308 }, { v: 330 },
  { v: 345 }, { v: 360 }, { v: 370 }, { v: 395 }, { v: 412 },
];

export default function Dashboard() {

  const { utente } = useAuth();

  const isAdmin = utente?.ruolo === "Amministratore";
  const isSupporto = utente?.ruolo === "Supporto";

  return (
    <div>
      <h1 style={{ marginTop: "24px" }}>Dashboard</h1>
      <div className="dashboard-content">
        
        <div className="dashboard-container">
          <div className="widgets">
            {(isAdmin || isSupporto) && (
              <RentStatusWidget />
            )}
            <RemindersWidget /> 
          </div>      
          <div>
            {isAdmin && (
              <NoleggiChart
                title="Noleggi"
                datasets={{
                  "2026": [400, 500, 300, 700, 650, 800, 750, 900, 850, 700, 600, 950],
                }}
                activeMonth={2}
                maxY={1000}
              />
            )}
          </div>
        </div>

        <div style={{ flex: 1 }} className="dashboard-container2">
          <div style={{ width: "100%", display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {isAdmin && (
              <CO2Card
                title="CO2 Risparmiata"
                value="412k"
                change="+2.97%"
                period="Gen - Apr, 2026"
                data={dataMag}
                positive
              />
            )}

            
            <div style={{
              backgroundColor: '#FFF',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              
              <h3 style={{ fontSize: '18px', margin: 0, fontWeight: '600', color: '#111' }}>
                Stato delle Stazioni
              </h3>

              <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px dashed #4A90E2' }}>
                <MappaMilano onVeicoloClick={() => {}} />
              </div>

              {/* Legenda */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '5px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#8a8fa8', fontWeight: '500' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#4CAF50', flexShrink: 0 }} />
                  Operative
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#8a8fa8', fontWeight: '500' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#FFEB3B', flexShrink: 0 }} />
                  In Manutenzione
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#8a8fa8', fontWeight: '500' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#E14B4B', flexShrink: 0 }} />
                  Inattive
                </span>
              </div>

            </div>
            

          </div>
        </div>

      </div>
    </div>
  );
}
