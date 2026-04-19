import { GitCommit, Flame, Trophy, TrendingUp } from "lucide-react";
import { MonoLabel } from "./mono-label";

interface Contributor {
  rank: number;
  name: string;
  username: string;
  contributions: number;
  streak: number;
  delta: number;
  avatar: string;
}

const MOCK_CONTRIBUTORS: Contributor[] = [
  {
    rank: 1,
    name: "Mads Eriksen",
    username: "madserik",
    contributions: 847,
    streak: 34,
    delta: 12,
    avatar: "ME",
  },
  {
    rank: 2,
    name: "Clara Holm",
    username: "claraholm",
    contributions: 623,
    streak: 21,
    delta: 8,
    avatar: "CH",
  },
  {
    rank: 3,
    name: "Jonas Brandt",
    username: "jbrandt",
    contributions: 591,
    streak: 15,
    delta: -3,
    avatar: "JB",
  },
  {
    rank: 4,
    name: "Sofie Lund",
    username: "sofielund",
    contributions: 412,
    streak: 7,
    delta: 5,
    avatar: "SL",
  },
  {
    rank: 5,
    name: "Erik Møller",
    username: "erikm",
    contributions: 389,
    streak: 12,
    delta: 0,
    avatar: "EM",
  },
];

const MAX_CONTRIBUTIONS = MOCK_CONTRIBUTORS[0].contributions;

const RANK_STYLES: Record<number, string> = {
  1: "bg-amber/15 text-amber border-amber/25",
  2: "bg-foreground/5 text-foreground/60 border-foreground/10",
  3: "bg-ice/10 text-ice border-ice/20",
};

function ContributorRow({ contributor }: { contributor: Contributor }) {
  const barWidth = (contributor.contributions / MAX_CONTRIBUTIONS) * 100;
  const isTop3 = contributor.rank <= 3;
  const rankStyle = RANK_STYLES[contributor.rank] ?? "";

  return (
    <div className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50">
      {/* Rank badge */}
      <div
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[10px] font-bold ${
          isTop3
            ? rankStyle
            : "border-transparent bg-transparent text-muted-foreground/40"
        }`}
      >
        {contributor.rank}
      </div>

      {/* Avatar */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold text-secondary-foreground ring-1 ring-border">
        {contributor.avatar}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 overflow-hidden">
            <span className="truncate text-sm font-medium text-foreground">
              {contributor.name}
            </span>
            <span className="hidden font-mono text-[10px] text-muted-foreground/50 sm:inline">
              @{contributor.username}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {contributor.delta !== 0 && (
              <span
                className={`font-mono text-[10px] ${
                  contributor.delta > 0
                    ? "text-emerald-500"
                    : "text-destructive"
                }`}
              >
                {contributor.delta > 0 ? "+" : ""}
                {contributor.delta}
              </span>
            )}
            <span className="font-display text-sm font-semibold tabular-nums text-foreground">
              {contributor.contributions.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Contribution bar */}
        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-border/60">
            <div
              className="h-full rounded-full bg-amber/60 transition-all duration-500"
              style={{ width: `${barWidth}%` }}
            />
          </div>
          {contributor.streak > 0 && (
            <div className="flex items-center gap-0.5 text-muted-foreground/60">
              <Flame className="h-2.5 w-2.5 text-amber/70" />
              <span className="font-mono text-[9px]">
                {contributor.streak}d
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function GitHubLeaderboard() {
  const totalContributions = MOCK_CONTRIBUTORS.reduce(
    (sum, c) => sum + c.contributions,
    0,
  );

  return (
    <section className="flex flex-col rounded-xl border border-border bg-card">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-5 flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-amber" />
          <MonoLabel className="text-amber">Contributions</MonoLabel>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-amber" />
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              Leaderboard
            </h2>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <MonoLabel className="text-muted-foreground/50">
              This month
            </MonoLabel>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-lg font-semibold text-foreground">
                {totalContributions.toLocaleString()}
              </span>
              <MonoLabel>commits</MonoLabel>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="editorial-rule my-5" />

        {/* Contributor list */}
        <div className="-mx-3 flex flex-col gap-0.5">
          {MOCK_CONTRIBUTORS.map((contributor) => (
            <ContributorRow
              key={contributor.username}
              contributor={contributor}
            />
          ))}
        </div>

        {/* Footer stats */}
        <div className="editorial-rule my-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-muted-foreground/60">
            <GitCommit className="h-3 w-3" />
            <MonoLabel>{MOCK_CONTRIBUTORS.length} contributors</MonoLabel>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground/60">
            <TrendingUp className="h-3 w-3" />
            <MonoLabel>+22 vs last month</MonoLabel>
          </div>
        </div>
      </div>
    </section>
  );
}
