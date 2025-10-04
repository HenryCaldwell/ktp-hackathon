import "./Home.css";

export default function Home() {
  const items = [
    {
      label: "Will the government reopen this month?",
      stat: "YES 92%",
      tone: "good",
    },
    {
      label: "Will Owen go to the gym over 24 times this month?",
      stat: "YES 99%",
      tone: "good",
    },
    { label: "Will Donald Trump die this month?", stat: "NO 94%", tone: "bad" },
    {
      label: "Will the S&P 500 drop 3 or more points this month?",
      stat: "YES 54%",
      tone: "good",
    },
    {
      label: "Will the Eagles be undefeated this month?",
      stat: "NO 83%",
      tone: "bad",
    },
    {
      label: "Will Donald Trump attend UFC 320",
      stat: "YES 49%",
      tone: "good",
    },
  ];

  const badgeClass = (tone) =>
    tone === "bad" ? "ticker__stat--no" : "ticker__stat--yes";

  return (
    <main className="homepage">
      <h1 className="title">ChumpChange</h1>

      <div className="ticker" aria-label="Prediction ticker">
        <div className="ticker__track">
          {items.map((it, i) => (
            <div key={`a-${i}`} className="ticker__item">
              <span className="ticker__label">{it.label}</span>
              <span className={`ticker__stat ${badgeClass(it.tone)}`}>
                {it.stat}
              </span>
            </div>
          ))}
          {items.map((it, i) => (
            <div key={`b-${i}`} className="ticker__item">
              <span className="ticker__label">{it.label}</span>
              <span className={`ticker__stat ${badgeClass(it.tone)}`}>
                {it.stat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
