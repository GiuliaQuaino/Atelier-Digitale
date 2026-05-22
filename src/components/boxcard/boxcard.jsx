import './boxcard.css'

export default function StatusBox({
  title,
  items,
}) {
  return (
    <div className="statistics__box">
      <h3>{title}</h3>

      <div className="statistics__numbers">
        {items.map((item, index) => (
          <div key={index}>
            <h2 className={item.color}>
              {item.value}
            </h2>

            <p>{item.label}</p>
          </div>
        ))}
      </div>

      <div className="statistics__progress">
        {items.map((item, index) => (
          <div
            key={index}
            className={`${item.color}-bg`}
          ></div>
        ))}
      </div>
    </div>
  );
}