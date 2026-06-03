import "./flottawidget.css";

const FlottaWidget = () => {
  const disponibili = 49;
  const noleggiati = 16;
  const fuoriUso = 7;
  const totale = disponibili + noleggiati + fuoriUso;

  const pctDisponibili = Math.round((disponibili / totale) * 100);
  const pctNoleggiati = Math.round((noleggiati / totale) * 100);
  const pctFuoriUso = Math.round((fuoriUso / totale) * 100);

  return (
    <div className="flotta-widget">
      <h3 className="flotta-title">Flotta - disponibilità ora</h3>

      <div className="flotta-stats">
        <div className="flotta-stat">
          <span className="flotta-num green">{disponibili}</span>
          <span className="flotta-label">Disponibili</span>
        </div>
        <div className="flotta-divider" />
        <div className="flotta-stat">
          <span className="flotta-num blue">{noleggiati}</span>
          <span className="flotta-label">Noleggiati ora</span>
        </div>
        <div className="flotta-divider" />
        <div className="flotta-stat">
          <span className="flotta-num red">{fuoriUso}</span>
          <span className="flotta-label">Fuori uso</span>
        </div>
      </div>

      <div className="flotta-bar">
        <div
          className="flotta-bar-segment green-bg"
          style={{ width: `${pctDisponibili}%` }}
        />
        <div
          className="flotta-bar-segment blue-bg"
          style={{ width: `${pctNoleggiati}%` }}
        />
        <div
          className="flotta-bar-segment red-bg"
          style={{ width: `${pctFuoriUso}%` }}
        />
      </div>

      <div className="flotta-legend">
        <span className="legend-item">
          <span className="legend-dot green-bg" />
          Disponibili
        </span>
        <span className="legend-item">
          <span className="legend-dot blue-bg" />
          Noleggiati
        </span>
        <span className="legend-item">
          <span className="legend-dot red-bg" />
          Fuori uso
        </span>
      </div>
    </div>
  );
};

export default FlottaWidget;