import { useCallback, useState } from "react";
import "./Bets.css";

export default function Bets() {
  const bets = [
    {
      title: "Will the S&P 500 finish the month higher?",
      category: "Markets",
      yes: 58,
      no: 42,
    },
    {
      title: "Will BTC end the week above $60k?",
      category: "Crypto",
      yes: 54,
      no: 46,
    },
    {
      title: "Will the Eagles win 3+ games this month?",
      category: "Sports",
      yes: 61,
      no: 39,
    },
    {
      title: 'Will NYC get 1"+ of rain this weekend?',
      category: "Weather",
      yes: 47,
      no: 53,
    },
    {
      title: "Will the unemployment rate fall this month?",
      category: "Economy",
      yes: 44,
      no: 56,
    },
    {
      title: "Will a new iPhone be announced this month?",
      category: "Tech",
      yes: 35,
      no: 65,
    },
    {
      title: "Will gas prices average under $3.25/gal?",
      category: "Energy",
      yes: 33,
      no: 67,
    },
    {
      title: "Will there be a federal rate cut this month?",
      category: "Economy",
      yes: 41,
      no: 59,
    },
    {
      title: "Will Team USA win their next friendly?",
      category: "Sports",
      yes: 62,
      no: 38,
    },
    {
      title: "Will a major streaming service raise prices?",
      category: "Business",
      yes: 28,
      no: 72,
    },
    {
      title: "Will there be measurable snow in Chicago?",
      category: "Weather",
      yes: 22,
      no: 78,
    },
    {
      title: "Will gold set a new monthly closing high?",
      category: "Markets",
      yes: 49,
      no: 51,
    },
    {
      title: "Will a top 10 coin drop >10% this week?",
      category: "Crypto",
      yes: 57,
      no: 43,
    },
    {
      title: "Will a major tech IPO file this month?",
      category: "Tech",
      yes: 38,
      no: 62,
    },
    {
      title: "Will Lakers win 4+ games this month?",
      category: "Sports",
      yes: 55,
      no: 45,
    },
    {
      title: "Will average US temp anomaly > 1.0°C?",
      category: "Climate",
      yes: 46,
      no: 54,
    },
  ];

  // selection[i] is 'yes' | 'no' | null
  const [selection, setSelection] = useState(() =>
    Array(bets.length).fill(null)
  );
  // locked[i] is boolean (once true, cannot be changed back)
  const [locked, setLocked] = useState(() => Array(bets.length).fill(false));

  const toggle = useCallback(
    (index, choice) => {
      setSelection((prev) => {
        if (locked[index]) return prev; // ignore if locked
        const next = [...prev];
        next[index] = prev[index] === choice ? null : choice;
        return next;
      });
    },
    [locked]
  );

  const doLock = useCallback(
    (index) => {
      setLocked((prev) => {
        if (prev[index]) return prev; // already locked
        // Only allow locking if a choice is made
        if (!selection[index]) return prev;
        const next = [...prev];
        next[index] = true;
        return next;
      });
    },
    [selection]
  );

  const lead = (yes, no) => (yes === no ? "tie" : yes > no ? "yes" : "no");

  return (
    <main className="bets-page">
      <h1 className="bets-title">Monthly Bets</h1>

      <section className="bets-grid" aria-label="Monthly bets grid">
        {bets.map((b, i) => {
          const leader = lead(b.yes, b.no);
          const sel = selection[i];
          const isLocked = locked[i] === true;

          return (
            <article key={i} className="bet-card">
              <header className="bet-header">
                <span className="bet-category">{b.category}</span>
              </header>

              <div className="bet-body">
                <h2 className="bet-title">{b.title}</h2>
              </div>

              <footer
                className="bet-footer"
                role="group"
                aria-label={`${b.title} choices`}
              >
                <button
                  type="button"
                  className={[
                    "bet-choice",
                    "bet-choice--yes",
                    leader === "yes" ? "is-leader" : "",
                    sel === "yes" ? "is-selected" : "",
                  ]
                    .join(" ")
                    .trim()}
                  aria-pressed={sel === "yes"}
                  disabled={isLocked}
                  onClick={() => toggle(i, "yes")}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") &&
                    (e.preventDefault(), toggle(i, "yes"))
                  }
                >
                  YES <strong className="bet-pct">{b.yes}%</strong>
                </button>

                <button
                  type="button"
                  className={[
                    "bet-lock",
                    isLocked ? "bet-lock--locked" : "bet-lock--unlocked",
                    !sel && !isLocked ? "bet-lock--disabled" : "",
                  ]
                    .join(" ")
                    .trim()}
                  aria-label={isLocked ? "Locked" : "Lock selection"}
                  aria-disabled={!sel || isLocked}
                  disabled={!sel || isLocked}
                  onClick={() => doLock(i)}
                  title={
                    !sel && !isLocked
                      ? "Select YES or NO first"
                      : isLocked
                      ? "Locked"
                      : "Lock"
                  }
                >
                  {isLocked ? "🔒" : "🔓"}
                </button>

                <button
                  type="button"
                  className={[
                    "bet-choice",
                    "bet-choice--no",
                    leader === "no" ? "is-leader" : "",
                    sel === "no" ? "is-selected" : "",
                  ]
                    .join(" ")
                    .trim()}
                  aria-pressed={sel === "no"}
                  disabled={isLocked}
                  onClick={() => toggle(i, "no")}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") &&
                    (e.preventDefault(), toggle(i, "no"))
                  }
                >
                  NO <strong className="bet-pct">{b.no}%</strong>
                </button>
              </footer>
            </article>
          );
        })}
      </section>
    </main>
  );
}
