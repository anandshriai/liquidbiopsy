import useInView from "../hooks/useInView";

function RadioIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
      <path d="M7.76 16.24a6 6 0 0 1 0-8.49" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a4 4 0 0 1 4 4v1a3 3 0 0 1 2.5 5.1A3.5 3.5 0 0 1 17 19H7a3.5 3.5 0 0 1-1.5-6.9A3 3 0 0 1 8 7V6a4 4 0 0 1 4-4z" />
      <path d="M12 2v20" />
      <path d="M8 10h2" />
      <path d="M14 14h2" />
      <path d="M8 14h1" />
      <path d="M15 10h1" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

const steps = [
  {
    Icon: RadioIcon,
    num: "01",
    title: "Collect",
    body: "Continuous, non-invasive data capture from wearables, lab results, and EHR integrations — all streaming in real time.",
  },
  {
    Icon: BrainIcon,
    num: "02",
    title: "Analyze",
    body: "Our AI engine processes hundreds of biomarkers simultaneously, surfacing patterns invisible to the human eye.",
  },
  {
    Icon: TrendingUpIcon,
    num: "03",
    title: "Predict",
    body: "Risk scores and actionable insights are delivered to clinicians before conditions become critical.",
  },
];

export default function SolutionSection() {
  const [ref, inView] = useInView();

  return (
    <section id="solution" className="scroll-mt-20 bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Our Approach
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From raw data to life-saving predictions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            A streamlined three-step pipeline that turns continuous health data
            into early warnings.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          className="relative mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3"
        >
          {steps.map((step, i) => {
            const { Icon } = step;
            return (
              <div
                key={step.num}
                className={`group relative rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-700 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 ${
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                  <Icon />
                </div>

                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  Step {step.num}
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {step.body}
                </p>

                {/* Connector arrow (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-[18px] top-1/2 z-10 hidden -translate-y-1/2 text-slate-300 lg:block">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 7h12m0 0L8 2m5 5L8 12"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}