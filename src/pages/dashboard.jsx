import RentStatusWidget from "../components/RentStatusWidget/RentStatusWidget";
import RemindersWidget from "../components/RemindersWidget/RemindersWidget";
import './pages.css';

export default function Dashboard() {
  return <div>
    <h1>Dashboard</h1>
    <div  className="dashboard-container">
  <RentStatusWidget />
  <RemindersWidget />
  </div>
  </div>;
}