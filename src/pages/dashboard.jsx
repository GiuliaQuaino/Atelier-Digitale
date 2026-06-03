import RentStatusWidget from "../components/RentStatusWidget/RentStatusWidget";
import RemindersWidget from "../components/RemindersWidget/RemindersWidget";
import './pages.css';
import NoleggiChart from "../components/component-grafico-noleggio/widgetNoleggio";
import CO2Card from "../components/CO2-card/cardCO2";

const dataMag = [
  { v: 310 }, { v: 320 }, { v: 308 }, { v: 330 },
  { v: 345 }, { v: 360 }, { v: 370 }, { v: 395 }, { v: 412 },
];

export default function Dashboard() {
  return <div>
    <h1>Dashboard</h1>
    <div  className="dashboard-container">
  <RentStatusWidget />
  <RemindersWidget /> 
  <CO2Card
        title="C02 Risparmiata"
        value="412k"
        change="+2.97%"
        period="Gen - Apr, 2026"
        data={dataMag}
        positive
      />
  </div>
  <div>
  <NoleggiChart
  title="Noleggi"
  datasets={{
    "2026": [400, 500, 300, 700, 650, 800, 750, 900, 850, 700, 600, 950],
  }}
  activeMonth={2}
  maxY={1000}
/></div>
 
  </div>;
}