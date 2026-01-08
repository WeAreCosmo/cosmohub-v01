"use client";

import { useMemo, useState } from "react";

type LockLevel = "locked" | "editable" | "optional";
type Placement = "Entry" | "Public" | "T&Cs";

type Clause = {
  key: string;
  title: string;
  body: string;
  required: boolean;
  lockLevel: LockLevel;
  placements: Placement[];
};

type TermsVersion = {
  versionNumber: number;
  status: "draft" | "published";
  approvedBy?: string;
  approvedAt?: string;
  clauses: Clause[];
};

const DEFAULT_CLAUSES: Clause[] = [
  {
    key: "promoter",
    title: "Promoter",
    required: true,
    lockLevel: "editable",
    placements: ["T&Cs"],
    body:
      "The promoter of this campaign is {PromoterName} (the “Promoter”).",
  },
  {
    key: "eligibility",
    title: "Eligibility",
    required: true,
    lockLevel: "editable",
    placements: ["Entry", "Public", "T&Cs"],
    body:
      "Entry is open to UK residents aged 18+. Employees of the Promoter and their immediate families are excluded.",
  },
  {
    key: "how_to_enter",
    title: "How to enter",
    required: true,
    lockLevel: "editable",
    placements: ["Entry", "T&Cs"],
    body:
      "Purchase a participating product and submit a valid claim via the campaign page during the campaign period. Limit: 1 entry per person unless otherwise stated.",
  },
  {
    key: "dates",
    title: "Campaign dates",
    required: true,
    lockLevel: "editable",
    placements: ["Entry", "Public", "T&Cs"],
    body:
      "The campaign opens on {StartDate} and closes on {EndDate} (Europe/London). Claims received outside this period will not be accepted.",
  },
  {
    key: "prize_details",
    title: "Reward / prize details",
    required: true,
    lockLevel: "editable",
    placements: ["Public", "T&Cs"],
    body:
      "Instant rewards: {InstantRewardDescription}. Prize draw: {PrizeDrawDescription}. No alternative is available unless stated otherwise.",
  },
  {
    key: "winner_selection",
    title: "Winner selection & notification",
    required: true,
    lockLevel: "editable",
    placements: ["T&Cs"],
    body:
      "Where a prize draw applies, winners will be selected at random from valid entries received during the campaign period. Winners will be notified within {NotifyDays} days and must claim within {ClaimWindowDays} days.",
  },
  {
    key: "cap_limits",
    title: "Caps & limits",
    required: false,
    lockLevel: "optional",
    placements: ["Entry", "Public", "T&Cs"],
    body:
      "Where rewards are capped, claims are valid while stocks last. The Promoter reserves the right to end rewards early once the cap is reached.",
  },
  {
    key: "fraud",
    title: "Fraud & disqualification",
    required: true,
    lockLevel: "editable",
    placements: ["T&Cs"],
    body:
      "The Promoter may disqualify any entry that appears to be fraudulent, duplicated, or otherwise not compliant with these Terms.",
  },
  {
    key: "privacy",
    title: "Privacy & data",
    required: true,
    lockLevel: "locked",
    placements: ["Entry", "T&Cs"],
    body:
      "Personal data will be processed in accordance with the Promoter’s Privacy Policy. Data will be used to administer the campaign and for fraud prevention. See: {PrivacyPolicyURL}.",
  },
  {
    key: "liability",
    title: "Liability",
    required: true,
    lockLevel: "locked",
    placements: ["T&Cs"],
    body:
      "Nothing in these Terms limits the Promoter’s liability for death or personal injury caused by negligence, fraud, or any liability that cannot be excluded by law.",
  },
  {
    key: "governing_law",
    title: "Governing law",
    required: true,
    lockLevel: "locked",
    placements: ["T&Cs"],
    body:
      "These Terms are governed by the laws of England and Wales and the courts of England and Wales shall have exclusive jurisdiction.",
  },
];

function nowISO() {
  return new Date().toISOString();
}

function isBlank(s: string) {
  return !s || s.trim().length === 0;
}

