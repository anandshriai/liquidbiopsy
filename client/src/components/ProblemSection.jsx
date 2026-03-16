import useInView from "../hooks/useInView";

const stats = [
  { figure: "$4.1T", text: "Annual cost of chronic disease in the US alone" },
  { figure: "7 yrs", text: "Average delay between disease onset and diagnosis" },
  { figure: "1 in 3", text: "Adults living with an undiagnosed condition" },
];

export default function ProblemSection() {
  const [ref, inView] = useInView();

  return (
    <section className="scroll-mt-20 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={ref}
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            The Problem
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            <span className="text-emerald-500">80%</span> of chronic diseases
            <br className="hidden sm:block" /> are detected too late
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-500">
            Traditional diagnostics are reactive — they catch conditions after
            symptoms have already appeared. By then, treatment options are
            limited and costs have skyrocketed. Early detection isn't a luxury;
            it's a necessity.
          </p>
        </div>

        <div
          className={`mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-3 transition-all duration-700 delay-200 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {stats.map((s) => (
            <div
              key={s.figure}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center"
            >
              <p className="text-3xl font-bold text-slate-900">{s.figure}</p>
              <p className="mt-2 text-sm leading-snug text-slate-500">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}