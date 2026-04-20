import type { StatItem } from "@/types/content";

type StatsBarProps = {
  stats: StatItem[];
};

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="stats-bar">
      {stats.map((stat) => (
        <div className="stat-item" key={stat.label}>
          <div className="stat-num">
            {stat.value}
            <span>{stat.suffix}</span>
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
