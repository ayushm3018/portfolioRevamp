import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const USERNAME = "rayuga3018";

const gqlFetch = async (query) => {
  const res = await fetch("/.netlify/functions/leetcode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  return json.data;
};

const MAIN_QUERY = `{
  matchedUser(username: "${USERNAME}") {
    submitStats { acSubmissionNum { difficulty count } }
    profile { ranking }
    userCalendar { activeYears }
  }
  userContestRanking(username: "${USERNAME}") { rating attendedContestsCount globalRanking }
  userContestRankingHistory(username: "${USERNAME}") { rating attended contest { title startTime } }
}`;

const calendarQuery = (year) => `{
  matchedUser(username: "${USERNAME}") {
    userCalendar(year: ${year}) { submissionCalendar totalActiveDays }
  }
}`;

// ── Heatmap ──────────────────────────────────────────────────────────────────
const CELL = 11;
const GAP  = 3;
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const heatColor = (count, inYear) => {
  if (!inYear) return "transparent";
  if (!count)  return "#1a1a1a";
  if (count <= 2)  return "#3b1f8c";
  if (count <= 5)  return "#5a30b5";
  if (count <= 9)  return "#7042f8";
  return "#b49bff";
};

const buildGrid = (year, calendarStr) => {
  const calendar = JSON.parse(calendarStr || "{}");
  // Start from Sunday on or before Jan 1
  const jan1 = new Date(Date.UTC(year, 0, 1));
  const startOffset = jan1.getUTCDay();
  const start = new Date(jan1);
  start.setUTCDate(jan1.getUTCDate() - startOffset);

  const end = new Date(Date.UTC(year, 11, 31));

  const weeks = [];
  const monthLabels = [];
  let lastMonth = -1;
  const cur = new Date(start);

  while (cur <= end) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const ts = cur.getTime() / 1000;
      const inYear = cur.getUTCFullYear() === year;
      const month = cur.getUTCMonth();

      if (d === 0 && inYear && month !== lastMonth) {
        monthLabels.push({ weekIdx: weeks.length, label: MONTHS[month] });
        lastMonth = month;
      }

      week.push({
        ts,
        count: calendar[ts] || 0,
        inYear,
        date: new Date(cur),
      });
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
    weeks.push(week);
  }

  return { weeks, monthLabels };
};

