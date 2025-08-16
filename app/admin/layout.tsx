export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container py-3 flex items-center justify-between">
          <div className="font-semibold">Admin · Prestige</div>
          <nav className="flex items-center gap-3 text-sm">
            <a href="/admin" className="underline">Dashboard</a>
            <a href="/admin/blocks" className="underline">Blocks</a>
            <a href="/admin/listings" className="underline">Listings</a>
            <a href="/admin/projects" className="underline">Projects</a>
          </nav>
        </div>
      </header>
      <main className="container py-6">{children}</main>
    </div>
  );
}
