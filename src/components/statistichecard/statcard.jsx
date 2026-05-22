import './statcard.css'

export default function StatCard({
  icon,
  title,
  value,
  percentage,
  subtitle,
  dark = false,
}) {
  return (
    <div
      className={`statistics__card ${
        dark ? "statistics__card--dark" : ""
      }`}
    >
      <div className="statistics__card-top">
        {icon && (
          <div className="statistics__icon">
            {icon}
          </div>
        )}

        <span>•••</span>
      </div>

      <p>{title}</p>

      <div className="statistics__card-row">
        <h2>{value}</h2>

        <span
          className={`statistics__badge ${
            dark ? "statistics__badge--green" : ""
          }`}
        >
          ↗ {percentage}
        </span>
      </div>

      <small>{subtitle}</small>
    </div>
  );
}