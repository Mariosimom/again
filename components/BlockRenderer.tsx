"use client";
import { Block, BlockKind, Listing, Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type BlockWithData = Block & { data: any };

export default function BlockRenderer({ blocks }: { blocks: BlockWithData[] }) {
  return (
    <div className="space-y-10">
      {blocks.sort((a,b)=>a.order-b.order).map((b) => {
        switch (b.kind) {
          case "HERO": {
            const { headline, sub, image } = b.data || {};
            return (
              <section key={b.id} className="relative py-24 text-white">
                <div className="absolute inset-0">
                  <Image src={image || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80"} alt="Hero" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="container relative text-center">
                  <div className="inline-flex mb-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur">{b.title || "Dubai's Premier Real Estate Destination"}</div>
                  <h1 className="text-4xl md:text-6xl font-semibold" dangerouslySetInnerHTML={{ __html: headline || "Exceptional Properties.<br/>Extraordinary Living." }} />
                  <p className="mt-4 opacity-90 max-w-2xl mx-auto">{sub || "Discover exclusive luxury properties across Dubai's most prestigious locations."}</p>
                  <div className="mt-8 flex items-center justify-center gap-3">
                    <a href="#listings" className="btn btn-primary">Explore Properties</a>
                  </div>
                </div>
              </section>
            );
          }
          case "STATS": {
            const stats = b.data?.stats || [];
            return (
              <section key={b.id}>
                <div className="container grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((s: any, i: number) => (
                    <div key={i} className="card p-4 text-center">
                      <div className="text-2xl font-semibold">{s.value}</div>
                      <div className="text-slate-900/70">{s.label}</div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }
          case "CUSTOM_HTML": {
            return (
              <section key={b.id}>
                <div className="container">
                  <div className="card p-6" dangerouslySetInnerHTML={{ __html: b.data?.html || "" }} />
                </div>
              </section>
            );
          }
          case "LISTINGS_GRID": {
            const items: Listing[] = b.data?.items || [];
            return (
              <section key={b.id} id="listings">
                <div className="container">
                  <h2 className="text-2xl font-semibold mb-3">{b.title || "Featured Luxury Properties"}</h2>
                  <div className="grid-cards">
                    {items.map((p) => (
                      <article key={p.id} className="card overflow-hidden">
                        <div className="relative w-full pt-[60%]">
                          <Image src={(p.images?.[0]) || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"} alt={p.title} fill className="object-cover" />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">{p.title}</h3>
                          <div className="text-slate-900/70">{p.location}</div>
                          <div className="mt-2 font-semibold text-teal-600">{new Intl.NumberFormat("en-US").format(p.price)} AED</div>
                          <div className="mt-2 text-sm text-slate-900/70 flex flex-wrap gap-2">
                            <span>{p.bedrooms} Beds</span>
                            <span>{p.bathrooms} Baths</span>
                            <span>{p.area.toLocaleString()} m²</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            );
          }
          case "PROJECTS_GRID": {
            const items: Project[] = b.data?.items || [];
            return (
              <section key={b.id}>
                <div className="container">
                  <h2 className="text-2xl font-semibold mb-3">{b.title || "New Development Projects"}</h2>
                  <div className="grid-cards">
                    {items.map((p) => (
                      <article key={p.id} className="card overflow-hidden">
                        <div className="relative w-full pt-[60%]">
                          <Image src={(p.images?.[0]) || "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80"} alt={p.title} fill className="object-cover" />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">{p.title}</h3>
                          <div className="text-slate-900/70">{p.location}</div>
                          <div className="mt-2 text-sm text-slate-900/70 flex flex-wrap gap-2">
                            <span>{p.units || 0} Units</span>
                            <span>{p.completionDate || ""}</span>
                            <span>{p.type}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            );
          }
          default:
            return <div key={b.id} />;
        }
      })}
    </div>
  );
}
