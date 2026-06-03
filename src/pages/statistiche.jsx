import StatCard from '../components/statistichecard/statcard';
import ChartCart from '../components/chartcard/chartcard';
import GuastiWidget from '../components/guastiwidget/GuastiWidget';
import FlottaWidget from '../components/flottawidget/FlottaWidget';
import RentStatusWidget from '../components/RentStatusWidget/RentStatusWidget';

import './statistiche.css';

export default function Statistiche() {
  return (
    <div className="statistiche-page">
      <h1 className="statistiche-title">Dashboard</h1>

      {/* RIGA 1 — Statistiche */}
      <div className="grid-3">
        <StatCard
          icon="🌿"
          title="CO2 Risparmiata"
          value="412 K"
          percentage="+4.82%"
          subtitle="dall'anno scorso"
        />

        <StatCard
          icon="🚲"
          title="Bici usate"
          value="300"
          percentage="+10.82%"
          subtitle="dall'anno scorso"
        />

        <StatCard
          icon="🚲"
          title="Mezzo più usato"
          value="Bici"
          percentage="+6.92%"
          subtitle="dall'anno scorso"
        />
      </div>

      {/* RIGA 2 — Guasti + Flotta */}
      <div className="grid-2">
        <GuastiWidget />
        <FlottaWidget />
      </div>

      {/* RIGA 3 — Grafico + Rent Status */}
      <div className="grid-chart">
        <ChartCart />
        <RentStatusWidget />
      </div>
    </div>
  );
}