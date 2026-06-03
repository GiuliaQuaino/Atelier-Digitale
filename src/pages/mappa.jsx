import React, { useState } from 'react';
import MappaMilano from '../components/MappaMilano'; 

export default function Mappa() {
  
  const [veicoloSelezionato, setVeicoloSelezionato] = useState(null);

  return (
    <div style={{ 
      padding: '24px 40px', 
      fontFamily: 'sans-serif',
      backgroundColor: '#F4F6F8', 
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative', 
      overflowX: 'hidden'
    }}>
      
    
    
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '15px' }}>
        <h1 style={{ fontSize: '28px', margin: 0, fontWeight: '600', color: '#111' }}>Mappa</h1>
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <input 
            type="text" 
            placeholder="Cerca zona di interesse" 
            style={{
              width: '100%',
              padding: '10px 15px',
              borderRadius: '8px',
              border: '1px solid #CCD1D9',
              fontSize: '14px',
              backgroundColor: '#FFF'
            }}
          />
        </div>
      </div>

    
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ backgroundColor: '#FFF', padding: '10px 15px', borderRadius: '6px', border: '1px dashed #AAB2BD', fontSize: '14px' }}>
          <strong>Zona :</strong> Via Roma XXVI, Milano Nord
        </div>
        <div style={{ backgroundColor: '#FFF', padding: '10px 15px', borderRadius: '6px', border: '1px dashed #AAB2BD', fontSize: '14px' }}>
          <strong>Mezzi totali :</strong> 100
        </div>
        <select style={{ padding: '10px 15px', borderRadius: '6px', border: '1px solid #CCD1D9', backgroundColor: '#FFF', fontSize: '14px', cursor: 'pointer' }}>
          <option value="">Tipo di mezzo</option>
          <option value="auto">Macchina</option>
          <option value="bici">Bici</option>
        </select>
        <select style={{ padding: '10px 15px', borderRadius: '6px', border: '1px solid #CCD1D9', backgroundColor: '#FFF', fontSize: '14px', cursor: 'pointer' }}>
          <option value="">Stato</option>
          <option value="disponibile">Attivo</option>
          <option value="non_disponibile">In Uso</option>
          <option value="manutenzione">Non Disponibile</option>
        </select>
      </div>

      
      <div style={{ 
        width: '100%', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)', 
        borderRadius: '8px', 
        overflow: 'hidden',
        border: '1px dashed #4A90E2', 
        marginBottom: '25px'
      }}>
        <MappaMilano onVeicoloClick={setVeicoloSelezionato} />
      </div>

    
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '350px', marginTop: '10px' }}>
        
        {/* Barra colorata segmentata (Stile Guasti) */}
        <div style={{ display: 'flex', height: '18px', borderRadius: '80px', overflow: 'hidden', gap: '2px' }}>
          <div style={{ flex: 4, backgroundColor: '#4CAF50', borderRadius: '99px' }}></div> 
          <div style={{ flex: 3, backgroundColor: '#FFEB3B', borderRadius: '99px' }}></div> 
          <div style={{ flex: 5, backgroundColor: '#E14B4B', borderRadius: '99px' }}></div> 
        </div>

       
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#8a8fa8', fontWeight: '500' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#4CAF50', flexShrink: 0 }} />
            Attivo
          </span>

          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#8a8fa8', fontWeight: '500' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#FFEB3B', flexShrink: 0 }} />
            In uso
          </span>

          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#8a8fa8', fontWeight: '500' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#E14B4B', flexShrink: 0 }} />
            Non disponibile
          </span>

        </div>
      </div>

    

      {veicoloSelezionato && (
        <>
         
    <div 
            onClick={() => setVeicoloSelezionato(null)} 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.4)', 
              zIndex: 999, 
              transition: 'all 0.3s ease'
            }}
          />

         
      <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '320px',
            height: '100vh',
            backgroundColor: '#FFF',
            boxShadow: '-4px 0 25px rgba(0,0,0,0.15)',
            zIndex: 1000, 
            padding: '40px 30px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            fontSize: '16px',
            color: '#1a1a1a'
          }}>
            
            <button 
              onClick={() => setVeicoloSelezionato(null)}
              style={{
                alignSelf: 'flex-end',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#aaa',
                marginTop: '-10px',
                marginRight: '-10px'
              }}
            >
              ✕
            </button>

           
            <h2 style={{ 
              margin: '-10px 0 10px 0', 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#111',
              borderBottom: '2px solid #F4F6F8',
              paddingBottom: '15px',
              lineHeight: '1.4'
            }}>
              Mezzo Selezionato: <span style={{ color: '#0A43A4' }}>{veicoloSelezionato.tipo === 'auto' ? 'Macchina' : 'Bici'}</span>
            </h2>

            
            <div>
              <span style={{ color: '#666' }}>ID :</span>{' '}
              <strong style={{ marginLeft: '10px', fontFamily: 'monospace' }}>
                M-{veicoloSelezionato.id}A23BF
              </strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#666', marginRight: '10px' }}>Stato :</span>
              <span style={{
                backgroundColor: veicoloSelezionato.stato === 'attivo' ? '#4CAF50' : veicoloSelezionato.stato === 'non_disponibile' ? '#E14B4B' : '#F5A623',
                color: '#FFF',
                padding: '6px 16px',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                {veicoloSelezionato.stato === 'attivo' ? 'In Uso' : veicoloSelezionato.stato === 'non_disponibile' ? 'Non disponibile' : 'In uso'}
              </span>
            </div>

            <div>
              <span style={{ color: '#666' }}>Livello batteria :</span>{' '}
              <strong style={{ marginLeft: '10px' }}>
                {veicoloSelezionato.batteria || '100'} %
              </strong>
            </div>

            <div>
              <span style={{ color: '#666' }}>Km percorsi :</span>{' '}
              <strong style={{ marginLeft: '10px' }}>
                {veicoloSelezionato.km || '1500'} Km
              </strong>
            </div>
          </div>
        </>
      )}

    </div>
  );
}