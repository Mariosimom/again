import { prisma } from "@/lib/db";

export default async function AdminHome() {
  const [countListings, countProjects, countBlocks] = await Promise.all([
    prisma.listing.count(), prisma.project.count(), prisma.block.count()
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4"><div className="text-sm">Listings</div><div className="text-2xl font-semibold">{countListings}</div></div>
        <div className="card p-4"><div className="text-sm">Projects</div><div className="text-2xl font-semibold">{countProjects}</div></div>
        <div className="card p-4"><div className="text-sm">Blocks</div><div className="text-2xl font-semibold">{countBlocks}</div></div>
      </div>
      <div className="card p-4">
        <div className="text-sm mb-2">Quick Links</div>
        <div className="flex gap-3">
          <a href="/admin/listings" className="btn btn-outline">Manage Listings</a>
          <a href="/admin/projects" className="btn btn-outline">Manage Projects</a>
          <a href="/admin/blocks" className="btn btn-outline">Block Builder</a>
        </div>
      </div>
    </div>
  );
}
