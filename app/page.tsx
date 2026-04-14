import Link from "next/link";
import {
  ArrowRight,
  Database,
  Zap,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const stats = [
  { value: "720", label: "Mosquito Genomes", sub: "Whole genome sequences" },
  { value: "14", label: "Nigerian States", sub: "Covered in this release" },
  {
    value: "2022",
    label: "Field Collection",
    sub: "Most recent, yet stable MalariaGEN release",
  },
];

const problemCards = [
  {
    icon: AlertCircle,
    title: "Nassarawa-Eggon, Gombe",
    stat: "~0%",
    statLabel: "IRS impact on malaria cases",
    body: "A full IRS campaign was deployed and achieved statistically zero reduction in malaria case counts. The mosquitoes were already resistant. Nobody knew.",
    color: "text-error",
    bg: "bg-error/10 border-error/20",
  },
  {
    icon: TrendingUp,
    title: "Southern Gombe Sentinel Sites",
    stat: "39–70%",
    statLabel: "Deltamethrin mortality",
    body: "WHO resistance threshold is >98% mortality. Deltamethrin is killing as few as 39% of mosquitoes in some sites, meaning more than half walk away from treated nets.",
    color: "text-warning",
    bg: "bg-warning/10 border-warning/20",
  },
  {
    icon: Database,
    title: "The Data Gap",
    stat: "0",
    statLabel: "LGA officers with genomic access",
    body: "MalariaGEN's Ag3.12 release contains 720 Nigerian mosquito genomes from 2022. Zero of this data reaches the people making intervention decisions.",
    color: "text-info",
    bg: "bg-info/10 border-info/20",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden grid-texture py-10 md:py-15">
        <div className="absolute inset-0 bg-linear-to-b from-base-100 via-base-100/95 to-base-100 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          {/* <div className="inline-flex items-center gap-2 badge badge-outline badge-lg mb-6 fade-up fade-up-1">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            MalariaGEN Ag3.12 · Nigeria 2022 · 720 Genomes
          </div> */}

          <h1 className="heading text-4xl md:text-6xl lg:text-7xl font-bold text-base-content leading-tight mb-5 fade-up fade-up-2">
            Know Your <br /> Resistance Status.
            <br />
            <span className="text-primary">Protect Your People.</span>
          </h1>

          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto mb-5 leading-relaxed fade-up fade-up-3">
            VectoSense translates Nigeria&apos;s genomic mosquito resistance
            data into plain language recommendations so vector control officers
            know exactly which nets and insecticides will work in their
            region/state.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up fade-up-4">
            <Link
              href="/explore"
              className="btn btn-primary btn-lg gap-2 text-base md:text-lg"
            >
              Explore Data
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#problem"
              className="btn btn-outline btn-lg text-base md:text-lg hover:bg-red-500 hover:text-white"
            >
              See the Problem
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-base-200 border-y border-base-300 py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="heading text-3xl md:text-4xl font-bold text-primary">
                {s.value}
              </p>
              <p className="font-semibold text-base-content text-sm mt-1">
                {s.label}
              </p>
              <p className="text-xs text-base-content/50">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Problem */}
      <section id="problem" className="py-20 max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading text-3xl md:text-4xl font-bold text-base-content mb-3">
            The Problem Is Real
          </h2>
          <p className="text-base-content/60 max-w-xl mx-auto">
            These aren&apos;t hypothetical risks. These are documented failures
            happening right now in Nigerian states.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problemCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`card border ${card.bg} fade-up`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="card-body p-6">
                  <Icon size={20} className={card.color} />
                  <h3 className="heading font-bold text-base-content mt-2">
                    {card.title}
                  </h3>
                  <div className="my-3">
                    <span
                      className={`heading text-4xl font-black ${card.color}`}
                    >
                      {card.stat}
                    </span>
                    <p className="text-xs text-base-content/50 mt-1">
                      {card.statLabel}
                    </p>
                  </div>
                  <p className="text-sm text-base-content/70 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-base-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading text-3xl md:text-4xl font-bold text-base-content mb-3">
              How VectoSense Works
            </h2>
            <p className="text-base-content/60">
              Three steps. Immediate action.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Database,
                title: "Real Genomic Data",
                body: "We pre-process MalariaGEN's Ag3.12 whole-genome sequence data (720 mosquito genomes) from 14 Nigerian locations collected in 2022.",
              },
              {
                step: "02",
                icon: Zap,
                title: "Resistance Analysis",
                body: "Key resistance mutations are extracted and their population frequencies calculated for each region.",
              },
              {
                step: "03",
                icon: Users,
                title: "Plain Language Output",
                body: "Frequencies translate directly to net type and IRS recommendations (standard LLIN, PBO net, or dual-AI net) with the rationale a field officer can use.",
              },
            ].map(({ step, icon: Icon, title, body }) => (
              <div key={step} className="relative">
                <div className="heading text-8xl font-black text-base-content/5 absolute -top-4 -left-2">
                  {step}
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon size={25} className="text-primary" />
                  </div>
                  <h3 className="heading font-bold text-base-content text-lg mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-base-content/70 leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-5xl mx-auto px-4 text-center">
        <h2 className="heading text-3xl md:text-4xl font-bold text-base-content mb-4">
          Your Region. Your Data. Your Decision.
        </h2>
        <p className="text-base-content/60 mb-8 max-w-lg mx-auto">
          Select any Nigerian state and get an immediate, genomics-backed
          recommendation for your vector control programme.
        </p>
        <Link href="/explore" className="btn btn-primary btn-lg gap-2">
          Select Your State
          <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
}
