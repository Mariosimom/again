"use client";
import useSWR from "swr";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Block = {
  id: string;
  kind: "HERO" | "STATS" | "LISTINGS_GRID" | "PROJECTS_GRID" | "TESTIMONIALS" | "CUSTOM_HTML" | "LOGO_STRIP" | "INVESTOR_CALLOUT";
  title?: string | null;
  data: any;
  order: number;
  published: boolean;
};

const fetcher = (url: string) => fetch(url).then(r=>r.json());

function Row({ block }: { block: Block }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} className="card p-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button className="px-2 py-1 border rounded" {...attributes} {...listeners} aria-label="Drag">↕</button>
        <div>
          <div className="font-medium">{block.title || block.kind}</div>
          <div className="text-xs text-slate-900/60">Order: {block.order} · {block.published ? "Published" : "Draft"}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <a href={`/admin/blocks/${block.id}`} className="btn btn-outline">Edit</a>
        <a href={`/admin/blocks/${block.id}?delete=1`} className="btn btn-outline">Delete</a>
      </div>
    </div>
  );
}

export default function BlocksPage() {
  const { data, mutate } = useSWR<Block[]>("/api/blocks", fetcher);
  const [saving, setSaving] = useState(false);

  if (!data) return <div>Loading...</div>;

  async function onDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = data.findIndex(b=>b.id === active.id);
    const newIndex = data.findIndex(b=>b.id === over.id);
    const moved = arrayMove(data, oldIndex, newIndex).map((b, i) => ({ ...b, order: i }));
    mutate(moved, false);
  }

  async function saveOrder() {
    setSaving(true);
    await fetch("/api/blocks", { method: "PUT", body: JSON.stringify(data.map((b,i)=>({ id: b.id, order: i }))) });
    setSaving(false);
    mutate();
  }

  async function addBlock(kind: Block["kind"]) {
    const res = await fetch("/api/blocks", { method: "POST", headers: { "Content-Type":"application/json" }, body: JSON.stringify({ kind, data: {}, order: data.length }) });
    mutate();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Block Builder</h1>
        <div className="flex gap-2">
          <button onClick={saveOrder} className="btn btn-primary" disabled={saving}>{saving? "Saving..." : "Publish Order"}</button>
          <div className="relative">
            <select onChange={(e)=>{ if(e.target.value) addBlock(e.target.value as any); e.target.value=''; }} className="input">
              <option value="">+ Add Block</option>
              <option value="HERO">Hero</option>
              <option value="STATS">Stats</option>
              <option value="LISTINGS_GRID">Listings Grid</option>
              <option value="PROJECTS_GRID">Projects Grid</option>
              <option value="CUSTOM_HTML">Custom HTML</option>
            </select>
          </div>
        </div>
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={data.map(b=>b.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {data.sort((a,b)=>a.order-b.order).map(b => <Row key={b.id} block={b} />)}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
