"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import type { ProductData, Product } from "@/lib/types";
import { saveProduct } from "./actions";

const inputCls = "w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2 outline-none focus:border-[#c8ff00] transition-colors";
const labelCls = "block text-[10px] font-mono tracking-widest uppercase text-[#a1a1a1] mb-1";

export default function ProductForm({ initial }: { initial: ProductData }) {
  const [data, setData] = useState<ProductData>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const update = (i: number, patch: Partial<Product>) =>
    setData((d) => ({ products: d.products.map((p, idx) => idx === i ? { ...p, ...patch } : p) }));

  const add = () =>
    setData((d) => ({
      products: [...d.products, {
        id: String(d.products.length + 1).padStart(2, "0"),
        name: "", tagline: "", desc: "", features: [], accent: "#c8ff00"
      }]
    }));

  const remove = (i: number) =>
    setData((d) => ({ products: d.products.filter((_, idx) => idx !== i) }));

  const addFeature = (i: number, val: string) => {
    if (!val.trim()) return;
    update(i, { features: [...data.products[i].features, val.trim()] });
  };

  const removeFeature = (i: number, f: number) =>
    update(i, { features: data.products[i].features.filter((_, idx) => idx !== f) });

  const handleSave = async () => {
    setStatus("saving");
    const res = await saveProduct(data);
    setStatus(res.success ? "saved" : "error");
    if (res.success) setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="max-w-2xl space-y-4">
      {data.products.map((p, i) => (
        <section key={i} className="border border-[#1e1e1e] bg-[#0d0d0d] p-6 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-[#c8ff00] tracking-widest">{p.id}</span>
            <button onClick={() => remove(i)}
              className="text-[#555] hover:text-[#ff3cac] transition-colors">
              <Trash2 size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>ID</label>
              <input className={inputCls} value={p.id}
                onChange={(e) => update(i, { id: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Accent Color</label>
              <div className="flex gap-2">
                <input className={inputCls} value={p.accent}
                  onChange={(e) => update(i, { accent: e.target.value })} />
                <input type="color" value={p.accent}
                  onChange={(e) => update(i, { accent: e.target.value })}
                  className="w-10 h-[38px] border border-[#1e1e1e] bg-[#080808] cursor-pointer shrink-0" />
              </div>
            </div>
          </div>

          <div>
            <label className={labelCls}>제품명</label>
            <input className={inputCls} value={p.name}
              onChange={(e) => update(i, { name: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>태그라인</label>
            <input className={inputCls} value={p.tagline}
              onChange={(e) => update(i, { tagline: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>설명</label>
            <textarea rows={3} className={inputCls + " resize-none"} value={p.desc}
              onChange={(e) => update(i, { desc: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>기능 목록</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {p.features.map((f, fi) => (
                <span key={fi} className="flex items-center gap-1 font-mono text-[10px] border border-[#1e1e1e] text-[#d1d1d1] px-2 py-0.5">
                  {f}
                  <button onClick={() => removeFeature(i, fi)} className="text-[#555] hover:text-[#ff3cac]">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <input
              className={inputCls}
              placeholder="기능 입력 후 Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addFeature(i, e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
        </section>
      ))}

      <button onClick={add}
        className="w-full border border-dashed border-[#1e1e1e] py-3 text-xs text-[#a1a1a1] hover:text-[#c8ff00] hover:border-[#c8ff00]/40 transition-colors flex items-center justify-center gap-2">
        <Plus size={13} /> 제품 추가
      </button>

      <SaveButton status={status} onClick={handleSave} />
    </div>
  );
}

function SaveButton({ status, onClick }: { status: string; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={status === "saving"}
      className="bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest uppercase px-8 py-3 hover:bg-[#d4ff33] transition-colors disabled:opacity-50">
      {status === "saving" ? "저장 중..." : status === "saved" ? "저장됨 ✓" : status === "error" ? "오류 발생" : "저장"}
    </button>
  );
}
