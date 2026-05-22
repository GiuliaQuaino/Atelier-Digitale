import { AlertCircle, Plus } from 'lucide-react';
import styles from './RemindersWidget.module.css';

const alertsData = [
  { id: 1, text: "Veicolo M-1A23BF con gomma bucata", date: "2026-05-10" },
  { id: 2, text: "Veicolo B-6B54DR con problema al freno anteriore", date: "2026-05-12" },
  { id: 3, text: "Veicolo M-2B45GF batteria in stato di emergenza", date: "2026-05-15" }
];

export default function RemindersWidget() {
  return (
    <div className={styles.card}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.title}>Nuove Segnalazioni</h2>
        <button className={styles.addButton}>
          <Plus style={{ width: '20px', height: '20px' }} />
        </button>
      </div>

      {/* LISTA DELLE SEGNALAZIONI */}
      <div className={styles.alertList}>
        {alertsData.map((alert) => (
          <div key={alert.id} className={styles.alertBox}>
            
            <div className={styles.iconCircle}>
              <AlertCircle style={{ width: '22px', height: '22px', color: '#ef4444' }} />
            </div>

            <div className={styles.textContainer}>
              <p className={styles.alertText}>{alert.text}</p>
              <span className={styles.alertDate}>{alert.date}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}