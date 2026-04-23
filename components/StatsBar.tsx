import type { StatItem } from "@/types/content";
import type { CSSProperties } from "react";

type StatsBarProps = {
  stats: StatItem[];
};

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="stats-bar" data-reveal>
      {stats.map((stat, index) => (
        <div
          className="stat-item"
          key={stat.label}
          style={{ "--stagger": `${index * 90 + 120}ms` } as CSSProperties}
        >
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
