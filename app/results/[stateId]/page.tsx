import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ALL_STATES,
  getStateById,
  getSiblingStates,
  formatFrequency,
  getResistanceLevelLabel,
  getResistanceBadgeClass,
  getResistanceTextClass,
  getResistanceHex,
  getMutationBarClass,
  getScoreBarClass,
} from "@/data/data";
import ResistanceLevelBadge from "@/components/ResistanceLevelBadge";
import MutationBar from "@/components/MutationBar";
import RecommendationPanel from "@/components/RecommendationPanel";
import PrintButton from "@/components/PrintButton";
import {
  ArrowLeft,
  ArrowRight,
  Dna,
  FlaskConical,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

interface Props {
  params: Promise<{ stateId: string }>;
}

export async function generateStaticParams() {
  return ALL_STATES.map((s) => ({ stateId: s.id.toString() }));
}

export async function generateMetadata({ params }: Props) {
  const { stateId } = await params;
  const state = getStateById(parseInt(stateId));
  if (!state) return { title: "State Not Found — VectoSense" };
  return {
    title: `${state.state} Resistance Profile — VectoSense`,
    description: state.summary,
  };
}

export default async function ResultsPage({ params }: Props) {
  const { stateId } = await params;
  const state = getStateById(parseInt(stateId));
  if (!state) notFound();

  // Prev / next navigation through sorted ALL_STATES
  const idx = ALL_STATES.findIndex((s) => s.id === state.id);
  const prev = ALL_STATES[idx - 1];
  const next = ALL_STATES[idx + 1];

  // Sibling states in the same zone
  const siblings = getSiblingStates(state.zone, state.id);

  const resistanceHex = getResistanceHex(state.resistance_level);
  const resistanceText = getResistanceTextClass(state.resistance_level);
  const barClass = getMutationBarClass(state.mutation_frequency);
  const scoreBarClass = getScoreBarClass(state.resistance_score);
  const pct = Math.round(state.mutation_frequency * 100);

  // Severity bleed class
  const bleedClass =
    state.resistance_level === "very-high"
      ? "resistance-bleed-critical"
      : state.resistance_level === "high"
        ? "resistance-bleed-high"
        : "resistance-bleed-moderate";

  return (
    <div className={`min-h-screen ${bleedClass}`}>
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-10 no-print animate-fade-up">
          <Link
            href="/explore"
            className="flex items-center gap-2 text-sm text-base-content/50 hover:text-base-content transition-colors group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Explorer
          </Link>
          <PrintButton />
        </div>

        {/* Hero  */}
        <div className="mb-12 animate-fade-up delay-100">
          {/* Zone + meta badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <div className="flex items-center gap-1.5 text-xs text-base-content/50 bg-base-200 border border-base-300 rounded-full px-3 py-1.5">
              <MapPin size={11} />
              {state.zone}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-base-content/50 bg-base-200 border border-base-300 rounded-full px-3 py-1.5">
              <Calendar size={11} />
              {state.year}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-base-content/50 bg-base-200 border border-base-300 rounded-full px-3 py-1.5">
              <FlaskConical size={11} />
              {state.species}
            </div>
          </div>

          {/* State name */}
          <div className="flex flex-wrap items-end gap-5 mb-6">
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-black text-base-content leading-none tracking-tight">
              {state.state}
              <span className="text-base-content/30"> State</span>
            </h1>
            <ResistanceLevelBadge
              level={state.resistance_level}
              size="lg"
              showIcon
            />
          </div>

          {/* Summary */}
          <p
            className="text-base-content/70 text-lg leading-relaxed max-w-3xl border-l-4 pl-5"
            style={{ borderColor: resistanceHex }}
          >
            {state.summary}
          </p>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {/* Mutation frequency — the big one */}
          <div className="col-span-2 md:col-span-1 card bg-base-200 border border-base-300 animate-fade-up delay-200">
            <div className="card-body p-6 text-center">
              <p className="text-xs font-mono text-base-content/40 uppercase tracking-widest mb-3">
                {state.dominant_mutation}
              </p>
              <p
                className={`font-heading font-black text-6xl leading-none ${resistanceText} animate-count-up delay-300`}
              >
                {formatFrequency(state.mutation_frequency)}
              </p>
              <p className="text-xs text-base-content/50 mt-3">
                Mutation frequency
              </p>
            </div>
          </div>

          {/* Resistance score */}
          <div className="card bg-base-200 border border-base-300 animate-fade-up delay-200">
            <div className="card-body p-6 text-center">
              <p className="text-xs font-mono text-base-content/40 uppercase tracking-widest mb-3">
                Score
              </p>
              <p
                className={`font-heading font-black text-5xl leading-none animate-count-up delay-300 ${resistanceText}`}
              >
                {state.resistance_score}
              </p>
              <p className="text-xs text-base-content/50 mt-3">Out of 100</p>
            </div>
          </div>

          {/* Resistance level */}
          <div className="card bg-base-200 border border-base-300 animate-fade-up delay-300">
            <div className="card-body p-6 text-center">
              <p className="text-xs font-mono text-base-content/40 uppercase tracking-widest mb-3">
                Level
              </p>
              <p
                className={`font-heading font-black text-3xl leading-none ${resistanceText}`}
              >
                {getResistanceLevelLabel(state.resistance_level)}
              </p>
              <p className="text-xs text-base-content/50 mt-3">
                Pyrethroid resistance
              </p>
            </div>
          </div>

          {/* Recommendation level */}
          <div className="card bg-base-200 border border-base-300 animate-fade-up delay-400">
            <div className="card-body p-6 text-center">
              <p className="text-xs font-mono text-base-content/40 uppercase tracking-widest mb-3">
                Urgency
              </p>
              <p
                className={`font-heading font-black text-3xl leading-none capitalize ${
                  state.recommendation_level === "critical"
                    ? "text-error"
                    : state.recommendation_level === "urgent"
                      ? "text-warning"
                      : "text-info"
                }`}
              >
                {state.recommendation_level}
              </p>
              <p className="text-xs text-base-content/50 mt-3">
                Action priority
              </p>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 mb-12">
          {/* Left column */}
          <div className="space-y-8">
            {/* Resistance profile */}
            <div className="card bg-base-200 border border-base-300 animate-fade-up delay-200">
              <div className="card-body p-7">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Dna size={17} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-lg text-base-content">
                      Resistance Mutation Profile
                    </h2>
                    <p className="text-xs text-base-content/45">
                      Genomic frequency data · {state.year}
                    </p>
                  </div>
                </div>

                {/* Main mutation bar */}
                <MutationBar
                  label={state.dominant_mutation}
                  gene="Vgsc-L995F (voltage-gated sodium channel)"
                  frequency={state.mutation_frequency}
                  description="The primary pyrethroid target-site resistance mutation. This allele modifies the mosquito's sodium channel, preventing pyrethroids from binding effectively. High population frequency means standard bed nets and pyrethroid sprays are losing their killing power."
                  delay={200}
                />

                {/* Divider */}
                <div className="my-8 border-t border-base-300" />

                {/* Resistance score bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-heading font-semibold text-base-content">
                      Overall Resistance Score
                    </span>
                    <span
                      className={`font-heading font-black text-xl ${resistanceText}`}
                    >
                      {state.resistance_score}
                      <span className="text-base-content/30 text-sm font-normal">
                        /100
                      </span>
                    </span>
                  </div>

                  {/* Score track */}
                  <div className="relative w-full h-4 bg-base-300 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full animate-fill-bar ${scoreBarClass}`}
                      style={
                        {
                          "--bar-width": `${state.resistance_score}%`,
                        } as React.CSSProperties
                      }
                    />
                    {/* Threshold markers */}
                    <div
                      className="absolute top-0 bottom-0 left-[50%] w-px bg-base-100/50"
                      title="50 — High threshold"
                    />
                    <div
                      className="absolute top-0 bottom-0 left-[75%] w-px bg-base-100/50"
                      title="75 — Very High threshold"
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-base-content/30 font-mono px-0.5">
                    <span>0</span>
                    <span>50 — High</span>
                    <span>75 — Very High</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Species */}
                <div className="mt-8 pt-6 border-t border-base-300 flex items-center gap-3 text-sm text-base-content/50">
                  <FlaskConical size={14} className="shrink-0" />
                  <span>
                    Primary vector:{" "}
                    <span className="italic text-base-content/70">
                      {state.species}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Zone context — uses data from BOTH JSONs */}
            {siblings.length > 0 && (
              <div className="card bg-base-200 border border-base-300 animate-fade-up delay-300">
                <div className="card-body p-7">
                  <h3 className="font-heading font-bold text-base-content mb-1">
                    Other States in {state.zone}
                  </h3>
                  <p className="text-xs text-base-content/45 mb-5">
                    States in the same zone with resistance data
                  </p>
                  <div className="space-y-2">
                    {siblings.map((sib) => (
                      <Link
                        key={sib.id}
                        href={`/results/${sib.id}`}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 bg-base-300/50 hover:bg-base-300 transition-colors group"
                      >
                        <div className="flex-1 flex items-center gap-3">
                          <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{
                              backgroundColor: getResistanceHex(
                                sib.resistance_level,
                              ),
                            }}
                          />
                          <span className="font-heading font-semibold text-sm text-base-content">
                            {sib.state}
                          </span>
                          <span
                            className={`text-xs font-mono ${getResistanceTextClass(sib.resistance_level)}`}
                          >
                            {formatFrequency(sib.mutation_frequency)}
                          </span>
                        </div>
                        <span
                          className={`badge badge-sm ${getResistanceBadgeClass(sib.resistance_level)} font-heading`}
                        >
                          {getResistanceLevelLabel(sib.resistance_level)}
                        </span>
                        <ChevronRight
                          size={14}
                          className="text-base-content/20 group-hover:text-primary transition-colors shrink-0"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column — Recommendation */}
          <div className="space-y-6">
            <div className="animate-fade-up delay-300">
              <h2 className="font-heading font-bold text-lg text-base-content mb-4">
                Intervention Recommendation
              </h2>
              <RecommendationPanel
                recommendation={state.recommendation}
                recommendation_level={state.recommendation_level}
              />
            </div>

            {/* Resistance level quick reference */}
            <div className="card bg-base-200 border border-base-300 animate-fade-up delay-400">
              <div className="card-body p-6">
                <h3 className="font-heading font-semibold text-sm text-base-content mb-4">
                  Resistance Level Thresholds
                </h3>
                <div className="space-y-2.5">
                  {[
                    {
                      range: "≥ 75%",
                      label: "Very High",
                      bar: "bg-error",
                      active: state.mutation_frequency >= 0.75,
                    },
                    {
                      range: "50–74%",
                      label: "High",
                      bar: "bg-warning",
                      active:
                        state.mutation_frequency >= 0.5 &&
                        state.mutation_frequency < 0.75,
                    },
                    {
                      range: "< 50%",
                      label: "Moderate",
                      bar: "bg-info",
                      active: state.mutation_frequency < 0.5,
                    },
                  ].map(({ range, label, bar, active }) => (
                    <div
                      key={label}
                      className={[
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                        active
                          ? "bg-base-300 ring-1 ring-base-content/10"
                          : "opacity-40",
                      ].join(" ")}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${bar}`}
                      />
                      <span className="font-heading font-semibold text-sm text-base-content flex-1">
                        {label}
                      </span>
                      <span className="font-mono text-xs text-base-content/50">
                        {range}
                      </span>
                      {active && (
                        <span className="text-xs font-bold text-primary">
                          ← This state
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data source card */}
            <div className="rounded-xl border border-base-300 p-5 text-xs text-base-content/45 space-y-2 animate-fade-up delay-500">
              <div className="flex items-start gap-2">
                <ExternalLink size={12} className="mt-0.5 shrink-0" />
                <div className="space-y-1.5">
                  <p>
                    Data:{" "}
                    <a
                      href="https://www.malariagen.net"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-base-content/70 text-primary"
                    >
                      MalariaGEN Ag3.12
                    </a>{" "}
                    whole-genome sequences · Nigeria {state.year}
                  </p>
                  <p>
                    Recommendations align with WHO Insecticide Resistance
                    Management Guidelines (2016, updated 2023).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── State navigation ──────────────────────────────────── */}
        <div className="flex items-center justify-between pt-10 border-t border-base-300 no-print animate-fade-up delay-500">
          {prev ? (
            <Link
              href={`/results/${prev.id}`}
              className="flex items-center gap-3 group hover:text-primary transition-colors"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform text-base-content/40 group-hover:text-primary"
              />
              <div>
                <p className="text-xs text-base-content/40 uppercase tracking-wider font-mono">
                  Previous
                </p>
                <p className="font-heading font-bold text-base-content group-hover:text-primary transition-colors">
                  {prev.state} State
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/explore"
            className="btn btn-ghost btn-sm text-base-content/40 text-xs font-mono hidden sm:flex"
          >
            All States
          </Link>

          {next ? (
            <Link
              href={`/results/${next.id}`}
              className="flex items-center gap-3 group hover:text-primary transition-colors text-right"
            >
              <div>
                <p className="text-xs text-base-content/40 uppercase tracking-wider font-mono">
                  Next
                </p>
                <p className="font-heading font-bold text-base-content group-hover:text-primary transition-colors">
                  {next.state} State
                </p>
              </div>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform text-base-content/40 group-hover:text-primary"
              />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
