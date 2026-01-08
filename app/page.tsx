import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">CosmoHub v0.1</p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Compliance-led campaign management
          </h1>
          <p className="text-muted-foreground">
            Build campaigns with audit-friendly Terms &amp; Conditions and
            insight-first reporting.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-white text-sm font-medium"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium"
          >
            Login (placeholder)
          </Link>
        </div>

        <div className="rounded-md border p-4 text-sm text-muted-foreground">
          Scope note: v0.1 is intentionally limited. No automation, payments, or
          fulfilment integrations.
        </div>
      </div>
    </main>
  );
}
