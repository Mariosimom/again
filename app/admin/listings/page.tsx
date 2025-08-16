"use client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then(r=>r.json());

export default function ListingsAdmin() {
  const { data, mutate } = useSWR("/api/listings", fetcher);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ title:"", type:"Apartment", location:"Dubai", price:2000000, bedrooms:2, bathrooms:2, area:1200, images:"" });

  async function create() {
    const payload = { ...form, images: form.images ? form.images.split(",").map(s=>s.trim()) : [] , features: [], amenities: [] };
    await fetch("/api/listings", { method: "POST", headers: { "Content-Type":"application/json" }, body: JSON.stringify(payload) });
    setShowNew(false);
    setForm({ title:"", type:"Apartment", location:"Dubai", price:2000000, bedrooms:2, bathrooms:2, area:1200, images:"" });
    mutate();
  }

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Listings</h1>
        <button onClick={()=>setShowNew(v=>!v)} className="btn btn-primary">+ New</button>
      </div>
      {showNew && (
        <div className="card p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <input className="input" placeholder="Type" value={form.type} onChange={e=>setForm({...form, type:e.target.value})} />
          <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} />
          <input className="input" type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})} />
          <input className="input" type="number" placeholder="Bedrooms" value={form.bedrooms} onChange={e=>setForm({...form, bedrooms:Number(e.target.value)})} />
          <input className="input" type="number" placeholder="Bathrooms" value={form.bathrooms} onChange={e=>setForm({...form, bathrooms:Number(e.target.value)})} />
          <input className="input" type="number" placeholder="Area m²" value={form.area} onChange={e=>setForm({...form, area:Number(e.target.value)})} />
          <input className="input md:col-span-3" placeholder="Images (comma-separated URLs)" value={form.images} onChange={e=>setForm({...form, images:e.target.value})} />
          <div className="md:col-span-3">
            <button onClick={create} className="btn btn-primary">Create</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-3">
        {data.map((l:any)=>(
          <div key={l.id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{l.title}</div>
              <div className="text-sm text-slate-900/70">{l.location} · {l.type} · {l.price.toLocaleString()} AED</div>
            </div>
            <a className="btn btn-outline" href={`/admin/listings/${l.id}`}>Edit</a>
          </div>
        ))}
      </div>
    </div>
  );
}
