import './chartcard.css'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { monthlyData } from "./data";

export default function ChartCard() {
  return (
    <div className="statistics__chart-card">
      <div className="statistics__chart-header">
        <h3>Utilizzo mensili - noleggi</h3>

        <select>
          <option>Last 8 Month</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="rentals"
            stroke="#E53935"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}