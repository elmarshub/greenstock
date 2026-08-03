import { AccountSettings } from "@stackframe/stack";

export default function DashboardSettingsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account, security, and profile details.
        </p>
      </div>
      <AccountSettings fullPage={false} />
    </div>
  );
}
