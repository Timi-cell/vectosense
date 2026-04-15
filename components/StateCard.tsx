import Link from "next/link";
import {
  StateResistanceData,
  formatFrequency,
  getMutationBarClass,
  getResistanceBadgeClass,
  getResistanceLevelLabel,
  getRecommendationConfig,
} from "@/data/data";
import { ArrowRight, Dna, MapPin } from "lucide-react";

interface Props {
  state: StateResistanceData;
  className?: string;
}

export default function StateCard({ state, className = "" }: Props) {
  const pct = Math.round(state.mutation_frequency * 100);
  const barClass = getMutationBarClass(state.mutation_frequency);
  const badgeClass = getResistanceBadgeClass(state.resistance_level);
  const levelLabel = getResistanceLevelLabel(state.resistance_level);
  const recConfig = getRecommendationConfig(state.recommendation_level);

  return (
    <Link href={`/results/${state.state}`} className="block group">
      <div
        className={[
          "card bg-base-200 border border-base-300 h-full",
          "hover:border-primary/60 hover:shadow-xl hover:-translate-y-1",
          "transition-all duration-300 overflow-hidden",
          className,
        ].join(" ")}
      >
        {/* Resistance severity top stripe */}
        <div
          className="h-1 w-full"
          style={{
            background:
              state.resistance_level === "very-high"
                ? "linear-gradient(90deg, #ef4444, #dc2626)"
                : state.resistance_level === "high"
                  ? "linear-gradient(90deg, #f97316, #ea580c)"
                  : "linear-gradient(90deg, #eab308, #ca8a04)",
          }}
        />

        <div className="card-body p-5 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading font-bold text-lg text-base-content leading-tight">
                {state.state}
              </h3>
              <div className="flex items-center gap-1 text-xs text-base-content/50 mt-1">
                <MapPin size={10} strokeWidth={2} />
                <span>{state.zone}</span>
              </div>
            </div>
            <span
              className={`badge ${badgeClass} badge-sm font-heading font-semibold shrink-0`}
            >
              {levelLabel}
            </span>
          </div>

          {/* Mutation frequency bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-base-content/60">
                <Dna size={11} />
                <span className="font-mono">{state.dominant_mutation}</span>
              </div>
              <span className="font-heading font-bold text-base-content text-sm">
                {formatFrequency(state.mutation_frequency)}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-base-300 overflow-hidden">
              <div
                className={`h-full rounded-full ${barClass}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Score row */}
          <div className="flex items-center justify-between text-xs text-base-content/50 pt-1 border-t border-base-300">
            <span>
              Resistance score:{" "}
              <span className="font-heading font-bold text-base-content">
                {state.resistance_score}
              </span>
              /100
            </span>
            <span className="font-mono">{state.year}</span>
          </div>

          {/* Recommendation urgency */}
          <div
            className={`rounded-lg px-3 py-2 border flex items-center gap-2 ${recConfig.bgClass} ${recConfig.borderClass}`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${recConfig.dotClass}`}
            />
            <p className={`text-xs font-semibold ${recConfig.textClass}`}>
              {recConfig.label}
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between mt-auto">
            <p className="text-xs text-base-content/40">{state.species}</p>
            <span className="flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
              View Profile
              <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
