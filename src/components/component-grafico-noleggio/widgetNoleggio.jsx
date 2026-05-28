import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";
import "./widgetNoleggio.css";

const DEFAULT_DATA = {
  labels: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
  datasets: {
    "This Year": [620, 940, 730, 980, 985, 780, 790, 910, 980, 910, 760, 950],
    "Last Month": [310, 420, 380, 510, 490, 430, 460, 480, 510, 500, 440, 520],
  },
  activeMonth: 4,
  maxY: 1200,
};

const ACCENT = "#1DB979";
const BASE = "#1C2B4B";

export default function NoleggiChart({
  title = "Noleggi",
  labels = DEFAULT_DATA.labels,
  datasets = DEFAULT_DATA.datasets,
  activeMonth = DEFAULT_DATA.activeMonth,
  maxY = DEFAULT_DATA.maxY,
}) {
  const [view, setView] = useState(Object.keys(datasets)[0]);

  const data = labels.map((label, i) => ({
    label,
    value: datasets[view][i],
  }));

  return (
    <div className="noleggi-card">
      <div className="noleggi-header">
        <span className="noleggi-title">{title}</span>
        <div className="noleggi-views">
          {Object.keys(datasets).map((v) => (
            <button
              key={v}
              className={`noleggi-btn ${view === v ? "active" : ""}`}
              onClick={() => setView(v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="noleggi-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="30%" margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
            <YAxis width={36} domain={[0, maxY]} tickCount={5} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} tickFormatter={(v) => v >= 1000 ? (v / 1000).toFixed(1) + "K" : v} />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              contentStyle={{ borderRadius: 8, border: "0.5px solid rgba(0,0,0,0.08)", fontSize: 14 }}
              formatter={(value) => [value.toLocaleString("it-IT"), ""]}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={i === activeMonth ? ACCENT : BASE} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}