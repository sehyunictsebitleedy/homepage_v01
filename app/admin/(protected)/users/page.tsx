import { getSession } from "@/lib/auth";
import { readUsers } from "@/lib/users";
import { redirect } from "next/navigation";
import { addUserAction, changeRoleAction, toggleStatusAction, deleteUserAction } from "./actions";

export default async function UsersPage() {
  const session = await getSession();
  if (!session || (session.role !== "admin" && session.role !== "superadmin")) {
    redirect("/admin");
  }

  const users = readUsers();

  const STATUS_LABEL: Record<string, string> = { active: "활성", disabled: "비활성" };
  const ROLE_LABEL: Record<string, string> = { admin: "Admin", editor: "Editor" };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c8ff00] mb-1">
          System
        </p>
        <h1 className="text-2xl font-black tracking-[-0.03em] text-[#f0f0f0]">
          User Management
        </h1>
        <p className="text-xs text-[#666] mt-1">
          LINE WORKS 계정을 등록하고 역할을 부여합니다.
        </p>
      </div>

      {/* 사용자 추가 */}
      <section>
        <h2 className="font-mono text-xs tracking-widest uppercase text-[#b5b5b5] mb-4">
          사용자 추가
        </h2>
        <form action={addUserAction} className="border border-[#1e1e1e] p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-[#a1a1a1] mb-1.5">
                LINE WORKS 이메일 *
              </label>
              <input
                type="text"
                name="worksId"
                required
                placeholder="user@company.com"
                className="w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2 outline-none focus:border-[#c8ff00] transition-colors placeholder:text-[#555]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-[#a1a1a1] mb-1.5">
                이름 (선택)
              </label>
              <input
                type="text"
                name="displayName"
                placeholder="홍길동"
                className="w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2 outline-none focus:border-[#c8ff00] transition-colors placeholder:text-[#555]"
              />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-[#a1a1a1] mb-1.5">
                역할
              </label>
              <select
                name="role"
                defaultValue="editor"
                className="bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2 outline-none focus:border-[#c8ff00] transition-colors"
              >
                <option value="editor">Editor — 콘텐츠 수정</option>
                <option value="admin">Admin — 전체 관리</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest uppercase hover:bg-[#d4ff33] transition-colors"
            >
              추가
            </button>
          </div>
        </form>
      </section>

      {/* 사용자 목록 */}
      <section>
        <h2 className="font-mono text-xs tracking-widest uppercase text-[#b5b5b5] mb-4">
          등록된 사용자 ({users.length})
        </h2>
        {users.length === 0 ? (
          <p className="text-xs text-[#555] py-4 border border-[#1e1e1e] px-5">
            등록된 사용자가 없습니다.
          </p>
        ) : (
          <div className="border border-[#1e1e1e] divide-y divide-[#1e1e1e]">
            {users.map((u) => (
              <div key={u.id} className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-[#f0f0f0]">
                      {u.displayName ?? u.worksId}
                    </p>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 border ${
                        u.status === "active"
                          ? "border-[#c8ff00] text-[#c8ff00]"
                          : "border-[#333] text-[#666]"
                      }`}
                    >
                      {STATUS_LABEL[u.status]}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 border border-[#333] text-[#666]">
                      {ROLE_LABEL[u.role]}
                    </span>
                  </div>
                  <p className="text-xs text-[#555] mt-0.5">{u.worksId}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  {/* 역할 변경 */}
                  <form action={changeRoleAction} className="flex items-center gap-1">
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

                  {/* 활성/비활성 */}
                  <form action={toggleStatusAction} className="contents">
                    <input type="hidden" name="id" value={u.id} />
                    <input type="hidden" name="status" value={u.status} />
                    <button
                      type="submit"
                      className={`px-2.5 py-1.5 border text-xs font-bold tracking-widest uppercase transition-colors ${
                        u.status === "active"
                          ? "border-[#222] text-[#555] hover:border-[#ff3cac] hover:text-[#ff3cac]"
                          : "border-[#222] text-[#555] hover:border-[#c8ff00] hover:text-[#c8ff00]"
                      }`}
                    >
                      {u.status === "active" ? "비활성화" : "활성화"}
                    </button>
                  </form>

                  {/* 삭제 */}
                  <form action={deleteUserAction} className="contents">
                    <input type="hidden" name="id" value={u.id} />
                    <button
                      type="submit"
                      className="px-2.5 py-1.5 border border-[#222] text-[#555] text-xs tracking-widest uppercase hover:border-[#ff3cac] hover:text-[#ff3cac] transition-colors"
                    >
                      삭제
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
