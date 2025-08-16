"use client";
import useSWR from "swr";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then(r=>r.json());

export default function EditBlock() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const sp = useSearchParams();
  const del = sp.get("delete");
  const { data } = useSWR(`/api/blocks/${params.id}`, fetcher);
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(true);
  const [dataJson, setDataJson] = useState("{}");

  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setPublished(data.published);
      setDataJson(JSON.stringify(data.data || {}, null, 2));
    }
  }, [data]);

  useEffect(() => {
    if (del && data) {
      if (confirm("Delete this block?")) {
        fetch(`/api/blocks/${params.id}`, { method: "DELETE" }).then(()=> router.push("/admin/blocks"));
      } else {
        router.replace(`/admin/blocks/${params.id}`);
      }
    }
  }, [del, data, params?.id, router]);

  if (!data) return <div>Loading...</div>;

  async function save() {
    try {
      const parsed = JSON.parse(dataJson);
      await fetch(`/api/blocks/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ title, published, data: parsed })
      });
      router.push("/admin/blocks");
    } catch (e) {
      alert("Invalid JSON in Data");
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Edit Block</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="card p-4 space-y-3">
          <div className="space-y-1">
            <label className="label">Title</label>
            <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
          </div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={published} onChange={e=>setPublished(e.target.checked)} />
            <span>Published</span>
          </label>
          <div className="space-y-1">
            <label className="label">Data (JSON)</label>
            <textarea className="input min-h-[300px]" value={dataJson} onChange={e=>setDataJson(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="btn btn-primary">Save</button>
            <a href="/admin/blocks" className="btn btn-outline">Cancel</a>
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm mb-2">Help</div>
          <pre className="text-xs whitespace-pre-wrap">{`HERO: { "headline": "H1 text with <br/>", "sub": "subtitle", "image": "https://..." }
STATS: { "stats": [ { "label": "Price Growth", "value": "+12.5%" }, ... ] }
LISTINGS_GRID: { "items": [ Listing, Listing, ... ] }  // partial objects ok (id,title,price,images[])
PROJECTS_GRID: { "items": [ Project, Project, ... ] }
CUSTOM_HTML: { "html": "<p>Any custom markup</p>" }`}</pre>
        </div>
      </div>
    </div>
  );
}
