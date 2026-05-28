import RentStatusWidget from "../components/RentStatusWidget/RentStatusWidget";
import RemindersWidget from "../components/RemindersWidget/RemindersWidget";
import './pages.css';
import NoleggiChart from "../components/component-grafico-noleggio/widgetNoleggio";

export default function Dashboard() {
  return <div>
    <h1>Dashboard</h1>
    <div  className="dashboard-container">
  <RentStatusWidget />
  <RemindersWidget /> </div>
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