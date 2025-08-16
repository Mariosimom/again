import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";

function Price({ value }: { value?: number | null }) {
  if (!value) return null;
  const fm = new Intl.NumberFormat("en-US").format(value);
  return <span className="font-semibold text-teal-600">{fm} AED</span>;
}

export async function MarketingHome() {
  // Pull some data if present; otherwise show a nice static fallback
  const [listings, projects] = await Promise.all([
    prisma.listing.findMany({ take: 6, orderBy: { createdAt: "desc" } }).catch(()=>[]),
    prisma.project.findMany({ take: 6, orderBy: { createdAt: "desc" } }).catch(()=>[]),
  ]);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative py-24 text-white">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80"
            alt="Dubai skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative text-center">
          <div className="inline-flex mb-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur">
            Dubai&apos;s Premier Real Estate Destination
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold">
            Exceptional Properties.<br/>Extraordinary Living.
          </h1>
          <p className="mt-4 opacity-90 max-w-2xl mx-auto">
            Discover exclusive luxury properties in Dubai&apos;s most prestigious locations.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#listings" className="btn btn-primary">Explore Properties</a>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="py-12">
        <div className="container">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold">Featured Luxury Properties</h2>
            <p className="text-slate-900/70">Curated apartments, villas, and penthouses in prime locations.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(listings.length ? listings : [
              { id: "demo1", title: "Downtown Penthouse", location: "Downtown Dubai", price: 5200000, bedrooms: 3, bathrooms: 3, area: 2100, images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"] },
              { id: "demo2", title: "Palm Waterfront Villa", location: "Palm Jumeirah", price: 25000000, bedrooms: 5, bathrooms: 6, area: 8000, images: ["https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80"] },
              { id: "demo3", title: "Marina Sky Residence", location: "Dubai Marina", price: 3800000, bedrooms: 2, bathrooms: 2, area: 1400, images: ["https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1200&q=80"] }
            ]).map((p: any) => (
              <article key={p.id} className="card overflow-hidden">
                <div className="relative w-full pt-[60%]">
                  <Image src={(p.images?.[0]) || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"} alt={p.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <div className="text-slate-900/70">{p.location}</div>
                  <div className="mt-2"><Price value={p.price} /></div>
                  <div className="mt-2 text-sm text-slate-900/70 flex flex-wrap gap-2">
                    {p.bedrooms ? <span>{p.bedrooms} Beds</span> : null}
                    {p.bathrooms ? <span>{p.bathrooms} Baths</span> : null}
                    {p.area ? <span>{p.area.toLocaleString()} m²</span> : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-12">
        <div className="container">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold">New Development Projects</h2>
            <p className="text-slate-900/70">Top off‑plan launches with strong ROI.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(projects.length ? projects : [
              { id: "pr1", title: "Emaar Beachfront", location: "Dubai Harbour", images:["https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80"], units: 600, type: "Apartments", completionDate: "Q4 2027" },
              { id: "pr2", title: "Sobha Hartland", location: "MBR City", images:["https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1200&q=80"], units: 450, type: "Villas & Apts", completionDate: "Q2 2026" }
            ]).map((p: any) => (
              <article key={p.id} className="card overflow-hidden">
                <div className="relative w-full pt-[60%]">
                  <Image src={(p.images?.[0]) || "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80"} alt={p.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <div className="text-slate-900/70">{p.location}</div>
                  <div className="mt-2 text-sm text-slate-900/70 flex flex-wrap gap-2">
                    {p.units ? <span>{p.units} Units</span> : null}
                    {p.completionDate ? <span>{p.completionDate}</span> : null}
                    {p.type ? <span>{p.type}</span> : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
