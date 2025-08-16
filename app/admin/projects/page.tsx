"use client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then(r=>r.json());

export default function ProjectsAdmin() {
  const { data, mutate } = useSWR("/api/projects", fetcher);
  const [form, setForm] = useState({ title:"", type:"Luxury Development", location:"Dubai", priceFrom:3000000, units:100, images:"" });
  const [showNew, setShowNew] = useState(false);

  async function create() {
    const payload = { ...form, images: form.images ? form.images.split(",").map(s=>s.trim()) : [], features: [], amenities: [] };
    await fetch("/api/projects", { method: "POST", headers: { "Content-Type":"application/json" }, body: JSON.stringify(payload) });
    setShowNew(false);
    setForm({ title:"", type:"Luxury Development", location:"Dubai", priceFrom:3000000, units:100, images:"" });
    mutate();
  }

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <button onClick={()=>setShowNew(v=>!v)} className="btn btn-primary">+ New</button>
      </div>
      {showNew && (
        <div className="card p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <input className="input" placeholder="Type" value={form.type} onChange={e=>setForm({...form, type:e.target.value})} />
          <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} />
          <input className="input" type="number" placeholder="Price From" value={form.priceFrom} onChange={e=>setForm({...form, priceFrom:Number(e.target.value)})} />
          <input className="input" type="number" placeholder="Units" value={form.units} onChange={e=>setForm({...form, units:Number(e.target.value)})} />
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
              <div className="text-sm text-slate-900/70">{l.location} · {l.type} · From {l.priceFrom?.toLocaleString()} AED</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
