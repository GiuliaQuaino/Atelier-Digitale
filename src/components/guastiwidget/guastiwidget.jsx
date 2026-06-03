import "./guastiwidget.css";

const GuastiWidget = () => {
  const daPrendere = 3;
  const inCorso = 3;
  const risolti = 2;
  const totale = daPrendere + inCorso + risolti;

  const pctDaPrendere = Math.round((daPrendere / totale) * 100);
  const pctInCorso = Math.round((inCorso / totale) * 100);
  const pctRisolti = Math.round((risolti / totale) * 100);

  return (
    <div className="guasti-widget">
      <h3 className="guasti-title">Stato guasti</h3>

      <div className="guasti-stats">
        <div className="guasti-stat">
          <span className="guasti-num red">{daPrendere}</span>
          <span className="guasti-label">Da prendere<br />in carico</span>
        </div>
        <div className="guasti-divider" />
        <div className="guasti-stat">
          <span className="guasti-num orange">{inCorso}</span>
          <span className="guasti-label">In corso</span>
        </div>
        <div className="guasti-divider" />
        <div className="guasti-stat">
          <span className="guasti-num green">{risolti}</span>
          <span className="guasti-label">Risolti oggi</span>
        </div>
      </div>

      <div className="guasti-bar">
        <div
          className="guasti-bar-segment red-bg"
          style={{ width: `${pctDaPrendere}%` }}
        />
        <div
          className="guasti-bar-segment orange-bg"
          style={{ width: `${pctInCorso}%` }}
        />
        <div
          className="guasti-bar-segment green-bg"
          style={{ width: `${pctRisolti}%` }}
        />
      </div>

      <div className="guasti-legend">
        <span className="legend-item">
          <span className="legend-dot red-bg" />
          Da prendere in carico
        </span>
        <span className="legend-item">
          <span className="legend-dot orange-bg" />
          In corso
        </span>
        <span className="legend-item">
          <span className="legend-dot green-bg" />
          Risolti
        </span>
      </div>
    </div>
  );
};

export default GuastiWidget;