export default function TermsPage() {
  const [versions, setVersions] = useState<TermsVersion[]>([
    { versionNumber: 1, status: "draft", clauses: DEFAULT_CLAUSES },
  ]);
  const [activeVersionNumber, setActiveVersionNumber] = useState<number>(1);
  const [selectedKey, setSelectedKey] = useState<string>(DEFAULT_CLAUSES[0].key);
  const [approverName, setApproverName] = useState<string>("");

  const active = useMemo(
    () => versions.find((v) => v.versionNumber === activeVersionNumber)!,
    [versions, activeVersionNumber]
  );

  const selectedClause = useMemo(
    () => active.clauses.find((c) => c.key === selectedKey)!,
    [active, selectedKey]
  );

  const requiredFailures = useMemo(() => {
    return active.clauses
      .filter((c) => c.required)
      .filter((c) => isBlank(c.body))
      .map((c) => c.key);
  }, [active]);

  const canPublish =
    active.status === "draft" &&
    requiredFailures.length === 0 &&
    approverName.trim().length > 0;

  function updateClauseBody(key: string, nextBody: string) {
    setVersions((prev) =>
      prev.map((v) => {
        if (v.versionNumber !== activeVersionNumber) return v;
        return {
          ...v,
          clauses: v.clauses.map((c) => (c.key === key ? { ...c, body: nextBody } : c)),
        };
      })
    );
  }

  function resetClause(key: string) {
    const defaultClause = DEFAULT_CLAUSES.find((c) => c.key === key);
    if (!defaultClause) return;
    updateClauseBody(key, defaultClause.body);
  }

  function publish() {
    if (!canPublish) return;
    setVersions((prev) =>
      prev.map((v) =>
        v.versionNumber === activeVersionNumber
          ? {
              ...v,
              status: "published",
              approvedBy: approverName.trim(),
              approvedAt: nowISO(),
            }
          : v
      )
    );
  }

  function createNewDraftFromPublished() {
    // Create v(n+1) draft cloned from current active (even if published)
    const nextVersionNumber = Math.max(...versions.map((v) => v.versionNumber)) + 1;
    const cloned: TermsVersion = {
      versionNumber: nextVersionNumber,
      status: "draft",
      clauses: active.clauses.map((c) => ({ ...c })),
    };
    setVersions((prev) => [...prev, cloned]);
    setActiveVersionNumber(nextVersionNumber);
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-1">
          <p className="text-sm text-muted-foreground">CosmoHub v0.1</p>
          <h1 className="text-2xl font-semibold tracking-tight">Terms &amp; Conditions</h1>
          <p className="text-muted-foreground">
            Clause-based rails: required sections cannot be removed. Locked clauses cannot be edited.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="mt-2 text-lg font-semibold">
              v{active.versionNumber} — {active.status.toUpperCase()}
            </p>
            {active.status === "published" && (
              <p className="mt-2 text-sm text-muted-foreground">
                Approved by <span className="font-medium text-black">{active.approvedBy}</span> at{" "}
                {active.approvedAt}
              </p>
            )}
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Compliance checks</p>
            <p className="mt-2 text-lg font-semibold">
              {requiredFailures.length === 0 ? "All required clauses present ✅" : "Action needed ⚠️"}
            </p>
            {requiredFailures.length > 0 && (
              <p className="mt-2 text-sm text-muted-foreground">
                Missing content in: {requiredFailures.join(", ")}
              </p>
            )}
          </div>

          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Versions</p>
              <button
                className="rounded-md border px-3 py-1.5 text-sm font-medium"
                onClick={createNewDraftFromPublished}
              >
                New draft (v+1)
              </button>
            </div>

            <select
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={activeVersionNumber}
              onChange={(e) => setActiveVersionNumber(Number(e.target.value))}
            >
              {versions
                .slice()
                .sort((a, b) => b.versionNumber - a.versionNumber)
                .map((v) => (
                  <option key={v.versionNumber} value={v.versionNumber}>
                    v{v.versionNumber} — {v.status}
                  </option>
                ))}
            </select>

            <div className="space-y-2">
              <label className="text-sm font-medium">Approver name</label>
              <input
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder="e.g. Ben Cook"
                value={approverName}
                onChange={(e) => setApproverName(e.target.value)}
                disabled={active.status === "published"}
              />
            </div>

            <button
              className={`w-full rounded-md px-4 py-2 text-sm font-medium ${
                canPublish ? "bg-black text-white" : "border text-muted-foreground"
              }`}
              onClick={publish}
              disabled={!canPublish}
            >
              Approve &amp; Publish
            </button>

            <p className="text-xs text-muted-foreground">
              Publishing locks the version. Edits happen in a new draft.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[320px_1fr]">
          {/* Clause list */}
          <aside className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Clauses</h2>
              <span className="text-xs text-muted-foreground">{active.clauses.length}</span>
            </div>

            <div className="space-y-2">
              {active.clauses.map((c) => {
                const selected = c.key === selectedKey;
                const missing = c.required && isBlank(c.body);
                return (
                  <button
                    key={c.key}
                    onClick={() => setSelectedKey(c.key)}
                    className={`w-full text-left rounded-md border px-3 py-2 text-sm ${
                      selected ? "bg-gray-50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{c.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {missing ? "⚠️" : "✅"}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap gap-2">
                      {c.required && (
                        <span className="text-xs rounded-full border px-2 py-0.5">Required</span>
                      )}
                      <span className="text-xs rounded-full border px-2 py-0.5">
                        {c.lockLevel.toUpperCase()}
                      </span>
                      {c.placements.map((p) => (
                        <span key={p} className="text-xs rounded-full border px-2 py-0.5">
                          {p}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Clause editor */}
          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{selectedClause.title}</h2>
                <p className="text-sm text-muted-foreground">
                  Key: <span className="font-mono">{selectedClause.key}</span> •{" "}
                  {selectedClause.required ? "Required" : "Optional"} •{" "}
                  {selectedClause.lockLevel.toUpperCase()}
                </p>
              </div>

              <button
                className="rounded-md border px-3 py-2 text-sm font-medium"
                onClick={() => resetClause(selectedClause.key)}
                disabled={active.status === "published"}
              >
                Reset to default
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Clause text</label>
              <textarea
                className="w-full min-h-[220px] rounded-md border p-3 text-sm font-mono"
                value={selectedClause.body}
                onChange={(e) => updateClauseBody(selectedClause.key, e.target.value)}
                disabled={active.status === "published" || selectedClause.lockLevel === "locked"}
              />
              {selectedClause.lockLevel === "locked" && (
                <p className="text-xs text-muted-foreground">
                  This clause is locked (must be displayed and cannot be edited in v0.1).
                </p>
              )}
            </div>

            <div className="rounded-md border p-3 text-sm text-muted-foreground">
              <p className="font-medium text-black">Display requirements</p>
              <p className="mt-1">
                This clause must appear on:{" "}
                <span className="font-medium">{selectedClause.placements.join(", ")}</span>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
