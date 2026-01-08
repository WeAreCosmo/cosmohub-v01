export default function DashboardPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="space-y-1">
          <p className="text-sm text-muted-foreground">Welcome, Team Cricut.</p>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Your campaigns, compliance status, and what we’re learning.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Active Campaigns</p>
            <p className="mt-2 text-2xl font-semibold">0</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Drafts</p>
            <p className="mt-2 text-2xl font-semibold">0</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Compliance Checks</p>
            <p className="mt-2 text-2xl font-semibold">—</p>
          </div>
        </section>

        <section className="rounded-lg border p-4">
          <h2 className="text-sm font-medium">Next</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Create campaign flow (name, dates, objective)</li>
            <li>Clause-based T&amp;Cs editor (rails + versioning)</li>
            <li>Mock insights panel (“What we’re learning”)</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
