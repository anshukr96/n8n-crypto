import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
        <div className="text-xl font-semibold tracking-tight">FlowForge</div>
        <div className="flex items-center gap-3">
          <Link to="/auth" className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20">
            Sign in
          </Link>
          <Link to="/create-workflow" className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300">
            Start building
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-16">
        <section className="mt-12 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-200">
              Crypto automation
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Launch price-aware trading workflows without touching infra.
            </h1>
            <p className="text-lg text-slate-200">
              Compose triggers and exchange actions, preview the graph, and ship an execution-ready workflow connected to your credentials.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/auth" className="rounded-lg bg-emerald-400 px-5 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-300">
                Get started
              </Link>
              <Link to="/dashboard" className="rounded-lg border border-white/20 px-5 py-3 text-base font-semibold hover:border-white/40 hover:bg-white/5">
                View workflows
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-emerald-500/20 backdrop-blur">
            <div className="mb-4 flex items-center justify-between text-sm text-emerald-100">
              <span>Live status</span>
              <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-xs font-semibold text-emerald-50">Synced</span>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-200">Trigger</p>
                <p className="text-lg font-semibold">Price crosses target</p>
                <p className="text-sm text-slate-400">Start the flow when an asset hits a threshold.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-200">Actions</p>
                <p className="text-lg font-semibold">Execute on exchanges</p>
                <p className="text-sm text-slate-400">Route orders to Hyperliquid, Backpack or Lighter.</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                Built for operators who need reliable automation.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Secure auth', desc: 'JWT backed sessions for every API call.', accent: 'border-emerald-500/50' },
            { title: 'Workflow graph', desc: 'Visual builder powered by React Flow.', accent: 'border-blue-400/50' },
            { title: 'Execution audit', desc: 'Track every run with timestamps.', accent: 'border-amber-400/50' },
          ].map((item) => (
            <div key={item.title} className={`rounded-xl border ${item.accent} bg-white/5 p-4`}>
              <p className="text-sm text-slate-200">{item.title}</p>
              <p className="text-base text-slate-300">{item.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
