export default function CreateCampaignPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="space-y-1">
          <p className="text-sm text-muted-foreground">CosmoHub v0.1</p>
          <h1 className="text-2xl font-semibold tracking-tight">Create campaign</h1>
          <p className="text-muted-foreground">
            Capture the facts first. We’ll use these to generate compliant Terms &amp; Conditions.
          </p>
        </header>

        <section className="rounded-lg border p-5 space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Campaign name</label>
              <input
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder='e.g. "F1. Sea Views. You."'
              />
              <p className="text-xs text-muted-foreground">
                Shown to internal users and used in documents.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Client / Team</label>
              <input
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder="e.g. Team Cricut"
              />
              <p className="text-xs text-muted-foreground">
                Used for access control later (v0.1: display only).
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start date</label>
              <input className="w-full rounded-md border px-3 py-2 text-sm" type="date" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">End date</label>
              <input className="w-full rounded-md border px-3 py-2 text-sm" type="date" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time zone</label>
              <select className="w-full rounded-md border px-3 py-2 text-sm">
                <option>Europe/London</option>
                <option>UTC</option>
                <option>America/New_York</option>
                <option>Europe/Paris</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Reward type</label>
              <select className="w-full rounded-md border px-3 py-2 text-sm">
                <option>Instant reward</option>
                <option>Prize draw</option>
                <option>Instant reward + prize draw</option>
              </select>
              <p className="text-xs text-muted-foreground">
                v0.1 uses this to determine which T&amp;C clauses are required.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Reward cap</label>
              <select className="w-full rounded-md border px-3 py-2 text-sm">
                <option>No cap (unlimited)</option>
                <option>Capped rewards (set a limit)</option>
              </select>
              <p className="text-xs text-muted-foreground">
                If capped, we’ll require “while stocks last” language and cap rules.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Headline objective</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder="e.g. Increase purchases in partner store / Launch new product / Drive repeat purchases"
            />
          </div>

          <div className="rounded-md border p-4 text-sm text-muted-foreground">
            <p className="font-medium text-black mb-1">Compliance note</p>
            <p>
              v0.1 will generate a T&amp;C draft using a clause system. Certain legally required
              clauses will be locked (editable wording allowed, but not removable).
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-md bg-black px-4 py-2 text-white text-sm font-medium">
              Save draft (placeholder)
            </button>

            <button className="rounded-md border px-4 py-2 text-sm font-medium">
              Generate T&amp;Cs (placeholder)
            </button>
          </div>
        </section>

        <section className="rounded-lg border p-5">
          <h2 className="text-sm font-medium">What happens next</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Campaign draft saved</li>
            <li>T&amp;Cs clauses selected based on campaign details</li>
            <li>Review gate: required sections locked, wording editable</li>
            <li>Export: hosted T&amp;Cs page + PDF (later)</li>
          </ul>
        </section>
      </div>
    </main>
  );
}