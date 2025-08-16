"use client";
import useSWR from "swr";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then(r=>r.json());

export default function EditListing() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data } = useSWR(`/api/listings/${id}`, fetcher);
  const [form, setForm] = useState<any>(null);

  useEffect(()=>{ if (data) setForm({ ...data, images: (data.images||[]).join(", ") }); }, [data]);
  if (!form) return <div>Loading...</div>;

  async function save() {
    const payload = { ...form, images: form.images ? form.images.split(",").map((s:string)=>s.trim()) : [] };
    await fetch(`/api/listings/${id}`, { method: "PATCH", headers: { "Content-Type":"application/json" }, body: JSON.stringify(payload) });
    router.push("/admin/listings");
  }
  async function remove() {
    if (!confirm("Delete this listing?")) return;
    await fetch(`/api/listings/${id}`, { method: "DELETE" });
    router.push("/admin/listings");
  }

  function input(name: string, props: any = {}) {
    return <input className="input" value={form[name] ?? ""} onChange={(e)=>setForm({...form, [name]: e.target.value})} {...props} />;
  }
  function number(name: string, props: any = {}) {
    return <input className="input" type="number" value={form[name] ?? 0} onChange={(e)=>setForm({...form, [name]: Number(e.target.value)})} {...props} />;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Edit Listing</h1>
      <div className="card p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {input("title", { placeholder:"Title" })}
        {input("type", { placeholder:"Type" })}
        {input("location", { placeholder:"Location" })}
        {number("price", { placeholder:"Price" })}
        {number("bedrooms", { placeholder:"Bedrooms" })}
        {number("bathrooms", { placeholder:"Bathrooms" })}
        {number("area", { placeholder:"Area m²" })}
        <input className="input md:col-span-3" placeholder="Images (comma-separated URLs)" value={form.images} onChange={(e)=>setForm({...form, images:e.target.value})} />
        <div className="md:col-span-3 flex gap-2">
          <button onClick={save} className="btn btn-primary">Save</button>
          <button onClick={remove} className="btn btn-outline">Delete</button>
          <a href="/admin/listings" className="btn btn-outline">Back</a>
        </div>
      </div>
    </div>
  );
}
