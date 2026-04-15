import { RecommendationLevel, getRecommendationConfig } from "@/data/data";
import { ShieldCheck, Zap, AlertTriangle, Info } from "lucide-react";

interface Props {
  recommendation: string;
  recommendation_level: RecommendationLevel;
}

const icons = {
  critical: Zap,
  urgent: AlertTriangle,
  monitor: Info,
};

export default function RecommendationPanel({
  recommendation,
  recommendation_level,
}: Props) {
  const config = getRecommendationConfig(recommendation_level);
  const Icon = icons[recommendation_level];

  return (
    <div
      className={`rounded-2xl border p-6 space-y-4 ${config.bgClass} ${config.borderClass}`}
    >
      {/* Urgency header */}
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${config.dotClass} ${
            recommendation_level === "critical" ? "animate-pulse" : ""
          }`}
        />
        <p
          className={`font-heading font-bold text-sm uppercase tracking-widest ${config.textClass}`}
        >
          {config.label}
        </p>
      </div>

      {/* Recommendation text */}
      <div className="flex items-start gap-3">
        <Icon size={18} className={`${config.textClass} mt-0.5 shrink-0`} />
        <p className="text-sm text-base-content/85 leading-relaxed">
          {recommendation}
        </p>
      </div>

      {/* What to do */}
      <div className="pt-2 border-t border-base-content/10">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-base-content/40" />
          <p className="text-xs text-base-content/50">
            Aligns with WHO Insecticide Resistance Management guidelines (2016,
            updated 2023)
          </p>
        </div>
      </div>
    </div>
  );
}
