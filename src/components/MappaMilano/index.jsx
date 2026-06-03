import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',        
  height: '550px',       
  borderRadius: '0px'   
};

const center = {
  lat: 45.4745,
  lng: 9.1170
};


const veicoli = [
  { 
    id: 1, 
    tipo: 'auto', 
    lat: 45.4950, 
    lng: 9.1050, 
    stato: 'in_uso', 
    batteria: '45',            
    km: '1.200'                
  }, 
  { 
    id: 2, 
    tipo: 'bici', 
    lat: 45.4830, 
    lng: 9.1230, 
    stato: 'in_uso', 
    batteria: '12', 
    km: '450' 
  },       
  { 
    id: 3, 
    tipo: 'auto', 
    lat: 45.4680, 
    lng: 9.0980, 
    stato: 'attivo', 
    batteria: '100', 
    km: '10.400' 
  },         
  { 
    id: 4, 
    tipo: 'auto', 
    lat: 45.4570, 
    lng: 9.0940, 
    stato: 'attivo', 
    batteria: '85', 
    km: '8.900' 
  },         
  { 
    id: 5, 
    tipo: 'bici', 
    lat: 45.4540, 
    lng: 9.1410, 
    stato: 'non_disponibile', 
    batteria: '0', 
    km: '2.100' 
  },
  { 
    id: 6, 
    tipo: 'auto', 
    lat: 45.4721, 
    lng: 9.2430, 
    stato: 'non_disponibile', 
    batteria: '10', 
    km: '5.320' 
  },
  { 
    id: 7, 
    tipo: 'bici', 
    lat: 45.4800, 
    lng: 9.0980, 
    stato: 'non_disponibile', 
    batteria: '10', 
    km: '642' 
  },
  { 
    id: 8, 
    tipo: 'bici', 
    lat: 45.4860, 
    lng: 9.0999, 
    stato: 'attivo', 
    batteria: '10', 
    km: '589' 
  },
  { 
    id: 9, 
    tipo: 'auto', 
    lat: 45.4800, 
    lng: 9.1440,
    stato: 'non_disponibile', 
    batteria: '10', 
    km: '30.000' 
  },
  { 
    id: 10, 
    tipo: 'auto', 
    lat: 45.600, 
    lng: 9.1050,
    stato: 'in_uso',
    batteria: '10', 
    km: '8.562'
  }
];

function MappaMilano({ onVeicoloClick }) {
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCS8OJr2EinxDstnXZtFbenSj7n4BLdT0g" 
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(mapInstance) {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(function callback(mapInstance) {
    setMap(null);
  }, []);

  
  const getColoreCerchio = (stato) => {
    switch (stato) {
      case 'attivo':
        return '#4CAF50'; 
      case 'in_uso':
        return '#FFEB3B'; 
      case 'non_disponibile':
        return '#F44336'; 
      default:
        return '#888888'; 
    }
  };

 
  const getIconaVeicolo = (tipo) => {
    return tipo === 'auto' ? '/auto.png' : '/bici.png';
  };

  if (!isLoaded) return <div style={{ padding: '20px' }}>Caricamento della mappa...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        scrollwheel: true, 
        mapTypeControl: false,
        streetViewControl: false,
      }}
    >
      
      <Circle
        center={center}
        radius={2800} 
        options={{
          strokeColor: '#5995fe',    
          strokeOpacity: 0.9,
          strokeWeight: 3,
          fillColor: '#d7f0f8',      
          fillOpacity: 0.35,         
          clickable: false
        }}
      />

     
       {veicoli.map((veicolo, index) => (
        <React.Fragment key={`${veicolo.id}-${index}`}>
          {/* Cerchio di stato colorato attorno al veicolo */}
          <Circle
            center={{ lat: veicolo.lat, lng: veicolo.lng }}
            radius={230} 
            options={{
              strokeColor: getColoreCerchio(veicolo.stato),
              strokeOpacity: 1,
              strokeWeight: 4,
              fillColor: '#FFFFFF', 
              fillOpacity: 0.8,
            }}
          />
          
          
          <Marker
            position={{ lat: veicolo.lat, lng: veicolo.lng }}
            icon={{
              url: getIconaVeicolo(veicolo.tipo),
              scaledSize: new window.google.maps.Size(30, 30), 
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(14, 16) 
            }}
            onClick={() => onVeicoloClick(veicolo)}
          />
        </React.Fragment>  
      ))}
    </GoogleMap>
  );
}

export default React.memo(MappaMilano);