const Heatmap = ({ calendarStr, totalActiveDays, year }) => {
  if (!calendarStr) return null;
  const { weeks, monthLabels } = buildGrid(year, calendarStr);

  const svgW = weeks.length * (CELL + GAP);
  const svgH = 7 * (CELL + GAP) + 22;

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs text-[#7042f8] uppercase tracking-widest">Submission Activity</p>
        <p className="text-xs text-gray-500">{totalActiveDays} active days in {year}</p>
      </div>

      <div style={{ overflowX: "auto" }}>
        <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", minWidth: 600 }}>
          {/* Month labels */}
          {monthLabels.map(({ weekIdx, label }) => (
            <text key={label + weekIdx} x={weekIdx * (CELL + GAP)} y={10} fill="#555" fontSize="7">
              {label}
            </text>
          ))}

          {/* Day labels */}
          {["Mon", "Wed", "Fri"].map((d, i) => (
            <text key={d} x={-2} y={14 + ([1,3,5][i]) * (CELL + GAP) + CELL / 2 + 2}
              fill="#444" fontSize="6" textAnchor="end">
              {d}
            </text>
          ))}

          {/* Cells */}
          {weeks.map((week, w) =>
            week.map((cell, d) => (
              <rect
                key={`${w}-${d}`}
                x={w * (CELL + GAP)}
                y={14 + d * (CELL + GAP)}
                width={CELL}
                height={CELL}
                rx={2}
                fill={heatColor(cell.count, cell.inYear)}
              >
                <title>
                  {cell.inYear
                    ? `${cell.date.toUTCString().slice(0,16)}: ${cell.count} submission${cell.count !== 1 ? "s" : ""}`
                    : ""}
                </title>
              </rect>
            ))
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1 mt-2 justify-end">
        <span className="text-gray-600 text-xs mr-1">Less</span>
        {["#1a1a1a","#3b1f8c","#5a30b5","#7042f8","#b49bff"].map(c => (
          <div key={c} style={{ width: CELL, height: CELL, background: c, borderRadius: 2, flexShrink: 0 }} />
        ))}
        <span className="text-gray-600 text-xs ml-1">More</span>
      </div>
    </div>
  );
};

// ── Rating chart ──────────────────────────────────────────────────────────────
const RatingChart = ({ history }) => {
  const attended = history.filter(h => h.attended);
  if (attended.length < 2) return null;
  const ratings = attended.map(h => h.rating);
  const minR = Math.min(...ratings) - 30;
  const maxR = Math.max(...ratings) + 30;
  const W = 400, H = 110, px = 10, py = 10;
  const pts = attended.map((h, i) => ({
    x: px + (i / (attended.length - 1)) * (W - px * 2),
    y: H - py - ((h.rating - minR) / (maxR - minR)) * (H - py * 2),
    label: `${h.contest.title}: ${Math.round(h.rating)}`,
  }));
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaD = `${pathD} L${pts[pts.length-1].x},${H} L${pts[0].x},${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 110 }}>
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7042f8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7042f8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#rg)" />
      <path d={pathD} fill="none" stroke="#7042f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={i}><circle cx={p.x} cy={p.y} r="3.5" fill="#b49bff" /><title>{p.label}</title></g>
      ))}
    </svg>
  );
};

// ── Stat bar ──────────────────────────────────────────────────────────────────
const StatBar = ({ label, count, total, color }) => {
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span style={{ color }}>{label}</span>
        <span className="text-gray-400">{count} <span className="text-gray-600">/ {total}</span></span>
      </div>
      <div className="w-full rounded-full" style={{ height: 5, background: "#1e1e1e" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const LeetCode = () => {
  const [data, setData]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);
  const [calData, setCalData]     = useState(null);
  const [calLoading, setCalLoading] = useState(false);
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());

  useEffect(() => {
    gqlFetch(MAIN_QUERY)
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCalLoading(true);
    setCalData(null);
    gqlFetch(calendarQuery(activeYear))
      .then(d => setCalData(d?.matchedUser?.userCalendar))
      .finally(() => setCalLoading(false));
  }, [activeYear]);

  const solved  = data?.matchedUser?.submitStats?.acSubmissionNum;
  const total   = solved?.find(s => s.difficulty === "All")?.count    ?? 0;
  const easy    = solved?.find(s => s.difficulty === "Easy")?.count   ?? 0;
  const medium  = solved?.find(s => s.difficulty === "Medium")?.count ?? 0;
  const hard    = solved?.find(s => s.difficulty === "Hard")?.count   ?? 0;
  const ranking = data?.matchedUser?.profile?.ranking;
  const contest = data?.userContestRanking;
  const history = data?.userContestRankingHistory ?? [];
  const activeYears = [...(data?.matchedUser?.userCalendar?.activeYears ?? [])].sort((a,b) => b - a);

  return (
    <section className="bg-black py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-5xl font-bold text-white">
          Leetcode{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7042f8] to-[#b49bff]">
            Stats
          </span>
        </h2>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {loading && (
          <div className="text-center text-gray-500 py-16 text-sm tracking-widest uppercase animate-pulse">
            Fetching stats...
          </div>
        )}
        {error && (
          <div className="text-center text-gray-600 py-16 text-sm">
            Could not load LeetCode stats.
          </div>
        )}

        {data && (
          <div className="space-y-6">
            {/* Row 1 — problems + contest */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="rounded-2xl p-6 border border-[#2a2a2a]" style={{ background: "hsl(260,14%,8%)", position: "relative", zIndex: 1 }}
              >
                <p className="text-xs text-[#7042f8] uppercase tracking-widest mb-4">Problems Solved</p>
                <div className="flex items-end gap-3 mb-6">
                  <span className="text-6xl font-bold text-white">{total}</span>
                  <span className="text-gray-600 text-sm mb-2">problems</span>
                </div>
                <StatBar label="Easy"   count={easy}   total={600}  color="#22c55e" />
                <StatBar label="Medium" count={medium} total={1300} color="#f59e0b" />
                <StatBar label="Hard"   count={hard}   total={500}  color="#ef4444" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                className="rounded-2xl p-6 border border-[#2a2a2a]" style={{ background: "hsl(260,14%,8%)", position: "relative", zIndex: 1 }}
              >
                <p className="text-xs text-[#7042f8] uppercase tracking-widest mb-4">Contest Rating</p>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-6xl font-bold text-white">{Math.round(contest?.rating ?? 0)}</span>
                  <span className="text-gray-600 text-sm mb-2">rating</span>
                </div>
                <RatingChart history={history} />
              </motion.div>
            </div>

            {/* Row 2 — heatmap with year switcher (hidden on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="hidden md:block rounded-2xl p-6 border border-[#2a2a2a]" style={{ background: "hsl(260,14%,8%)", position: "relative", zIndex: 1 }}
            >
              {/* Year tabs */}
              <div className="flex gap-2 mb-5">
                {activeYears.map(y => (
                  <button
                    key={y}
                    onClick={() => setActiveYear(y)}
                    style={{
                      padding: "4px 14px",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      border: activeYear === y ? "1px solid #7042f8" : "1px solid #2a2a2a",
                      background: activeYear === y ? "rgba(112,66,248,0.15)" : "transparent",
                      color: activeYear === y ? "#b49bff" : "#555",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {y}
                  </button>
                ))}
              </div>

              {calLoading && (
                <div className="text-center text-gray-600 py-8 text-xs tracking-widest uppercase animate-pulse">
                  Loading...
                </div>
              )}
              {!calLoading && calData && (
                <Heatmap
                  calendarStr={calData.submissionCalendar}
                  totalActiveDays={calData.totalActiveDays}
                  year={activeYear}
                />
              )}
            </motion.div>

            {/* Row 3 — key stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Global Rank",       value: `#${ranking?.toLocaleString()}` },
                { label: "Contest Rank",      value: `#${contest?.globalRanking?.toLocaleString()}` },
                { label: "Contests Attended", value: contest?.attendedContestsCount },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-2xl p-5 border border-[#2a2a2a] text-center"
                  style={{ background: "hsl(260,14%,8%)", position: "relative", zIndex: 1 }}
                >
                  <p className="text-[10px] md:text-xs text-[#7042f8] uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className="text-base md:text-2xl font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeetCode;
