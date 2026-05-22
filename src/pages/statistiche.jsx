import StatCard from '../components/statistichecard/statcard';

import StatusBox from '../components/boxcard/boxcard';

import ChartCart from '../components/chartcard/chartcard';


export default function Statistiche() {
  return (
    <div>
      <StatCard
        icon="👤"
        title="Nuovi utenti"
        value="1.240"
        percentage="+12%"
        subtitle="ultimi 30 giorni"
      />

      <StatusBox
        title="Server Status"
        items={[
          {
            value: 12,
            label: "Online",
            color: "green",
          },

          {
            value: 3,
            label: "Offline",
            color: "red",
          },

          {
            value: 5,
            label: "Maintenance",
            color: "orange",
          },
        ]}
      />

      <ChartCart/>

    </div>
  );
}