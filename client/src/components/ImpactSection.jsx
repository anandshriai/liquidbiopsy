import { useEffect, useState } from "react";
import useInView from "../hooks/useInView";

const metrics = [
  { value: 10000, suffix: "+", label: "Patients Monitored" },
  { value: 95, suffix: "%", label: "Prediction Accuracy" },
  { value: 3, suffix: "", label: "Countries" },
];

function useCountUp(target, duration, active) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();

    function frame(now) {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }, [target, duration, active]);

  return count;
}

function Stat({ metric, active }) {
  const raw = useCountUp(metric.value, 2200, active);
  const display = metric.value >= 10000 ? `${Math.floor(raw / 1000)}K` : raw;

  return (
    <div className="text-center">
      <p className="text-5xl font-extrabold tabular-nums text-white sm:text-6xl">
        {display}
        {metric.suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-400">{metric.label}</p>
    </div>
  );
}

export default function ImpactSection() {
  const [ref, inView] = useInView({ threshold: 0.35 });

  return (
    <section id="impact" className="scroll-mt-20 bg-slate-950 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Impact
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Measured outcomes, real lives
          </h2>
        </div>

        <div
          ref={ref}
          className="mx-auto mt-16 grid max-w-3xl gap-12 sm:grid-cols-3"
        >
          {metrics.map((m) => (
            <Stat key={m.label} metric={m} active={inView} />
          ))}
        </div>

        <p className="mx-auto mt-14 max-w-xl text-center text-sm leading-relaxed text-slate-500">
          Our platform is actively deployed across three countries, delivering
          clinically validated predictions with industry-leading accuracy.
        </p>
      </div>
    </section>
  );
}