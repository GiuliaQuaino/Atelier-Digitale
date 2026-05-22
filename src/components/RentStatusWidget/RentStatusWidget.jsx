import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import styles from './RentStatusWidget.module.css';

const data = [
  { name: 'Disponibili', value: 38.5, color: '#56ab83', trend: 'up', percentage: '38,5%' },
  { name: 'In Uso', value: 27.0, color: '#f7e9c2', trend: 'down', percentage: '27%' },
  { name: 'In Carica', value: 20.0, color: '#e7eff4', trend: 'up', percentage: '20%' },
  { name: 'Fuori Servizio', value: 10.0, color: '#fcd3de', trend: 'down', percentage: '10%' },
];

const chartData = [
  { name: 'Disponibili', value: 38.5, color: '#56ab83' },
  { name: 'In Carica', value: 24.5, color: '#e7eff4' },
  { name: 'Fuori Servizio', value: 10.0, color: '#fcd3de' },
  { name: 'In Uso', value: 27.0, color: '#f7e9c2' },
];

export default function RentStatusWidget() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Stato mezzi</h2>
        <button className={styles.badge}>Oggi</button>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={6}
              dataKey="value"
              cornerRadius={10}
              startAngle={120}
              endAngle={480}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legendList}>
        {data.map((item, index) => (
          <div key={index} className={styles.legendItem}>
            <div className={styles.legendLeft}>
              <span className={styles.colorDot} style={{ backgroundColor: item.color }} />
              <span className={styles.statusName}>{item.name}</span>
            </div>
            <div className={styles.legendRight}>
              <span className={styles.percentage}>{item.percentage}</span>
              {item.trend === 'up' ? (
                <ArrowUpRight style={{ width: '20px', height: '20px', color: '#56ab83' }} />
              ) : (
                <ArrowDownRight style={{ width: '20px', height: '20px', color: '#fca5a5' }} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}