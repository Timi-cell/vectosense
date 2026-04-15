"use client";
import { useState, useMemo } from "react";
import { ALL_STATES, ALL_ZONES, ZONE_NAMES } from "@/data/data";
import StateCard from "@/components/StateCard";
import { Search, LayoutGrid, AlertTriangle } from "lucide-react";

const ALL_TAB = "All Zones";

export default function ExplorePage() {
  const [activeZone, setActiveZone] = useState<string>(ALL_TAB);
  const [query, setQuery] = useState("");

  // States in the selected zone that have resistance data
  const filtered = useMemo(() => {
    let base = ALL_STATES;

    if (activeZone !== ALL_TAB) {
      // Get state names in this zone from regions.json
      const zoneEntry = ALL_ZONES.find((z) => z.region === activeZone);
      const zoneStateNames = new Set(
        (zoneEntry?.states ?? []).map((s) => s.name.toLowerCase()),
      );
      base = base.filter((s) => zoneStateNames.has(s.state.toLowerCase()));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      base = base.filter((s) => s.state.toLowerCase().includes(q));
    }

    return base;
  }, [activeZone, query]);

  const criticalCount = ALL_STATES.filter(
    (s) => s.recommendation_level === "critical",
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Page header */}
      <div className="mb-10 animate-fade-up">
        <p className="text-xs font-mono text-base-content/60 uppercase tracking-widest mb-3">
          MalariaGEN Ag3.12 · Nigeria
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-black text-base-content mb-3">
          Resistance Explorer
        </h1>
        <p className="text-base-content/60 text-lg max-w-2xl">
          Filter by geopolitical zone to see genomic resistance profiles for
          Nigerian states. Click any state card to view its full intelligence
          briefing.
        </p>
      </div>

      {/* Critical states alert */}
      {criticalCount > 0 && (
        <div className="flex items-start gap-3 bg-error/8 border border-error/25 rounded-xl px-5 py-4 mb-8 animate-fade-up delay-100">
          <AlertTriangle
            size={16}
            className="text-error mt-0.5 shrink-0 animate-pulse"
          />
          <div>
            <p className="font-heading font-bold text-sm text-error">
              {criticalCount} state{criticalCount > 1 ? "s" : ""} at critical
              resistance. The standard LLINs are failing.
            </p>
            <p className="text-xs text-base-content/55 mt-1">
              Immediate upgrade to PBO or Dual-AI nets is required in{" "}
              <span className="font-semibold text-base-content">
                {ALL_STATES.filter((s) => s.recommendation_level === "critical")
                  .map((s) => s.state)
                  .join(" and ")}
              </span>
              .
            </p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-up delay-200">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
          />
          <input
            type="text"
            placeholder="Search state..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered input-sm h-10 pl-9 w-full text-sm"
          />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-base-content/40">
          <LayoutGrid size={13} />
          <span>
            {filtered.length} of {ALL_STATES.length} states
          </span>
        </div>
      </div>

      {/* Zone filter tabs — from regions.json */}
      <div className="flex flex-wrap gap-2 mb-10 animate-fade-up delay-300">
        {[ALL_TAB, ...ZONE_NAMES].map((zone) => {
          // Count how many states in this zone have resistance data
          const count =
            zone === ALL_TAB
              ? ALL_STATES.length
              : (ALL_ZONES.find((z) => z.region === zone)?.states.filter((s) =>
                  ALL_STATES.some(
                    (r) => r.state.toLowerCase() === s.name.toLowerCase(),
                  ),
                ).length ?? 0);

          return (
            <button
              key={zone}
              onClick={() => setActiveZone(zone)}
              className={[
                "btn btn-sm rounded-full gap-2 font-heading font-semibold transition-all",
                activeZone === zone
                  ? "btn-primary"
                  : "btn-ghost border border-base-300 text-base-content/60 hover:text-base-content",
              ].join(" ")}
            >
              {zone}
              <span
                className={[
                  "badge badge-sm font-mono",
                  activeZone === zone
                    ? "badge-primary-content bg-primary-content/20 text-primary-content"
                    : "badge-ghost",
                ].join(" ")}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* State grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((state, i) => (
            <div
              key={state.id}
              className="animate-fade-up"
              style={{ animationDelay: `${0.35 + i * 0.06}s` }}
            >
              <StateCard state={state} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-dashed border-base-300 rounded-2xl">
          <p className="font-heading font-bold text-base-content/30 text-xl mb-2">
            No resistance data for this zone/state yet!
          </p>
          <p className="text-base font-heading text-base-content/50">Check back later.</p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-14 grid sm:grid-cols-3 gap-4 pt-10 border-t border-base-300">
        {[
          {
            dot: "bg-error",
            label: "Very High Resistance",
            desc: "kdr L995F ≥ 75% · Critical / Dual-AI nets required",
          },
          {
            dot: "bg-warning",
            label: "High Resistance",
            desc: "kdr L995F 50–74% · PBO or Dual-AI nets recommended",
          },
          {
            dot: "bg-info",
            label: "Moderate Resistance",
            desc: "kdr L995F < 50% · PBO nets advised, monitor closely",
          },
        ].map(({ dot, label, desc }) => (
          <div key={label} className="flex items-start gap-3">
            <div className={`w-3 h-3 rounded-full ${dot} mt-0.5 shrink-0`} />
            <div>
              <p className="font-heading font-semibold text-sm text-base-content">
                {label}
              </p>
              <p className="text-xs text-base-content/50 mt-0.5 leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
