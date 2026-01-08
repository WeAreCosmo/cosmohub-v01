import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg border p-6 space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">CosmoHub v0.1</p>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="text-sm text-muted-foreground">
            Placeholder page. Auth comes later (Supabase).
          </p>
        </div>

        <div className="rounded-md border p-3 text-sm text-muted-foreground">
          For now, jump straight to the dashboard.
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-white text-sm font-medium w-full"
        >
          Continue to Dashboard
        </Link>
      </div>
    </main>
  );
}
