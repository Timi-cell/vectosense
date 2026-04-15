import Link from "next/link";
import {
  ArrowRight,
  Dna,
  MapPin,
  AlertTriangle,
  TrendingUp,
  Database,
} from "lucide-react";
import { ALL_STATES, STATS, formatFrequency } from "@/data/data";

// Derive top 3 critical states for the landing page showcase
const criticalStates = ALL_STATES.sort(
  (a, b) => b.mutation_frequency - a.mutation_frequency,
).slice(0, 3);

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center bg-dot-grid">
        <div className="absolute inset-0 bg-linear-to-b from-base-100/0 via-base-100/60 to-base-100 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-base-content/50 border border-base-300 rounded-full px-4 py-2 mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              MalariaGEN Ag3.12 · {STATS.totalStates} Nigerian States
            </div>

            <h1 className="font-heading text-5xl md:text-6xl xl:text-7xl font-black text-base-content leading-[1.05] tracking-tight mb-6 animate-fade-up delay-100">
              Know Your
              <br />
              <span className="text-primary">State&apos;s Data.</span>
              <br />
              Protect Your
              <br />
              <span className="text-primary">People.</span>
            </h1>

            <p className="text-base-content/65 text-lg leading-relaxed mb-10 max-w-lg animate-fade-up delay-200">
              VectoSense translates Nigeria&apos;s genomic mosquito resistance data
              into plain-language recommendations, so vector control officers
              know exactly which nets and insecticides work in their region.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Link
                href="/explore"
                className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
              >
                Explore Resistance Data
                <ArrowRight size={18} />
              </Link>
              <a
                href="#problem"
                className="btn btn-outline btn-lg text-base-content/60"
              >
                See the Evidence
              </a>
            </div>
          </div>

          {/* Right — live preview cards */}
          <div className="hidden lg:flex flex-col gap-3 animate-fade-up delay-400">
            <p className="text-xs font-mono text-base-content/30 uppercase tracking-widest mb-1">
              Highest resistance states
            </p>
            {criticalStates.map((state, i) => (
              <Link
                key={state.id}
                href={`/results/${state.id}`}
                className="group bg-base-200 border border-base-300 hover:border-primary/50 rounded-xl p-4 flex items-center gap-4 transition-all duration-200 hover:-translate-x-1"
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-heading font-black text-lg shrink-0"
                  style={{
                    background:
                      state.resistance_level === "very-high"
                        ? "oklch(var(--er) / 0.15)"
                        : "oklch(var(--wa) / 0.15)",
                    color:
                      state.resistance_level === "very-high"
                        ? "oklch(var(--er))"
                        : "oklch(var(--wa))",
                  }}
                >
                  {formatFrequency(state.mutation_frequency)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-semibold text-base-content truncate">
                    {state.state} State
                  </p>
                  <p className="text-xs text-base-content/50 font-mono">
                    {state.dominant_mutation} · {state.zone}
                  </p>
                </div>
                <ArrowRight
                  size={15}
                  className="text-base-content/20 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-base-200 border-y border-base-300 py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            {
              value: STATS.totalStates,
              label: "States Monitored",
              sub: "With genomic data",
            },
            {
              value: STATS.criticalStates,
              label: "Critical States",
              sub: "Immediate upgrade needed",
            },
            {
              value: `${Math.round(STATS.highestFreq * 100)}%`,
              label: "Peak kdr Frequency",
              sub: "Highest in dataset",
            },
            {
              value: STATS.dataYear,
              label: "Data Collected",
              sub: "MalariaGEN Ag3.12",
            },
          ].map(({ value, label, sub }) => (
            <div key={label}>
              <p className="font-heading text-4xl md:text-5xl font-black text-primary mb-1">
                {value}
              </p>
              <p className="font-heading font-semibold text-base-content text-sm">
                {label}
              </p>
              <p className="text-xs text-base-content/45 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Problem */}
      <section id="problem" className="py-24 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-base-content/40 mb-4">
            Documented Failures
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-black text-base-content mb-4">
            The Problem Is Real
          </h2>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg">
            These aren&apos;t hypothetical risks. These are documented intervention
            failures across Nigerian states caused by resistance nobody knew
            about.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: AlertTriangle,
              location: "Nassarawa-Eggon, Gombe",
              stat: "≈ 0%",
              statLabel: "IRS impact on malaria cases",
              body: "A full indoor residual spraying campaign was deployed and achieved statistically zero reduction in malaria cases. The mosquitoes were already resistant but no one at LGA level knew.",
              level: "critical",
            },
            {
              icon: TrendingUp,
              location: "Southern Gombe Sentinel Sites",
              stat: "39–70%",
              statLabel: "Deltamethrin mortality rate",
              body: "WHO threshold for effective control is >98% mosquito mortality. Deltamethrin is killing as few as 39% in some sites. The majority walk away from treated nets unharmed.",
              level: "high",
            },
            {
              icon: Database,
              location: "Nigeria LGA Level",
              stat: "0",
              statLabel: "Officers with genomic data access",
              body: "MalariaGEN's Ag3.12 release contains genomic sequences from Nigerian mosquito populations. Zero of this reaches the people making intervention decisions.",
              level: "info",
            },
          ].map(({ icon: Icon, location, stat, statLabel, body, level }) => {
            const colorMap = {
              critical: {
                bg: "bg-error/8 border-error/20",
                text: "text-error",
                icon: "text-error",
              },
              high: {
                bg: "bg-warning/8 border-warning/20",
                text: "text-warning",
                icon: "text-warning",
              },
              info: {
                bg: "bg-info/8 border-info/20",
                text: "text-info",
                icon: "text-info",
              },
            } as const;
            const colors = colorMap[level as keyof typeof colorMap];

            return (
              <div
                key={location}
                className={`rounded-2xl border p-7 ${colors.bg}`}
              >
                <Icon size={20} className={colors.icon} />
                <p className="font-mono text-xs text-base-content/40 mt-3 mb-1">
                  {location}
                </p>
                <p
                  className={`font-heading font-black text-5xl ${colors.text} my-2`}
                >
                  {stat}
                </p>
                <p className={`text-xs font-semibold ${colors.text} mb-4`}>
                  {statLabel}
                </p>
                <p className="text-sm text-base-content/65 leading-relaxed">
                  {body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-black text-base-content mb-4">
              How VectoSense Works
            </h2>
            <p className="text-base-content/60 max-w-lg mx-auto">
              Three steps from raw genomic data to field-ready action.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                icon: Database,
                title: "Real Genomic Data",
                body: `We pre-process MalariaGEN's Ag3.12 whole-genome sequence data: The real DNA from mosquitoes collected across ${STATS.zonesCount} geopolitical zones of Nigeria in ${STATS.dataYear}.`,
              },
              {
                step: "02",
                icon: Dna,
                title: "Resistance Analysis",
                body: `Key resistance mutations (${ALL_STATES[0]?.dominant_mutation ?? "kdr L995F"}) are extracted and their population frequencies calculated per state.`,
              },
              {
                step: "03",
                icon: MapPin,
                title: "Plain Language Output",
                body: "Frequencies translate directly to net type and IRS recommendations (standard LLIN, PBO net, or dual-AI net) in language any field officer can understand.",
              },
            ].map(({ step, icon: Icon, title, body }) => (
              <div key={step} className="relative">
                <p className="font-heading text-8xl font-black text-base-content/5 select-none absolute -top-6 -left-2">
                  {step}
                </p>
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-base-content text-xl mb-3">
                    {title}
                  </h3>
                  <p className="text-base-content/60 text-sm leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA  */}
      <section className="py-24 max-w-6xl mx-auto px-4 text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-black text-base-content mb-5">
          Your Region. Your Data.
          <br />
          <span className="text-primary">Your Decision.</span>
        </h2>
        <p className="text-base-content/55 text-lg mb-10 max-w-md mx-auto">
          Select any state and get an immediate, genomics-backed recommendation
          for your vector control programme.
        </p>
        <Link
          href="/explore"
          className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/20"
        >
          Open Resistance Map
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
