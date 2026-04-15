import regionsJson from "./regions.json";
import resistanceJson from "./resistance_data.json";

// ── Types (strict — only fields that exist in the JSONs) ─────────────────────

export type NormalisedResistanceLevel = "moderate" | "high" | "very-high";
export type RecommendationLevel = "urgent" | "monitor" | "critical";

export interface StateResistanceData {
  id: number;
  state: string;
  zone: string; // injected from regions.json
  resistance_level: NormalisedResistanceLevel;
  resistance_score: number;
  dominant_mutation: string;
  mutation_frequency: number;
  species: string;
  year: number;
  summary: string;
  recommendation: string;
  recommendation_level: RecommendationLevel;
}

export interface GeopoliticalZone {
  region: string;
  states: { name: string }[];
}

// ── Build state → zone lookup from regions.json ──────────────────────────────

const stateToZone = new Map<string, string>();
for (const zone of regionsJson.regions) {
  for (const s of zone.states) {
    stateToZone.set(s.name.toLowerCase(), zone.region);
  }
}

// ── Normalise the raw resistance_level string ────────────────────────────────

function normalise(raw: string): NormalisedResistanceLevel {
  if (raw === "Very High") return "very-high";
  if (raw === "Moderate") return "moderate";
  return "high";
}

// ── Main merged dataset ───────────────────────────────────────────────────────

export const ALL_STATES: StateResistanceData[] = resistanceJson.regions.map(
  (r) => ({
    id: r.id,
    state: r.state,
    zone: stateToZone.get(r.state.toLowerCase()) ?? "Unknown",
    resistance_level: normalise(r.resistance_level),
    resistance_score: r.resistance_score,
    dominant_mutation: r.dominant_mutation,
    mutation_frequency: r.mutation_frequency,
    species: r.species,
    year: r.year,
    summary: r.summary,
    recommendation: r.recommendation,
    recommendation_level: r.recommendation_level as RecommendationLevel,
  }),
);

// ── Zone data from regions.json ───────────────────────────────────────────────

export const ALL_ZONES: GeopoliticalZone[] = regionsJson.regions;
export const ZONE_NAMES: string[] = regionsJson.regions.map((z) => z.region);

// ── Lookups ───────────────────────────────────────────────────────────────────

export function getStateById(id: number): StateResistanceData | undefined {
  return ALL_STATES.find((s) => s.id === id);
}

export function getStatesByZone(zone: string): StateResistanceData[] {
  return ALL_STATES.filter((s) => s.zone === zone);
}

/** All state names in a zone (from regions.json) that have resistance data */
export function getSiblingStates(
  zone: string,
  excludeId: number,
): StateResistanceData[] {
  return ALL_STATES.filter((s) => s.zone === zone && s.id !== excludeId);
}

// ── Formatters ────────────────────────────────────────────────────────────────

export function formatFrequency(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function getResistanceLevelLabel(
  level: NormalisedResistanceLevel,
): string {
  return { "very-high": "Very High", high: "High", moderate: "Moderate" }[
    level
  ];
}

export function getResistanceBadgeClass(
  level: NormalisedResistanceLevel,
): string {
  return {
    "very-high": "badge-error",
    high: "badge-warning",
    moderate: "badge-info",
  }[level];
}

export function getResistanceTextClass(
  level: NormalisedResistanceLevel,
): string {
  return {
    "very-high": "text-error",
    high: "text-warning",
    moderate: "text-info",
  }[level];
}

export function getResistanceHex(level: NormalisedResistanceLevel): string {
  return { "very-high": "#ef4444", high: "#f97316", moderate: "#eab308" }[
    level
  ];
}

export function getMutationBarClass(freq: number): string {
  if (freq >= 0.75) return "bg-error";
  if (freq >= 0.5) return "bg-warning";
  return "bg-info";
}

export function getScoreBarClass(score: number): string {
  if (score >= 75) return "bg-error";
  if (score >= 50) return "bg-warning";
  return "bg-info";
}

export function getRecommendationConfig(level: RecommendationLevel) {
  return {
    critical: {
      label: "Critical — Act Immediately",
      alertClass: "alert-error",
      borderClass: "border-error/40",
      bgClass: "bg-error/5",
      textClass: "text-error",
      dotClass: "bg-error",
    },
    urgent: {
      label: "Urgent Action Required",
      alertClass: "alert-warning",
      borderClass: "border-warning/40",
      bgClass: "bg-warning/5",
      textClass: "text-warning",
      dotClass: "bg-warning",
    },
    monitor: {
      label: "Monitor Closely",
      alertClass: "alert-info",
      borderClass: "border-info/40",
      bgClass: "bg-info/5",
      textClass: "text-info",
      dotClass: "bg-info",
    },
  }[level];
}

// ── Derived stats for landing page (from actual JSON data only) ───────────────

export const STATS = {
  totalStates: ALL_STATES.length,
  criticalStates: ALL_STATES.filter(
    (s) => s.recommendation_level === "critical",
  ).length,
  highestFreq: Math.max(...ALL_STATES.map((s) => s.mutation_frequency)),
  dataYear: ALL_STATES[0]?.year ?? 2022,
  zonesCount: regionsJson.regions.length,
};
