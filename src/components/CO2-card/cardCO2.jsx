import { AreaChart, Area, ResponsiveContainer } from "recharts";
import "./cardCO2.css";

export default function CO2Card({ value, change, period, data, positive, title }) {
  const arrow   = positive ? "↑" : "↓";

  return (
    <div className="card">
      <div className="left">
        <div className="header">
          <span>{title}</span>
        </div>
        <div className="value">{value}</div>
        <span className="badge" style={{ background: "#234a80"}}>
          {arrow} {change}
        </span>
        <div className="period">{period}</div>
      </div>

      <ResponsiveContainer width={120} height={48}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stope7effa="#234a80" stopOpacity={0.2} />
              <stop offset="95%" stope7effa="#234a80" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke="#234a80"
            strokeWidth={2}
            fill="url(#grad)"
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}