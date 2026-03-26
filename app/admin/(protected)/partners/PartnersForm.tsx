"use client";

import { useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { PartnerItem } from "@/lib/types";
import { savePartnersAction } from "./actions";

export default function PartnersForm({ partners }: { partners: PartnerItem[] }) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-8">
      {/* 추가 폼 */}
      <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-6">
        <p className="text-xs font-mono tracking-widest uppercase text-[#a1a1a1] mb-4">
          협력사 추가
        </p>
        <form
          action={async (fd) => {
            fd.append("action", "add");
            await savePartnersAction(fd);
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="flex gap-3"
        >
          <input
            ref={inputRef}
            name="name"
            type="text"
            required
            placeholder="협력사명 입력"
            className="flex-1 bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2.5 outline-none focus:border-[#c8ff00] transition-colors placeholder:text-[#444]"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest uppercase px-5 py-2.5 hover:bg-[#d4ff33] transition-colors"
          >
            <Plus size={13} />
            추가
          </button>
        </form>
      </div>

      {/* 목록 */}
      <div className="border border-[#1e1e1e]">
        <div className="px-4 py-3 border-b border-[#1e1e1e]">
          <span className="text-xs font-mono tracking-widest uppercase text-[#a1a1a1]">
            협력사 목록 ({partners.length})
          </span>
        </div>

        {partners.length === 0 && (
          <div className="px-4 py-8 text-center text-xs text-[#444] font-mono tracking-widest uppercase">
            등록된 협력사가 없습니다
          </div>
        )}

        <ul className="divide-y divide-[#1e1e1e]">
          {partners.map((partner) => (
            <li key={partner.id} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-[#ddd9d9]">{partner.name}</span>
              <form
                action={async (fd) => {
                  fd.append("action", "delete");
                  fd.append("id", partner.id);
                  await savePartnersAction(fd);
                }}
              >
                <button
                  type="submit"
                  className="text-[#444] hover:text-[#ff3cac] transition-colors p-1"
                  title="삭제"
                >
                  <Trash2 size={14} />
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-[#444] font-mono tracking-wider">
        ✦ 마퀴 배너에 표시되는 순서는 목록 순서와 동일합니다.
      </p>
    </div>
  );
}
