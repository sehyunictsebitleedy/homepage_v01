import { getSession } from "@/lib/auth";
import { readUsers } from "@/lib/users";
import { redirect } from "next/navigation";
import {
  approveUserAction,
  rejectUserAction,
  changeRoleAction,
  toggleStatusAction,
} from "./actions";

export default async function UsersPage() {
  const session = await getSession();
  if (!session || (session.role !== "admin" && session.role !== "superadmin")) {
    redirect("/admin");
  }

  const users = readUsers();
  const pending = users.filter((u) => u.status === "pending");
  const others = users.filter((u) => u.status !== "pending");

  const STATUS_LABEL: Record<string, string> = {
    pending: "대기",
    active: "활성",
    disabled: "비활성",
  };
  const ROLE_LABEL: Record<string, string> = {
    admin: "Admin",
    editor: "Editor",
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c8ff00] mb-1">
          System
        </p>
        <h1 className="text-2xl font-black tracking-[-0.03em] text-[#f0f0f0]">
          User Management
        </h1>
      </div>

      {/* 승인 대기 */}
      {pending.length > 0 && (
        <section>
          <h2 className="font-mono text-xs tracking-widest uppercase text-[#ff3cac] mb-4 flex items-center gap-2">
            승인 대기
            <span className="bg-[#ff3cac] text-[#080808] text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
              {pending.length}
            </span>
          </h2>
          <div className="border border-[#1e1e1e] divide-y divide-[#1e1e1e]">
            {pending.map((u) => (
              <div key={u.id} className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#f0f0f0]">{u.username}</p>
                  <p className="text-xs text-[#666] mt-0.5">
                    신청일: {new Date(u.createdAt).toLocaleDateString("ko-KR")} · 신청 역할:{" "}
                    <span className="text-[#b5b5b5]">{ROLE_LABEL[u.role]}</span>
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <form action={approveUserAction} className="contents">
                    <input type="hidden" name="id" value={u.id} />
                    <input type="hidden" name="role" value={u.role} />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest uppercase hover:bg-[#d4ff33] transition-colors"
                    >
                      승인
                    </button>
                  </form>
                  <form action={rejectUserAction} className="contents">
                    <input type="hidden" name="id" value={u.id} />
                    <button
                      type="submit"
                      className="px-3 py-1.5 border border-[#333] text-[#b5b5b5] text-xs font-bold tracking-widest uppercase hover:border-[#ff3cac] hover:text-[#ff3cac] transition-colors"
                    >
                      거절
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 전체 사용자 */}
      <section>
        <h2 className="font-mono text-xs tracking-widest uppercase text-[#b5b5b5] mb-4">
          전체 사용자
        </h2>
        {others.length === 0 ? (
          <p className="text-xs text-[#666] py-4">등록된 사용자가 없습니다.</p>
        ) : (
          <div className="border border-[#1e1e1e] divide-y divide-[#1e1e1e]">
            {others.map((u) => (
              <div key={u.id} className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-[#f0f0f0]">{u.username}</p>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 border ${
                        u.status === "active"
                          ? "border-[#c8ff00] text-[#c8ff00]"
                          : "border-[#333] text-[#666]"
                      }`}
                    >
                      {STATUS_LABEL[u.status]}
                    </span>
                  </div>
                  <p className="text-xs text-[#666] mt-0.5">
                    {u.approvedAt
                      ? `승인일: ${new Date(u.approvedAt).toLocaleDateString("ko-KR")}`
                      : `생성일: ${new Date(u.createdAt).toLocaleDateString("ko-KR")}`}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  {/* 역할 변경 */}
                  <form action={changeRoleAction} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={u.id} />
                    <select
                      name="role"
                      defaultValue={u.role}
                      className="bg-[#111] border border-[#1e1e1e] text-[#b5b5b5] text-xs px-2 py-1.5 outline-none focus:border-[#c8ff00] transition-colors"
                    >
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      type="submit"
                      className="px-2 py-1.5 border border-[#1e1e1e] text-[#b5b5b5] text-xs tracking-widest uppercase hover:border-[#c8ff00] hover:text-[#c8ff00] transition-colors"
                    >
                      변경
                    </button>
                  </form>

                  {/* 활성/비활성 토글 */}
                  <form action={toggleStatusAction} className="contents">
                    <input type="hidden" name="id" value={u.id} />
                    <input type="hidden" name="status" value={u.status} />
                    <button
                      type="submit"
                      className={`px-3 py-1.5 border text-xs font-bold tracking-widest uppercase transition-colors ${
                        u.status === "active"
                          ? "border-[#333] text-[#666] hover:border-[#ff3cac] hover:text-[#ff3cac]"
                          : "border-[#333] text-[#666] hover:border-[#c8ff00] hover:text-[#c8ff00]"
                      }`}
                    >
                      {u.status === "active" ? "비활성화" : "활성화"}
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
