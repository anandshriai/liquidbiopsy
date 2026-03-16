import { useState } from "react";

function SendIcon() {
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
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "organization", label: "Organization", type: "text" },
];

export default function CTASection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form payload:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", organization: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-slate-950 py-24 lg:py-32">
      <div className="mx-auto max-w-xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let's Talk
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Interested in a demo, partnership, or simply want to learn more?
            Drop us a line.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5 text-left">
          {fields.map((f) => (
            <div key={f.name}>
              <label
                htmlFor={f.name}
                className="mb-1.5 block text-xs font-medium text-slate-400"
              >
                {f.label}
              </label>
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                required
                value={form[f.name]}
                onChange={update}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40"
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-xs font-medium text-slate-400"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={form.message}
              onChange={update}
              className="w-full resize-none rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/30"
          >
            Send Message
            <SendIcon />
          </button>

          {submitted && (
            <p className="mt-2 text-center text-sm text-emerald-400">
              Thanks! We'll be in touch soon.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}