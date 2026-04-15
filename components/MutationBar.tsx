"use client";
import { useEffect, useRef, useState } from "react";
import { getMutationBarClass, formatFrequency } from "@/data/data";

interface Props {
  label: string;
  gene: string;
  frequency: number;
  description: string;
  delay?: number;
}

export default function MutationBar({
  label,
  gene,
  frequency,
  description,
  delay = 0,
}: Props) {
  const [filled, setFilled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pct = Math.round(frequency * 100);
  const barClass = getMutationBarClass(frequency);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setFilled(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const riskLabel = pct >= 75 ? "Critical" : pct >= 50 ? "High" : "Moderate";

  const riskTextClass =
    pct >= 75 ? "text-error" : pct >= 50 ? "text-warning" : "text-info";

  return (
    <div ref={ref} className="space-y-2.5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-heading font-semibold text-base-content text-sm leading-tight">
            {label}
          </p>
          <p className="font-mono text-xs text-base-content/40 mt-0.5">
            {gene}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p
            className={`font-heading font-black text-2xl leading-none ${riskTextClass}`}
          >
            {formatFrequency(frequency)}
          </p>
          <p className={`text-xs font-semibold mt-0.5 ${riskTextClass}`}>
            {riskLabel}
          </p>
        </div>
      </div>

      {/* Track */}
      <div className="w-full h-3 rounded-full bg-base-300 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${barClass}`}
          style={{ width: filled ? `${pct}%` : "0%" }}
        />
      </div>

      <p className="text-xs text-base-content/50 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
