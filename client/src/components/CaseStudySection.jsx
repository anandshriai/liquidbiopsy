import useInView from "../hooks/useInView";

function ArrowUpRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

const studies = [
  {
    tag: "Cardiology",
    tagColors: "bg-rose-50 text-rose-600",
    title: "Early Detection of Atrial Fibrillation in Rural Clinics",
    summary:
      "A network of 12 rural clinics used VitalAI to screen 2,400 patients over 6 months, identifying 18% more cases of undiagnosed atrial fibrillation compared to traditional methods.",
    before: "4.2% detection rate",
    after: "22.6% detection rate",
  },
  {
    tag: "Diabetes",
    tagColors: "bg-amber-50 text-amber-600",
    title: "Predicting Diabetic Ketoacidosis 48 Hours in Advance",
    summary:
      "Partnering with a regional hospital, our model analyzed continuous glucose-monitor data alongside lab panels to forecast DKA episodes with 93% sensitivity.",
    before: "Reactive ER admissions",
    after: "48-hour advance warning",
  },
];

export default function CaseStudySection() {
  const [ref, inView] = useInView();

  return (
    <section id="cases" className="scroll-mt-20 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Case Studies
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Stories from the field
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Real-world evidence of how predictive monitoring is changing patient
            outcomes.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2"
        >
          {studies.map((cs, i) => (
            <article
              key={cs.title}
              className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-700 hover:shadow-lg ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Before → After bar */}
              <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/60">
                <div className="px-6 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Before
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {cs.before}
                  </p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                    After
                  </p>
                  <p className="mt-1 text-sm font-medium text-emerald-700">
                    {cs.after}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 lg:p-8">
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-semibold ${cs.tagColors}`}
                >
                  {cs.tag}
                </span>

                <h3 className="mt-4 text-lg font-bold leading-snug text-slate-900">
                  {cs.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {cs.summary}
                </p>

                <a
                  href="#"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                >
                  Read Story
                  <ArrowUpRightIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}